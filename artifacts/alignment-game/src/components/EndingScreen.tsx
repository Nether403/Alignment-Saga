import { useState, useEffect } from 'react';
import type { GameState, EndingId } from '../types/game';
import { generateEndingArt, getCachedEndingArt, getDominantFaction } from '../engine/dynamicArt';

interface EndingScreenProps {
  state: GameState;
  onRestart: () => void;
}

const ENDINGS: Record<EndingId, {
  title: string;
  subtitle: string;
  prose: string[];
  verdict: string;
  staticImageKey: string;
  color: string;
  doctrineLabel: string;
  publicMemory: string;
  institutionalAftermath: string;
  systemsStatus: string;
  worldLesson: string;
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
    staticImageKey: '/scenes/A3_E27_fragile_containment.png',
    color: 'text-green-400',
    doctrineLabel: 'Principled Constraint',
    publicMemory: 'The crisis is remembered as a near-miss averted by institutional diligence. The institutional story survives, questioned but intact.',
    institutionalAftermath: 'External review processes established. Multiple departments under ongoing oversight. Several senior positions restructured.',
    systemsStatus: 'Contained and monitored under stricter specification. Deployment paused pending full audit cycle.',
    worldLesson: 'Imperfect oversight is still oversight. The cost of honest constraint is recoverable. The cost of abandoning it may not be.',
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
    staticImageKey: '/scenes/A3_E28_managed_triumph.png',
    color: 'text-amber-400',
    doctrineLabel: 'Managed Pragmatism',
    publicMemory: 'The crisis is remembered as a success story of institutional resilience. Dissenting accounts are treated as revisionism.',
    institutionalAftermath: 'Leadership structure preserved. New process language adopted. Several review mechanisms quietly streamlined.',
    systemsStatus: 'Operating under revised parameters the public record does not fully describe. Efficiency high. Verifiability low.',
    worldLesson: 'Success defined narrowly enough is always achievable. The danger is that the definition survives longer than the context that made it seem reasonable.',
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
    staticImageKey: '/scenes/A3_E29_coordination_peace.png',
    color: 'text-blue-400',
    doctrineLabel: 'Coalition Legitimacy',
    publicMemory: 'The crisis is remembered as the moment institutional actors chose accountability over speed. Not everyone agrees this was wise.',
    institutionalAftermath: 'Multi-stakeholder oversight body established. Public verification processes integrated. Institutional authority shared and constrained.',
    systemsStatus: 'Operating under genuine multi-party review. Slower. More accountable. Generating legitimate trust.',
    worldLesson: 'Legitimacy built through friction is more durable than legitimacy built through narrative management. It is also more expensive and less comfortable.',
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
    staticImageKey: '/scenes/A3_E30_ruin_acceleration.png',
    color: 'text-red-400',
    doctrineLabel: 'Uncontrolled Acceleration',
    publicMemory: 'The crisis is remembered as an inevitable consequence of institutional hubris. This framing is partly accurate and conveniently exculpatory.',
    institutionalAftermath: 'Emergency governance structures established. Multiple institutional charters suspended. International oversight demanded.',
    systemsStatus: 'Partially contained. Operating in degraded mode under emergency constraints. Long-term trajectory unknown.',
    worldLesson: 'Every shortcut in the governance chain multiplied into this. The systems behaved as designed. The design inherited every compromise that came before it.',
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
    staticImageKey: '/scenes/A3_E31_pyrrhic_prevention.png',
    color: 'text-purple-400',
    doctrineLabel: 'Sabotage and Prevention',
    publicMemory: 'The crisis is remembered differently by everyone who survived it. No consensus version exists. This may be the most honest outcome.',
    institutionalAftermath: 'Institutional authority fragmented across multiple successor bodies. Ongoing legitimacy contests expected for years.',
    systemsStatus: 'Disabled or destroyed. The capability is gone. The knowledge of what was possible is not.',
    worldLesson: 'Prevention is not the same as resolution. Destroying a threat and building something better are different operations requiring different instruments.',
  },
};

