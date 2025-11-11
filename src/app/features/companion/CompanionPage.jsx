"use client";

import { useEffect, useMemo, useRef, useState } from "react";

// Emotion → theme mapping
const EMOTION_THEMES = {
  calm: { bg: "linear-gradient(135deg, #E0F2FE 0%, #DBEAFE 100%)", bubbleAI: "#E0EAFF", bubbleUser: "#C7F7E7" },
  sad: { bg: "linear-gradient(135deg, #E8D9FF 0%, #F3E8FF 100%)", bubbleAI: "#EDE2FF", bubbleUser: "#E9F0FF" },
  happy: { bg: "linear-gradient(135deg, #FFF7B2 0%, #FFEAB6 100%)", bubbleAI: "#FFF3C2", bubbleUser: "#F8FFD1" },
  tired: { bg: "linear-gradient(135deg, #E7F7EF 0%, #E8FFE8 100%)", bubbleAI: "#EAFBF0", bubbleUser: "#DAF7E3" },
  default: { bg: "linear-gradient(135deg, #f8f4ff 0%, #e8f4fd 100%)", bubbleAI: "#F1F5FF", bubbleUser: "#E7FFF6" }
};

const TYPING_DELAY_MS = 900;
const STORAGE_KEY = "feelheal_chat_history";

function detectEmotion(text) {
  const t = (text || "").toLowerCase();
  if (/(calm|peace|soft|breathe|grounded)/.test(t)) return "calm";
  if (/(sad|down|blue|cry|lonely|hurt)/.test(t)) return "sad";
  if (/(happy|joy|excited|grateful|smile)/.test(t)) return "happy";
  if (/(tired|exhausted|sleepy|fatigue|low energy)/.test(t)) return "tired";
  return "default";
}

function ChatMessage({ role, text, theme }) {
  const isAI = role === "ai";
  return (
    <div className={`w-full flex ${isAI ? "justify-start" : "justify-end"} py-1`}>
      <div
        className={`max-w-[78%] md:max-w-[70%] rounded-2xl px-4 py-3 leading-relaxed shadow`}
        style={{
          background: isAI ? theme.bubbleAI : theme.bubbleUser,
          color: "#2b2150",
          border: "1px solid rgba(255,255,255,.6)"
        }}
      >
        <div className="text-sm opacity-70 mb-1">{isAI ? "MyBuddy" : "You"}</div>
        <div className="whitespace-pre-wrap">{text}</div>
      </div>
    </div>
  );
}

