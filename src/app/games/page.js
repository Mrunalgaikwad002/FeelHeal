"use client";

import { useEffect, useState } from "react";
import GamesPage from "./GamesPage";

export default function GamesRoute() {
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    try {
      const userData = localStorage.getItem("feelheal_user");
      if (userData) setUser(JSON.parse(userData));
    } catch {}
  }, []);

  return (
    <div
      className="min-h-screen relative w-full"
      style={{ background: "linear-gradient(135deg, #f8f4ff 0%, #e8f4fd 100%)" }}
    >
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
              <h1 className="text-2xl font-bold" style={{color: "var(--feelheal-purple)"}}>
                FeelHeal
              </h1>
            </div>
            <div className="flex items-center gap-4">
              {user && <span className="text-base font-medium text-gray-700">Hi, {user.name} 👋</span>}
            </div>
          </div>
        </div>
      </header>

      {/* Body with Sidebar */}
      <div className="flex w-full">
        {/* Sidebar */}
        <aside
          className={`${isSidebarOpen ? "w-64" : "w-16"} transition-all duration-300 bg-white/70 backdrop-blur-sm border-r border-white/20 min-h-[calc(100vh-64px)] sticky top-16 hidden md:block`}
        >
          <nav className="p-4 space-y-1.5 text-base">
            {[
              { icon: "🏠", label: "Dashboard", href: "/dashboard" },
              { icon: "🌦️", label: "Mood Garden", href: "/features/mood" },
              { icon: "✍️", label: "Journal", href: "/features/journal" },
              { icon: "🌌", label: "Goal Universe", href: "/features/goals" },
              { icon: "🧘‍♀️", label: "Meditation", href: "/features/meditation" },
              { icon: "💬", label: "MyBuddy", href: "/features/companion" },
              { icon: "🕹️", label: "Games", href: "/games" },
              { icon: "😂", label: "Humor", href: "/features/humor" },
              { icon: "⚙️", label: "Settings", href: "/settings" },
              { icon: "🔓", label: "Logout", href: "/logout" }
            ].map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 cursor-pointer ${item.href === "/games" ? "bg-gray-100" : ""}`}
                style={{color: "var(--feelheal-purple)", fontSize: "16px"}}
                onClick={() => { if (item.href) window.location.href = item.href; }}
              >
                <span className="text-xl w-6 text-center">{item.icon}</span>
                {isSidebarOpen && <span className="truncate font-medium">{item.label}</span>}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0 px-6 py-8 relative z-10 text-[#2b2150]">
          <GamesPage />
        </main>
      </div>
    </div>
  );
} 


