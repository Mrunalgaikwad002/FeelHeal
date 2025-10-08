"use client";

import { useState, useEffect } from "react";

export default function AffirmationsSection({ isFirstTime }) {
  const [currentAffirmation, setCurrentAffirmation] = useState(0);

  const affirmations = [
    "I am worthy of love and happiness 💖",
    "Every challenge makes me stronger 💪",
    "I choose to focus on what I can control 🌟",
    "My feelings are valid and important 🌸",
    "I am growing and learning every day 🌱",
    "I deserve peace and joy in my life ✨",
    "I am capable of overcoming any obstacle 🚀",
    "Self-care is a priority, not a luxury 🌺"
  ];

  useEffect(() => {
    setCurrentAffirmation(Math.floor(Math.random() * affirmations.length));
  }, []);

  const getNewAffirmation = () => {
    setCurrentAffirmation(Math.floor(Math.random() * affirmations.length));
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-lg">
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-3">🌸</span>
        <h3 className="text-xl font-semibold" style={{color: "var(--feelheal-purple)"}}>
          Daily Affirmations
        </h3>
      </div>

      {isFirstTime ? (
        <div className="text-center">
          <div className="mb-4">
            <div className="text-4xl mb-2">✨</div>
            <p className="text-gray-600 mb-4">Daily motivational quotes and affirmations</p>
            <p className="text-sm text-gray-500">
              Start your day with positive energy and self-love.
            </p>
          </div>
          <button 
            onClick={getNewAffirmation}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium hover:from-pink-600 hover:to-rose-600 transition-all"
          >
            Get Affirmation
          </button>
        </div>
      ) : (
        <div>
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-4 mb-4">
            <div className="text-center">
              <div className="text-2xl mb-2">✨</div>
              <p className="text-gray-700 italic mb-3">
                "{affirmations[currentAffirmation]}"
              </p>
              <button 
                onClick={getNewAffirmation}
                className="text-sm px-3 py-1 rounded-full bg-pink-100 hover:bg-pink-200 transition-colors"
                style={{color: "var(--feelheal-purple)"}}
              >
                New Affirmation
              </button>
            </div>
          </div>
          <div className="text-center">
            <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              Save to Favorites
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
