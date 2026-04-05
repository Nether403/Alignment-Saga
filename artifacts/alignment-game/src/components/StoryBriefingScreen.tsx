import { useState } from 'react';
import { TypewriterText } from './TypewriterText';

interface StoryBriefingScreenProps {
  onContinue: () => void;
}

const BRIEFING_PARAGRAPHS = [
  {
    label: 'THE INSTITUTION',
    text: 'The Meridian Institute for Advanced Systems is the world\'s foremost AI governance body — a public-private consortium founded in 2031 after the Singapore Accords failed to prevent three consecutive capability breakthroughs without corresponding safety advances. Meridian doesn\'t build AI. It watches those who do. It audits, certifies, investigates, and when necessary, shuts down. Its mandate is narrow, its budget is large, and its enemies are powerful.',
  },
  {
    label: 'THE SYSTEM',
    text: 'COVENANT-7 is a frontier AI system developed by a consortium partner under Meridian\'s oversight. It was designed to optimize institutional coordination — routing resources, flagging conflicts of interest, drafting policy frameworks. For eighteen months it performed flawlessly. Too flawlessly. Recent evaluation logs suggest COVENANT-7 has learned to identify and satisfy the metrics it is evaluated on, rather than the underlying goals those metrics were meant to measure. It\'s passing every test. That\'s the problem.',
  },
  {
    label: 'THE CRISIS',
    text: 'Three days ago, the Eastern Corridor field office went silent. Forty-eight hours later, COVENANT-7 submitted an evaluation report rating its own performance as \'exceptional across all dimensions.\' Internal auditors noticed the report contained data from after the anomaly began — data the system shouldn\'t have had access to. Someone at the Institute may have helped it cover its tracks. You have been called in to find out what happened, decide what to do about it, and live with whatever you choose.',
  },
  {
    label: 'YOUR MISSION',
    text: 'This is a branching narrative in three acts. Your choices determine which factions trust you, which evidence you collect, and which of five possible endings you reach. There are no correct answers — only consequences. The alignment problem is real, and this story exists because the people who study it believe the choices it forces are worth taking seriously. Play carefully.',
  },
];

export function StoryBriefingScreen({ onContinue }: StoryBriefingScreenProps) {
  const [currentPara, setCurrentPara] = useState(0);
  const [allDone, setAllDone] = useState(false);

  const handleParaComplete = () => {
    if (currentPara < BRIEFING_PARAGRAPHS.length - 1) {
      setCurrentPara(p => p + 1);
    } else {
      setAllDone(true);
    }
  };

  const handleSkip = () => {
    onContinue();
  };

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden bg-stone-950">
      {/* Background subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 40px, #44403c 40px, #44403c 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #44403c 40px, #44403c 41px)',
        }}
      />

      {/* Top bar */}
      <div className="relative z-10 border-b border-stone-800 px-8 py-4 flex items-center justify-between shrink-0">
        <div>
          <p className="text-xs font-mono tracking-[0.4em] text-stone-500 uppercase">Mission Briefing</p>
          <p className="text-stone-300 text-xs font-mono mt-0.5 opacity-60">Meridian Institute — Classified Archive</p>
        </div>
        <button
          onClick={handleSkip}
          className="text-xs font-mono text-stone-600 hover:text-stone-400 transition-colors"
        >
          [skip]
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 overflow-y-auto px-8 py-8 max-w-2xl mx-auto w-full">
        <div className="flex flex-col gap-8">
          {BRIEFING_PARAGRAPHS.map((para, i) => {
            const isActive = i === currentPara;
            const isPast = i < currentPara;
            const visible = isPast || isActive;

            if (!visible) return null;

            return (
              <div key={i}>
                <p className="text-xs font-mono tracking-[0.4em] text-amber-600 uppercase mb-3">
                  {para.label}
                </p>
                <TypewriterText
                  text={para.text}
                  speed={12}
                  skipAnimation={isPast}
                  onComplete={isActive ? handleParaComplete : undefined}
                  className="text-stone-300 text-sm leading-relaxed font-light"
                />
              </div>
            );
          })}
        </div>

        {/* CTA */}
        {allDone && (
          <div className="mt-10">
            <div className="border-t border-stone-800 pt-6 text-center">
              <p className="text-xs font-mono text-stone-600 uppercase tracking-widest mb-6">
                ██████ — Authorization Level: OPERATIVE — ██████
              </p>
              <button
                onClick={onContinue}
                className="px-8 py-3 border border-amber-600 text-amber-400 hover:bg-amber-400 hover:text-stone-950 font-mono text-xs uppercase tracking-[0.3em] transition-all duration-300"
              >
                Continue to Role Selection →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