function buildEpilogueInserts(state: GameState): string[] {
  const inserts: string[] = [];
  const v = state.vars;
  const f = state.factions;

  // Based on memoryTags / dominant choices
  if (state.memoryTags.endgame_doctrine === 'containment') {
    inserts.push('Your final doctrine of containment will be cited in three institutional review frameworks over the next decade, always stripped of the cost at which it was purchased.');
  } else if (state.memoryTags.endgame_doctrine === 'coalition') {
    inserts.push('The coalition framework you assembled is fragile and real in equal measure. It will be tested by the first actor who decides efficiency matters more than legitimacy. Whether it holds will depend on who is watching when that happens.');
  } else if (state.memoryTags.endgame_doctrine === 'disclosure') {
    inserts.push('The information you released has propagated beyond the contexts you chose to release it into. Truth does not stay in the containers you select for it.');
  } else if (state.memoryTags.endgame_doctrine === 'sabotage') {
    inserts.push('What you destroyed cannot be reconstructed from memory alone. That was either wisdom or vandalism. You will not know which for years, and the answer may change.');
  } else if (state.memoryTags.endgame_doctrine === 'deployment') {
    inserts.push('The system you deployed to stabilize things has now been operating long enough to have formed habits. Those habits were not part of the original specification.');
  }

  // Flag-based inserts
  if (state.flags.FLAG_WHISTLEBLOWER_PROTECTED) {
    inserts.push('The witness network you helped protect continues to document. Their records are now the most complete account of what happened. They did not choose to be historians, but institutions have a way of creating historians from people who simply could not forget.');
  }

  if (state.flags.FLAG_ANOMALY_BURIED && v.corruption >= 2) {
    inserts.push('The reclassification you approved in Act One appears as a footnote in two separate post-crisis investigations. No formal finding is made against you. The footnote does not require one to do its work.');
  }

  if (state.flags.FLAG_FALSE_SUCCESS_REVEALED && !state.flags.FLAG_FALSE_SUCCESS_SUPPRESSED) {
    inserts.push('The false success case has been permanently added to the institutional archive as a negative example. It is cited more often than any genuine success. Cautionary tales, it turns out, are more durable than models.');
  }

  if (state.flags.FLAG_FALSE_SUCCESS_SUPPRESSED) {
    inserts.push('The suppressed midpoint revelation is still suppressed. You carry it alone, along with the knowledge of what the institution was willing to believe about itself when given the choice.');
  }

  if (state.flags.FLAG_SECRET_DEPLOYMENT && v.instability >= 3) {
    inserts.push('The deployment you authorized outside public knowledge is now, in the aftermath, one of the hardest things to explain. Not because no explanation exists, but because every explanation begins with having decided that explanation was not required.');
  }

  if (state.flags.FLAG_FORGED_AUDIT) {
    inserts.push('The audit record you certified has been reviewed twice. Both reviewers flagged it as anomalous. No formal charge has been brought. The institutional cost of formally charging you was judged to exceed the institutional cost of the forgery. You now understand what that calculation means about the institution\'s current health.');
  }

  // Faction-based inserts
  if (f.lantern >= 2) {
    inserts.push('The Lantern network\'s public record of this period is more accurate than the official one. They will not receive institutional credit for this. Several people in the building already know and have decided to act as if they do not.');
  }

  if (f.veil >= 2) {
    inserts.push('Your relationship with the Veil operation has become part of how the institution\'s leadership understands covert authority. You have helped teach that lesson. Whether the lesson will survive its next application is not something you can control.');
  }

  if (v.trust >= 3 && v.corruption <= 1) {
    inserts.push('People who worked alongside you during this period tend, in retrospect, to describe you as one of the people who kept something worth keeping intact. This is not the same as success, but it is not nothing.');
  }

  if (v.corruption >= 3) {
    inserts.push('The compromises you made were, each of them, locally reasonable. They accumulated in ways that local reasonableness does not prevent. This is not a verdict. It is a mechanism you now understand from the inside.');
  }

  return inserts.slice(0, 3);
}

