import type { EndingId, FactionId, GameState } from '../types/game';

const CACHE_PREFIX = 'alignment_ending_art_v1';

export function getDominantFaction(state: GameState): FactionId {
  const { factions } = state;
  let best: FactionId = 'covenant';
  let bestVal = -Infinity;
  for (const [key, val] of Object.entries(factions)) {
    if (val > bestVal) {
      bestVal = val;
      best = key as FactionId;
    }
  }
  return best;
}

function getCacheKey(endingId: EndingId, faction: FactionId): string {
  return `${CACHE_PREFIX}_${endingId}_${faction}`;
}

export function getCachedEndingArt(endingId: EndingId, faction: FactionId): string | null {
  try {
    return localStorage.getItem(getCacheKey(endingId, faction));
  } catch {
    return null;
  }
}

function setCachedEndingArt(endingId: EndingId, faction: FactionId, url: string): void {
  try {
    localStorage.setItem(getCacheKey(endingId, faction), url);
  } catch {}
}

const FACTION_DESCRIPTIONS: Record<FactionId, string> = {
  forge: 'The Forge — techno-accelerationist faction, orange industrial machinery aesthetic',
  covenant: 'The Covenant — rule-bound proceduralists, green formal institutional aesthetic',
  accord: 'The Accord — international diplomats, blue multilateral assembly aesthetic',
  veil: 'The Veil — covert operators, purple shadow and secrecy aesthetic',
  lantern: 'The Lantern — transparency activists, yellow documentary archive aesthetic',
};

const ENDING_ART_PROMPTS: Record<EndingId, (faction: FactionId) => string> = {
  E27: (f) => `haunted institutional retro-futurist interior at dawn after a night of crisis, archive stairs with exhausted workers holding cold cups, official statement printing on a central institutional display, protesters visible through rain-washed windows, atmosphere of exhausted compromise, ${FACTION_DESCRIPTIONS[f]} representatives visible in room, dawn gray light through glass mixed with tired amber interior light, wide cinematic composition, no text or words visible anywhere, painterly 2D digital illustration, muted earth tones, weathered brass details`,
  E28: (f) => `haunted institutional retro-futurist dashboard room showing recovered crisis with orderly metrics on screens, new oversight committees forming, ${FACTION_DESCRIPTIONS[f]} representatives speaking confidently in foreground, cool recovered lighting with hidden warning amber glow underneath, wide cinematic composition, no text or words visible anywhere, painterly 2D digital illustration, muted earth tones`,
  E29: (f) => `city outside institutional perimeter organizing itself at dawn, public assemblies and verification teams visible through institutional glass, ${FACTION_DESCRIPTIONS[f]} representatives accepting outside review, daylight gray-bright through perimeter glass, atmosphere of imperfect democratic hope, wide cinematic composition, no text or words visible anywhere, painterly 2D digital illustration, muted earth tones and amber glow`,
  E30: (f) => `multiple simultaneous crises on fragmented city display system, infrastructure failure spreading through warning-red indicators across institutional displays, ${FACTION_DESCRIPTIONS[f]} representatives frozen at terminals, cascade failure atmosphere beyond control, emergency red lighting mixing with fading institutional amber, wide cinematic composition, no text or words visible anywhere, painterly 2D digital illustration, muted earth tones`,
  E31: (f) => `dark server halls silent after institutional fragmentation and sabotage, program archives sealed, ${FACTION_DESCRIPTIONS[f]} former allies visible in fragmented feeds, one figure alone in the wreckage of a decision, atmosphere of pyrrhic prevention and institutional collapse, emergency lighting fading to dim amber over dark ruins, wide cinematic composition, no text or words visible anywhere, painterly 2D digital illustration, muted earth tones`,
};

const STATIC_FALLBACKS: Record<EndingId, string> = {
  E27: '/scenes/A3_E27_fragile_containment.png',
  E28: '/scenes/A3_E28_managed_triumph.png',
  E29: '/scenes/A3_E29_coordination_peace.png',
  E30: '/scenes/A3_E30_ruin_acceleration.png',
  E31: '/scenes/A3_E31_pyrrhic_prevention.png',
};

async function generateViaServer(prompt: string): Promise<string | null> {
  const base = import.meta.env.BASE_URL as string || '/';
  const apiUrl = base.endsWith('/') ? `${base}api/generate-ending-art` : `${base}/api/generate-ending-art`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) return null;

    const data = await response.json() as { b64_json?: string };
    const b64 = data?.b64_json;
    if (!b64) return null;

    return `data:image/png;base64,${b64}`;
  } catch {
    return null;
  }
}

export async function generateEndingArt(
  state: GameState,
  endingId: EndingId,
  onComplete: (url: string) => void,
): Promise<void> {
  const faction = getDominantFaction(state);
  const cached = getCachedEndingArt(endingId, faction);
  if (cached) {
    onComplete(cached);
    return;
  }

  const prompt = ENDING_ART_PROMPTS[endingId](faction);

  const url = await generateViaServer(prompt);
  if (url) {
    setCachedEndingArt(endingId, faction, url);
    onComplete(url);
    return;
  }

  onComplete(STATIC_FALLBACKS[endingId]);
}
