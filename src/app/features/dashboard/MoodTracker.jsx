"use client";

import { useState, useEffect } from "react";

export default function MoodTracker({ isFirstTime }) {
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);

  const moods = [
    { emoji: "😊", label: "Happy", value: "happy", color: "bg-yellow-100 border-yellow-300" },
    { emoji: "😌", label: "Calm", value: "calm", color: "bg-green-100 border-green-300" },
    { emoji: "😔", label: "Sad", value: "sad", color: "bg-blue-100 border-blue-300" },
    { emoji: "😤", label: "Stressed", value: "stressed", color: "bg-red-100 border-red-300" },
    { emoji: "😴", label: "Tired", value: "tired", color: "bg-purple-100 border-purple-300" },
    { emoji: "😶", label: "Numb", value: "numb", color: "bg-gray-100 border-gray-300" }
  ];

  useEffect(() => {
    // Load mood history from localStorage
    const saved = localStorage.getItem("feelheal_mood_history");
    if (saved) {
      setMoodHistory(JSON.parse(saved));
    }
  }, []);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    const today = new Date().toISOString().split('T')[0];
    const newEntry = { mood: mood.value, date: today, emoji: mood.emoji };
    
    const updatedHistory = [...moodHistory.filter(entry => entry.date !== today), newEntry];
    setMoodHistory(updatedHistory);
    localStorage.setItem("feelheal_mood_history", JSON.stringify(updatedHistory));
  };

  const getRecentMoods = () => {
    return moodHistory.slice(-7).reverse();
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-lg">
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-3">🌦️</span>
        <h3 className="text-xl font-semibold" style={{color: "var(--feelheal-purple)"}}>
          Mood Tracker
        </h3>
      </div>

      {isFirstTime ? (
        <div className="text-center">
          <p className="text-gray-600 mb-4">Select how you feel today 🌸</p>
          <div className="grid grid-cols-2 gap-3">
            {moods.map((mood) => (
              <button
                key={mood.value}
                onClick={() => handleMoodSelect(mood)}
                className={`p-3 rounded-xl border-2 transition-all ${
                  selectedMood?.value === mood.value 
                    ? `${mood.color} border-2` 
                    : "bg-white/50 hover:bg-white/70 border-white/30"
                }`}
              >
                <div className="text-2xl mb-1">{mood.emoji}</div>
                <div className="text-sm font-medium">{mood.label}</div>
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">
            💡 Click on a mood to log how you're feeling
          </p>
        </div>
      ) : (
        <div>
          {/* Quick mood selection */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-3">How are you feeling today?</p>
            <div className="flex flex-wrap gap-2">
              {moods.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => handleMoodSelect(mood)}
                  className={`px-3 py-2 rounded-full text-sm transition-all ${
                    selectedMood?.value === mood.value 
                      ? `${mood.color} border-2` 
                      : "bg-white/50 hover:bg-white/70 border border-white/30"
                  }`}
                >
                  {mood.emoji} {mood.label}
                </button>
              ))}
            </div>
          </div>

          {/* Recent mood history */}
          {moodHistory.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Moods</h4>
              <div className="flex space-x-2">
                {getRecentMoods().slice(0, 5).map((entry, index) => (
                  <div key={index} className="text-center">
                    <div className="text-lg">{entry.emoji}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
