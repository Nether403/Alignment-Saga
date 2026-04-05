import { Router, type Request } from "express";

const router = Router();

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 10;
const ipHits = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(req: Request): boolean {
  const ip = (req.headers["x-forwarded-for"] as string || req.socket.remoteAddress || "unknown").split(",")[0].trim();
  const now = Date.now();
  const entry = ipHits.get(ip);

  if (!entry || now > entry.resetAt) {
    ipHits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  if (entry.count > MAX_PER_WINDOW) return true;
  return false;
}

router.post("/generate-ending-art", async (req, res) => {
  if (isRateLimited(req)) {
    res.status(429).json({ error: "Too many requests" });
    return;
  }

  const { prompt } = req.body as { prompt?: string };

  if (!prompt || typeof prompt !== "string" || prompt.length > 2000) {
    res.status(400).json({ error: "Invalid prompt" });
    return;
  }

  const baseUrl = process.env.AI_INTEGRATIONS_OPENAI_BASE_URL;
  const apiKey = process.env.AI_INTEGRATIONS_OPENAI_API_KEY;

  if (!baseUrl || !apiKey) {
    res.status(503).json({ error: "Image generation not configured" });
    return;
  }

  try {
    const response = await fetch(`${baseUrl}/images/generations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt,
        n: 1,
        size: "1024x1024",
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      res.status(502).json({ error: "Upstream error", detail: errText.slice(0, 200) });
      return;
    }

    const data = await response.json() as { data?: { b64_json?: string }[] };
    const b64 = data?.data?.[0]?.b64_json;

    if (!b64) {
      res.status(502).json({ error: "No image data returned" });
      return;
    }

    res.json({ b64_json: b64 });
  } catch {
    res.status(500).json({ error: "Generation failed" });
  }
});

export default router;
