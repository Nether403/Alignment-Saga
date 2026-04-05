import type { GameState } from '../types/game';

interface PanelOverlayProps {
  type: 'journal' | 'evidence' | 'alerts';
  state: GameState;
  onClose: () => void;
}

export function PanelOverlay({ type, state, onClose }: PanelOverlayProps) {
  const items =
    type === 'journal'
      ? state.journal
      : type === 'evidence'
      ? state.evidence
      : state.alerts;

  const titles: Record<string, string> = {
    journal: 'FIELD JOURNAL',
    evidence: 'EVIDENCE ARCHIVE',
    alerts: 'ACTIVE ALERTS',
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-stone-950 border border-stone-700 rounded-sm w-full max-w-lg max-h-[80vh] overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b border-stone-700">
          <h2 className="text-xs font-mono uppercase tracking-widest text-stone-400">{titles[type]}</h2>
          <button
            onClick={onClose}
            className="text-stone-500 hover:text-stone-200 text-sm font-mono transition-colors"
          >
            [CLOSE]
          </button>
        </div>
        <div className="overflow-y-auto flex-1 px-4 py-3">
          {items.length === 0 ? (
            <p className="text-stone-600 text-sm font-mono italic">No entries yet.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {[...items].reverse().map((item, i) => (
                <div key={i} className="border-b border-stone-800 pb-3 last:border-0">
                  {'title' in item && (
                    <p className="text-amber-300 text-xs font-mono uppercase tracking-widest mb-1">
                      {(item as { title: string }).title}
                    </p>
                  )}
                  {'type' in item && (item as { type: string }).type === 'critical' && (
                    <span className="text-red-400 text-xs font-mono uppercase tracking-widest">⚠ Critical — </span>
                  )}
                  {'type' in item && (item as { type: string }).type === 'warning' && (
                    <span className="text-orange-400 text-xs font-mono uppercase tracking-widest">Warning — </span>
                  )}
                  <p className="text-stone-300 text-sm font-light leading-relaxed">
                    {('text' in item ? (item as { text: string }).text : '')}
                  </p>
                  <p className="text-stone-600 text-xs font-mono mt-1">{item.sceneId}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