export default function CompanionPage() {
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const viewRef = useRef(null);

  useEffect(() => {
    try {
      const userData = localStorage.getItem("feelheal_user");
      if (userData) setUser(JSON.parse(userData));
    } catch {}
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setMessages(JSON.parse(saved));
      else {
        // Warm, first-line greeting
        setMessages([
          { role: "ai", text: "Hey there 🌼 I’m MyBuddy. How’s your heart today? I’m here to listen." }
        ]);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {}
    // Auto-scroll
    if (viewRef.current) {
      viewRef.current.scrollTop = viewRef.current.scrollHeight;
    }
  }, [messages]);

  const emotion = useMemo(() => {
    const lastAI = [...messages].reverse().find(m => m.role === "ai");
    return lastAI ? detectEmotion(lastAI.text) : "default";
  }, [messages]);
  const theme = EMOTION_THEMES[emotion] || EMOTION_THEMES.default;

  const sendToGemini = async (userText) => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      return "I’m ready to chat, but the Gemini API key isn’t set yet. Please add NEXT_PUBLIC_GEMINI_API_KEY in .env.local.";
    }
    const system = `You are FeelHeal's empathetic companion. 
- Tone: gentle, warm, human, hopeful. 
- Keep replies concise (2–5 sentences). 
- Where helpful, suggest a micro action (deep breath, short stretch, 10s pause).
- If user name is provided, greet them softly by name once.
Name (if present): ${user?.name || "friend"}.`;

    // Use an explicit model ID to avoid 404s on -latest in some regions
    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey;
    const body = {
      contents: [
        { role: "user", parts: [{ text: system }] },
        { role: "user", parts: [{ text: userText }] }
      ]
    };
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      if (!res.ok) throw new Error("Network error");
      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I’m here with you. Let’s take one soft breath together 🌿";
      return text;
    } catch (e) {
      return "Hmm, I couldn’t reach Gemini right now. Let’s try again in a moment 💜";
    }
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages(prev => [...prev, { role: "user", text: trimmed }]);
    setInput("");

    setTyping(true);
    await new Promise(r => setTimeout(r, TYPING_DELAY_MS));
    const aiReply = await sendToGemini(trimmed);
    setTyping(false);
    setMessages(prev => [...prev, { role: "ai", text: aiReply }]);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{borderColor: "var(--feelheal-purple)"}}></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative w-full" style={{ background: theme.bg }}>
      {/* Floating petals background */}
      <div className="floating-bg">
        {Array.from({ length: 16 }).map((_, i) => (
          <span
            key={i}
            className={`petal ${i % 3 === 0 ? 'small' : i % 3 === 1 ? 'medium' : 'large'}`}
            style={{
              left: `${(i * 6) % 100}%`,
              animationDelay: `${(i % 10) * 0.6}s`,
              top: `-${(i % 5) * 15}%`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                aria-label="Toggle sidebar"
                onClick={() => setIsSidebarOpen(v => !v)}
                className="p-2.5 rounded-lg hover:bg-gray-100 text-xl"
                style={{color: "var(--feelheal-purple)"}}
              >
                {isSidebarOpen ? "☰" : "☷"}
              </button>
              <span className="text-3xl">🌸</span>
              <h1 className="text-2xl font-bold" style={{color: "var(--feelheal-purple)"}}>FeelHeal</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-base font-medium text-gray-700">Hi, {user.name} 👋</span>
            </div>
          </div>
        </div>
      </header>

      {/* Body with Sidebar */}
      <div className="flex w-full">
        {/* Sidebar */}
        <aside
          className={`${isSidebarOpen ? "w-64" : "w-16"} transition-all duration-300 bg-white/70 backdrop-blur-sm border-r border-white/20 min-h-[calc(100vh-64px)] sticky top-16 hidden md:block flex-shrink-0`}
        >
          <nav className="p-4 space-y-1.5 text-base">
            {[
              { icon: "🏠", label: "Dashboard", href: "/dashboard" },
              { icon: "🌦️", label: "Mood Garden", href: "/features/mood" },
              { icon: "✍️", label: "Journal", href: "/features/journal" },
              { icon: "🌌", label: "Goal Universe", href: "/features/goals" },
              { icon: "🧘‍♀️", label: "Meditation", href: "/features/meditation" },
              { icon: "🤖", label: "MyBuddy", href: "/features/companion" },
              { icon: "😂", label: "Humor", href: "/features/humor" },
              { icon: "⚙️", label: "Settings" },
              { icon: "🔓", label: "Logout" }
            ].map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 cursor-pointer ${item.href === "/features/companion" ? "bg-gray-100" : ""}`}
                style={{color: "var(--feelheal-purple)", fontSize: "16px"}}
                onClick={() => { if (item.href) window.location.href = item.href; }}
              >
                <span className="text-xl w-6 text-center">{item.icon}</span>
                {isSidebarOpen && <span className="truncate font-medium">{item.label}</span>}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 px-4 md:px-8 py-6 relative z-10">
          {/* Centered title for consistency */}
          <div className="text-center mb-6">
            <div className="text-5xl mb-2">🤖</div>
            <h1 className="text-4xl font-bold" style={{color: "var(--feelheal-purple)"}}>MyBuddy</h1>
          </div>
          {/* Chat container */}
          <div className="w-full mx-auto bg-white/70 backdrop-blur-md rounded-3xl border border-white/30 shadow-xl overflow-hidden" style={{maxWidth: 1200}}>
            {/* Chat history */}
            <div ref={viewRef} className="h-[58vh] md:h-[62vh] overflow-y-auto px-4 md:px-6 py-5 space-y-2">
              {messages.map((m, i) => (
                <ChatMessage key={i} role={m.role} text={m.text} theme={theme} />
              ))}
              {typing && (
                <div className="w-full flex justify-start py-1">
                  <div className="rounded-2xl px-4 py-3 bg-white/90 border border-white/70 shadow text-gray-600 text-sm">
                    MyBuddy is typing...
                  </div>
                </div>
              )}
            </div>

            {/* Input + Quick actions */}
            <div className="border-t border-white/40 bg-white/60 px-4 md:px-6 py-4">
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") handleSend(); }}
                  placeholder="Share anything on your mind..."
                  className="flex-1 rounded-2xl px-4 py-3 bg-white/90 border border-white/70 focus:outline-none focus:ring-2 focus:ring-[var(--feelheal-purple)]"
                  style={{ color: "#2b2150" }}
                />
                <button
                  onClick={handleSend}
                  className="px-5 py-3 rounded-2xl text-white font-medium hover:brightness-110 transition"
                  style={{ background: "var(--feelheal-purple)", boxShadow: "0 6px 16px rgba(123, 44, 191, .3)" }}
                >
                  Send
                </button>
              </div>

              {/* Quick links */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                {[
                  { icon: "🧘", label: "Meditation", href: "/features/meditation" },
                  { icon: "🌱", label: "Mood Garden", href: "/features/mood" },
                  { icon: "📓", label: "Journal", href: "/features/journal" },
                  { icon: "🌙", label: "Affirmations", href: "/affirmations" }
                ].map((x, i) => (
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
          </div>
        </main>
      </div>
    </div>
  );
}


