"use client";

import { useState, useEffect } from "react";

const wellnessNotifications = [
  "Did you sleep well? 😴",
  "How are you feeling today? 💭",
  "Take a moment to breathe deeply 🌬️",
  "Have you had enough water today? 💧",
  "Remember to take breaks! ⏸️",
  "How's your energy level? ⚡",
  "Did you move your body today? 🏃‍♀️",
  "What are you grateful for today? 🙏",
  "Have you checked in with yourself? 💚",
  "Take a moment to stretch! 🧘‍♀️",
  "How's your mood right now? 🌈",
  "Did you eat something nourishing? 🥗",
  "Remember: progress, not perfection! ✨",
  "How can you be kind to yourself today? 💖",
  "Have you spent time in nature? 🌿",
  "Did you connect with someone today? 👥",
  "What made you smile today? 😊",
  "Take a moment to appreciate yourself! 🌟",
  "How are you taking care of yourself? 🛁",
  "Remember: you're doing your best! 💪",
  "Did you do something you enjoy? 🎨",
  "How's your stress level? 🧘",
  "Have you practiced self-compassion? 💜",
  "What's one thing you're proud of today? 🏆",
  "Did you get some fresh air? 🌤️",
  "How can you show yourself love today? ❤️",
  "Have you taken time to rest? 😌",
  "What's bringing you joy right now? 🌸",
  "Remember: it's okay to take it slow! 🐢",
  "How are you feeling emotionally? 💙"
];

export default function WellnessNotifications() {
  const [currentNotification, setCurrentNotification] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show first notification immediately
    const showNotification = () => {
      const randomIndex = Math.floor(Math.random() * wellnessNotifications.length);
      setCurrentNotification(wellnessNotifications[randomIndex]);
      setIsVisible(true);
      
      // Hide after 4 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 4000);
    };

    // Show first notification
    showNotification();

    // Set interval to show new notification every minute (60000ms)
    const interval = setInterval(() => {
      showNotification();
    }, 60000); // 1 minute = 60000 milliseconds

    return () => clearInterval(interval);
  }, []);

  if (!currentNotification) return null;

  return (
    <div
      className={`fixed top-20 right-6 z-50 transition-all duration-500 ease-in-out ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-[-20px] pointer-events-none"
      }`}
    >
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-200 px-6 py-4 max-w-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl flex-shrink-0">
            💬
          </div>
          <p className="text-base font-medium" style={{color: "var(--feelheal-purple)"}}>
            {currentNotification}
          </p>
        </div>
      </div>
    </div>
  );
}

