import { useState, useRef, useEffect, useCallback } from 'react';

interface Message {
  role: 'user' | 'aria';
  content: string;
  streaming?: boolean;
}

interface ARIAPanelProps {
  sceneContext?: string;
  onClose: () => void;
}

const API_BASE = import.meta.env.BASE_URL?.replace(/\/$/, '') + '/api';

const WELCOME: Message = {
  role: 'aria',
  content: 'ARIA online. I am the Alignment Research Intelligence Archive — your institutional archivist. Ask me about AI alignment concepts, faction positions, or anything in the classified dossier. I explain the world. I do not advise on your choices.',
};

export function ARIAPanel({ sceneContext, onClose }: ARIAPanelProps) {
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    setInput('');
    setError(null);

    const userMsg: Message = { role: 'user', content: text };
    const ariaMsg: Message = { role: 'aria', content: '', streaming: true };

    setMessages(prev => [...prev, userMsg, ariaMsg]);
    setLoading(true);

    abortRef.current = new AbortController();

    try {
      const res = await fetch(`${API_BASE}/assistant/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, sceneContext }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(err.error || `HTTP ${res.status}`);
      }

      if (!res.body) throw new Error('No stream');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data: ')) continue;
          const payload = trimmed.slice(6);
          if (payload === '[DONE]') continue;

          try {
            const parsed = JSON.parse(payload) as { content?: string; error?: string };
            if (parsed.error) throw new Error(parsed.error);
            if (parsed.content) {
              accumulated += parsed.content;
              const snap = accumulated;
              setMessages(prev => {
                const next = [...prev];
                const last = next[next.length - 1];
                if (last?.role === 'aria') {
                  next[next.length - 1] = { ...last, content: snap, streaming: true };
                }
                return next;
              });
            }
          } catch (parseErr) {
            if ((parseErr as Error).message !== 'Failed to execute...') {
              // Propagate real errors from parsed.error
              const msg = (parseErr as Error).message;
              if (!msg.startsWith('JSON')) throw parseErr;
            }
          }
        }
      }

      // Mark streaming complete
      setMessages(prev => {
        const next = [...prev];
        const last = next[next.length - 1];
        if (last?.role === 'aria') {
          next[next.length - 1] = { ...last, streaming: false };
        }
        return next;
      });
    } catch (err) {
      if ((err as Error).name === 'AbortError') return;
      const msg = (err as Error).message || 'Communication error';
      setError(msg);
      // Remove the empty aria message
      setMessages(prev => {
        const next = [...prev];
        if (next[next.length - 1]?.role === 'aria' && !next[next.length - 1].content) {
          next.pop();
        }
        return next;
      });
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  }, [input, loading, sceneContext]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="absolute inset-y-0 right-0 z-40 flex flex-col w-full max-w-sm border-l border-stone-800 bg-stone-950 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-stone-800 shrink-0">
        <div>
          <p className="text-xs font-mono tracking-[0.4em] text-amber-500 uppercase">ARIA</p>
          <p className="text-stone-500 text-xs font-mono">Alignment Research Intelligence Archive</p>
        </div>
        <button
          onClick={onClose}
          className="text-stone-600 hover:text-stone-300 font-mono text-xs transition-colors"
        >
          [close]
        </button>
      </div>

      {/* Context indicator */}
      {sceneContext && (
        <div className="px-4 py-1.5 border-b border-stone-800/50 bg-stone-900/40 shrink-0">
          <p className="text-xs font-mono text-stone-600 truncate">Context: {sceneContext}</p>
        </div>
      )}

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <p className={`text-[10px] font-mono uppercase tracking-widest ${msg.role === 'user' ? 'text-stone-500' : 'text-amber-600'}`}>
              {msg.role === 'user' ? 'You' : 'ARIA'}
            </p>
            <div
              className={`max-w-[90%] px-3 py-2 text-xs leading-relaxed font-light rounded-sm ${
                msg.role === 'user'
                  ? 'bg-stone-800 text-stone-200 border border-stone-700'
                  : 'bg-stone-900 text-stone-300 border border-stone-800'
              }`}
            >
              {msg.content}
              {msg.streaming && (
                <span className="inline-block w-1.5 h-3 bg-amber-400 animate-pulse ml-1 align-middle" />
              )}
            </div>
          </div>
        ))}

        {error && (
          <div className="text-xs font-mono text-red-400 border border-red-900 px-3 py-2 bg-red-950/30">
            {error}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-stone-800 px-4 py-3 shrink-0">
        <div className="flex gap-2 items-end">
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask ARIA about alignment concepts, factions, stats…"
            disabled={loading}
            rows={2}
            className="flex-1 bg-stone-900 border border-stone-700 text-stone-200 text-xs font-mono placeholder-stone-600 px-3 py-2 resize-none focus:outline-none focus:border-amber-700 disabled:opacity-50 rounded-sm leading-relaxed"
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="px-3 py-2 border border-amber-700 text-amber-400 hover:bg-amber-400 hover:text-stone-950 disabled:opacity-30 disabled:cursor-not-allowed font-mono text-xs uppercase tracking-widest transition-all duration-200 shrink-0"
          >
            {loading ? '…' : 'Send'}
          </button>
        </div>
        <p className="text-stone-700 text-[10px] font-mono mt-1.5">Enter to send · Shift+Enter for newline</p>
      </div>
    </div>
  );
}
