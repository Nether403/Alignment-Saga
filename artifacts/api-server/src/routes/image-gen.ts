import { Router } from "express";

const router = Router();

router.post("/api/generate-ending-art", async (req, res) => {
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
  } catch (err) {
    res.status(500).json({ error: "Generation failed" });
  }
});

export default router;
