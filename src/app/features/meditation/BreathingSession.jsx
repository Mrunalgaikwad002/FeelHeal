"use client";

import { useEffect, useMemo, useState } from "react";
import { SESSION_LIBRARY } from "./sessionLibrary";
import { useVoiceGuide } from "./useVoiceGuide";

export default function BreathingSession({ duration, mode, onComplete, onCancel }) {
  const session = SESSION_LIBRARY[mode] || SESSION_LIBRARY.deep_breathe;
  const [voiceOn, setVoiceOn] = useState(true);

  const targetMinutes = useMemo(
    () => (duration ?? session.duration ?? 5),
    [duration, session.duration]
  );

  // auto end session after target minutes
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, targetMinutes * 60 * 1000);
    return () => clearTimeout(timer);
  }, [targetMinutes, onComplete]);

  // Voice guidance with hook
  useVoiceGuide(session, voiceOn);

  return (
    <div
      className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-10"
      style={{ background: session.gradient }}
    >
      <div className="max-w-3xl w-full bg-white/75 backdrop-blur-lg rounded-3xl p-8 md:p-10 shadow-xl border border-white/40">
        <div className="flex flex-col items-center text-center space-y-6">
          <img
            src={session.gif}
            alt={session.title}
            className="w-64 h-64 object-contain drop-shadow-xl"
          />
          <div>
            <h2 className="text-3xl font-bold mb-2" style={{ color: "var(--feelheal-purple)" }}>
              {session.title}
            </h2>
            <p className="text-lg text-gray-700">
              {session.subtitle}
            </p>
          </div>

          {/* Voice guidance control */}
          <div className="flex items-center gap-3 text-sm bg-white/70 border border-white/60 rounded-full px-3 py-1 shadow-sm">
            <span className="text-gray-600">Voice guide</span>
            <button
              onClick={() => setVoiceOn(v => !v)}
              className="px-3 py-1 rounded-full text-white"
              style={{ background: voiceOn ? "var(--feelheal-purple)" : "#9CA3AF" }}
              title={voiceOn ? "Turn off voice guide" : "Turn on voice guide"}
            >
              {voiceOn ? "On" : "Off"}
            </button>
          </div>

          <div className="w-full grid gap-3 text-left">
            {session.instructions.map((step, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-white/85 rounded-2xl px-4 py-3 shadow-inner"
              >
                <span className="text-xl font-semibold" style={{ color: "var(--feelheal-purple)" }}>
                  {index + 1}.
                </span>
                <p className="text-base text-gray-700 leading-relaxed">
                  {step}
                </p>
              </div>
            ))}
          </div>

          <p className="text-base text-gray-600 italic">
            {session.affirmation}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-4">
            <button
              onClick={onCancel}
              className="px-6 py-3 rounded-xl text-base font-medium text-gray-700 bg-white/70 hover:bg-white transition-colors shadow-sm"
            >
              Choose Another Session
            </button>
            <button
              onClick={onComplete}
              className="px-6 py-3 rounded-xl text-base font-semibold text-white transition-all"
              style={{
                background: "var(--feelheal-purple)",
                boxShadow: "0 6px 18px rgba(123, 44, 191, 0.35)"
              }}
            >
              End Session
            </button>
          </div>

          <p className="text-sm text-gray-500">
            We’ll wrap this session automatically after {targetMinutes} minutes if you’d prefer to stay present with the animation.
          </p>
        </div>
      </div>
    </div>
  );
}

