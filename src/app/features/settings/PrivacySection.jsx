"use client";

import ToggleSwitch from "./ToggleSwitch";

export default function PrivacySection({ settings, onSettingChange, onClearData }) {
  return (
    <section className="bg-white/75 backdrop-blur-md border border-white/40 rounded-3xl p-8 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">🔒</span>
        <div>
          <h3 className="text-2xl font-semibold" style={{ color: "var(--feelheal-purple)" }}>
            Privacy & Data
          </h3>
          <p className="text-gray-600">Your thoughts stay yours — always.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-white/70 border border-white/60 p-5 space-y-4">
          <ToggleSwitch
            id="save-locally"
            checked={settings.privacy.saveLocally}
            onChange={(value) => onSettingChange(["privacy", "saveLocally"], value)}
            labels={{
              title: "Save my data locally",
              subtitle: "Keep memories on this device only.",
            }}
          />
          <button
            onClick={onClearData}
            className="w-full px-4 py-3 rounded-xl font-semibold bg-[#ffe6ee] text-[#c24c7a] hover:bg-[#ffd9e4] transition"
          >
            Clear saved moods, journals & smiles
          </button>
        </div>

        <div className="rounded-2xl bg-white/70 border border-white/60 p-5">
          <p className="text-lg font-semibold text-[#2b2150] mb-2">App permissions</p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <span className="text-base">{settings.privacy.permissions.notifications ? "✅" : "⚠️"}</span>
              Notifications — reminders & gentle nudges
            </li>
            <li className="flex items-center gap-2">
              <span className="text-base">{settings.privacy.permissions.microphone ? "✅" : "⚠️"}</span>
              Microphone — for future voice chat
            </li>
            <li className="flex items-center gap-2">
              <span className="text-base">{settings.privacy.permissions.storage ? "✅" : "⚠️"}</span>
              Storage — keep your mood garden blooming
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

