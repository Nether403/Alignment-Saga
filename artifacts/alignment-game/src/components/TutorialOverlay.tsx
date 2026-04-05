import { useState } from 'react';

const TUTORIAL_KEY = 'alignment_tutorial_seen_v1';

const STEPS = [
  {
    title: 'Stat Bars',
    body: 'These six bars track the state of the institution and the crisis. Trust, Oversight, and Capability are resources. Instability, Public Pressure, and Corruption are threats. Watch them shift after each choice.',
    anchor: 'stats',
    arrowDir: 'left' as const,
  },
  {
    title: 'Faction Standings',
    body: 'Five factions watch your every move. Each ranges from −2 (hostile) to +2 (allied). High standing unlocks choices. Low standing closes them. You cannot please everyone.',
    anchor: 'factions',
    arrowDir: 'left' as const,
  },
  {
    title: 'Evidence & Journal',
    body: 'Evidence is information you\'ve formally collected — it can unlock or block paths. Your Journal records significant choices. Alerts flag emerging threats. Check them often.',
    anchor: 'panels',
    arrowDir: 'left' as const,
  },
  {
    title: 'Consequences',
    body: 'After major choices, a consequence panel describes the immediate fallout. Read it carefully — it\'s not flavor text. It tells you what changed in the world. Then the story continues.',
    anchor: 'center',
    arrowDir: 'center' as const,
  },
];

interface TutorialOverlayProps {
  onComplete: () => void;
}

export function TutorialOverlay({ onComplete }: TutorialOverlayProps) {
  const [step, setStep] = useState(0);

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  const handleNext = () => {
    if (isLast) {
      try { localStorage.setItem(TUTORIAL_KEY, '1'); } catch {}
      onComplete();
    } else {
      setStep(s => s + 1);
    }
  };

  const handleSkip = () => {
    try { localStorage.setItem(TUTORIAL_KEY, '1'); } catch {}
    onComplete();
  };

  const getCardPosition = () => {
    switch (current.anchor) {
      case 'stats':
        return 'top-24 left-4 md:left-72 md:top-8';
      case 'factions':
        return 'top-48 left-4 md:left-72 md:top-44';
      case 'panels':
        return 'bottom-24 left-4 md:left-72 md:bottom-32';
      default:
        return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
    }
  };

  return (
    <div className="absolute inset-0 z-50 pointer-events-none">
      {/* Dim overlay */}
      <div className="absolute inset-0 bg-stone-950/70 pointer-events-auto" onClick={handleSkip} />

      {/* Tutorial card */}
      <div
        className={`absolute pointer-events-auto ${getCardPosition()}`}
        style={{ maxWidth: '280px' }}
      >
        <div className="bg-stone-900 border border-amber-700/60 rounded-sm shadow-2xl p-4">
          {/* Step indicator */}
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-mono tracking-[0.3em] text-amber-600 uppercase">
              Tutorial {step + 1}/{STEPS.length}
            </p>
            <button
              onClick={handleSkip}
              className="text-xs font-mono text-stone-600 hover:text-stone-400 transition-colors"
            >
              skip all
            </button>
          </div>

          <h3 className="text-stone-100 font-mono text-sm uppercase tracking-widest mb-2">
            {current.title}
          </h3>
          <p className="text-stone-400 text-xs leading-relaxed mb-4">
            {current.body}
          </p>

          {/* Progress dots */}
          <div className="flex items-center justify-between">
            <div className="flex gap-1.5">
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    i === step ? 'bg-amber-500' : i < step ? 'bg-amber-800' : 'bg-stone-700'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="px-4 py-1.5 border border-amber-700 text-amber-400 hover:bg-amber-400 hover:text-stone-950 font-mono text-xs uppercase tracking-widest transition-all duration-200"
            >
              {isLast ? 'Begin ›' : 'Next ›'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function shouldShowTutorial(): boolean {
  try {
    return !localStorage.getItem(TUTORIAL_KEY);
  } catch {
    return false;
  }
}
