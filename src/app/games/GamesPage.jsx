"use client";

import { useMemo, useState } from "react";
import ComplimentCatcher from "./games-ComplimentCatcher";
import MoodPainter from "./games-MoodPainter";
import EmojiBounce from "./games-EmojiBounce";
import KindnessQuiz from "./games-KindnessQuiz";
import GratitudeSpinner from "./games-GratitudeSpinner";

const GAME_CARDS = [
	{ key: "compliment", icon: "💖", title: "Compliment Catcher", desc: "Catch flying kind words with your net.", component: ComplimentCatcher },
	{ key: "painter", icon: "🎨", title: "Mood Painter", desc: "Paint your current mood on a soft canvas.", component: MoodPainter },
	{ key: "bounce", icon: "😂", title: "Emoji Bounce", desc: "Keep the laughing emoji bouncing!", component: EmojiBounce },
	{ key: "quiz", icon: "🧠", title: "Kindness Quiz", desc: "A light-hearted personality quiz.", component: KindnessQuiz },
	{ key: "spinner", icon: "🌻", title: "Gratitude Spinner", desc: "Spin a wheel for a gratitude prompt.", component: GratitudeSpinner }
];

export default function GamesPage() {
	const [activeKey, setActiveKey] = useState(null);
	const Active = useMemo(() => GAME_CARDS.find(g => g.key === activeKey)?.component, [activeKey]);

	if (Active) {
		return (
			<div className="min-h-screen px-4 md:px-6 py-6 md:py-10">
				<div className="text-center mb-6">
					<button
						onClick={() => setActiveKey(null)}
						className="inline-block mb-3 px-4 py-2 rounded-xl text-sm border bg-white/80 hover:bg-white transition"
						style={{ color: "var(--feelheal-purple)", borderColor: "rgba(255,255,255,.6)" }}
					>
						← Back to Games
					</button>
					<h1 className="text-4xl font-bold" style={{color: "var(--feelheal-purple)"}}>Let’s Play</h1>
				</div>
				<div className="w-full">
					<Active />
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen px-6 py-10 w-full text-[#2b2150]">
			<div className="text-center mb-4">
				<div className="text-6xl mb-3">🎮</div>
				<h1 className="text-5xl font-bold" style={{color: "var(--feelheal-purple)"}}>
					Play Zone — Take a mindful break!
				</h1>
				<p className="mt-3 text-lg text-gray-700">Relax, laugh, or recharge with short games designed to lift your mood.</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">
				{GAME_CARDS.map(card => (
					<div key={card.key} className="rounded-3xl bg-white/85 border border-white/60 shadow-lg p-7 hover:shadow-xl transition transform hover:-translate-y-0.5">
						<div className="text-5xl">{card.icon}</div>
						<h3 className="text-2xl font-semibold mt-4" style={{color: "var(--feelheal-purple)"}}>{card.title}</h3>
						<p className="text-base text-gray-700 mt-2">{card.desc}</p>
						<button
							onClick={() => setActiveKey(card.key)}
							className="mt-5 px-6 py-3 rounded-2xl text-white font-semibold hover:brightness-110 transition"
							style={{ background: "var(--feelheal-purple)", boxShadow: "0 8px 18px rgba(123, 44, 191, .25)" }}
						>
							Play Now
						</button>
					</div>
				))}
			</div>
		</div>
	);
}


