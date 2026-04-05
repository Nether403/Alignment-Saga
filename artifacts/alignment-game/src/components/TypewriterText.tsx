import { useState, useEffect, useRef } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
  skipAnimation?: boolean;
}

function renderMarkdown(text: string): React.ReactNode[] {
  const paragraphs = text.split('\n\n');
  return paragraphs.map((para, pi) => {
    if (!para.trim()) return null;
    // Process inline: **bold**, *italic*
    const parts: React.ReactNode[] = [];
    let remaining = para;
    let key = 0;

    while (remaining.length > 0) {
      // Bold: **text**
      const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
      // Italic: *text* (not bold)
      const italicMatch = remaining.match(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/);

      let firstBold = boldMatch ? remaining.indexOf(boldMatch[0]) : Infinity;
      let firstItalic = italicMatch ? remaining.indexOf(italicMatch[0]) : Infinity;

      if (firstBold === Infinity && firstItalic === Infinity) {
        parts.push(<span key={key++}>{remaining}</span>);
        break;
      }

      if (firstBold <= firstItalic) {
        if (firstBold > 0) {
          parts.push(<span key={key++}>{remaining.slice(0, firstBold)}</span>);
        }
        parts.push(<strong key={key++} className="text-amber-300 font-semibold">{boldMatch![1]}</strong>);
        remaining = remaining.slice(firstBold + boldMatch![0].length);
      } else {
        if (firstItalic > 0) {
          parts.push(<span key={key++}>{remaining.slice(0, firstItalic)}</span>);
        }
        parts.push(<em key={key++} className="text-stone-300 italic">{italicMatch![1]}</em>);
        remaining = remaining.slice(firstItalic + italicMatch![0].length);
      }
    }

    return (
      <p key={pi} className="mb-4 last:mb-0 leading-relaxed">
        {parts}
      </p>
    );
  }).filter(Boolean);
}

export function TypewriterText({ text, speed = 14, onComplete, className, skipAnimation }: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState(skipAnimation ? text : '');
  const [done, setDone] = useState(skipAnimation);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (skipAnimation) {
      setDisplayed(text);
      setDone(true);
      onComplete?.();
      return;
    }

    setDisplayed('');
    setDone(false);
    indexRef.current = 0;

    timerRef.current = setInterval(() => {
      indexRef.current++;
      if (indexRef.current >= text.length) {
        setDisplayed(text);
        setDone(true);
        onComplete?.();
        if (timerRef.current) clearInterval(timerRef.current);
      } else {
        setDisplayed(text.slice(0, indexRef.current));
      }
    }, speed);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [text, speed, skipAnimation]);

  const handleSkip = () => {
    if (!done) {
      if (timerRef.current) clearInterval(timerRef.current);
      setDisplayed(text);
      setDone(true);
      onComplete?.();
    }
  };

  return (
    <div className={className} onClick={handleSkip} style={{ cursor: done ? 'default' : 'pointer' }}>
      {renderMarkdown(displayed)}
      {!done && (
        <span className="inline-block w-2 h-4 bg-amber-400 animate-pulse ml-1 align-middle" />
      )}
    </div>
  );
}
