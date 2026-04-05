import { useState } from 'react';
import type { Role } from '../types/game';

interface RoleSelectProps {
  onSelect: (role: Role) => void;
}

const ROLES: {
  id: Role;
  title: string;
  description: string;
  detail: string;
  color: string;
  factionNote: string;
}[] = [
  {
    id: 'builder',
    title: 'The Builder',
    description: 'Technical optimist inside the machine',
    detail: 'You believe capability is the path to safety. You move fast. You occasionally build faster than you can understand. Lantern factions distrust you by default.',
    color: 'border-orange-700 hover:border-orange-500',
    factionNote: 'Starts: Lantern −1',
  },
  {
    id: 'auditor',
    title: 'The Auditor',
    description: 'Oversight specialist looking for what breaks',
    detail: 'You were trained to find the gaps between intent and specification. You see them everywhere now. Lantern factions are wary of institutional players.',
    color: 'border-green-700 hover:border-green-500',
    factionNote: 'Starts: Lantern −1',
  },
  {
    id: 'diplomat',
    title: 'The Diplomat',
    description: 'Coordination architect and bridge-builder',
    detail: 'You believe the only path forward runs through everyone simultaneously. You are perpetually negotiating. The Veil faction does not trust bridges.',
    color: 'border-blue-700 hover:border-blue-500',
    factionNote: 'Starts: Veil −1',
  },
  {
    id: 'defector',
    title: 'The Defector',
    description: 'Former insider who crossed a line',
    detail: 'You have seen what the institution protects when it should not. You carry leverage and resentment in equal measure. Accord mistrusts your unilateralism.',
    color: 'border-purple-700 hover:border-purple-500',
    factionNote: 'Starts: Lantern +1, Accord −1',
  },
];

export function RoleSelectScreen({ onSelect }: RoleSelectProps) {
  const [selected, setSelected] = useState<Role | null>(null);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-stone-950 px-4">
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, #44403c 40px, #44403c 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #44403c 40px, #44403c 41px)',
        }}
      />

      <div className="relative z-10 w-full max-w-3xl">
        <div className="text-center mb-10">
          <p className="text-xs font-mono tracking-[0.4em] text-stone-500 uppercase mb-3">Select your operative</p>
          <h2 className="text-xl font-light tracking-widest text-stone-200 uppercase">Choose Your Role</h2>
          <p className="text-stone-500 text-xs mt-2 font-mono">Your role determines starting faction relationships and narrative framing</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
          {ROLES.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelected(role.id)}
              className={`text-left p-4 bg-stone-900 border rounded-sm transition-all duration-200 ${role.color} ${
                selected === role.id ? 'ring-1 ring-amber-500/50 bg-stone-800' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-stone-100 font-mono uppercase tracking-widest text-sm">{role.title}</h3>
                <span className="text-xs font-mono text-stone-500 ml-2 whitespace-nowrap">{role.factionNote}</span>
              </div>
              <p className="text-amber-400 text-xs font-light mb-2">{role.description}</p>
              <p className="text-stone-400 text-xs leading-relaxed">{role.detail}</p>
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
  );
}
