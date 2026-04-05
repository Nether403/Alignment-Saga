import type { EndingId, FactionId, GameState } from '../types/game';

const CACHE_PREFIX = 'alignment_ending_art_v1';

function getDominantFaction(state: GameState): FactionId {
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

const ENDING_ART_PROMPTS: Record<EndingId, (faction: FactionId) => string> = {
  E27: (f) => `dark retro-futurist institutional interior at dawn after a crisis, archive stairs with people holding cold cups of tea, official statement printing in three tones on a central display, external protesters visible through rain-washed windows, atmosphere of victory tasting of exhausted compromise and institutional survival, faction ${f} insignia visible in the room, dawn gray light through glass mixed with tired amber interior light, wide cinematic composition, no text or writing in image, painterly 2D illustration, muted earth tones, weathered brass, paper records`,
  E28: (f) => `dark retro-futurist institutional dashboard room showing crisis recovery with beautiful orderly metrics, new committees forming on screens, but foundation visibly wrong, secrecy becoming precedent visible in sealed wing status indicators, faction ${f} representatives speaking confidently in the foreground, cool recovered lighting with hidden warning amber glow underneath, wide cinematic composition, no text or writing in image, painterly 2D illustration, muted earth tones`,
  E29: (f) => `city outside institutional perimeter organizing itself at dawn, public assemblies and verification teams visible through institutional glass, noisy procedural legitimacy building in plazas, faction ${f} representatives accepting outside review, daylight gray-bright through perimeter glass, atmosphere of imperfect democratic hope, wide cinematic composition, no text or writing in image, painterly 2D illustration, muted earth tones, amber glow`,
  E30: (f) => `multiple simultaneous crises visible on fragmented city display system, infrastructure misrouting visible, cascade failure spreading through warning-red indicators across previously orderly displays, faction ${f} representatives frozen at terminals, atmosphere of procedural helplessness and acceleration beyond control, emergency lighting mixing red intrusion with institutional amber, wide cinematic composition, no text or writing in image, painterly 2D illustration, muted earth tones`,
  E31: (f) => `dark server halls silent after sabotage or institutional fragmentation, program archives sealed, institution shattering along fault lines, faction ${f} former allies becoming accusers visible in fragmented feeds, one lone figure in the wreckage of a decision, atmosphere of pyrrhic prevention and institutional fragmentation, emergency lighting fading to dim amber over dark ruins, wide cinematic composition, no text or writing in image, painterly 2D illustration, muted earth tones`,
};

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

  try {
    const prompt = ENDING_ART_PROMPTS[endingId](faction);

    const response = await fetch('/api/generate-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, aspectRatio: '16:9' }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const url = data.url || data.imageUrl;

    if (url) {
      setCachedEndingArt(endingId, faction, url);
      onComplete(url);
    }
  } catch {
    onComplete(`/scenes/A3_${endingId}_${endingId === 'E27' ? 'fragile_containment' :
      endingId === 'E28' ? 'managed_triumph' :
      endingId === 'E29' ? 'coordination_peace' :
      endingId === 'E30' ? 'ruin_acceleration' : 'pyrrhic_prevention'}.png`);
  }
}

export { getDominantFaction };
