import type { Scene, GameState } from '../types/game';
import { act1Scenes } from './scenes/act1';
import { act2Scenes } from './scenes/act2';
import { act3Scenes } from './scenes/act3';

const allScenes: Scene[] = [...act1Scenes, ...act2Scenes, ...act3Scenes];

const sceneMap: Record<string, Scene> = {};
for (const scene of allScenes) {
  sceneMap[scene.id] = scene;
}

export function getScene(id: string): Scene | null {
  return sceneMap[id] || null;
}

export function getAct2HubScenes(state: GameState): {
  core: Scene[];
  optional: Scene[];
  completed: string[];
} {
  const core = act2Scenes.filter(s => s.isCoreAct2);
  const optional = act2Scenes.filter(s => s.isAct2Optional);

  const availableCore = core.filter(s =>
    !state.completedScenes.includes(s.id) &&
    (!s.unlockCondition || s.unlockCondition(state))
  );
  const availableOptional = optional.filter(s =>
    !state.completedScenes.includes(s.id) &&
    (!s.unlockCondition || s.unlockCondition(state))
  );

  return {
    core: availableCore,
    optional: availableOptional,
    completed: state.completedScenes,
  };
}

export function canProceedToRevelation(state: GameState): boolean {
  return state.act2CoreCompleted.length >= 2;
}

export { allScenes };
