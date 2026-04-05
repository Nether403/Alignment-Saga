interface ConsequenceModalProps {
  text: string;
  onContinue: () => void;
}

export function ConsequenceModal({ text, onContinue }: ConsequenceModalProps) {
  return (
    <div className="fixed inset-0 bg-black/70 z-40 flex items-end justify-center p-6">
      <div className="bg-stone-950 border border-stone-600 rounded-sm w-full max-w-2xl p-5 shadow-2xl">
        <p className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-3">Consequence</p>
        <p className="text-stone-200 text-sm leading-relaxed italic mb-4">{text}</p>
        <button
          onClick={onContinue}
          className="px-4 py-2 bg-stone-800 hover:bg-stone-700 border border-stone-600 text-stone-300 text-xs font-mono uppercase tracking-widest transition-colors rounded-sm"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
