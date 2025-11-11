"use client";

import ToggleSwitch from "./ToggleSwitch";
import { themeOptions, fontOptions } from "./SettingsData";

export default function PersonalizationSection({ settings, onSettingChange }) {
  return (
    <section className="bg-white/75 backdrop-blur-md border border-white/40 rounded-3xl p-8 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">🎨</span>
        <div>
          <h3 className="text-2xl font-semibold" style={{ color: "var(--feelheal-purple)" }}>
            Personalization & Theme
          </h3>
          <p className="text-gray-600">Pick the vibe that heals you best 🌤️</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h4 className="text-xl font-semibold text-[#2b2150]">Theme moods</h4>
          <div className="grid gap-4 md:grid-cols-2">
            {themeOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => onSettingChange(["theme"], option.id)}
                className={`relative text-left rounded-2xl p-5 border transition-all duration-200 ${
                  settings.theme === option.id ? "border-[#9b7bd8] shadow-lg bg-white/90" : "border-transparent bg-white/60"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{option.emoji}</span>
                  <div>
                    <p className="font-semibold text-lg text-[#2b2150]">{option.name}</p>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                </div>
                <span
                  className={`absolute top-4 right-4 w-4 h-4 rounded-full border-2 ${
                    settings.theme === option.id ? "bg-[#9b7bd8] border-[#794bc4]" : "border-gray-300 bg-white"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-xl font-semibold text-[#2b2150] mb-3">Font style</h4>
            <div className="space-y-3">
              {fontOptions.map((option) => (
                <label
                  key={option.id}
                  className={`flex items-center justify-between rounded-2xl border p-4 cursor-pointer transition ${
                    settings.fontStyle === option.id ? "border-[#9b7bd8] bg-white/80 shadow-md" : "border-transparent bg-white/60"
                  }`}
                >
                  <div>
                    <p className="text-lg font-semibold text-[#2b2150]">{option.label}</p>
                    <p className="text-sm text-gray-600">{option.sample}</p>
                  </div>
                  <input
                    type="radio"
                    name="font-style"
                    checked={settings.fontStyle === option.id}
                    onChange={() => onSettingChange(["fontStyle"], option.id)}
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <ToggleSwitch
              id="animations"
              checked={settings.animations}
              onChange={(value) => onSettingChange(["animations"], value)}
              labels={{
                title: "App accent animations",
                subtitle: "Floating emojis, sparkles, and confetti.",
              }}
            />
            <ToggleSwitch
              id="ambient-sound"
              checked={settings.sound.ambient}
              onChange={(value) => onSettingChange(["sound", "ambient"], value)}
              labels={{
                title: "Play soft ambient music in Meditation",
                subtitle: "Adds gentle background breeze.",
              }}
            />
            <ToggleSwitch
              id="click-sound"
              checked={settings.sound.click}
              onChange={(value) => onSettingChange(["sound", "click"], value)}
              labels={{
                title: "Enable button click sounds",
                subtitle: "A light pop every tap.",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

