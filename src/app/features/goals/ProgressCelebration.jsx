"use client";

import { useState, useEffect } from "react";

export default function ProgressCelebration({ goal, progress }) {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (progress === 25) {
      setMessage("25% Complete! You're on your way! 🌟");
      setShow(true);
    } else if (progress === 50) {
      setMessage("Halfway there! Keep shining! ✨");
      setShow(true);
    } else if (progress === 75) {
      setMessage("75% Complete! Almost at the stars! 🌠");
      setShow(true);
    } else if (progress === 100) {
      setMessage("Goal Complete! Your star is now a constellation! ⭐");
      setShow(true);
    }

    if (show) {
      setTimeout(() => setShow(false), 3000);
    }
  }, [progress, show]);

  if (!show) return null;

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-fadeInSoft">
      <div className="bg-gradient-to-r from-purple-500/95 to-pink-500/95 backdrop-blur-sm rounded-3xl px-10 py-6 shadow-2xl border-2 border-white/30">
        <div className="text-center">
          <div className="text-5xl mb-3 animate-pulse">🎉</div>
          <p className="text-2xl font-bold text-white mb-2">{goal.title}</p>
          <p className="text-xl text-white/90">{message}</p>
        </div>
      </div>
    </div>
  );
}

