"use client";

import { useState, useEffect } from "react";
import MeditationWelcome from "./MeditationWelcome";
import BreathingSession from "./BreathingSession";
import SessionSummary from "./SessionSummary";
import { SESSION_LIBRARY } from "./sessionLibrary";
import { getCurrentUser } from "@/lib/api/auth";
import { getCurrentProfile } from "@/lib/api/profiles";
import { getMeditationStatistics, updateMeditationStatistics } from "@/lib/api/statistics";
import { getCurrentMoodInsights } from "@/lib/api/mood";

export default function MeditationPage() {
  const [sessionState, setSessionState] = useState("welcome"); // "welcome", "breathing", "summary"
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userMood, setUserMood] = useState(null);
  const [sessionDuration, setSessionDuration] = useState(5); // minutes
  const [activeMode, setActiveMode] = useState("deep_breathe");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // Get current user
        const { user: authUser, error: userError } = await getCurrentUser();
        
        if (userError || !authUser) {
          window.location.href = "/login";
          return;
        }

        // Get profile
        const { profile } = await getCurrentProfile();
        
        const displayUser = {
          id: authUser.id,
          email: authUser.email,
          name: profile?.display_name || 
                authUser.user_metadata?.display_name || 
                authUser.email?.split("@")[0] || 
                "User"
        };
        setUser(displayUser);

        // Get recent mood from Supabase
        const { moods } = await getCurrentMoodInsights();
        if (moods && moods.length > 0) {
          setUserMood(moods[moods.length - 1].mood_category);
        }
      } catch (error) {
        console.error("Error loading meditation data:", error);
        window.location.href = "/login";
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const handleStartSession = (mode = "deep_breathe", duration) => {
    const libraryEntry = SESSION_LIBRARY[mode] || SESSION_LIBRARY.deep_breathe;
    setActiveMode(mode);
    setSessionDuration(duration ?? libraryEntry.duration ?? 5);
    setSessionState("breathing");
  };

  const handleSessionComplete = async () => {
    setSessionState("summary");
    
    // Save meditation statistics to Supabase
    try {
      const { statistics } = await getMeditationStatistics();
      const currentStats = statistics || {};
      
      await updateMeditationStatistics({
        total_sessions_completed: (currentStats.total_sessions_completed || 0) + 1,
        total_minutes_meditated: (currentStats.total_minutes_meditated || 0) + sessionDuration,
        last_session_date: new Date().toISOString().split('T')[0],
        current_streak: currentStats.current_streak || 0 // Can be calculated based on last_session_date
      });

      // Save calm mood to mood insights
      const { saveCurrentMoodInsight, anonymizeMood } = await import("@/lib/api/mood");
      const { moodCategory, emotionalState } = anonymizeMood("calm");
      await saveCurrentMoodInsight(moodCategory, emotionalState);
    } catch (error) {
      console.error("Error saving meditation statistics:", error);
    }
  };

  if (loading || !user) {
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
          className={`${isSidebarOpen ? "w-64" : "w-16"} transition-all duration-300 bg-white/70 backdrop-blur-sm border-r border-white/20 h-[calc(100vh-64px)] sticky top-16 self-start hidden md:block flex-shrink-0`}
        >
          <nav className="p-4 space-y-1.5 text-lg">
            {[
              { icon: "🏠", label: "Dashboard", href: "/dashboard" },
              { icon: "🌦️", label: "Mood Garden", href: "/features/mood" },
              { icon: "✍️", label: "Journal", href: "/features/journal" },
              { icon: "🌌", label: "Goal Universe", href: "/features/goals" },
              { icon: "🧘‍♀️", label: "Meditation", href: "/features/meditation" },
              { icon: "💬", label: "MyBuddy", href: "/features/companion" },
              { icon: "🕹️", label: "Games", href: "/games" },
              { icon: "😂", label: "Humor", href: "/humor" },
              { icon: "⚙️", label: "Settings", href: "/features/settings" },
              { icon: "🔓", label: "Logout" }
            ].map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 cursor-pointer ${
                  item.href === "/features/meditation" ? "bg-gray-100" : ""
                }`}
                style={{color: "var(--feelheal-purple)", fontSize: "18px"}}
                onClick={async () => { 
                  if (item.label === "Logout") {
                    try {
                      const { signOut } = await import("@/lib/api/auth");
                      await signOut();
                      localStorage.removeItem("feelheal_seen_onboarding");
                      localStorage.removeItem("feelheal_seen_dashboard");
                      window.location.href = "/";
                    } catch (error) {
                      console.error("Logout error:", error);
                      window.location.href = "/";
                    }
                  } else if (item.href) { 
                    window.location.href = item.href; 
                  }
                }}
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

