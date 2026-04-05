import type { GameState } from '../types/game';

interface HUDProps {
  state: GameState;
  onJournalClick: () => void;
  onEvidenceClick: () => void;
  onAlertsClick: () => void;
}

const STAT_LABELS: Record<string, { label: string; color: string; desc: string }> = {
  trust: { label: 'Trust', color: 'bg-amber-400', desc: 'Institutional trust and personal credibility' },
  capability: { label: 'Capability', color: 'bg-blue-400', desc: 'Technical capability and deployment speed' },
  oversight: { label: 'Oversight', color: 'bg-green-400', desc: 'Review, accountability, and constraint systems' },
  instability: { label: 'Instability', color: 'bg-red-500', desc: 'Crisis pressure and systemic stress' },
  public_pressure: { label: 'Public Pressure', color: 'bg-orange-400', desc: 'Outside attention and public scrutiny' },
  corruption: { label: 'Corruption', color: 'bg-purple-500', desc: 'Compromises made and ethical erosion' },
};

const FACTION_LABELS: Record<string, { label: string; color: string }> = {
  forge: { label: 'Forge', color: 'text-orange-300' },
  covenant: { label: 'Covenant', color: 'text-green-300' },
  accord: { label: 'Accord', color: 'text-blue-300' },
  veil: { label: 'Veil', color: 'text-purple-300' },
  lantern: { label: 'Lantern', color: 'text-yellow-300' },
};

function StatBar({ label, value, color, desc }: { label: string; value: number; color: string; desc: string }) {
  return (
    <div className="mb-2" title={desc}>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-stone-400 uppercase tracking-widest font-mono">{label}</span>
        <span className="text-xs text-stone-300 font-mono">{value}/4</span>
      </div>
      <div className="flex gap-0.5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-sm border border-stone-700 transition-all duration-500 ${
              i < value ? `${color} opacity-90` : 'bg-stone-800'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function FactionScore({ label, value, color }: { label: string; value: number; color: string }) {
  const pips = [-2, -1, 0, 1, 2];
  return (
    <div className="flex items-center justify-between mb-1">
      <span className={`text-xs font-mono uppercase tracking-widest ${color}`}>{label}</span>
      <div className="flex gap-0.5 items-center">
        {pips.map((pip) => (
          <div
            key={pip}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              pip === 0
                ? 'border border-stone-500 bg-stone-700'
                : pip < 0
                ? value <= pip
                  ? 'bg-red-600 border border-red-700'
                  : 'bg-stone-800 border border-stone-700'
                : value >= pip
                ? 'bg-amber-400 border border-amber-500'
                : 'bg-stone-800 border border-stone-700'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function HUD({ state, onJournalClick, onEvidenceClick, onAlertsClick }: HUDProps) {
  const { vars, factions, journal, evidence, alerts, act } = state;
  const unresolvedAlerts = alerts.filter(a => a.type !== 'info').length;

  return (
    <aside className="w-64 shrink-0 flex flex-col gap-3 p-3 bg-stone-950 border-r border-stone-800 overflow-y-auto">
      {/* Act marker */}
      <div className="text-center py-2 border-b border-stone-800">
        <span className="text-xs font-mono text-stone-500 uppercase tracking-widest">
          Act {act} of 3
        </span>
      </div>

      {/* Global Variables */}
      <div>
        <h3 className="text-xs text-stone-500 uppercase tracking-widest mb-2 font-mono">Variables</h3>
        {Object.entries(STAT_LABELS).map(([key, meta]) => (
          <StatBar
            key={key}
            label={meta.label}
            value={vars[key as keyof typeof vars]}
            color={meta.color}
            desc={meta.desc}
          />
        ))}
      </div>

      {/* Faction Scores */}
      <div className="border-t border-stone-800 pt-3">
        <h3 className="text-xs text-stone-500 uppercase tracking-widest mb-2 font-mono">Factions</h3>
        {Object.entries(FACTION_LABELS).map(([key, meta]) => (
          <FactionScore
            key={key}
            label={meta.label}
            value={factions[key as keyof typeof factions]}
            color={meta.color}
          />
        ))}
      </div>

      {/* Panels */}
      <div className="border-t border-stone-800 pt-3 flex flex-col gap-2">
        <button
          onClick={onJournalClick}
          className="flex justify-between items-center px-3 py-2 bg-stone-900 hover:bg-stone-800 border border-stone-700 rounded text-xs font-mono transition-colors"
        >
          <span className="text-stone-300 uppercase tracking-widest">Journal</span>
          <span className="text-amber-400">{journal.length}</span>
        </button>
        <button
          onClick={onEvidenceClick}
          className="flex justify-between items-center px-3 py-2 bg-stone-900 hover:bg-stone-800 border border-stone-700 rounded text-xs font-mono transition-colors"
        >
          <span className="text-stone-300 uppercase tracking-widest">Evidence</span>
          <span className="text-blue-300">{evidence.length}</span>
        </button>
        <button
          onClick={onAlertsClick}
          className="flex justify-between items-center px-3 py-2 bg-stone-900 hover:bg-stone-800 border border-stone-700 rounded text-xs font-mono transition-colors"
        >
          <span className={unresolvedAlerts > 0 ? 'text-red-400' : 'text-stone-300'} >
            {unresolvedAlerts > 0 ? '⚠ ' : ''}Alerts
          </span>
          <span className={unresolvedAlerts > 0 ? 'text-red-400' : 'text-stone-400'}>{alerts.length}</span>
        </button>
      </div>

      {/* Role */}
      <div className="border-t border-stone-800 pt-3 text-center">
        <span className="text-xs font-mono text-stone-600 uppercase tracking-widest">
          {state.role || 'Unknown'} operative
        </span>
      </div>
    </aside>
  );
}
