"use client";

import { useEffect, useMemo, useState } from "react";
import { getCurrentUser } from "@/lib/api/auth";
import { getCurrentProfile } from "@/lib/api/profiles";
import { detectEmotion, EMOTION_THEMES } from "./emotionUtils";
import { useCompanionChat } from "./useCompanionChat";
import CompanionHeader from "./CompanionHeader";
import CompanionSidebar from "./CompanionSidebar";
import ChatContainer from "./ChatContainer";
import ChatInput from "./ChatInput";

export default function CompanionPage() {
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  
  // Chat logic hook
  const { messages, input, setInput, typing, handleSend } = useCompanionChat(user?.name);

  // Load user from Supabase
  useEffect(() => {
    async function loadUser() {
      try {
        const { user: authUser, error: userError } = await getCurrentUser();
        
        if (userError || !authUser) {
          window.location.href = "/login";
          return;
        }

        const { profile } = await getCurrentProfile();
        
        // Derive display name from email
        let displayName = null;
        if (authUser.email) {
          const emailPrefix = authUser.email.split("@")[0];
          displayName = emailPrefix
            .split(/[._-]+/)
            .map(s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
            .join(" ");
        }
        
        if (!displayName) {
          displayName = profile?.display_name || 
                       authUser.user_metadata?.display_name || 
                       "User";
        }

        setUser({
          id: authUser.id,
          email: authUser.email,
          name: displayName
        });
      } catch (error) {
        console.error("Error loading user:", error);
        window.location.href = "/login";
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  // Detect emotion and get theme
  const emotion = useMemo(() => {
    const lastAI = [...messages].reverse().find(m => m.role === "ai");
    return lastAI ? detectEmotion(lastAI.text) : "default";
  }, [messages]);
  
  const theme = EMOTION_THEMES[emotion] || EMOTION_THEMES.default;

  if (loading || !user) {
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

      <CompanionHeader 
        user={user} 
        isSidebarOpen={isSidebarOpen} 
        onToggleSidebar={() => setIsSidebarOpen(v => !v)} 
      />

      {/* Body with Sidebar */}
      <div className="flex w-full">
        <CompanionSidebar isSidebarOpen={isSidebarOpen} />

        {/* Main Content */}
        <main className="flex-1 min-w-0 px-4 md:px-8 py-6 relative z-10">
          {/* Centered title */}
          <div className="text-center mb-6">
            <div className="text-5xl mb-2">🤖</div>
            <h1 className="text-4xl font-bold" style={{color: "var(--feelheal-purple)"}}>MyBuddy</h1>
          </div>

          {/* Chat container */}
          <div className="w-full mx-auto bg-white/70 backdrop-blur-md rounded-3xl border border-white/30 shadow-xl overflow-hidden" style={{maxWidth: 1200}}>
            <ChatContainer messages={messages} theme={theme} typing={typing} />
            <ChatInput 
              input={input} 
              setInput={setInput} 
              onSend={handleSend}
              disabled={typing}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
