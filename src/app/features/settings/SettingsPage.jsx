"use client";

import { useEffect, useMemo, useState } from "react";
import { defaultSettings, themeGradients } from "./SettingsData";
import SettingsHeader from "./SettingsHeader";
import PersonalizationSection from "./PersonalizationSection";
import WellnessSection from "./WellnessSection";
import CompanionSection from "./CompanionSection";
import PrivacySection from "./PrivacySection";
import AccountSection from "./AccountSection";
import AboutSection from "./AboutSection";
import { getCurrentUser } from "@/lib/api/auth";
import { getCurrentProfile } from "@/lib/api/profiles";
import { getCurrentSettings, updateCurrentSettings } from "@/lib/api/settings";
import { getGoalStatistics, getHumorStatistics } from "@/lib/api/statistics";

export default function SettingsPage() {
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [settings, setSettings] = useState(defaultSettings);
  const [progress, setProgress] = useState({ goals: 0, smiles: 0, dances: 0 });
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(true);

  const selectedThemeGradient = useMemo(() => {
    switch (settings.theme) {
      case "dark":
        return themeGradients.dark;
      case "calm":
        return themeGradients.calm;
      case "rosy":
        return themeGradients.rosy;
      case "serene":
        return themeGradients.serene;
      default:
        return themeGradients.light;
    }
  }, [settings.theme]);

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

        // Load settings from Supabase
        const { settings: dbSettings, error: settingsError } = await getCurrentSettings();
        
        if (!settingsError && dbSettings) {
          setSettings((prev) => ({ ...prev, ...dbSettings }));
        }

        // Load progress statistics
        const [goalStats, humorStats] = await Promise.all([
          getGoalStatistics(),
          getHumorStatistics()
        ]);

        setProgress({
          goals: goalStats.statistics?.total_goals_completed || 0,
          smiles: humorStats.statistics?.total_smiles_saved || 0,
          dances: 0 // Meditation stats can be added later
        });
      } catch (error) {
        console.error("Error loading settings data", error);
        window.location.href = "/login";
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Save settings to Supabase when they change (debounced)
  useEffect(() => {
    if (!loading && user) {
      const saveSettings = async () => {
        try {
          await updateCurrentSettings(settings);
        } catch (error) {
          console.error("Error saving settings", error);
        }
      };
      
      const timeoutId = setTimeout(saveSettings, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [settings, loading, user]);

  const handleSettingChange = async (path, value) => {
    setSettings((prev) => {
      const clone = JSON.parse(JSON.stringify(prev));
      let reference = clone;
      for (let i = 0; i < path.length - 1; i += 1) {
        const key = path[i];
        if (typeof reference[key] !== "object" || reference[key] === null) {
          reference[key] = {};
        }
        reference = reference[key];
      }
      reference[path[path.length - 1]] = value;
      return clone;
    });
    
    // Save to Supabase
    try {
      const updatedSettings = { ...settings };
      let ref = updatedSettings;
      for (let i = 0; i < path.length - 1; i += 1) {
        ref = ref[path[i]];
      }
      ref[path[path.length - 1]] = value;
      
      await updateCurrentSettings(updatedSettings);
      setFeedback("Saved 🌸");
    } catch (error) {
      console.error("Error saving setting", error);
      setFeedback("Error saving");
    }
    
    setTimeout(() => setFeedback(""), 1800);
  };

  const handleReset = async () => {
    setSettings(defaultSettings);
    try {
      await updateCurrentSettings(defaultSettings);
      setFeedback("Settings reset to default");
    } catch (error) {
      console.error("Error resetting settings", error);
      setFeedback("Error resetting");
    }
  };

  const handleClearData = async () => {
    try {
      const { deleteCurrentMoodInsights } = await import("@/lib/api/mood");
      const { deleteAllJournalEntries } = await import("@/lib/api/journal");
      
      await Promise.all([
        deleteCurrentMoodInsights(),
        deleteAllJournalEntries()
      ]);
      
      setFeedback("Selected data cleared");
    } catch (error) {
      console.error("Unable to clear data", error);
      setFeedback("Could not clear data");
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: "var(--feelheal-purple)" }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative w-full" style={{ background: selectedThemeGradient }}>
      <div className="floating-bg">
        {Array.from({ length: 18 }).map((_, index) => (
          <span
            key={index}
            className={`petal ${index % 3 === 0 ? "small" : index % 3 === 1 ? "medium" : "large"}`}
            style={{
              left: `${(index * 5.5) % 100}%`,
              animationDelay: `${(index % 12) * 0.7}s`,
              top: `-${(index % 6) * 12}%`,
            }}
          />
        ))}
        {Array.from({ length: 10 }).map((_, index) => (
          <span
            key={`icon-${index}`}
            className="petal-emoji"
            style={{
              left: `${(index * 10) % 100}%`,
              animationDelay: `${0.9 * index}s`,
              top: `-${(index % 5) * 18}%`,
            }}
          >
            {["🌸", "🌙", "🌈", "🎀", "🌼"][index % 5]}
          </span>
        ))}
      </div>

      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                aria-label="Toggle sidebar"
                onClick={() => setIsSidebarOpen((value) => !value)}
                className="p-2.5 rounded-lg hover:bg-gray-100 text-xl"
                style={{ color: "var(--feelheal-purple)" }}
              >
                {isSidebarOpen ? "☰" : "☷"}
              </button>
              <span className="text-3xl">🌸</span>
              <h1 className="text-2xl font-bold" style={{ color: "var(--feelheal-purple)" }}>
                FeelHeal
              </h1>
            </div>
            <div className="flex items-center gap-4">
              {feedback && (
                <span className="px-3 py-1 rounded-full bg-white/70 border border-white/60 text-sm font-medium text-[#7646c9]">
                  {feedback}
                </span>
              )}
              <span className="text-base font-medium text-gray-700">Hi, {user.name || "Friend"} 👋</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex w-full">
        <aside
          className={`${
            isSidebarOpen ? "w-64" : "w-16"
          } transition-all duration-300 bg-white/70 backdrop-blur-sm border-r border-white/20 h-[calc(100vh-64px)] sticky top-16 self-start hidden md:block flex-shrink-0`}
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
              { icon: "😂", label: "Humor", href: "/features/humor" },
              { icon: "⚙️", label: "Settings", href: "/features/settings" },
              { icon: "🔓", label: "Logout" },
            ].map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 cursor-pointer ${
                  item.href === "/features/settings" ? "bg-gray-100" : ""
                }`}
                style={{ color: "var(--feelheal-purple)", fontSize: "18px" }}
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

        <main className="flex-1 min-w-0 px-6 py-8 relative z-10">
          <div className="w-full space-y-10 text-[#2b2150]">
            <SettingsHeader onReset={handleReset} />
            <PersonalizationSection settings={settings} onSettingChange={handleSettingChange} />
            <WellnessSection settings={settings} onSettingChange={handleSettingChange} />
            <CompanionSection settings={settings} onSettingChange={handleSettingChange} />
            <PrivacySection settings={settings} onSettingChange={handleSettingChange} onClearData={handleClearData} />
            <AccountSection user={user} progress={progress} />
            <AboutSection />
          </div>
        </main>
      </div>
    </div>
  );
}
