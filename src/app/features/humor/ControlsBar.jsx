"use client";

import { STORAGE_LANG, safeSet } from "./StorageKeys";

export default function ControlsBar({ language, setLanguage, laughsToday, onChange }) {
	return (
		<div className="flex flex-wrap items-center gap-4 mb-6 text-base">
			<div className="flex items-center gap-3 bg-white/80 border border-white/60 rounded-full px-4 py-2">
				<span className="text-gray-800 font-medium">Language</span>
				{["en","hi"].map(l => (
					<button
						key={l}
						onClick={() => { setLanguage(l); safeSet(STORAGE_LANG, l); onChange(); }}
						className={`px-4 py-1.5 rounded-full ${language===l?"text-white":"text-gray-800"}`}
						style={{ background: language===l ? "var(--feelheal-purple)" : "transparent" }}
					>
						{l==="en"?"English":"हिन्दी"}
					</button>
				))}
			</div>
			<div className="ml-auto bg-white/90 border border-white/60 rounded-full px-4 py-2 shadow-sm">
				<span className="text-gray-900 font-semibold">
					🌞 Today’s Chuckle Challenge: Laugh 3 times — {Math.min(laughsToday,3)}/3 ⭐
				</span>
				{laughsToday >= 3 && <span className="ml-2 font-bold text-yellow-700">Achievement: Certified Giggle Guru 😄</span>}
			</div>
		</div>
	);
}


