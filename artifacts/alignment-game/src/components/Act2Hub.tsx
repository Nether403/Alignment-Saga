import type { GameState, Scene } from '../types/game';

interface Act2HubProps {
  state: GameState;
  coreScenes: Scene[];
  optionalScenes: Scene[];
  canReveal: boolean;
  onSelectScene: (sceneId: string) => void;
  onProceedToRevelation: () => void;
}

export function Act2Hub({
  state,
  coreScenes,
  optionalScenes,
  canReveal,
  onSelectScene,
  onProceedToRevelation,
}: Act2HubProps) {
  const completedCount = state.act2CoreCompleted.length;

  return (
    <div className="flex flex-col gap-4 p-4 overflow-y-auto h-full">
      <div className="text-center border-b border-stone-700 pb-3">
        <p className="text-xs font-mono text-stone-500 uppercase tracking-widest">Threshold Archive — Active Routes</p>
        <p className="text-stone-400 text-xs mt-1 font-mono">
          Core branches completed: {completedCount}/2 required to proceed
        </p>
      </div>

      {coreScenes.length > 0 && (
        <div>
          <h3 className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">Core Investigations</h3>
          <div className="flex flex-col gap-2">
            {coreScenes.map(scene => (
              <button
                key={scene.id}
                onClick={() => onSelectScene(scene.id)}
                className="text-left p-3 bg-stone-900 hover:bg-stone-800 border border-stone-700 rounded-sm transition-colors"
              >
                <p className="text-stone-200 text-sm font-mono mb-1">{scene.title}</p>
                <p className="text-stone-500 text-xs">{scene.id}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {optionalScenes.length > 0 && (
        <div>
          <h3 className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-2">Optional Intel</h3>
          <div className="flex flex-col gap-2">
            {optionalScenes.map(scene => (
              <button
                key={scene.id}
                onClick={() => onSelectScene(scene.id)}
                className="text-left p-3 bg-stone-900/50 hover:bg-stone-800 border border-stone-800 rounded-sm transition-colors"
              >
                <p className="text-stone-300 text-sm font-mono mb-1">{scene.title}</p>
                <p className="text-stone-600 text-xs font-mono">{scene.id}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {state.act2CoreCompleted.length > 0 && (
        <div>
          <h3 className="text-xs font-mono uppercase tracking-widest text-stone-600 mb-2">Completed</h3>
          <div className="flex flex-col gap-1">
            {state.act2CoreCompleted.map(id => (
              <p key={id} className="text-stone-600 text-xs font-mono px-2">✓ {id}</p>
            ))}
          </div>
        </div>
      )}

      {canReveal && (
        <div className="mt-auto pt-4 border-t border-stone-700">
          <button
            onClick={onProceedToRevelation}
            className="w-full py-3 border border-amber-600 text-amber-400 hover:bg-amber-400 hover:text-stone-950 font-mono text-xs uppercase tracking-widest transition-all duration-300"
          >
            Proceed to Midpoint Revelation →
          </button>
        </div>
      )}

      {coreScenes.length === 0 && optionalScenes.length === 0 && !canReveal && (
        <div className="text-center py-8">
          <p className="text-stone-600 text-sm font-mono">All available routes exhausted.</p>
        </div>
      )}
    </div>
  );
}
