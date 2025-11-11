"use client";

import { companionPersonalities } from "./SettingsData";

export default function CompanionSection({ settings, onSettingChange }) {
  return (
    <section className="bg-white/75 backdrop-blur-md border border-white/40 rounded-3xl p-8 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">🤖</span>
        <div>
          <h3 className="text-2xl font-semibold" style={{ color: "var(--feelheal-purple)" }}>
            MyBuddy Settings
          </h3>
          <p className="text-gray-600">Change how your AI friend talks to you.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {companionPersonalities.map((persona) => (
          <button
            key={persona.id}
            onClick={() => onSettingChange(["companion", "personality"], persona.id)}
            className={`rounded-2xl border p-5 text-left transition ${
              settings.companion.personality === persona.id
                ? "border-[#9b7bd8] bg-white/90 shadow-lg"
                : "border-transparent bg-white/60"
            }`}
          >
            <p className="text-lg font-semibold text-[#2b2150] mb-2">{persona.label}</p>
            <p className="text-sm text-gray-600">{persona.description}</p>
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between rounded-2xl bg-white/70 border border-white/60 p-5">
        <div>
          <p className="text-lg font-semibold text-[#2b2150]">Conversation mode</p>
          <p className="text-sm text-gray-600">Choose between text-only now, voice in the future.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => onSettingChange(["companion", "mode"], "text")}
            className={`px-5 py-2 rounded-full font-semibold transition ${
              settings.companion.mode === "text" ? "bg-[#f2e8ff] text-[#7d54c2]" : "bg-white text-[#2b2150]"
            }`}
          >
            Text
          </button>
          <button
            disabled
            className="px-5 py-2 rounded-full font-semibold bg-gray-100 text-gray-400 cursor-not-allowed"
          >
            Voice (soon)
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={() => onSettingChange(["companion", "memoryClearedAt"], new Date().toISOString())}
          className="px-5 py-2.5 rounded-full font-semibold bg-[#ffe4f3] text-[#c4549b] hover:bg-[#ffd6ed] transition"
        >
          Reset companion memory ✨
        </button>
      </div>
    </section>
  );
}

