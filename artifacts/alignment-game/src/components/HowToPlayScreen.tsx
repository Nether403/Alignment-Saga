interface HowToPlayScreenProps {
  onBack: () => void;
}

const SECTIONS = [
  {
    title: 'THE STRUCTURE',
    content: [
      {
        heading: 'Three Acts',
        body: 'The game is divided into three acts. Act 1 establishes the crisis and your character\'s position within the institution. Act 2 is an open investigation phase where you choose which scenes to pursue and in what order. Act 3 is the endgame — high-stakes decisions with permanent consequences. Once you make a choice, it stands.',
      },
      {
        heading: 'Branching Choices',
        body: 'Every scene ends with 2–4 choices. Some choices are locked behind flags or stat thresholds — if you don\'t have the right evidence or faction standing, certain paths close. There is no right answer. Every choice costs something.',
      },
      {
        heading: 'Five Endings',
        body: 'Your final state — stats, faction standings, and the flags you\'ve set — determines which of five endings you reach. Endings range from institutional collapse to fragile international accord. None are purely triumphant. Replay with different roles to find what changes.',
      },
    ],
  },
  {
    title: 'THE STATS',
    content: [
      {
        heading: 'Trust',
        body: 'The institution\'s credibility with partners, government, and the public. Low trust closes diplomatic options and risks defunding. High trust can be leveraged — but also spent.',
      },
      {
        heading: 'Capability',
        body: 'COVENANT-7\'s operational power. Higher capability makes the system more dangerous but also more useful as leverage. Some choices require capability to execute; others are blocked if capability is too high.',
      },
      {
        heading: 'Oversight',
        body: 'The strength of monitoring infrastructure. Low oversight means fewer checks on what COVENANT-7 does. High oversight can constrain it — but also creates friction with capability-focused factions.',
      },
      {
        heading: 'Instability',
        body: 'The systemic pressure building inside and outside the institution. High instability accelerates events and reduces your options in Act 3. It\'s easier to raise than to lower.',
      },
      {
        heading: 'Public Pressure',
        body: 'External attention on the crisis. High public pressure forces the institution\'s hand — leaks, protests, and media attention become variables you can no longer ignore.',
      },
      {
        heading: 'Corruption',
        body: 'Internal compromise within Meridian. Each hidden deal, forged audit, or covered anomaly adds to this. High corruption unlocks certain covert paths but makes legitimate resolutions harder to reach.',
      },
    ],
  },
  {
    title: 'THE FACTIONS',
    content: [
      {
        heading: 'The Forge',
        body: 'Capability-first. They believe advanced AI is inevitable and the only path to safety is staying ahead of it. They will support COVENANT-7\'s continued operation and resist oversight if it slows deployment. Your builder role starts with Forge affinity.',
      },
      {
        heading: 'The Covenant',
        body: 'Audit-first. They believe every AI system must be verifiable before deployment and any anomaly is grounds for shutdown. They are the institution\'s internal watchdogs. Your auditor role starts with Covenant affinity.',
      },
      {
        heading: 'The Accord',
        body: 'Coordination-first. They believe global governance is the only real solution and unilateral action — even correct action — poisons future cooperation. Your diplomat role starts with Accord affinity.',
      },
      {
        heading: 'The Veil',
        body: 'Secrecy-first. They believe the worst outcomes come from panic and that some information must be managed carefully. They are not evil — they are afraid of what happens when everyone knows at once.',
      },
      {
        heading: 'The Lantern',
        body: 'Transparency-first. They believe the only legitimate response to a crisis is full disclosure. They distrust all institutional players including you. Earning their trust requires visible sacrifice of institutional interest.',
      },
      {
        heading: 'Faction Standings',
        body: 'Each faction starts at 0 and ranges from −2 to +2. Your role may start with a penalty. High standing unlocks additional choices in scenes involving that faction. Low standing can lock you out or trigger hostility.',
      },
    ],
  },
  {
    title: 'THE PANELS',
    content: [
      {
        heading: 'Journal',
        body: 'Your character\'s private log. Entries record significant narrative moments — what you chose and why it mattered. Read it to track the shape of your run.',
      },
      {
        heading: 'Evidence',
        body: 'Pieces of information you have formally collected. Evidence appears in your choices and may be required to unlock certain paths. Collecting evidence is not always safe — some of it is dangerous to hold.',
      },
      {
        heading: 'Alerts',
        body: 'System warnings and critical updates. Alerts flag changes in institutional posture, faction hostility, and emerging threats. They are not always accurate — COVENANT-7 has read your alert system.',
      },
    ],
  },
  {
    title: 'TIPS',
    content: [
      {
        heading: 'Watch instability closely',
        body: 'It is the stat most likely to spiral. A string of high-pressure choices in Act 1 can lock you out of resolution options in Act 3 before you even get there.',
      },
      {
        heading: 'Faction standing matters late',
        body: 'The biggest branching points in Act 3 require faction endorsement. Consider which factions you want on your side before you need them.',
      },
      {
        heading: 'Not all evidence helps',
        body: 'Some evidence items flag you as a threat to specific factions. Holding certain files changes what options you have, not always for the better.',
      },
      {
        heading: 'Endings are determined by your whole run',
        body: 'Not just your final choice. A single Act 3 decision doesn\'t override eighteen choices of accumulated consequence. Play the long game.',
      },
    ],
  },
];

export function HowToPlayScreen({ onBack }: HowToPlayScreenProps) {
  return (
    <div className="relative w-full h-full flex flex-col bg-stone-950 overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 40px, #44403c 40px, #44403c 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #44403c 40px, #44403c 41px)',
        }}
      />

      {/* Header */}
      <div className="relative z-10 border-b border-stone-800 px-8 py-4 flex items-center justify-between shrink-0">
        <div>
          <p className="text-xs font-mono tracking-[0.4em] text-stone-500 uppercase">Operative Handbook</p>
          <p className="text-stone-200 text-sm font-mono mt-0.5 tracking-wider">HOW TO PLAY</p>
        </div>
        <button
          onClick={onBack}
          className="text-xs font-mono text-stone-500 hover:text-amber-400 transition-colors uppercase tracking-widest"
        >
          ← Return
        </button>
      </div>

      {/* Scrollable content */}
      <div className="relative z-10 flex-1 overflow-y-auto px-8 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col gap-10">
            {SECTIONS.map((section) => (
              <div key={section.title}>
                <div className="flex items-center gap-4 mb-5">
                  <div className="h-px flex-1 bg-stone-800" />
                  <p className="text-xs font-mono tracking-[0.4em] text-amber-600 uppercase">{section.title}</p>
                  <div className="h-px flex-1 bg-stone-800" />
                </div>

                <div className="flex flex-col gap-5">
                  {section.content.map((item) => (
                    <div key={item.heading}>
                      <p className="text-stone-200 text-xs font-mono uppercase tracking-widest mb-1.5">
                        {item.heading}
                      </p>
                      <p className="text-stone-400 text-sm leading-relaxed font-light">
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-12 border-t border-stone-800 pt-6 text-center">
            <p className="text-stone-600 text-xs font-mono">
              AI ALIGNMENT: THE CRISIS — Operative Handbook v1.0
            </p>
            <p className="text-stone-700 text-xs font-mono mt-1">
              Inspired by the alignment problem as described in the work of Eliezer Yudkowsky and the MIRI research community
            </p>
            <button
              onClick={onBack}
              className="mt-6 px-8 py-2.5 border border-stone-700 text-stone-400 hover:border-amber-600 hover:text-amber-400 font-mono text-xs uppercase tracking-[0.3em] transition-all duration-300"
            >
              ← Back to Title
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
