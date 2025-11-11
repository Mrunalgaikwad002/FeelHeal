"use client";

import { useMemo } from "react";
import { reminderQuotes } from "./SettingsData";

export default function SettingsHeader({ onReset }) {
  const todayReminder = useMemo(() => {
    const index = Math.floor(Math.random() * reminderQuotes.length);
    return reminderQuotes[index];
  }, []);

  return (
    <>
      {/* Centered Title Block */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center gap-3 mb-4">
          <span className="text-5xl">⚙️</span>
          <h1 className="text-4xl font-bold" style={{ color: "var(--feelheal-purple)" }}>
            Settings
          </h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Customize your comfort space — shape FeelHeal your way 💖
        </p>
      </div>

      <section className="bg-white/80 backdrop-blur-md border border-white/40 rounded-3xl p-8 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-white/30 pointer-events-none" />
        <div className="relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white/70 border border-white/60 rounded-2xl px-6 py-4">
            <div className="flex items-center gap-4">
              <span className="text-4xl">🌼</span>
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[#9b7bd8] font-semibold">Today's gentle reminder</p>
                <p className="text-lg text-[#5c4785] font-medium">{todayReminder}</p>
              </div>
            </div>
            <button
              onClick={onReset}
              className="px-5 py-3 rounded-full font-semibold shadow-md bg-[#f9e8ff] hover:bg-[#f5defe] transition-colors"
              style={{ color: "var(--feelheal-purple)" }}
            >
              Reset to defaults ↺
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

