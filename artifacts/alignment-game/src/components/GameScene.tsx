import { useState } from 'react';
import type { GameState, Scene, Choice } from '../types/game';
import { TypewriterText } from './TypewriterText';

interface GameSceneProps {
  scene: Scene;
  state: GameState;
  onChoice: (choice: Choice) => void;
  skipAnimation?: boolean;
}

export function GameScene({ scene, state, onChoice, skipAnimation }: GameSceneProps) {
  const [proseComplete, setProseComplete] = useState(false);
  const prose = scene.prose(state);

  // Filter available choices
  const availableChoices = scene.choices.filter(c =>
    !c.availableIf || c.availableIf(state)
  );

  const handleChoice = (choice: Choice) => {
    onChoice(choice);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Scene image — top third */}
      <div className="relative w-full h-40 md:h-52 shrink-0 overflow-hidden">
        <img
          src={scene.imageKey}
          alt={scene.title}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.65)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-stone-950" />
        {/* Scene meta */}
        <div className="absolute bottom-3 left-4 right-4">
          <p className="text-xs font-mono text-stone-500 uppercase tracking-widest">{scene.id}</p>
          <h2 className="text-stone-100 font-light text-lg md:text-xl tracking-wide">{scene.title}</h2>
        </div>
        {/* Act badge */}
        <div className="absolute top-3 right-3 bg-stone-950/80 border border-stone-700 px-2 py-1 rounded-sm">
          <span className="text-xs font-mono text-stone-500 uppercase tracking-widest">Act {scene.act}</span>
        </div>
      </div>

      {/* Prose + choices */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4">
        <TypewriterText
          text={prose}
          speed={12}
          onComplete={() => setProseComplete(true)}
          className="text-stone-300 leading-relaxed font-light text-sm md:text-base mb-6"
          skipAnimation={skipAnimation}
        />

        {/* Skip button */}
        {!proseComplete && (
          <button
            onClick={() => setProseComplete(true)}
            className="text-xs font-mono text-stone-600 hover:text-stone-400 transition-colors mb-4 block"
          >
            [Click text or press here to skip]
          </button>
        )}

        {/* Choices */}
        {proseComplete && (
          <div className="flex flex-col gap-2 mt-4 animate-fade-in">
            <p className="text-xs font-mono text-stone-600 uppercase tracking-widest mb-2">Choose your response:</p>
            {availableChoices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => handleChoice(choice)}
                className="text-left px-4 py-3 bg-stone-900 hover:bg-stone-800 border border-stone-700 hover:border-amber-600/50 rounded-sm transition-all duration-200 group"
              >
                <span className="text-stone-200 text-sm group-hover:text-amber-200 transition-colors leading-relaxed">
                  {choice.text}
                </span>
                <div className="flex flex-wrap gap-2 mt-1.5">
                  {choice.statDelta && Object.entries(choice.statDelta)
                    .filter(([, v]) => v !== 0)
                    .map(([key, val]) => (
                      <span
                        key={key}
                        className={`text-xs font-mono ${val > 0 ? 'text-green-400' : 'text-red-400'}`}
                      >
                        {key.replace('_', ' ')} {val > 0 ? '+' : ''}{val}
                      </span>
                    ))
                  }
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
