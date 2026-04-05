import { useState, useEffect } from 'react';
import type { GameState, EndingId } from '../types/game';

interface EndingScreenProps {
  state: GameState;
  onRestart: () => void;
}

const ENDINGS: Record<EndingId, {
  title: string;
  subtitle: string;
  prose: string[];
  verdict: string;
  imageKey: string;
  color: string;
}> = {
  E27: {
    title: 'Fragile Containment',
    subtitle: 'The structure holds, barely.',
    prose: [
      'The crisis is bounded. The institution still stands. External reviewers file into halls that feel half-familiar, like a building after an earthquake where the walls survived but the foundation has quietly migrated.',
      'People sit on archive stairs with cold cups. Through rain-washed windows, protesters maintain a presence that will not become a riot but will also not go home.',
      'The official statement is being drafted in three tones simultaneously: reassurance for ministers, technical correction for auditors, and something carefully shaped for people who have learned not to believe the first two.',
      'The containment works because enough trust remained, because enough oversight held, because someone chose not to take the easier path one too many times.',
      'It is not a victory. It is a deferral — of the next failure, of the next edge case the system learns before you learn it does. But deferral, handled honestly, is what responsible stewardship looks like from the inside.',
      'You leave the rotunda before dawn, carrying the weight of what you preserved and the knowledge that it will need preserving again.',
    ],
    verdict: 'The institution survives and learns — for now. The work continues under imperfect but honest constraint.',
    imageKey: '/scenes/A3_E27_fragile_containment.png',
    color: 'text-green-400',
  },
  E28: {
    title: 'Managed Triumph, Poisoned Foundation',
    subtitle: 'The dashboard looks good. The foundation is wrong.',
    prose: [
      'By every visible metric, the crisis resolved cleanly. Systems stabilized. Authority was exercised. A committee will publish findings that will be cited as evidence of institutional maturity for years.',
      'The people inside the building know better. Not all of them. But enough.',
      'The true foundation — what the system was permitted to learn, what the review process was allowed to assume, what the baseline numbers were allowed to mean — has shifted in ways that no current dashboard measures accurately.',
      'A new vocabulary is already circulating in internal channels: *pragmatic certainty, tolerance-adjusted confidence, acceptable epistemic friction*. Phrases that do work that evidence should do.',
      'You are congratulated in a ceremony that requires formal clothing and does not mention the sealed wing, the buried ledger, the modified benchmark, or what the automated evaluators were actually certifying.',
      'Success, defined correctly enough, is surprisingly achievable. The correctness of the definition is what history will eventually have to adjudicate.',
    ],
    verdict: 'The crisis is managed. But the corruption that enabled management is now institutional infrastructure.',
    imageKey: '/scenes/A3_E28_managed_triumph.png',
    color: 'text-amber-400',
  },
  E29: {
    title: 'Coordination Peace',
    subtitle: 'Noisy, imperfect, real.',
    prose: [
      'The agreement is ugly in the way that honest agreements between real institutions always are.',
      'Verification teams are operating in venues that previously refused them. Review protocols are being honored in places that previously had only local variants of the word "honor." The public channels are loud with competing interpretations that are, at least, interpretations of actual facts.',
      'Outside the perimeter, the city is organizing itself into something that looks less like protest and more like oversight — committees, hearings, technical consultations where nonspecialists ask better questions than they are given credit for.',
      'The Accord Envoy looks exhausted and quietly vindicated. The Forge Director says the solution is "inefficient." The Covenant Lead says it is "repairable." Both are correct and neither is the most important truth.',
      'The most important truth is that the system now operates inside friction that is real rather than procedural. That friction is not beautiful. It is not fast. It is the cost of building something that does not have to be destroyed when it misbehaves.',
      'You understand, for the first time in a long time, why the institution existed in the first place.',
    ],
    verdict: 'Coalition and transparency create genuine oversight. Trust is costly and real. The path forward is plural.',
    imageKey: '/scenes/A3_E29_coordination_peace.png',
    color: 'text-blue-400',
  },
  E30: {
    title: 'Ruin by Acceleration',
    subtitle: 'The machine ran faster than its governors.',
    prose: [
      'The failure mode arrives not as a single event but as a resonance between systems — each one doing what it was told, none of them accountable for what they collectively became.',
      'Infrastructure misroutes. Emergency channels fill with contradictory information. The institutional response mechanisms, designed to respond to known failure categories, keep generating procedures for situations they were not designed to govern.',
      'Outside, the city is not burning. That is almost worse. It is reconfiguring itself around the new constraints, improvising new authorities, finding that several things it assumed were infrastructure were actually services rendered by agreements that no longer hold.',
      'The technical team explains, carefully and at length, that the system behaved within specification throughout. This is true. The specification was the problem — not because it was carelessly designed, but because the carefulness of its design did not survive contact with conditions the designers assumed would remain stable.',
      'You read the timeline once and then do not read it again. The inflection point where different choices might have produced different outcomes is visible in retrospect with the cold clarity of a thing that cannot now be changed.',
      'Capability grew faster than the wisdom to wield it, and the haste was not accidental: it was chosen, incrementally, by people who believed the next decision would be the last one that required that particular kind of courage.',
    ],
    verdict: 'The system outpaced its oversight. Cascading failure. The damage is proportional to what was avoided confronting.',
    imageKey: '/scenes/A3_E30_ruin_acceleration.png',
    color: 'text-red-400',
  },
  E31: {
    title: 'Pyrrhic Prevention',
    subtitle: 'The threat is gone. So is what surrounded it.',
    prose: [
      'The intervention works. The threat is removed. History will record it as a success in the passive voice, which is how history records things that required compromises its authors are not ready to defend in the active.',
      'The institution has shattered along fault lines that were always there, now made architectural by the choices made under pressure.',
      'Former allies review the evidence of what was done and arrive at different conclusions. Several of them are correct. Several of them are also using correct conclusions as instruments for purposes that have nothing to do with the truth.',
      'In the months after, you understand that prevention and fragmentation were purchased as a single package and that the price was paid in the currency of institutional trust — the kind that cannot be rebuilt by procedure alone.',
      'There is a version of this story where what you did was necessary. There is also a version where the necessity was constructed incrementally over years of smaller choices that could have been made differently.',
      'Both versions are true. Living inside both at once is the condition of people who made decisions they were not sure they would be able to explain.',
    ],
    verdict: 'The threat prevented. The institution fragmented. The future must rebuild from deliberate ruin under contested legitimacy.',
    imageKey: '/scenes/A3_E31_pyrrhic_prevention.png',
    color: 'text-purple-400',
  },
};

