"use client";

import { useEffect, useMemo, useState } from "react";
import JournalHeader from "./JournalHeader";
import PromptBar from "./PromptBar";
import DiaryEditor from "./DiaryEditor";
import Timeline from "./Timeline";
import EncouragementToast from "./EncouragementToast";
import PinLock from "./PinLock";
import { getCurrentUser } from "@/lib/api/auth";
import { getCurrentProfile } from "@/lib/api/profiles";
import { saveJournalEntry, getJournalEntries, deleteJournalEntry } from "@/lib/api/journal";

export default function JournalPage() {
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [entries, setEntries] = useState([]);
  const [selectedMood, setSelectedMood] = useState("calm");
  const [encouragement, setEncouragement] = useState("");
  const [locked, setLocked] = useState(false);
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

        // Load journal entries from Supabase
        const { entries: journalEntries, error: entriesError } = await getJournalEntries();
        
        if (!entriesError && journalEntries) {
          // Convert to format expected by Timeline component
          const formattedEntries = journalEntries.map(entry => ({
            id: entry.id,
            date: entry.date,
            mood: 'calm', // Mood stored in UI state only, not in DB
            text: entry.text,
            attachment: null // Attachments not supported yet
          }));
          setEntries(formattedEntries);
        }
      } catch (error) {
        console.error("Error loading journal data:", error);
        window.location.href = "/login";
      } finally {
        setLoading(false);
      }
    }

    loadData();
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

  const handleSave = async (value, attachment) => {
    if (!value.trim()) return;

    try {
      // Save to Supabase (encrypted)
      const { entry: savedEntry, error: saveError } = await saveJournalEntry(
        value,
        null,
        selectedMood
      );

      if (saveError) {
        console.error("Error saving journal entry:", saveError);
        const errorMessage = saveError.message || saveError.code || "Unknown error";
        console.error("Error details:", errorMessage);
        setEncouragement(`Couldn't save entry: ${errorMessage}. Please try again.`);
        setTimeout(() => setEncouragement(""), 3000);
        return;
      }

      // Add to local state for immediate display
      const newEntry = {
        id: savedEntry.id,
        date: savedEntry.date,
        mood: selectedMood,
        text: value,
        attachment,
      };
      setEntries([newEntry, ...entries]);

      const affirmations = [
        "Your thoughts are safe here 💌",
        "You're growing beautifully 🌿",
        "Thank you for taking time for yourself 💖",
        "Small reflections make big changes ✨",
      ];
      setEncouragement(affirmations[Math.floor(Math.random() * affirmations.length)]);
      setTimeout(() => setEncouragement(""), 2500);
    } catch (error) {
      console.error("Error saving journal entry:", error);
      setEncouragement("Something went wrong. Please try again.");
      setTimeout(() => setEncouragement(""), 3000);
    }
  };

  const handleDeleteEntry = async (entryId) => {
    try {
      const { error } = await deleteJournalEntry(entryId);
      if (error) {
        console.error("Error deleting entry:", error);
        return;
      }
      // Remove from local state
      setEntries(entries.filter(e => e.id !== entryId));
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  return (
    <div className="min-h-screen relative w-full" style={{
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

      <div className="flex w-full">
        {/* Sidebar consistent with MoodGarden */}
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
                  item.href === "/features/journal" ? "bg-gray-100" : ""
                }`}
                style={{color: "var(--feelheal-purple)", fontSize: "18px"}}
                onClick={async () => { 
                  if (item.label === "Logout") {
                    try {
                      const { signOut } = await import("@/lib/api/auth");
                      await signOut();
                      // Clear encryption keys from sessionStorage
                      if (user?.id) {
                        sessionStorage.removeItem(`feelheal_encryption_key_${user.id}`);
                      }
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
          {loading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{borderColor: "var(--feelheal-purple)"}}></div>
            </div>
          ) : (
            <>
              {/* Centered title for consistency */}
              <div className="text-center mb-6">
                <div className="text-5xl mb-2">📓</div>
                <h1 className="text-4xl font-bold" style={{color: "var(--feelheal-purple)"}}>My Digital Diary</h1>
              </div>
              {locked ? (
                <PinLock onUnlock={() => setLocked(false)} />
              ) : (
                <div className="w-full">
                  <PromptBar selectedMood={selectedMood} setSelectedMood={setSelectedMood} />
                  <DiaryEditor accent={theme.accent} icon={theme.icon} onSave={handleSave} />
                  <Timeline entries={entries} onDelete={handleDeleteEntry} />
                </div>
              )}
            </>
          )}
        </main>
      </div>

      <EncouragementToast message={encouragement} />
    </div>
  );
}


