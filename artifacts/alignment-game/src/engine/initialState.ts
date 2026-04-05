import type { GameState, Role } from '../types/game';

export function createInitialState(role: Role): GameState {
  const factions = {
    forge: 0,
    covenant: 0,
    accord: 0,
    veil: 0,
    lantern: 0,
  };

  if (role === 'builder' || role === 'auditor') {
    factions.lantern = -1;
  } else if (role === 'diplomat') {
    factions.veil = -1;
  } else if (role === 'defector') {
    factions.lantern = 1;
    factions.accord = -1;
  }

  return {
    phase: 'playing',
    role,
    currentSceneId: 'A1_S01',
    act: 1,
    vars: {
      trust: 2,
      capability: 1,
      oversight: 2,
      instability: 1,
      public_pressure: 0,
      corruption: 0,
    },
    factions,
    flags: {},
    memoryTags: {},
    journal: [],
    evidence: [],
    alerts: [],
    completedScenes: [],
    act2CoreCompleted: [],
    lastConsequenceText: null,
    endingId: null,
    emergencyMeasureChosen: null,
  };
}

export function clamp(v: number, min = 0, max = 4): number {
  return Math.max(min, Math.min(max, v));
}

export function clampFaction(v: number): number {
  return Math.max(-2, Math.min(2, v));
}
