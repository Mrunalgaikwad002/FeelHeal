"use client";

import { useState, useEffect } from "react";
import { SESSION_LIBRARY } from "./sessionLibrary";

export default function SessionSummary({ duration, mode, onFinish }) {
  const [showAnimation, setShowAnimation] = useState(true);
  const session = SESSION_LIBRARY[mode] || SESSION_LIBRARY.deep_breathe;
  const summary = session.summary;

  useEffect(() => {
    // Play completion sound
    playCompletionSound();
    
    // Show confetti/sparkles
    setTimeout(() => {
      setShowAnimation(false);
    }, 3000);
  }, []);

  const playCompletionSound = () => {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      const audioContext = new Ctx();
      if (audioContext.state === "suspended") {
        audioContext.resume().catch(() => {});
      }
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 600;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      // Louder and slightly longer decay
      gainNode.gain.linearRampToValueAtTime(0.18, audioContext.currentTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.02, audioContext.currentTime + 0.4);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.4);
    } catch (error) {
      console.log("Sound not available");
    }
  };

  return (
    <div
      className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6"
      style={{
        background: summary.background
      }}
    >
      {/* Confetti Animation */}
      {showAnimation && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '2s'
              }}
            >
              {['✨', '🌸', '🌼', '💫', '⭐'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      {/* Summary GIF */}
      <div className="mb-6">
        <img 
          src={summary.gif} 
          alt={session.title} 
          className="w-48 h-48 object-contain mx-auto"
        />
      </div>

      {/* Summary Card */}
      <div
        className="bg-white/95 backdrop-blur-sm rounded-3xl p-10 shadow-xl border max-w-md w-full animate-fadeInSoft"
        style={{ borderColor: `${session.accent}33` }}
      >
        <h2 className="text-3xl font-bold mb-2" style={{color: "var(--feelheal-purple)"}}>
          {summary.title}
        </h2>
        <p className="text-base text-gray-600 mb-4">
          {summary.message}
        </p>
        
        <div className="space-y-4 mb-6">
          <p className="text-xl text-gray-700">
            You spent {duration} minutes calming your mind.
          </p>
          <p className="text-lg text-gray-600">
            Your peace level increased. 🌸
          </p>
        </div>

        {/* Auto-logged info */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 mb-6 border border-purple-200">
          <p className="text-sm text-gray-600 mb-2">✨ Auto-logged to your progress:</p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              🌦️ <span className="text-gray-700">Mood Garden</span>
            </span>
            <span className="text-gray-400">•</span>
            <span className="flex items-center gap-1">
              🌌 <span className="text-gray-700">Goal Universe</span>
            </span>
          </div>
        </div>

        <button
          onClick={onFinish}
          className="w-full px-6 py-3 rounded-xl text-base font-medium text-white transition-all hover:scale-105"
          style={{
            background: session.accent,
            boxShadow: `0 4px 12px ${session.accent}55`
          }}
        >
          Return to Meditation
        </button>
      </div>
    </div>
  );
}

