"use client";

import { useState, useEffect } from "react";
import MeditationWelcome from "./MeditationWelcome";
import BreathingSession from "./BreathingSession";
import SessionSummary from "./SessionSummary";
import { SESSION_LIBRARY } from "./sessionLibrary";

export default function MeditationPage() {
  const [sessionState, setSessionState] = useState("welcome"); // "welcome", "breathing", "summary"
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userMood, setUserMood] = useState(null);
  const [sessionDuration, setSessionDuration] = useState(5); // minutes
  const [activeMode, setActiveMode] = useState("deep_breathe");

  useEffect(() => {
    // Load user data
    try {
      const userData = localStorage.getItem("feelheal_user");
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        // Redirect to login if no user data
        window.location.href = "/login";
        return;
      }
    } catch (error) {
      console.error("Error loading user data:", error);
      window.location.href = "/login";
      return;
    }

    // Get recent mood from Mood Garden
    try {
      const moodHistory = localStorage.getItem("feelheal_mood_history");
      if (moodHistory) {
        const moods = JSON.parse(moodHistory);
        if (moods.length > 0) {
          setUserMood(moods[moods.length - 1].mood);
        }
      }
    } catch (error) {
      console.error("Error loading mood data:", error);
    }
  }, []);

  const handleStartSession = (mode = "deep_breathe", duration) => {
    const libraryEntry = SESSION_LIBRARY[mode] || SESSION_LIBRARY.deep_breathe;
    setActiveMode(mode);
    setSessionDuration(duration ?? libraryEntry.duration ?? 5);
    setSessionState("breathing");
  };

  const handleSessionComplete = () => {
    setSessionState("summary");
    
    // Auto-update mood garden with a calm plant
    try {
      const gardenData = localStorage.getItem("feelheal_mood_garden");
      const garden = gardenData ? JSON.parse(gardenData) : [];
      
      const newPlant = {
        id: Date.now(),
        mood: "calm",
        emoji: "🍃",
        name: "Meditation Leaf",
        color: "#90EE90",
        date: new Date().toISOString().split('T')[0],
        timestamp: new Date().toISOString(),
        position: {
          x: Math.random() * 80 + 10,
          y: Math.random() * 60 + 20
        },
        size: 1 + Math.random() * 0.5
      };
      
      const updatedGarden = [...garden, newPlant];
      localStorage.setItem("feelheal_mood_garden", JSON.stringify(updatedGarden));
    } catch (error) {
      console.error("Error updating mood garden:", error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{borderColor: "var(--feelheal-purple)"}}></div>
      </div>
    );
  }

  const activeSession = SESSION_LIBRARY[activeMode] || SESSION_LIBRARY.deep_breathe;
  const backgroundGradient =
    sessionState === "welcome"
      ? "linear-gradient(135deg, #E0F2FE 0%, #DBEAFE 50%, #E0F2FE 100%)"
      : sessionState === "breathing"
      ? activeSession.gradient
      : activeSession.summary.background;

  return (
    <div className="min-h-screen relative w-full" style={{
      background: backgroundGradient
    }}>
      {/* Floating petals background */}
      <div className="floating-bg">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className={`petal ${i % 3 === 0 ? 'small' : i % 3 === 1 ? 'medium' : 'large'}`}
            style={{
              left: `${(i * 5) % 100}%`,
              animationDelay: `${(i % 10) * 0.8}s`,
              top: `-${(i % 5) * 15}%`
            }}
          />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={`e-${i}`}
            className="petal-emoji"
            style={{
              left: `${(i * 12.5) % 100}%`,
              animationDelay: `${0.6 * i}s`,
              top: `-${(i % 4) * 15}%`
            }}
          >
            🧘‍♀️
          </span>
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
              <span className="text-3xl">🧘‍♀️</span>
              <h1 className="text-2xl font-bold" style={{color: "var(--feelheal-purple)"}}>
                FeelHeal
              </h1>
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
              { icon: "💬", label: "AI Companion", href: "/chatbot" },
              { icon: "🕹️", label: "Games", href: "/games" },
              { icon: "😂", label: "Humor", href: "/humor" },
              { icon: "⚙️", label: "Settings" },
              { icon: "🔓", label: "Logout" }
            ].map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 cursor-pointer ${
                  item.href === "/features/meditation" ? "bg-gray-100" : ""
                }`}
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
        <main className="flex-1 min-w-0 px-6 py-8 relative z-10">
          <div className="w-full">
            {sessionState === "welcome" && (
              <MeditationWelcome 
                userMood={userMood}
                onStart={handleStartSession}
              />
            )}
            
            {sessionState === "breathing" && (
              <BreathingSession
                duration={sessionDuration}
                mode={activeMode}
                onComplete={handleSessionComplete}
                onCancel={() => setSessionState("welcome")}
              />
            )}
            
            {sessionState === "summary" && (
              <SessionSummary
                duration={sessionDuration}
                mode={activeMode}
                onFinish={() => {
                  setSessionState("welcome");
                }}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

