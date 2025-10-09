"use client";

import { useEffect, useMemo, useState } from "react";

import JournalHeader from "./JournalHeader";
import PromptBar from "./PromptBar";
import DiaryEditor from "./DiaryEditor";
import Timeline from "./Timeline";
import EncouragementToast from "./EncouragementToast";
import PinLock from "./PinLock";

export default function JournalPage() {
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [entries, setEntries] = useState([]); // not persisted for now
  const [selectedMood, setSelectedMood] = useState("calm");
  const [encouragement, setEncouragement] = useState("");
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    try {
      const userData = localStorage.getItem("feelheal_user");
      if (userData) setUser(JSON.parse(userData));
    } catch {}
  }, []);

  const theme = useMemo(() => {
    const map = {
      happy: { bg: "#FFF7B2", accent: "#FF8A65", icon: "🌻" },
      calm: { bg: "#E7F7EF", accent: "#87CEFA", icon: "🍃" },
      sad: { bg: "#EDE7F6", accent: "#B0BEC5", icon: "🌧️" },
      stressed: { bg: "#FFE1D6", accent: "#EF5350", icon: "🌪️" },
      reflective: { bg: "#F3E8FF", accent: "#FFFFFF", icon: "🌙" },
      tired: { bg: "#F0F4FF", accent: "#B39DDB", icon: "😴" },
    };
    return map[selectedMood] || map.calm;
  }, [selectedMood]);

  const handleSave = (value, attachment) => {
    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      mood: selectedMood,
      text: value,
      attachment,
    };
    setEntries([newEntry, ...entries]);
    const affirmations = [
      "Your thoughts are safe here 💌",
      "You’re growing beautifully 🌿",
      "Thank you for taking time for yourself 💖",
      "Small reflections make big changes ✨",
    ];
    setEncouragement(affirmations[Math.floor(Math.random() * affirmations.length)]);
    setTimeout(() => setEncouragement(""), 2500);
  };

  return (
    <div className="min-h-screen relative" style={{
      background: `linear-gradient(135deg, ${theme.bg} 0%, #ffffff 100%)`
    }}>
      {/* Header (reuse style) */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                aria-label="Toggle sidebar"
                onClick={() => setIsSidebarOpen(v => !v)}
                className="p-2 rounded-lg hover:bg-gray-100"
                style={{color: "var(--feelheal-purple)"}}
              >
                {isSidebarOpen ? "☰" : "☷"}
              </button>
              <span className="text-2xl">📓</span>
              <h1 className="text-xl font-bold" style={{color: "var(--feelheal-purple)"}}>
                My Digital Diary
              </h1>
            </div>
            <div className="flex items-center gap-4">
              {user && <span className="text-sm text-gray-600">Hi, {user.name} 👋</span>}
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar consistent with MoodGarden */}
        <aside
          className={`${isSidebarOpen ? "w-64" : "w-16"} transition-all duration-300 bg-white/70 backdrop-blur-sm border-r border-white/20 min-h-[calc(100vh-64px)] sticky top-16 hidden md:block`}
        >
          <nav className="p-3 space-y-1 text-sm">
            {[
              { icon: "🏠", label: "Dashboard", href: "/dashboard" },
              { icon: "🌦️", label: "Mood Garden", href: "/features/mood" },
              { icon: "✍️", label: "Journal", href: "/features/journal" },
              { icon: "🎯", label: "Goals", href: "/goals" },
              { icon: "🧘‍♀️", label: "Meditation", href: "/meditation" },
              { icon: "💬", label: "AI Companion", href: "/chatbot" },
              { icon: "🕹️", label: "Games", href: "/games" },
              { icon: "😂", label: "Humor", href: "/humor" },
              { icon: "⚙️", label: "Settings" },
              { icon: "🔓", label: "Logout" }
            ].map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer ${
                  item.href === "/features/journal" ? "bg-gray-100" : ""
                }`}
                style={{color: "var(--feelheal-purple)"}}
                onClick={() => { if (item.href) window.location.href = item.href; }}
              >
                <span className="text-lg w-5 text-center">{item.icon}</span>
                {isSidebarOpen && <span className="truncate">{item.label}</span>}
              </div>
            ))}
          </nav>
        </aside>

        <main className="flex-1 px-6 py-8 relative z-10">
          {locked ? (
            <PinLock onUnlock={() => setLocked(false)} />
          ) : (
            <div className="container mx-auto">
              <PromptBar selectedMood={selectedMood} setSelectedMood={setSelectedMood} />
              <DiaryEditor accent={theme.accent} icon={theme.icon} onSave={handleSave} />
              <Timeline entries={entries} />
            </div>
          )}
        </main>
      </div>

      <EncouragementToast message={encouragement} />
    </div>
  );
}