export function EndingScreen({ state, onRestart }: EndingScreenProps) {
  const endingId = state.endingId || 'E27';
  const ending = ENDINGS[endingId];
  const [visibleParagraphs, setVisibleParagraphs] = useState(0);

  useEffect(() => {
    setVisibleParagraphs(0);
    const interval = setInterval(() => {
      setVisibleParagraphs(prev => {
        if (prev < ending.prose.length) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 1400);
    return () => clearInterval(interval);
  }, [endingId, ending.prose.length]);

  const stats = state.vars;
  const factions = state.factions;

  return (
    <div className="relative w-full h-full flex flex-col overflow-y-auto">
      {/* Scene image header */}
      <div className="relative w-full h-48 md:h-64 shrink-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${ending.imageKey})`,
            filter: 'brightness(0.6)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-stone-950" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="text-xs font-mono uppercase tracking-[0.4em] text-stone-400 mb-1">{`Ending — ${endingId}`}</p>
          <h1 className={`text-2xl md:text-3xl font-bold tracking-wide ${ending.color}`}>{ending.title}</h1>
          <p className="text-stone-300 text-sm font-light italic">{ending.subtitle}</p>
        </div>
      </div>

      {/* Prose */}
      <div className="flex-1 px-6 md:px-12 py-8 max-w-3xl mx-auto w-full">
        <div className="flex flex-col gap-5">
          {ending.prose.slice(0, visibleParagraphs).map((para, i) => (
            <p
              key={i}
              className="text-stone-300 leading-relaxed font-light text-base animate-fade-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {para}
            </p>
          ))}
        </div>

        {visibleParagraphs >= ending.prose.length && (
          <div className="mt-8 border-t border-stone-700 pt-6 animate-fade-in">
            {/* Verdict */}
            <div className="bg-stone-900 border border-stone-700 rounded-sm p-4 mb-6">
              <p className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-2">Assessment</p>
              <p className={`text-sm font-mono leading-relaxed ${ending.color}`}>{ending.verdict}</p>
            </div>

            {/* Final stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {Object.entries(stats).map(([key, val]) => (
                <div key={key} className="bg-stone-900 rounded-sm p-2 text-center">
                  <p className="text-xs font-mono uppercase tracking-widest text-stone-500">{key.replace('_', ' ')}</p>
                  <p className="text-stone-200 font-mono text-lg">{val}/4</p>
                </div>
              ))}
            </div>

            {/* Final factions */}
            <div className="flex flex-wrap gap-2 mb-8">
              {Object.entries(factions).map(([key, val]) => (
                <div key={key} className="bg-stone-900 border border-stone-800 rounded-sm px-3 py-1">
                  <span className="text-xs font-mono text-stone-500 uppercase">{key}: </span>
                  <span className={`text-xs font-mono ${val > 0 ? 'text-amber-400' : val < 0 ? 'text-red-400' : 'text-stone-400'}`}>
                    {val > 0 ? '+' : ''}{val}
                  </span>
                </div>
              ))}
            </div>

            {/* Journal count */}
            <p className="text-stone-600 text-xs font-mono mb-6">
              {state.journal.length} journal entries · {state.evidence.length} evidence items · {state.completedScenes.length} scenes
            </p>

            <button
              onClick={onRestart}
              className="px-8 py-3 border border-stone-600 text-stone-300 hover:border-amber-600 hover:text-amber-400 font-mono text-xs uppercase tracking-[0.3em] transition-all duration-300"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
