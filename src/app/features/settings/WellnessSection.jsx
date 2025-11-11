"use client";

import ToggleSwitch from "./ToggleSwitch";
import { motivationalTones } from "./SettingsData";

export default function WellnessSection({ settings, onSettingChange }) {
  return (
    <section className="bg-white/75 backdrop-blur-md border border-white/40 rounded-3xl p-8 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">🧘‍♀️</span>
        <div>
          <h3 className="text-2xl font-semibold" style={{ color: "var(--feelheal-purple)" }}>
            Wellness Preferences
          </h3>
          <p className="text-gray-600">Personalize the gentle nudges that keep you balanced.</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-2xl bg-white/70 border border-white/60 p-5">
          <div>
            <p className="text-lg font-semibold text-[#2b2150]">Daily Mood Check Reminder</p>
            <p className="text-sm text-gray-600">Remind me to check my mood.</p>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="time"
              value={settings.notifications.moodReminder.time}
              onChange={(event) => onSettingChange(["notifications", "moodReminder", "time"], event.target.value)}
              className="px-4 py-2 rounded-xl border border-white/60 bg-white focus:outline-none focus:ring-2 focus:ring-[#d0b5ff]"
              disabled={!settings.notifications.moodReminder.enabled}
            />
            <ToggleSwitch
              id="mood-reminder"
              checked={settings.notifications.moodReminder.enabled}
              onChange={(value) => onSettingChange(["notifications", "moodReminder", "enabled"], value)}
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl bg-white/70 border border-white/60 p-5 flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold text-[#2b2150]">Daily Affirmation Notification</p>
              <p className="text-sm text-gray-600">Receive a soft boost every morning.</p>
            </div>
            <ToggleSwitch
              id="affirmation"
              checked={settings.notifications.affirmation}
              onChange={(value) => onSettingChange(["notifications", "affirmation"], value)}
            />
          </div>

          <div className="rounded-2xl bg-white/70 border border-white/60 p-5 flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold text-[#2b2150]">Goal Reminder Notifications</p>
              <p className="text-sm text-gray-600">Keep your stars in sight.</p>
            </div>
            <ToggleSwitch
              id="goal-reminder"
              checked={settings.notifications.goal}
              onChange={(value) => onSettingChange(["notifications", "goal"], value)}
            />
          </div>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-[#2b2150] mb-3">Motivational Tone</h4>
          <div className="grid gap-4 md:grid-cols-3">
            {motivationalTones.map((tone) => (
              <button
                key={tone.id}
                onClick={() => onSettingChange(["motivationalTone"], tone.id)}
                className={`rounded-2xl border p-5 text-left transition ${
                  settings.motivationalTone === tone.id ? "border-[#9b7bd8] bg-white/90 shadow-lg" : "border-transparent bg-white/60"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{tone.emoji}</span>
                  <span className="font-semibold text-lg text-[#2b2150]">{tone.label}</span>
                </div>
                <p className="text-sm text-gray-600">{tone.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

