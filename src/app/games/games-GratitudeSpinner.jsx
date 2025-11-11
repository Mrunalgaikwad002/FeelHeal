"use client";

import { useState } from "react";

const PROMPTS = [
	"A person I’m thankful for",
	"A smell I love",
	"Something that made me smile",
	"A place that calms me",
	"A tiny win today"
];

export default function GratitudeSpinner() {
	const [current, setCurrent] = useState("");
	const [note, setNote] = useState("");
	const [stars, setStars] = useState(0);

	const spin = () => {
		const p = PROMPTS[Math.floor(Math.random()*PROMPTS.length)];
		setCurrent(p);
	};

	const save = () => {
		try {
			const all = JSON.parse(localStorage.getItem("feelheal_gratitude") || "[]");
			all.push({ t: Date.now(), prompt: current, note });
			localStorage.setItem("feelheal_gratitude", JSON.stringify(all));
			setStars(s => s + 1);
			setNote("");
		} catch {}
	};

	return (
		<div className="w-full bg-white/85 border border-white/60 rounded-3xl p-6 shadow text-[#2b2150]">
			<div className="flex items-center justify-between mb-3">
				<h2 className="text-2xl font-semibold" style={{color: "var(--feelheal-purple)"}}>Gratitude Spinner</h2>
				<div className="text-yellow-600">⭐ {stars}</div>
			</div>
			<div className="text-center">
				<div className="text-7xl mb-4">🎡</div>
				<button onClick={spin} className="px-5 py-2 rounded-2xl text-white" style={{ background: "var(--feelheal-purple)" }}>
					Spin
				</button>
			</div>
			{current && (
				<div className="mt-4">
					<p className="font-medium text-gray-800">{current}</p>
					<textarea value={note} onChange={e=>setNote(e.target.value)} className="w-full rounded-2xl border p-3 bg-white/95 mt-2" style={{ color: "#2b2150" }} rows={3} />
					<button onClick={save} className="mt-2 px-4 py-2 rounded-2xl text-white" style={{ background: "var(--feelheal-purple)" }}>
						Save note
					</button>
				</div>
			)}
		</div>
	);
}


