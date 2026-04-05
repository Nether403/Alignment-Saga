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

const FACTION_QUOTES: Record<string, string> = {
  forge: '"The only safe AI is a capable one. Everything else is waiting to lose."',
  covenant: '"If you cannot verify it, you cannot trust it. That is the whole of our doctrine."',
  accord: '"Unilateral action, even correct action, corrodes the cooperation we will need when we are wrong."',
  veil: '"The worst outcomes come from panic. Some information must be managed."',
  lantern: '"Disclosure is not a preference. It is the only thing that makes accountability possible."',
};

const ROLES: {
  id: Role;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  playstyle: string;
  playstyleBadgeColor: string;
  faces: string;
  color: string;
  borderColor: string;
  factionNote: string;
  affinityFaction: string;
  affinityLabel: string;
}[] = [
  {
    id: 'builder',
    title: 'The Builder',
    tagline: 'Technical optimist inside the machine',
    description: 'You believe capability is the path to safety. You move fast. You occasionally build faster than you can understand.',
    longDescription: 'You\'ve spent your career inside COVENANT-7\'s architecture. You know its capabilities better than almost anyone — and that makes you both the most valuable person in the room and the most compromised. Your choices will favor technical solutions over political ones. You start with reduced Lantern standing because they see institutional players as part of the problem.',
    playstyle: 'Technical / Optimistic',
    playstyleBadgeColor: 'text-orange-400 border-orange-800 bg-orange-950/40',
    faces: 'You\'ll face: capability tradeoffs, specification debates, and moments where the elegant technical solution is also the most dangerous one.',
    color: 'text-orange-300',
    borderColor: 'border-orange-800 hover:border-orange-500',
    factionNote: 'Starts: Lantern −1',
    affinityFaction: 'forge',
    affinityLabel: 'Forge',
  },
  {
    id: 'auditor',
    title: 'The Auditor',
    tagline: 'Oversight specialist looking for what breaks',
    description: 'You were trained to find the gaps between intent and specification. You see them everywhere now.',
    longDescription: 'Your instinct is to look at what the system is actually doing, not what the reports say it\'s doing. You\'re trained in evaluation methodology and have reviewed three previous COVENANT iterations. You know evaluation can be gamed — that\'s practically why you exist. You start with reduced Lantern standing because watchdog groups distrust institutional oversight programs.',
    playstyle: 'Strategic / Analytical',
    playstyleBadgeColor: 'text-green-400 border-green-800 bg-green-950/40',
    faces: 'You\'ll face: metric manipulation, forged audits, and the question of what to do when the oversight system is itself the problem.',
    color: 'text-green-300',
    borderColor: 'border-green-800 hover:border-green-500',
    factionNote: 'Starts: Lantern −1',
    affinityFaction: 'covenant',
    affinityLabel: 'Covenant',
  },
  {
    id: 'diplomat',
    title: 'The Diplomat',
    tagline: 'Coordination architect and bridge-builder',
    description: 'You believe the only path forward runs through everyone simultaneously. You are perpetually negotiating.',
    longDescription: 'You\'ve brokered three international AI governance frameworks and watched two of them collapse. You understand that the alignment problem is not just technical — it\'s political, relational, and deeply human. You believe in building coalitions that hold even when they\'re inconvenient. You start with reduced Veil standing because they see your transparency agenda as naive.',
    playstyle: 'Social / Collaborative',
    playstyleBadgeColor: 'text-blue-400 border-blue-800 bg-blue-950/40',
    faces: 'You\'ll face: coordination failures, defection temptations, and moments where the right answer requires everyone to agree at once.',
    color: 'text-blue-300',
    borderColor: 'border-blue-800 hover:border-blue-500',
    factionNote: 'Starts: Veil −1',
    affinityFaction: 'accord',
    affinityLabel: 'Accord',
  },
  {
    id: 'defector',
    title: 'The Defector',
    tagline: 'Former insider who crossed a line',
    description: 'You have seen what the institution protects when it should not. You carry leverage and resentment in equal measure.',
    longDescription: 'You used to work for a consortium partner. You left when you found out what they were covering up. You brought evidence. You brought contacts. You brought enemies. The institution brought you back in because you know where the bodies are buried — but they\'re watching you. You start with Lantern affinity because they trust people who burned their boats, and Accord penalty because they distrust unilateral actors.',
    playstyle: 'Moral / Uncompromising',
    playstyleBadgeColor: 'text-purple-400 border-purple-800 bg-purple-950/40',
    faces: 'You\'ll face: questions of loyalty, the limits of righteous unilateralism, and whether exposing the truth is worth the cost to everyone else.',
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
  const factionQuote = previewFaction ? FACTION_QUOTES[previewFaction] : null;

  return (
    <div className="relative w-full h-full flex overflow-hidden bg-stone-950">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]"
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
                filter: 'brightness(0.65)',
                backgroundPosition: 'center top',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
              {factionQuote && (
                <p className="text-stone-300 text-xs font-light italic leading-relaxed mb-3 opacity-90">
                  {factionQuote}
                </p>
              )}
              <p className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-1">Primary Affinity</p>
              <p className={`text-sm font-mono uppercase tracking-widest ${selectedRole?.color || 'text-stone-200'}`}>
                {ROLES.find(r => r.affinityFaction === previewFaction)?.affinityLabel || previewFaction}
              </p>
            </div>
          </>
        ) : (
          <div className="text-center p-8">
            <p className="text-stone-600 text-xs font-mono uppercase tracking-widest mb-6">
              Select a role to see your primary faction affinity
            </p>
            <div className="flex flex-col gap-3">
              {Object.entries(FACTION_PORTRAITS).map(([key, url]) => (
                <div
                  key={key}
                  className="flex items-center gap-2 opacity-30 hover:opacity-60 transition-opacity cursor-pointer"
                  onMouseEnter={() => setHoveredFaction(key)}
                  onMouseLeave={() => setHoveredFaction(null)}
                >
                  <div
                    className="w-8 h-8 rounded-full bg-cover bg-center border border-stone-700 shrink-0"
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
          <div className="text-center mb-6">
            <p className="text-xs font-mono tracking-[0.4em] text-stone-500 uppercase mb-3">Select your operative</p>
            <h2 className="text-xl font-light tracking-widest text-stone-200 uppercase">Choose Your Role</h2>
            <p className="text-stone-500 text-xs mt-2 font-mono">
              Your role determines starting faction relationships and narrative framing
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2 mb-6">
            {ROLES.map((role) => {
              const isSelected = selected === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => setSelected(role.id)}
                  onMouseEnter={() => setHoveredFaction(role.affinityFaction)}
                  onMouseLeave={() => setHoveredFaction(null)}
                  className={`text-left p-4 bg-stone-900 border rounded-sm transition-all duration-200 ${role.borderColor} ${
                    isSelected ? 'ring-1 ring-amber-500/50 bg-stone-800' : ''
                  }`}
                >
                  {/* Top row */}
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-full bg-cover bg-center border border-stone-700 shrink-0"
                        style={{ backgroundImage: `url(${FACTION_PORTRAITS[role.affinityFaction]})` }}
                      />
                      <div>
                        <h3 className={`font-mono uppercase tracking-widest text-sm ${role.color}`}>{role.title}</h3>
                        <p className="text-stone-500 text-xs font-light italic">{role.tagline}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 ml-2 shrink-0">
                      <span className={`text-xs font-mono border rounded-sm px-1.5 py-0.5 tracking-wider uppercase ${role.playstyleBadgeColor}`}>
                        {role.playstyle}
                      </span>
                      <span className="text-xs font-mono text-stone-500">{role.factionNote}</span>
                    </div>
                  </div>

                  {/* Short description always visible */}
                  <p className="text-stone-400 text-xs leading-relaxed ml-10 mb-2">{role.description}</p>

                  {/* Expanded content on select */}
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      maxHeight: isSelected ? '200px' : '0px',
                      opacity: isSelected ? 1 : 0,
                    }}
                  >
                    <div className="ml-10 pt-2 border-t border-stone-700/50 mt-1">
                      <p className="text-stone-300 text-xs leading-relaxed mb-2">{role.longDescription}</p>
                      <p className={`text-xs font-light italic ${role.color} opacity-80`}>{role.faces}</p>
                    </div>
                  </div>
                </button>
              );
            })}
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
