import { useState, useEffect } from 'react';

interface TitleScreenProps {
  onStart: () => void;
  onNewGame: () => void;
  onHowToPlay: () => void;
  hasSave: boolean;
}

const INTRO_LINES = [
  { text: 'Year 2041.', delay: 400 },
  { text: 'The Meridian Institute for Advanced Systems has been running COVENANT-7 for eighteen months.', delay: 1200 },
  { text: 'Three days ago, a field office in the Eastern Corridor went silent.', delay: 2400 },
  { text: 'Two hours ago, internal review flagged an anomaly in the evaluation logs.', delay: 3600 },
  { text: 'One hour ago, the Director sent for you.', delay: 4600 },
];

export function TitleScreen({ onStart, onNewGame, onHowToPlay, hasSave }: TitleScreenProps) {
  const [phase, setPhase] = useState<'intro' | 'menu'>('intro');
  const [visibleLines, setVisibleLines] = useState<number>(0);

  useEffect(() => {
    if (phase !== 'intro') return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    INTRO_LINES.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisibleLines(i + 1);
      }, line.delay);
      timers.push(t);
    });

    const finalTimer = setTimeout(() => {
      setPhase('menu');
    }, INTRO_LINES[INTRO_LINES.length - 1].delay + 1800);
    timers.push(finalTimer);

    return () => timers.forEach(clearTimeout);
  }, [phase]);

  const handleSkip = () => {
    setVisibleLines(INTRO_LINES.length);
    setPhase('menu');
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[30s]"
        style={{
          backgroundImage: 'url(/title_screen.png)',
          transform: phase === 'menu' ? 'scale(1.04)' : 'scale(1)',
          filter: 'brightness(0.45)',
        }}
      />

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 3px)',
        }}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-stone-950/70" />

      {/* Intro text sequence */}
      {phase === 'intro' && (
        <div className="relative z-10 w-full max-w-lg px-8 text-center">
          <div className="flex flex-col gap-3 mb-8">
            {INTRO_LINES.map((line, i) => (
              <p
                key={i}
                className="text-stone-300 text-sm font-mono leading-relaxed transition-all duration-700"
                style={{
                  opacity: i < visibleLines ? 1 : 0,
                  transform: i < visibleLines ? 'translateY(0)' : 'translateY(8px)',
                }}
              >
                {line.text}
              </p>
            ))}
          </div>

          <button
            onClick={handleSkip}
            className="text-stone-600 hover:text-stone-400 text-xs font-mono transition-colors"
          >
            [skip intro]
          </button>
        </div>
      )}

      {/* Main menu — fades in after intro */}
      <div
        className="relative z-10 text-center px-8 max-w-2xl transition-all duration-1000"
        style={{
          opacity: phase === 'menu' ? 1 : 0,
          transform: phase === 'menu' ? 'translateY(0)' : 'translateY(16px)',
          pointerEvents: phase === 'menu' ? 'auto' : 'none',
        }}
      >
        <p className="text-xs font-mono tracking-[0.5em] text-stone-400 uppercase mb-4">
          A Text Adventure
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-wider text-stone-100 mb-2 leading-tight">
          AI ALIGNMENT
        </h1>
        <h2 className="text-2xl md:text-3xl font-light tracking-[0.3em] text-amber-400 mb-6 uppercase">
          The Crisis
        </h2>
        <p className="text-stone-400 text-sm leading-relaxed mb-10 font-light max-w-lg mx-auto">
          An institution at the edge. A system that learned too well.
          A player who must decide what to preserve and what to sacrifice.
        </p>

        <div className="flex flex-col items-center gap-3">
          <button
            onClick={onStart}
            className="px-10 py-3 border border-amber-600 text-amber-400 hover:bg-amber-400 hover:text-stone-950 font-mono text-xs uppercase tracking-[0.3em] transition-all duration-300 w-48"
          >
            {hasSave ? 'Continue' : 'Begin'}
          </button>

          {hasSave && (
            <button
              onClick={onNewGame}
              className="px-10 py-2 border border-stone-700 text-stone-500 hover:border-stone-500 hover:text-stone-300 font-mono text-xs uppercase tracking-[0.3em] transition-all duration-300 w-48"
            >
              New Game
            </button>
          )}

          <button
            onClick={onHowToPlay}
            className="px-10 py-2 border border-stone-700 text-stone-500 hover:border-stone-500 hover:text-stone-300 font-mono text-xs uppercase tracking-[0.3em] transition-all duration-300 w-48"
          >
            How to Play
          </button>
        </div>

        <p className="text-stone-700 text-xs mt-10 font-mono">
          Inspired by the work of Eliezer Yudkowsky and the broader AI safety research community
        </p>
      </div>
    </div>
  );
}
