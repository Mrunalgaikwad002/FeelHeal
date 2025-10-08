"use client";

import { useState, useEffect } from "react";
import WelcomeSection from "./WelcomeSection";
import MoodTracker from "./MoodTracker";
import JournalSection from "./JournalSection";
import MeditationSection from "./MeditationSection";
import ChatbotSection from "./ChatbotSection";
import AffirmationsSection from "./AffirmationsSection";
import GoalsSection from "./GoalsSection";
import GamesSection from "./GamesSection";
import HumorSection from "./HumorSection";
import QuickActions from "./QuickActions";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [isFirstTime, setIsFirstTime] = useState(false);

  useEffect(() => {
    try {
      const userData = localStorage.getItem("feelheal_user");
      const onboardingData = localStorage.getItem("feelheal_onboarding_responses");
      
      if (userData) {
        setUser(JSON.parse(userData));
      }
      
      // Check if this is a first-time user (has onboarding data but no previous dashboard visits)
      const hasSeenDashboard = localStorage.getItem("feelheal_seen_dashboard");
      setIsFirstTime(!!onboardingData && !hasSeenDashboard);
      
      // Mark that user has seen dashboard
      localStorage.setItem("feelheal_seen_dashboard", "true");
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{borderColor: "var(--feelheal-purple)"}}></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{
      background: "linear-gradient(135deg, #f8f4ff 0%, #e8f4fd 100%)"
    }}>
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🌸</span>
              <h1 className="text-xl font-bold" style={{color: "var(--feelheal-purple)"}}>
                FeelHeal
              </h1>
            </div>
            <QuickActions user={user} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <WelcomeSection user={user} isFirstTime={isFirstTime} />
        
        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {/* Mood Tracker */}
          <MoodTracker isFirstTime={isFirstTime} />
          
          {/* Journal */}
          <JournalSection isFirstTime={isFirstTime} />
          
          {/* Meditation */}
          <MeditationSection isFirstTime={isFirstTime} />
          
          {/* Chatbot */}
          <ChatbotSection isFirstTime={isFirstTime} />
          
          {/* Affirmations */}
          <AffirmationsSection isFirstTime={isFirstTime} />
          
          {/* Goals */}
          <GoalsSection isFirstTime={isFirstTime} />
          
          {/* Games */}
          <GamesSection isFirstTime={isFirstTime} />
          
          {/* Humor */}
          <HumorSection isFirstTime={isFirstTime} />
        </div>
      </main>
    </div>
  );
}
