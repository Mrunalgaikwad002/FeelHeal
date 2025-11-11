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

export default function SettingsPage() {
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [settings, setSettings] = useState(defaultSettings);
  const [progress, setProgress] = useState({ goals: 0, smiles: 0, dances: 0 });
  const [feedback, setFeedback] = useState("");

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
    try {
      const storedUser = localStorage.getItem("feelheal_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Error loading user data", error);
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    try {
      const storedSettings = localStorage.getItem("feelheal_settings");
      if (storedSettings) {
        setSettings((prev) => ({ ...prev, ...JSON.parse(storedSettings) }));
      }
    } catch (error) {
      console.error("Unable to read saved settings", error);
    }

    try {
      const goalData = JSON.parse(localStorage.getItem("feelheal_goals") || "[]");
      const smilesData = JSON.parse(localStorage.getItem("feelheal_saved_smiles") || "[]");
      const danceData = JSON.parse(localStorage.getItem("feelheal_dance_sessions") || "[]");
      setProgress({
        goals: Array.isArray(goalData) ? goalData.length : 0,
        smiles: Array.isArray(smilesData) ? smilesData.length : 0,
        dances: Array.isArray(danceData) ? danceData.length : 0,
      });
    } catch (error) {
      console.error("Unable to read progress data", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("feelheal_settings", JSON.stringify(settings));
  }, [settings]);

  const handleSettingChange = (path, value) => {
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
    setFeedback("Saved 🌸");
    setTimeout(() => setFeedback(""), 1800);
  };

  const handleReset = () => {
    setSettings(defaultSettings);
    setFeedback("Settings reset to default");
  };

  const handleClearData = () => {
    try {
      ["feelheal_mood_history", "feelheal_journal_entries", "feelheal_saved_smiles"].forEach((key) =>
        localStorage.removeItem(key)
      );
      setFeedback("Selected data cleared");
    } catch (error) {
      console.error("Unable to clear data", error);
      setFeedback("Could not clear data");
    }
  };

  if (!user) {
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
                onClick={() => {
                  if (item.label === "Logout") {
                    localStorage.removeItem("feelheal_user");
                    localStorage.removeItem("feelheal_seen_onboarding");
                    localStorage.removeItem("feelheal_seen_dashboard");
                    window.location.href = "/";
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
