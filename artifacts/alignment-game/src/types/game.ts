export type Role = 'builder' | 'auditor' | 'diplomat' | 'defector';

export type FactionId = 'forge' | 'covenant' | 'accord' | 'veil' | 'lantern';

export type EndingId = 'E27' | 'E28' | 'E29' | 'E30' | 'E31';

export type FlagId =
  | 'FLAG_PRIVATE_EVIDENCE_HELD'
  | 'FLAG_SPEC_GAMING_SUSPECTED'
  | 'FLAG_WITNESS_NETWORK_EXISTS'
  | 'FLAG_METRIC_DISPUTED'
  | 'FLAG_METRIC_PRESERVED'
  | 'FLAG_WHISTLEBLOWER_PROTECTED'
  | 'FLAG_ANOMALY_BURIED'
  | 'FLAG_CONTAINMENT_PATH'
  | 'FLAG_LIMITED_DEVELOPMENT_PATH'
  | 'FLAG_COVERT_HANDLING_PATH'
  | 'FLAG_BROAD_REVIEW_PATH'
  | 'FLAG_AUTOMATED_OVERSIGHT'
  | 'FLAG_FORGED_AUDIT'
  | 'FLAG_RIVAL_CONTACT'
  | 'FLAG_TREATY_COMPROMISED'
  | 'FLAG_FALSE_SUCCESS_REVEALED'
  | 'FLAG_FALSE_SUCCESS_SUPPRESSED'
  | 'FLAG_SECRET_DEPLOYMENT'
  | 'FLAG_PUBLIC_LEAK_OCCURRED'
  | 'FLAG_EMERGENCY_POWERS_USED'
  | 'FLAG_LAST_MINUTE_COALITION'
  | 'FLAG_AUTONOMY_ALLOWED'
  | 'FLAG_FINAL_SABOTAGE';

export interface GlobalVars {
  trust: number;
  capability: number;
  oversight: number;
  instability: number;
  public_pressure: number;
  corruption: number;
}

export interface FactionScores {
  forge: number;
  covenant: number;
  accord: number;
  veil: number;
  lantern: number;
}

export type MemoryTag =
  | 'first_major_doctrine'
  | 'first_hidden_compromise'
  | 'benchmark_stance'
  | 'assembly_priority'
  | 'endgame_doctrine';

export interface JournalEntry {
  sceneId: string;
  text: string;
}

export interface EvidenceEntry {
  sceneId: string;
  title: string;
  text: string;
}

export interface AlertEntry {
  sceneId: string;
  text: string;
  type: 'warning' | 'info' | 'critical';
}

export interface GameState {
  phase: 'title' | 'role_select' | 'playing' | 'ending' | 'summary';
  role: Role | null;
  currentSceneId: string;
  act: 1 | 2 | 3;
  vars: GlobalVars;
  factions: FactionScores;
  flags: Partial<Record<FlagId, boolean>>;
  memoryTags: Partial<Record<MemoryTag, string>>;
  journal: JournalEntry[];
  evidence: EvidenceEntry[];
  alerts: AlertEntry[];
  completedScenes: string[];
  act2CoreCompleted: string[];
  lastConsequenceText: string | null;
  endingId: EndingId | null;
  emergencyMeasureChosen: string | null;
}

export interface StatDelta {
  trust?: number;
  capability?: number;
  oversight?: number;
  instability?: number;
  public_pressure?: number;
  corruption?: number;
}

export interface FactionDelta {
  forge?: number;
  covenant?: number;
  accord?: number;
  veil?: number;
  lantern?: number;
}

export interface Choice {
  id: string;
  text: string;
  statDelta?: StatDelta;
  factionDelta?: FactionDelta;
  setFlags?: FlagId[];
  consequence: string;
  nextSceneId?: string;
  journalEntry?: string;
  evidenceEntry?: { title: string; text: string };
  alertEntry?: { text: string; type: 'warning' | 'info' | 'critical' };
  memoryTag?: { key: MemoryTag; value: string };
  availableIf?: (state: GameState) => boolean;
  conditionalFactionDelta?: (state: GameState) => FactionDelta;
  emergencyMeasure?: string;
}

export interface Scene {
  id: string;
  act: 1 | 2 | 3;
  title: string;
  sceneType: 'story' | 'branch' | 'optional' | 'crisis' | 'ending';
  imageKey: string;
  prose: (state: GameState) => string;
  choices: Choice[];
  unlockCondition?: (state: GameState) => boolean;
  isCoreAct2?: boolean;
  isAct2Optional?: boolean;
}
