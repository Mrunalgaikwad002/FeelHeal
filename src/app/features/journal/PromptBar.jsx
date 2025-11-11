"use client";

import { useMemo, useState } from "react";

const PROMPTS = [
  "What is one small thing that made you smile today?",
  "If your mood were a color, what shade would it be?",
  "What would you say to your past self right now?",
  "What are you grateful for today?",
  "Describe your day using only three words.",
];

export default function PromptBar({ selectedMood, setSelectedMood }) {
  const [seed, setSeed] = useState(0);
  const prompt = useMemo(() => PROMPTS[(seed + PROMPTS.length) % PROMPTS.length], [seed]);

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 mb-6 flex items-center justify-between gap-4">
      <div className="flex-1">
        <p className="text-lg font-medium" style={{color: "var(--feelheal-purple)"}}>
          ✨ {prompt}
        </p>
      </div>
      <button
        className="px-4 py-2.5 rounded-lg bg-white shadow hover:shadow-md text-base font-medium"
        style={{color: "var(--feelheal-purple)"}}
        onClick={() => setSeed(seed + 1)}
      >
        New Prompt
      </button>
      <select
        className="px-4 py-2.5 rounded-lg bg-white shadow text-base font-medium"
        value={selectedMood}
        onChange={(e) => setSelectedMood(e.target.value)}
        style={{color: "var(--feelheal-purple)"}}
      >
        <option value="happy">😊 Happy</option>
        <option value="calm">😌 Calm</option>
        <option value="sad">😢 Sad</option>
        <option value="stressed">😤 Stressed</option>
        <option value="reflective">💭 Reflective</option>
        <option value="tired">😴 Tired</option>
      </select>
    </div>
  );
}


