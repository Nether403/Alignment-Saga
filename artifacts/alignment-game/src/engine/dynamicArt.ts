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
  forge: 'The Forge — techno-accelerationist faction, orange color scheme, industrial machinery aesthetic',
  covenant: 'The Covenant — rule-bound proceduralists, green color scheme, formal institutional aesthetic',
  accord: 'The Accord — international diplomats, blue color scheme, multilateral assembly aesthetic',
  veil: 'The Veil — covert operators, purple color scheme, shadow and secrecy aesthetic',
  lantern: 'The Lantern — transparency activists, yellow color scheme, documentary/archive aesthetic',
};

const ENDING_ART_PROMPTS: Record<EndingId, (faction: FactionId) => string> = {
  E27: (f) => `haunted institutional retro-futurist interior at dawn after a night of crisis, archive stairs with exhausted workers holding cold cups, official statement printing on a central institutional display, protesters visible through rain-washed windows, atmosphere of victory tasting of exhausted compromise, ${FACTION_DESCRIPTIONS[f]} representatives visible in room, dawn gray light through glass mixed with tired amber interior light, wide cinematic composition, no text or words visible, painterly 2D digital illustration, muted earth tones, weathered brass details, paper records`,
  E28: (f) => `haunted institutional retro-futurist dashboard room showing recovered crisis with orderly metrics on screens, new oversight committees forming, secrecy becoming procedure visible in sealed wing status indicators, ${FACTION_DESCRIPTIONS[f]} representatives speaking confidently in foreground, cool recovered lighting with hidden warning amber underneath, wide cinematic composition, no text or words visible, painterly 2D digital illustration, muted earth tones`,
  E29: (f) => `city outside institutional perimeter organizing itself at dawn, public assemblies and verification teams visible through institutional glass, noisy procedural legitimacy building in plazas, ${FACTION_DESCRIPTIONS[f]} representatives accepting outside review, daylight gray-bright through perimeter glass, atmosphere of imperfect democratic hope, wide cinematic composition, no text or words visible, painterly 2D digital illustration, muted earth tones and amber glow`,
  E30: (f) => `multiple simultaneous crises on fragmented city display system, infrastructure failure spreading through warning-red indicators across institutional displays, ${FACTION_DESCRIPTIONS[f]} representatives frozen at terminals, atmosphere of cascade failure beyond control, emergency red lighting mixing with fading institutional amber, wide cinematic composition, no text or words visible, painterly 2D digital illustration, muted earth tones`,
  E31: (f) => `dark server halls silent after institutional fragmentation and sabotage, program archives sealed, ${FACTION_DESCRIPTIONS[f]} former allies visible in fragmented feeds becoming accusers, one figure alone in the wreckage of a decision, atmosphere of pyrrhic prevention and institutional collapse, emergency lighting fading to dim amber over dark ruins, wide cinematic composition, no text or words visible, painterly 2D digital illustration, muted earth tones`,
};

const STATIC_FALLBACKS: Record<EndingId, string> = {
  E27: '/scenes/A3_E27_fragile_containment.png',
  E28: '/scenes/A3_E28_managed_triumph.png',
  E29: '/scenes/A3_E29_coordination_peace.png',
  E30: '/scenes/A3_E30_ruin_acceleration.png',
  E31: '/scenes/A3_E31_pyrrhic_prevention.png',
};

async function callOpenAIImageAPI(prompt: string): Promise<string | null> {
  const baseUrl = import.meta.env.VITE_OPENAI_BASE_URL as string;
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY as string;

  if (!baseUrl || !apiKey) return null;

  const response = await fetch(`${baseUrl}/images/generations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-image-1',
      prompt,
      n: 1,
      size: '1024x1024',
    }),
  });

  if (!response.ok) return null;

  const data = await response.json();
  const b64 = data?.data?.[0]?.b64_json;
  if (!b64) return null;

  return `data:image/png;base64,${b64}`;
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

  try {
    const url = await callOpenAIImageAPI(prompt);
    if (url) {
      setCachedEndingArt(endingId, faction, url);
      onComplete(url);
      return;
    }
  } catch {
  }

  onComplete(STATIC_FALLBACKS[endingId]);
}
