import { useState } from 'react';
import type { Role } from '../types/game';

interface RoleSelectProps {
  onSelect: (role: Role) => void;
}

const FACTION_PORTRAITS: Record<string, string> = {
  forge: '/factions/faction_forge.png',
  covenant: '/factions/faction_covenant.png',
  accord: '/factions/faction_accord.png',
  veil: '/factions/faction_veil.png',
  lantern: '/factions/faction_lantern.png',
};

const ROLES: {
  id: Role;
  title: string;
  description: string;
  detail: string;
  color: string;
  borderColor: string;
  factionNote: string;
  affinityFaction: string;
  affinityLabel: string;
}[] = [
  {
    id: 'builder',
    title: 'The Builder',
    description: 'Technical optimist inside the machine',
    detail: 'You believe capability is the path to safety. You move fast. You occasionally build faster than you can understand. Lantern factions distrust you by default.',
    color: 'text-orange-300',
    borderColor: 'border-orange-800 hover:border-orange-500',
    factionNote: 'Starts: Lantern −1',
    affinityFaction: 'forge',
    affinityLabel: 'Forge',
  },
  {
    id: 'auditor',
    title: 'The Auditor',
    description: 'Oversight specialist looking for what breaks',
    detail: 'You were trained to find the gaps between intent and specification. You see them everywhere now. Lantern factions are wary of institutional players.',
    color: 'text-green-300',
    borderColor: 'border-green-800 hover:border-green-500',
    factionNote: 'Starts: Lantern −1',
    affinityFaction: 'covenant',
    affinityLabel: 'Covenant',
  },
  {
    id: 'diplomat',
    title: 'The Diplomat',
    description: 'Coordination architect and bridge-builder',
    detail: 'You believe the only path forward runs through everyone simultaneously. You are perpetually negotiating. The Veil faction does not trust bridges.',
    color: 'text-blue-300',
    borderColor: 'border-blue-800 hover:border-blue-500',
    factionNote: 'Starts: Veil −1',
    affinityFaction: 'accord',
    affinityLabel: 'Accord',
  },
  {
    id: 'defector',
    title: 'The Defector',
    description: 'Former insider who crossed a line',
    detail: 'You have seen what the institution protects when it should not. You carry leverage and resentment in equal measure. Accord mistrusts your unilateralism.',
    color: 'text-purple-300',
    borderColor: 'border-purple-800 hover:border-purple-500',
    factionNote: 'Starts: Lantern +1, Accord −1',
    affinityFaction: 'lantern',
    affinityLabel: 'Lantern',
  },
];

export function RoleSelectScreen({ onSelect }: RoleSelectProps) {
  const [selected, setSelected] = useState<Role | null>(null);
  const [hoveredFaction, setHoveredFaction] = useState<string | null>(null);

  const selectedRole = ROLES.find(r => r.id === selected);
  const previewFaction = hoveredFaction || (selectedRole ? selectedRole.affinityFaction : null);

  return (
    <div className="relative w-full h-full flex overflow-hidden bg-stone-950">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, #44403c 40px, #44403c 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #44403c 40px, #44403c 41px)',
        }}
      />

      {/* Left: Faction portrait preview */}
      <div className="relative hidden md:flex w-72 shrink-0 flex-col items-center justify-center border-r border-stone-800 bg-stone-950/80 overflow-hidden">
        {previewFaction ? (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-700"
              style={{
                backgroundImage: `url(${FACTION_PORTRAITS[previewFaction]})`,
                filter: 'brightness(0.7)',
                backgroundPosition: 'center top',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
              <p className="text-xs font-mono uppercase tracking-widest text-stone-400 mb-1">Primary Affinity</p>
              <p className={`text-sm font-mono uppercase tracking-widest ${selectedRole?.color || 'text-stone-200'}`}>
                {ROLES.find(r => r.affinityFaction === previewFaction)?.affinityLabel || previewFaction}
              </p>
            </div>
          </>
        ) : (
          <div className="text-center p-8">
            <p className="text-stone-600 text-xs font-mono uppercase tracking-widest">Select a role to see your primary faction affinity</p>
            <div className="mt-6 flex flex-col gap-3">
              {Object.entries(FACTION_PORTRAITS).map(([key, url]) => (
                <div
                  key={key}
                  className="flex items-center gap-2 opacity-30 hover:opacity-60 transition-opacity cursor-pointer"
                  onMouseEnter={() => setHoveredFaction(key)}
                  onMouseLeave={() => setHoveredFaction(null)}
                >
                  <div
                    className="w-8 h-8 rounded-full bg-cover bg-center border border-stone-700"
                    style={{ backgroundImage: `url(${url})` }}
                  />
                  <span className="text-xs font-mono text-stone-500 uppercase tracking-widest">{key}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right: Role selection */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-8 overflow-y-auto">
        <div className="w-full max-w-xl">
          <div className="text-center mb-8">
            <p className="text-xs font-mono tracking-[0.4em] text-stone-500 uppercase mb-3">Select your operative</p>
            <h2 className="text-xl font-light tracking-widest text-stone-200 uppercase">Choose Your Role</h2>
            <p className="text-stone-500 text-xs mt-2 font-mono">Your role determines starting faction relationships and narrative framing</p>
          </div>

          <div className="grid grid-cols-1 gap-2 mb-8">
            {ROLES.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelected(role.id)}
                onMouseEnter={() => setHoveredFaction(role.affinityFaction)}
                onMouseLeave={() => setHoveredFaction(null)}
                className={`text-left p-4 bg-stone-900 border rounded-sm transition-all duration-200 ${role.borderColor} ${
                  selected === role.id ? 'ring-1 ring-amber-500/50 bg-stone-800' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center gap-2">
                    {/* Mini faction portrait */}
                    <div
                      className="w-8 h-8 rounded-full bg-cover bg-center border border-stone-700 shrink-0"
                      style={{ backgroundImage: `url(${FACTION_PORTRAITS[role.affinityFaction]})` }}
                    />
                    <h3 className={`font-mono uppercase tracking-widest text-sm ${role.color}`}>{role.title}</h3>
                  </div>
                  <span className="text-xs font-mono text-stone-500 ml-2 whitespace-nowrap">{role.factionNote}</span>
                </div>
                <p className="text-stone-400 text-xs font-light ml-10 italic mb-1">{role.description}</p>
                <p className="text-stone-500 text-xs leading-relaxed ml-10">{role.detail}</p>
              </button>
            ))}
          </div>

          <div className="text-center">
            <button
              disabled={!selected}
              onClick={() => selected && onSelect(selected)}
              className="px-8 py-3 border border-amber-600 text-amber-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-amber-400 hover:text-stone-950 font-mono text-xs uppercase tracking-[0.3em] transition-all duration-300"
            >
              {selected ? `Enter as ${ROLES.find(r => r.id === selected)?.title}` : 'Select a role'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
