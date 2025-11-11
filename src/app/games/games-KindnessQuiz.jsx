"use client";

import { useMemo, useState } from "react";

const QUESTIONS = [
	{ q: "What’s your comfort food?", a: ["Pasta", "Soup", "Chocolate", "Salad"] },
	{ q: "Which vibe fits your day?", a: ["Cozy blanket", "Chaos energy", "Sunshine walk", "Quiet tea"] },
	{ q: "Pick a mini break:", a: ["Deep breath", "Cat video", "Stretch", "Water sip"] },
	{ q: "Choose a tiny act of kindness:", a: ["Smile", "Thank you note", "Hold the door", "Share a snack"] },
	{ q: "Your ideal soundtrack:", a: ["Lo‑fi", "Nature", "Pop", "Silence"] }
];

const RESULTS = [
	{ title: "Warm Cinnamon Roll", emoji: "🥐", msg: "Sweet and loved! You bring comfort wherever you go." },
	{ title: "Sunlit Meadow", emoji: "🌼", msg: "Bright, gentle, and hopeful — a joy to be around." },
	{ title: "Peaceful Lake", emoji: "🌊", msg: "Calm and steady. People feel safe with you." },
	{ title: "Spark Joy Bean", emoji: "✨", msg: "Tiny sparks of happiness follow you around." }
];

export default function KindnessQuiz() {
	const [idx, setIdx] = useState(0);
	const [answers, setAnswers] = useState([]);
	const [done, setDone] = useState(false);
	const progress = Math.round(((idx) / QUESTIONS.length) * 100);

	const pick = (choiceIndex) => {
		const next = [...answers, choiceIndex];
		if (idx + 1 >= QUESTIONS.length) {
			setAnswers(next);
			setDone(true);
		} else {
			setAnswers(next);
			setIdx(i => i + 1);
		}
	};

	const score = useMemo(() => answers.reduce((s, v) => s + v, 0), [answers]);
	const result = RESULTS[score % RESULTS.length];

	const share = async () => {
		const text = `My Kindness Quiz result: ${result.title} ${result.emoji} — ${result.msg} (from FeelHeal 💜)`;
		try {
			await navigator.clipboard.writeText(text);
			alert("Result copied to clipboard!");
		} catch {
			alert("Copy failed — you can select and copy the text manually.");
		}
	};

	return (
		<div className="w-full bg-white/85 border border-white/60 rounded-3xl p-6 shadow text-[#2b2150]">
			<h2 className="text-2xl font-semibold mb-2" style={{color: "var(--feelheal-purple)"}}>Kindness Quiz</h2>
			{!done ? (
				<div>
					<div className="h-2 w-full rounded-full bg-white/70 border">
						<div className="h-2 rounded-full" style={{ width: `${progress}%`, background: "var(--feelheal-purple)" }} />
					</div>
					<p className="mt-4 text-xl font-medium">{QUESTIONS[idx].q}</p>
					<div className="flex flex-wrap gap-3 mt-3">
						{QUESTIONS[idx].a.map((opt, i) => (
							<button
								key={i}
								onClick={() => pick(i)}
								className="px-4 py-2 rounded-full border bg-white hover:bg-white/90 transition"
								style={{ color: "var(--feelheal-purple)", borderColor: "rgba(0,0,0,.12)" }}
							>
								{opt}
							</button>
						))}
					</div>
					<p className="mt-4 text-sm text-gray-600">Question {idx + 1} of {QUESTIONS.length}</p>
				</div>
			) : (
				<div className="text-center">
					<div className="text-5xl mb-2">{result.emoji}</div>
					<p className="text-2xl font-semibold">{result.title}</p>
					<p className="text-gray-700 mt-1">{result.msg}</p>
					<div className="mt-3 flex items-center justify-center gap-3">
						<button onClick={share} className="px-4 py-2 rounded-2xl text-white" style={{ background: "var(--feelheal-purple)" }}>
							Share
						</button>
						<button onClick={() => { setIdx(0); setAnswers([]); setDone(false); }} className="px-4 py-2 rounded-2xl border bg-white" style={{ color: "var(--feelheal-purple)", borderColor: "rgba(0,0,0,.12)" }}>
							Restart
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
 

