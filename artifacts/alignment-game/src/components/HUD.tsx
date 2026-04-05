import { useState } from 'react';
import type { GameState } from '../types/game';

interface HUDProps {
  state: GameState;
  onJournalClick: () => void;
  onEvidenceClick: () => void;
  onAlertsClick: () => void;
  onARIAClick: () => void;
  onDossierClick: () => void;
}

const STAT_LABELS: Record<string, { label: string; short: string; color: string; desc: string }> = {
  trust: { label: 'Trust', short: 'TRS', color: 'bg-amber-400', desc: 'Institutional trust and personal credibility' },
  capability: { label: 'Capability', short: 'CAP', color: 'bg-blue-400', desc: 'Technical capability and deployment speed' },
  oversight: { label: 'Oversight', short: 'OVR', color: 'bg-green-400', desc: 'Review, accountability, and constraint systems' },
  instability: { label: 'Instability', short: 'INS', color: 'bg-red-500', desc: 'Crisis pressure and systemic stress' },
  public_pressure: { label: 'Public', short: 'PUB', color: 'bg-orange-400', desc: 'Outside attention and public scrutiny' },
  corruption: { label: 'Corruption', short: 'COR', color: 'bg-purple-500', desc: 'Compromises made and ethical erosion' },
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

function MiniStat({ short, value, color }: { short: string; value: number; color: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-[9px] font-mono text-stone-500 uppercase">{short}</span>
      <div className="flex gap-0.5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full border border-stone-700 ${i < value ? `${color}` : 'bg-stone-800'}`}
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

export function HUD({ state, onJournalClick, onEvidenceClick, onAlertsClick, onARIAClick, onDossierClick }: HUDProps) {
  const { vars, factions, journal, evidence, alerts, act } = state;
  const unresolvedAlerts = alerts.filter(a => a.type !== 'info').length;
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex w-64 shrink-0 flex-col gap-3 p-3 bg-stone-950 border-r border-stone-800 overflow-y-auto">
        <div className="text-center py-2 border-b border-stone-800">
          <span className="text-xs font-mono text-stone-500 uppercase tracking-widest">
            Act {act} of 3
          </span>
        </div>

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
            <span className={unresolvedAlerts > 0 ? 'text-red-400' : 'text-stone-300'}>
              {unresolvedAlerts > 0 ? '⚠ ' : ''}Alerts
            </span>
            <span className={unresolvedAlerts > 0 ? 'text-red-400' : 'text-stone-400'}>{alerts.length}</span>
          </button>
        </div>

        {/* ARIA + Dossier */}
        <div className="border-t border-stone-800 pt-3 flex flex-col gap-2">
          <button
            onClick={onARIAClick}
            className="flex items-center justify-center gap-2 px-3 py-2 bg-amber-950/30 hover:bg-amber-950/60 border border-amber-800/50 hover:border-amber-600 rounded text-xs font-mono transition-colors"
          >
            <span className="text-amber-400 uppercase tracking-widest">Ask ARIA</span>
          </button>
          <button
            onClick={onDossierClick}
            className="flex items-center justify-center gap-2 px-3 py-2 bg-stone-900 hover:bg-stone-800 border border-stone-700 rounded text-xs font-mono transition-colors"
          >
            <span className="text-stone-400 hover:text-stone-200 uppercase tracking-widest">Dossier</span>
          </button>
        </div>

        <div className="border-t border-stone-800 pt-3 text-center">
          <span className="text-xs font-mono text-stone-600 uppercase tracking-widest">
            {state.role || 'Unknown'} operative
          </span>
        </div>
      </aside>

      {/* MOBILE BOTTOM BAR + DRAWER */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40">
        {mobileOpen && (
          <div className="bg-stone-950 border-t border-stone-800 p-4 max-h-[60vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-mono text-stone-500 uppercase tracking-widest">Act {act} of 3 · {state.role}</span>
              <button onClick={() => setMobileOpen(false)} className="text-stone-500 hover:text-stone-200 text-xs font-mono">[CLOSE]</button>
            </div>

            <div className="mb-3">
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

            <div className="border-t border-stone-800 pt-3 mb-3">
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

            {/* ARIA + Dossier in mobile drawer */}
            <div className="border-t border-stone-800 pt-3 flex gap-2">
              <button
                onClick={() => { setMobileOpen(false); onARIAClick(); }}
                className="flex-1 px-3 py-2 bg-amber-950/30 border border-amber-800/50 text-amber-400 font-mono text-xs uppercase tracking-widest transition-colors"
              >
                Ask ARIA
              </button>
              <button
                onClick={() => { setMobileOpen(false); onDossierClick(); }}
                className="flex-1 px-3 py-2 bg-stone-900 border border-stone-700 text-stone-400 font-mono text-xs uppercase tracking-widest transition-colors"
              >
                Dossier
              </button>
            </div>
          </div>
        )}

        {/* Bottom tab bar */}
        <div className="bg-stone-950 border-t border-stone-800 flex items-center">
          <button
            onClick={() => setMobileOpen(v => !v)}
            className="flex-1 flex items-center gap-2 px-3 py-2 overflow-x-auto"
            aria-label="Toggle HUD"
          >
            {Object.entries(STAT_LABELS).map(([key, meta]) => (
              <MiniStat
                key={key}
                short={meta.short}
                value={vars[key as keyof typeof vars]}
                color={meta.color}
              />
            ))}
          </button>

          <div className="flex items-stretch border-l border-stone-800">
            <button
              onClick={onJournalClick}
              className="px-3 py-2 text-xs font-mono text-stone-400 hover:text-amber-400 border-r border-stone-800 flex flex-col items-center gap-0.5"
            >
              <span>📋</span>
              <span className="text-[9px]">{journal.length}</span>
            </button>
            <button
              onClick={onEvidenceClick}
              className="px-3 py-2 text-xs font-mono text-stone-400 hover:text-blue-300 border-r border-stone-800 flex flex-col items-center gap-0.5"
            >
              <span>🔍</span>
              <span className="text-[9px]">{evidence.length}</span>
            </button>
            <button
              onClick={onAlertsClick}
              className={`px-3 py-2 text-xs font-mono flex flex-col items-center gap-0.5 ${unresolvedAlerts > 0 ? 'text-red-400' : 'text-stone-400 hover:text-stone-200'}`}
            >
              <span>{unresolvedAlerts > 0 ? '⚠️' : '🔔'}</span>
              <span className="text-[9px]">{alerts.length}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