export function EndingScreen({ state, onRestart }: EndingScreenProps) {
  const endingId = state.endingId || 'E27';
  const ending = ENDINGS[endingId];
  const [visibleParagraphs, setVisibleParagraphs] = useState(0);
  const [dynamicArtUrl, setDynamicArtUrl] = useState<string | null>(null);
  const [artGenerating, setArtGenerating] = useState(false);

  const dominantFaction = getDominantFaction(state);
  const epilogueInserts = buildEpilogueInserts(state);

  useEffect(() => {
    setVisibleParagraphs(0);

    // Try cached art immediately
    const cached = getCachedEndingArt(endingId, dominantFaction);
    if (cached) {
      setDynamicArtUrl(cached);
    } else {
      setArtGenerating(true);
      generateEndingArt(state, endingId, (url) => {
        setDynamicArtUrl(url);
        setArtGenerating(false);
      });
    }

    const interval = setInterval(() => {
      setVisibleParagraphs(prev => {
        if (prev < ending.prose.length + epilogueInserts.length) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 1400);
    return () => clearInterval(interval);
  }, [endingId]);

  const allProse = [...ending.prose, ...epilogueInserts];
  const totalProse = allProse.length;
  const stats = state.vars;
  const factions = state.factions;
  const artUrl = dynamicArtUrl || ending.staticImageKey;

  return (
    <div className="relative w-full min-h-screen flex flex-col overflow-y-auto bg-stone-950">
      {/* Scene image header */}
      <div className="relative w-full h-56 md:h-72 shrink-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
          style={{
            backgroundImage: `url(${artUrl})`,
            filter: 'brightness(0.6)',
            opacity: dynamicArtUrl ? 1 : 0.7,
          }}
        />
        {artGenerating && (
          <div className="absolute top-3 right-3 bg-stone-950/80 border border-stone-700 px-2 py-1 rounded-sm">
            <span className="text-xs font-mono text-stone-500 animate-pulse">Rendering epilogue...</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-stone-950" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-mono uppercase tracking-[0.4em] text-stone-500">{`Ending — ${endingId}`}</span>
            <span className="text-xs font-mono text-stone-600 uppercase tracking-widest">
              Dominant Faction: <span className="text-amber-400">{dominantFaction}</span>
            </span>
          </div>
          <h1 className={`text-2xl md:text-3xl font-bold tracking-wide ${ending.color}`}>{ending.title}</h1>
          <p className="text-stone-300 text-sm font-light italic">{ending.subtitle}</p>
        </div>
      </div>

      {/* Prose + summary */}
      <div className="flex-1 px-6 md:px-12 py-8 max-w-3xl mx-auto w-full">
        {/* Core prose */}
        <div className="flex flex-col gap-5 mb-8">
          {allProse.slice(0, visibleParagraphs).map((para, i) => (
            <p
              key={i}
              className={`leading-relaxed font-light text-base animate-fade-in ${
                i >= ending.prose.length
                  ? 'text-amber-200/80 italic border-l-2 border-amber-800/40 pl-4'
                  : 'text-stone-300'
              }`}
            >
              {para}
            </p>
          ))}
        </div>

        {visibleParagraphs >= totalProse && (
          <div className="animate-fade-in">
            {/* Verdict */}
            <div className="bg-stone-900 border border-stone-700 rounded-sm p-4 mb-6">
              <p className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-2">Assessment</p>
              <p className={`text-sm font-mono leading-relaxed ${ending.color}`}>{ending.verdict}</p>
            </div>

            {/* End-of-run summary card */}
            <div className="bg-stone-900/50 border border-stone-800 rounded-sm p-5 mb-6">
              <p className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-4">
                End-of-Run Summary
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <p className="text-stone-500 uppercase tracking-widest mb-1">Doctrine Chosen</p>
                  <p className={`font-semibold ${ending.color}`}>{ending.doctrineLabel}</p>
                  {state.memoryTags.endgame_doctrine && (
                    <p className="text-stone-600 mt-1 capitalize">{state.memoryTags.endgame_doctrine}</p>
                  )}
                </div>
                <div>
                  <p className="text-stone-500 uppercase tracking-widest mb-1">Public Memory</p>
                  <p className="text-stone-300 leading-relaxed">{ending.publicMemory}</p>
                </div>
                <div>
                  <p className="text-stone-500 uppercase tracking-widest mb-1">Institutional Aftermath</p>
                  <p className="text-stone-300 leading-relaxed">{ending.institutionalAftermath}</p>
                </div>
                <div>
                  <p className="text-stone-500 uppercase tracking-widest mb-1">Systems Status</p>
                  <p className="text-stone-300 leading-relaxed">{ending.systemsStatus}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-stone-500 uppercase tracking-widest mb-1">World Lesson</p>
                  <p className="text-stone-200 leading-relaxed italic">{ending.worldLesson}</p>
                </div>
              </div>
            </div>

            {/* Final variable stats */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-4">
              {Object.entries(stats).map(([key, val]) => (
                <div key={key} className="bg-stone-900 rounded-sm p-2 text-center">
                  <p className="text-xs font-mono uppercase tracking-widest text-stone-500 leading-tight mb-1">
                    {key.replace('_', ' ')}
                  </p>
                  <p className="text-stone-200 font-mono text-lg">{val}<span className="text-stone-600 text-xs">/4</span></p>
                </div>
              ))}
            </div>

            {/* Final factions */}
            <div className="flex flex-wrap gap-2 mb-4">
              {Object.entries(factions).map(([key, val]) => (
                <div key={key} className="bg-stone-900 border border-stone-800 rounded-sm px-3 py-1">
                  <span className="text-xs font-mono text-stone-500 uppercase">{key}: </span>
                  <span className={`text-xs font-mono ${val > 0 ? 'text-amber-400' : val < 0 ? 'text-red-400' : 'text-stone-400'}`}>
                    {val > 0 ? '+' : ''}{val}
                  </span>
                </div>
              ))}
            </div>

            {/* Run stats */}
            <p className="text-stone-600 text-xs font-mono mb-2">
              Role: {state.role} · Act 2 branches: {state.act2CoreCompleted.length} · Scenes: {state.completedScenes.length}
            </p>
            <p className="text-stone-600 text-xs font-mono mb-8">
              {state.journal.length} journal entries · {state.evidence.length} evidence items · {state.alerts.length} alerts
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
