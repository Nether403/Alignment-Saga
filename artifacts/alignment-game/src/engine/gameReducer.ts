import type { GameState, Choice, FlagId, StatDelta, FactionDelta } from '../types/game';
import { clamp, clampFaction } from './initialState';
import { determineEnding } from './scenes/act3';

export interface GameAction {
  type: 'MAKE_CHOICE';
  choice: Choice;
  sceneId: string;
}

function applyStatDelta(vars: GameState['vars'], delta?: StatDelta): GameState['vars'] {
  if (!delta) return vars;
  return {
    trust: clamp(vars.trust + (delta.trust || 0)),
    capability: clamp(vars.capability + (delta.capability || 0)),
    oversight: clamp(vars.oversight + (delta.oversight || 0)),
    instability: clamp(vars.instability + (delta.instability || 0)),
    public_pressure: clamp(vars.public_pressure + (delta.public_pressure || 0)),
    corruption: clamp(vars.corruption + (delta.corruption || 0)),
  };
}

function applyFactionDelta(factions: GameState['factions'], delta?: FactionDelta, extraDelta?: FactionDelta): GameState['factions'] {
  const combined: FactionDelta = {};
  if (delta) Object.assign(combined, delta);
  if (extraDelta) {
    for (const [k, v] of Object.entries(extraDelta)) {
      (combined as Record<string, number>)[k] = ((combined as Record<string, number>)[k] || 0) + (v || 0);
    }
  }
  if (Object.keys(combined).length === 0) return factions;
  return {
    forge: clampFaction(factions.forge + (combined.forge || 0)),
    covenant: clampFaction(factions.covenant + (combined.covenant || 0)),
    accord: clampFaction(factions.accord + (combined.accord || 0)),
    veil: clampFaction(factions.veil + (combined.veil || 0)),
    lantern: clampFaction(factions.lantern + (combined.lantern || 0)),
  };
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  if (action.type !== 'MAKE_CHOICE') return state;

  const { choice, sceneId } = action;

  const newVars = applyStatDelta(state.vars, choice.statDelta);
  const extraFactionDelta = choice.conditionalFactionDelta ? choice.conditionalFactionDelta(state) : undefined;
  const newFactions = applyFactionDelta(state.factions, choice.factionDelta, extraFactionDelta);

  const newFlags = { ...state.flags };
  if (choice.setFlags) {
    for (const flag of choice.setFlags) {
      newFlags[flag as FlagId] = true;
    }
  }

  const newCompletedScenes = state.completedScenes.includes(sceneId)
    ? state.completedScenes
    : [...state.completedScenes, sceneId];

  const newJournal = choice.journalEntry
    ? [...state.journal, { sceneId, text: choice.journalEntry }]
    : state.journal;

  const newEvidence = choice.evidenceEntry
    ? [...state.evidence, { sceneId, ...choice.evidenceEntry }]
    : state.evidence;

  const newAlerts = choice.alertEntry
    ? [...state.alerts, { sceneId, ...choice.alertEntry }]
    : state.alerts;

  const newMemoryTags = choice.memoryTag
    ? { ...state.memoryTags, [choice.memoryTag.key]: choice.memoryTag.value }
    : state.memoryTags;

  const emergencyMeasure = choice.emergencyMeasure ?? state.emergencyMeasureChosen;

  // Act2 core tracking
  const act2CoreIds = ['A2_B12', 'A2_B13', 'A2_B14', 'A2_B15'];
  let newAct2CoreCompleted = [...state.act2CoreCompleted];
  if (act2CoreIds.includes(sceneId) && !newAct2CoreCompleted.includes(sceneId)) {
    newAct2CoreCompleted.push(sceneId);
  }

  // Determine next scene ID
  let nextSceneId = choice.nextSceneId !== undefined ? choice.nextSceneId : state.currentSceneId;

  // After A2_S11 hub choices, go to hub
  if (sceneId === 'A2_S11') {
    nextSceneId = 'A2_HUB';
  }

  // After act2 branch/optional scenes, return to hub
  const act2BranchIds = ['A2_B12', 'A2_B13', 'A2_B14', 'A2_B15', 'A2_O16', 'A2_O17', 'A2_O18'];
  if (act2BranchIds.includes(sceneId)) {
    if (newAct2CoreCompleted.length >= 2) {
      nextSceneId = 'A2_S19_READY';
    } else {
      nextSceneId = 'A2_HUB';
    }
  }

  // Handle ending
  let endingId = state.endingId;
  let newPhase = state.phase;
  if (choice.nextSceneId === '__ENDING__') {
    const stateForEnding = { ...state, vars: newVars, factions: newFactions, flags: newFlags };
    endingId = determineEnding(stateForEnding);
    nextSceneId = `A3_E${endingId.slice(1)}`;
    newPhase = 'ending';
  }

  // Determine act
  let newAct = state.act;
  if (nextSceneId && nextSceneId.startsWith('A2_')) newAct = 2;
  if (nextSceneId && nextSceneId.startsWith('A3_')) newAct = 3;

  return {
    ...state,
    vars: newVars,
    factions: newFactions,
    flags: newFlags,
    memoryTags: newMemoryTags,
    completedScenes: newCompletedScenes,
    act2CoreCompleted: newAct2CoreCompleted,
    journal: newJournal,
    evidence: newEvidence,
    alerts: newAlerts,
    lastConsequenceText: choice.consequence || null,
    currentSceneId: nextSceneId || state.currentSceneId,
    act: newAct,
    phase: newPhase,
    endingId,
    emergencyMeasureChosen: emergencyMeasure ?? null,
  };
}
