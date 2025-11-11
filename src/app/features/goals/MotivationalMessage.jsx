"use client";

import { useState, useEffect } from "react";

const MOTIVATIONAL_MESSAGES = [
  "Every step forward is progress ✨",
  "Your dedication is lighting up the universe 🌟",
  "Small steps lead to big achievements 🌠",
  "You're creating your own constellation of success ⭐",
  "Keep going, you're doing amazing! 💫",
  "Your goals are within reach 🌌",
  "Progress, not perfection 🌙",
  "You're building something beautiful ✨"
];

export default function MotivationalMessage({ goals, trigger }) {
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (trigger) {
      const activeGoals = goals.filter(g => !g.completed);
      const avgProgress = activeGoals.length > 0
        ? activeGoals.reduce((sum, g) => sum + g.progress, 0) / activeGoals.length
        : 0;

      let selectedMessage;
      if (avgProgress >= 80) {
        selectedMessage = "You're almost there! Your universe is shining bright! 🌟";
      } else if (avgProgress >= 50) {
        selectedMessage = "You're halfway to the stars! Keep going! ✨";
      } else if (avgProgress > 0) {
        selectedMessage = MOTIVATIONAL_MESSAGES[Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)];
      } else {
        selectedMessage = "Start your journey and watch your universe grow! 🌌";
      }

      setMessage(selectedMessage);
      setShow(true);
      
      setTimeout(() => {
        setShow(false);
      }, 4000);
    }
  }, [trigger, goals]);

  if (!show || !message) return null;

  return (
    <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 animate-fadeInSoft">
      <div className="bg-gradient-to-r from-purple-500/90 to-pink-500/90 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-2xl border border-white/30">
        <p className="text-xl font-bold text-white text-center animate-pulse">
          {message}
        </p>
      </div>
    </div>
  );
}

