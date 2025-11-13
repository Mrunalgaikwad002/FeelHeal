"use client";

import { useState, useEffect } from "react";
import WelcomeSection from "./WelcomeSection";
import MoodTracker from "./MoodTracker";
import JournalSection from "./JournalSection";
import GoalsSection from "./GoalsSection";
import QuickActions from "./QuickActions";
import WellnessNotifications from "./WellnessNotifications";
import { getCurrentUser } from "@/lib/api/auth";
import { getCurrentProfile } from "@/lib/api/profiles";
import { updateLastActiveDate } from "@/lib/api/profiles";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        // Get current user from Supabase
        const { user: authUser, error: userError } = await getCurrentUser();
        
        if (userError || !authUser) {
          console.warn("No authenticated user");
          window.location.href = "/login";
          return;
        }

        console.log("Current authenticated user:", {
          id: authUser.id,
          email: authUser.email,
          metadata: authUser.user_metadata
        });

        // Get user profile - force fresh fetch
        const { profile: userProfile, error: profileError } = await getCurrentProfile();
        
        console.log("Profile data:", {
          profile: userProfile,
          error: profileError
        });

        if (profileError && profileError.code !== 'PGRST116') {
          console.error("Error loading profile:", profileError);
        }

        // Determine display name - prioritize email prefix (what user logged in with)
        // This ensures consistency across the app
        let displayName = null;
        
        // First, try to get from email prefix (what they logged in with)
        if (authUser.email) {
          const emailPrefix = authUser.email.split("@")[0];
          displayName = emailPrefix
            .split(/[._-]+/)
            .map(s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
            .join(" ");
        }
        
        // Fallback to profile display_name if email parsing fails
        if (!displayName) {
          displayName = userProfile?.display_name;
        }
        
        // Fallback to user metadata
        if (!displayName) {
          displayName = authUser.user_metadata?.display_name;
        }
        
        // Final fallback
        if (!displayName) {
          displayName = "User";
        }

        // Update profile if display_name doesn't match email prefix
        // This ensures the profile always reflects the login email
        if (authUser.email && userProfile?.display_name !== displayName) {
          const { upsertProfile } = await import("@/lib/api/profiles");
          await upsertProfile(authUser.id, displayName);
          // Reload profile after update
          const { profile: updatedProfile } = await getCurrentProfile();
          if (updatedProfile) {
            setProfile(updatedProfile);
          }
        }

        console.log("Final display name:", displayName);

        // Create user object for display
        const displayUser = {
          id: authUser.id,
          email: authUser.email,
          name: displayName
        };

        setUser(displayUser);
        setProfile(userProfile);

        // Update last active date
        await updateLastActiveDate(authUser.id);

        // Check if this is a first-time user (first time seeing dashboard after onboarding)
        const hasSeenDashboard = localStorage.getItem("feelheal_seen_dashboard");
        const onboardingCompleted = userProfile?.onboarding_completed ?? false;
        setIsFirstTime(onboardingCompleted && !hasSeenDashboard);
        
        // Mark that user has seen dashboard
        localStorage.setItem("feelheal_seen_dashboard", "true");
        
        // If onboarding not completed, redirect to onboarding
        if (!onboardingCompleted) {
          window.location.href = "/onboarding";
          return;
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        window.location.href = "/login";
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{borderColor: "var(--feelheal-purple)"}}></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative" style={{
      background: "linear-gradient(135deg, #f8f4ff 0%, #e8f4fd 100%)"
    }}>
      {/* Wellness Notifications */}
      <WellnessNotifications />
      
      {/* Floating petals / hearts background (fixed in globals) */}
      <div className="floating-bg">
        {Array.from({ length: 32 }).map((_, i) => (
          <span
            key={i}
            className={`petal ${i % 3 === 0 ? 'small' : i % 3 === 1 ? 'medium' : 'large'}`}
            style={{
              left: `${(i * 3.3) % 100}%`,
              animationDelay: `${(i % 12) * 0.6}s`,
              top: `-${(i % 7) * 12}%`
            }}
          />
        ))}
        {/* Emoji petals for guaranteed visibility */}
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={`e-${i}`}
            className="petal-emoji"
            style={{
              left: `${(i * 12.5) % 100}%`,
              animationDelay: `${0.6 * i}s`,
              top: `-${(i % 4) * 15}%`
            }}
          >
            🌸
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
              <span className="text-3xl">🌸</span>
              <h1 className="text-2xl font-bold" style={{color: "var(--feelheal-purple)"}}>
                FeelHeal
              </h1>
            </div>
            <QuickActions user={user} />
          </div>
        </div>
      </header>

      {/* Body with Sidebar */}
      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${isSidebarOpen ? "w-64" : "w-16"} transition-all duration-300 bg-white/70 backdrop-blur-sm border-r border-white/20 h-[calc(100vh-64px)] sticky top-16 self-start hidden md:block flex-shrink-0`}
        >
          <nav className="p-4 space-y-1.5 text-lg">
            {[
              { icon: "🏠", label: "Dashboard" },
              { icon: "🌦️", label: "Mood Garden", href: "/features/mood" },
              { icon: "✍️", label: "Journal", target: "#card-journal" },
              { icon: "🌌", label: "Goal Universe", target: "#card-goals" },
              { icon: "🧘‍♀️", label: "Meditation", href: "/features/meditation" },
              { icon: "💬", label: "MyBuddy", href: "/features/companion" },
              
              { icon: "🕹️", label: "Games", href: "/games" },
              { icon: "😂", label: "Humor", href: "/humor" },
              { icon: "⚙️", label: "Settings", href: "/features/settings" },
              { icon: "🔓", label: "Logout" }
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 cursor-pointer"
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
                      // Still redirect even if logout fails
                      window.location.href = "/";
                    }
                  } else if (item.target) { 
                    const el = document.querySelector(item.target); 
                    if (el) {
                      // Scroll with offset for header
                      const headerOffset = 80;
                      const elementPosition = el.getBoundingClientRect().top;
                      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                      });
                    }
                    return; 
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
        <main className="flex-1 px-6 py-8 relative z-10">
          {/* Welcome Section */}
          <WelcomeSection user={user} isFirstTime={isFirstTime} />

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 items-stretch content-stretch">
            {/* Mood Tracker */}
            <section id="card-mood" className="h-full">
              <MoodTracker isFirstTime={false} />
            </section>

            {/* Journal */}
            <section id="card-journal" className="h-full">
              <JournalSection isFirstTime={false} />
            </section>

            {/* Goals */}
            <section id="card-goals" className="h-full">
              <GoalsSection isFirstTime={false} />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
