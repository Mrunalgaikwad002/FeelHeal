"use client";

import { useState, useEffect, useRef } from "react";
import AIGuide from "./AIGuide";
import { SESSION_LIBRARY } from "./sessionLibrary";

const MOOD_SUGGESTIONS = {
  stressed: {
    message: "You've had a long day. Let's unwind with a soft calm reset.",
    duration: 5,
    sessionKey: "calm_reset"
  },
  sad: {
    message: "Take a moment to breathe and find your center.",
    duration: 5,
    sessionKey: "deep_breathe"
  },
  calm: {
    message: "You're in a peaceful flow today. Let's deepen that calm with a focus count.",
    duration: 4,
    sessionKey: "focus_count"
  },
  happy: {
    message: "Your joy is beautiful. Keep the energy flowing with mindful movement.",
    duration: 5,
    sessionKey: "energizing_flow"
  },
  tired: {
    message: "You deserve to rest. A calm reset will feel lovely right now.",
    duration: 5,
    sessionKey: "calm_reset"
  },
  numb: {
    message: "Let's gently reconnect with your breath and find presence.",
    duration: 5,
    sessionKey: "deep_breathe"
  }
};

const SESSION_OPTIONS = Object.values(SESSION_LIBRARY);

export default function MeditationWelcome({ userMood, onStart }) {
  const [showGuide, setShowGuide] = useState(true);
  const [ripples, setRipples] = useState([]);
  const [sparkles, setSparkles] = useState([]);
  const containerRef = useRef(null);
  const suggestion = userMood ? MOOD_SUGGESTIONS[userMood] : null;
  const recommendedKey = suggestion?.sessionKey;
  const recommendedSession = recommendedKey ? SESSION_LIBRARY[recommendedKey] : null;
  const quickMode = recommendedKey || "deep_breathe";
  const quickDuration = suggestion?.duration ?? SESSION_LIBRARY[quickMode].duration;
  const quickLabel = recommendedSession
    ? `✨ Start ${recommendedSession.title}`
    : "✨ Start My 5-Minute Calm";

  useEffect(() => {
    // Auto-play gentle ambient sound
    playAmbientSound();
    
    // Show AI guide message after a moment
    const timer = setTimeout(() => {
      setShowGuide(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Create ripple effect
      const newRipple = {
        id: Date.now(),
        x,
        y,
        size: 0
      };
      
      setRipples(prev => [...prev.slice(-4), newRipple]);
      
      // Animate ripple
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 1000);
    }
  };

  const handleClick = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Create sparkle effect
      const emojis = ['✨', '💫', '⭐', '🌟', '🌸'];
      const newSparkle = {
        id: Date.now(),
        x,
        y,
        emoji: emojis[Math.floor(Math.random() * emojis.length)]
      };
      
      setSparkles(prev => [...prev, newSparkle]);
      
      // Remove sparkle after animation
      setTimeout(() => {
        setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
      }, 2000);
    }
  };

  const playAmbientSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      // Create a gentle ambient tone
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 220; // Low, calming frequency
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + 2);
      
      oscillator.start(audioContext.currentTime);
      // Stop after 10 seconds (gentle fade)
      oscillator.stop(audioContext.currentTime + 10);
    } catch (error) {
      console.log("Sound not available");
    }
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-[70vh] flex flex-col items-center justify-center text-center relative"
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      {/* Ripple effects */}
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            width: '0px',
            height: '0px',
            border: '2px solid rgba(123, 44, 191, 0.3)',
            transform: 'translate(-50%, -50%)',
            animation: 'ripple 1s ease-out forwards'
          }}
        />
      ))}

      {/* Sparkle effects */}
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="absolute pointer-events-none text-2xl"
          style={{
            left: `${sparkle.x}px`,
            top: `${sparkle.y}px`,
            transform: 'translate(-50%, -50%)',
            animation: 'sparkle 2s ease-out forwards'
          }}
        >
          {sparkle.emoji}
        </div>
      ))}

      {/* AI Guide Message */}
      {showGuide && (
        <AIGuide 
          message={suggestion?.message || "Hey there, welcome back 💫 Let's just take a few deep breaths together."}
          onDismiss={() => setShowGuide(false)}
        />
      )}

      {/* Main Welcome */}
      <div className="mt-8 w-full">
        <h1 className="text-5xl font-bold mb-4" style={{color: "var(--feelheal-purple)"}}>
          🧘‍♀️ Meditation Space
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Your peaceful moment awaits
        </p>

        {/* Session Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 max-w-5xl mx-auto">
          {SESSION_OPTIONS.map(option => {
            const isRecommended = option.key === recommendedKey;
            const cardDuration = isRecommended && suggestion?.duration ? suggestion.duration : option.duration;

            return (
            <div
              key={option.key}
              className="relative rounded-3xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
              style={{
                background: option.gradient,
                boxShadow: `0 12px 30px ${option.accent}33`
              }}
              onClick={() => onStart(option.key, cardDuration)}
            >
              <div className="absolute right-4 top-4 text-sm font-semibold text-gray-700 bg-white/80 px-3 py-1 rounded-full shadow">
                ⏳ {cardDuration} min
              </div>
              {isRecommended && (
                <div className="absolute left-4 top-4 bg-white/80 text-sm font-semibold text-purple-700 px-3 py-1 rounded-full shadow">
                  ⭐ Recommended today
                </div>
              )}
              <div className="flex flex-col items-center text-center space-y-4">
                <img
                  src={option.gif}
                  alt={option.title}
                  className="w-48 h-48 object-contain drop-shadow-md"
                />
                <h3 className="text-2xl font-bold" style={{ color: option.accent }}>
                  {option.title}
                </h3>
                <p className="text-base text-gray-700">
                  {option.subtitle}
                </p>
                <button
                  className="px-6 py-3 rounded-xl text-base font-semibold text-white transition-all"
                  style={{
                    background: option.accent,
                    boxShadow: `0 4px 14px ${option.accent}55`
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onStart(option.key, cardDuration);
                  }}
                >
                  {option.buttonText}
                </button>
              </div>
            </div>
          );
          })}
        </div>

        {/* Quick Start Button */}
        <div className="flex justify-center">
          <button
            onClick={() => onStart(quickMode, quickDuration)}
            className="px-8 py-4 rounded-2xl text-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              background: "linear-gradient(135deg, var(--feelheal-purple), var(--feelheal-blue))",
              boxShadow: "0 10px 30px rgba(123, 44, 191, 0.4)"
            }}
          >
            {quickLabel}
          </button>
        </div>

        {suggestion && (
          <div className="mt-8 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl border border-purple-200 max-w-md mx-auto">
            <p className="text-base text-gray-700 italic">
              💡 {suggestion.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

