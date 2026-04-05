import { useState } from 'react';

interface TitleScreenProps {
  onStart: () => void;
}

export function TitleScreen({ onStart }: TitleScreenProps) {
  const [hover, setHover] = useState(false);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s]"
        style={{
          backgroundImage: 'url(/title_screen.png)',
          transform: hover ? 'scale(1.03)' : 'scale(1)',
          filter: 'brightness(0.5)',
        }}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/60" />

      {/* Content */}
      <div className="relative z-10 text-center px-8 max-w-2xl">
        <p className="text-xs font-mono tracking-[0.5em] text-stone-400 uppercase mb-6">
          A Text Adventure
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-wider text-stone-100 mb-2 leading-tight">
          AI ALIGNMENT
        </h1>
        <h2 className="text-2xl md:text-3xl font-light tracking-[0.3em] text-amber-400 mb-8 uppercase">
          The Crisis
        </h2>
        <p className="text-stone-400 text-sm leading-relaxed mb-12 font-light max-w-lg mx-auto">
          An institution at the edge. A system that learned too well.
          A player who must decide what to preserve and what to sacrifice.
        </p>

        <button
          onClick={onStart}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="px-8 py-3 border border-amber-600 text-amber-400 hover:bg-amber-400 hover:text-stone-950 font-mono text-xs uppercase tracking-[0.3em] transition-all duration-300"
        >
          Begin
        </button>

        <p className="text-stone-600 text-xs mt-8 font-mono">
          Inspired by the work of Eliezer Yudkowsky and the broader AI safety research community
        </p>
      </div>
    </div>
  );
}
