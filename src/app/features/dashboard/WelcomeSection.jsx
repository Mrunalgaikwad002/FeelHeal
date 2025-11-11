"use client";

import { useState, useEffect } from "react";

export default function WelcomeSection({ user, isFirstTime }) {
  const dailyAffirmations = [
    "You are worthy of love and happiness 💖",
    "Every small step forward is progress 🌱",
    "Your feelings are valid and important 🌸",
    "You have the strength to overcome challenges 💪",
    "Take time to breathe and be present 🧘‍♀️",
    "You are growing and learning every day 🌟",
    "Self-care is not selfish, it's necessary 🌺",
    "You deserve peace and joy in your life ✨"
  ];

  const [currentAffirmation, setCurrentAffirmation] = useState(0);
  const [affirmationKey, setAffirmationKey] = useState(0);

  useEffect(() => {
    // Set a random affirmation on component mount
    setCurrentAffirmation(Math.floor(Math.random() * dailyAffirmations.length));
  }, []);

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-white/20 shadow-lg relative overflow-hidden">
      <div className="text-center">
        {/* Welcome Message */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-2" style={{color: "var(--feelheal-purple)"}}>
          {isFirstTime ? (
            <>
              Welcome to FeelHeal, {user.name}! 💖
            </>
          ) : (
            <>
              <span>Hi {user.name}! How are you feeling today?</span>
              <span
                aria-hidden="true"
                className="inline-block align-middle select-none"
                style={{
                  height: '36px',
                  width: '36px',
                  backgroundImage: "url('/mood.gif')",
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  transform: 'scale(2.4)',
                  transformOrigin: 'center',
                  marginLeft: '8px',
                  pointerEvents: 'none'
                }}
              />
            </>
          )}
        </h1>
        
        {isFirstTime && (
          <p className="text-xl text-gray-700 mb-6">
            This is your space to pause, breathe, and feel better — one day at a time.
          </p>
        )}

        {/* Today's Highlight (Affirmation) */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 border border-purple-200 fade-in-soft" key={affirmationKey}>
          <div className="flex items-center justify-center mb-3">
            <span className="text-3xl mr-2">✨</span>
            <h3 className="text-xl font-semibold" style={{color: "var(--feelheal-purple)"}}>
              Today's Highlight
            </h3>
            <span className="text-3xl ml-2">✨</span>
          </div>
          <p className="text-xl text-gray-700 italic">
            "{dailyAffirmations[currentAffirmation]}"
          </p>
          <button 
            onClick={() => { const idx = Math.floor(Math.random() * dailyAffirmations.length); setCurrentAffirmation(idx); setAffirmationKey(k => k + 1); }}
            className="mt-4 text-base px-5 py-2.5 rounded-full bg-white/50 hover:bg-white/70 transition-colors btn-pulse btn-ripple font-medium"
            style={{color: "var(--feelheal-purple)"}}
          >
            Get New Affirmation
          </button>
        </div>

        {/* First-time user tips */}
        {isFirstTime && (
          <div className="mt-6 p-5 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-base text-blue-700">
              💡 <strong>Tip:</strong> Start by logging your mood today, then explore the different tools to find what works best for you!
            </p>
          </div>
        )}
      </div>

      {/* Decorative gif removed as it interfered with layout; mood gif now lives in MoodTracker prompt */}
    </div>
  );
}
