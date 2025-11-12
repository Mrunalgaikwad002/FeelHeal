// Chat input and quick actions

export default function ChatInput({ input, setInput, onSend, disabled }) {
  const quickActions = [
    { icon: "🧘", label: "Meditation", href: "/features/meditation" },
    { icon: "🌱", label: "Mood Garden", href: "/features/mood" },
    { icon: "📓", label: "Journal", href: "/features/journal" },
    { icon: "🌙", label: "Affirmations", href: "/affirmations" }
  ];

  return (
    <div className="border-t border-white/40 bg-white/60 px-4 md:px-6 py-4">
      <div className="flex items-center gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && !disabled) onSend(); }}
          placeholder="Share anything on your mind..."
          disabled={disabled}
          className="flex-1 rounded-2xl px-4 py-3 bg-white/90 border border-white/70 focus:outline-none focus:ring-2 focus:ring-[var(--feelheal-purple)] disabled:opacity-50"
          style={{ color: "#2b2150" }}
        />
        <button
          onClick={onSend}
          disabled={disabled || !input.trim()}
          className="px-5 py-3 rounded-2xl text-white font-medium hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: "var(--feelheal-purple)", boxShadow: "0 6px 16px rgba(123, 44, 191, .3)" }}
        >
          Send
        </button>
      </div>

      {/* Quick links */}
      <div className="flex flex-wrap items-center gap-2 mt-3">
        {quickActions.map((x, i) => (
          <button
            key={i}
            onClick={() => window.location.href = x.href}
            className="px-3 py-1.5 rounded-full text-sm bg-white/90 border border-white/70 hover:bg-white transition"
            style={{ color: "var(--feelheal-purple)" }}
          >
            <span className="mr-1">{x.icon}</span>{x.label}
          </button>
        ))}
      </div>
    </div>
  );
}

