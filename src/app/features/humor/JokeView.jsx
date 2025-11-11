"use client";

import { useState } from "react";

export default function JokeView({ anim, bursts, joke, isFav, gifSrc, onReact, onNext, onToggleFav, onShare, onGlowSaved, onGiggle }) {
	const [shake, setShake] = useState(false);
	const [bounceKey, setBounceKey] = useState(0);

	return (
		<div className="max-w-3xl mx-auto text-base">
			{/* Single big GIF above the joke */}
			<div className="flex justify-center mb-6">
				<img src={gifSrc} alt="laugh" className="w-36 h-36 object-cover rounded-2xl shadow" />
			</div>
			<div
				className={`rounded-3xl p-8 bg-white/85 border border-white/60 shadow-xl text-center transition-all ${anim ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}
			>
				{bursts.map(b => (
					<span
						key={b.id}
						className="absolute text-3xl"
						style={{
							left: `${b.left}%`,
							bottom: "20%",
							animation: `floatSoft 1.2s ease-in forwards`,
							animationDelay: `${b.delay}ms`
						}}
					>
						{b.emoji}
					</span>
				))}
				<p className="text-lg text-gray-800 leading-relaxed whitespace-pre-wrap">
					{joke}
				</p>
				<div className="flex items-center justify-center gap-4 mt-6">
					{["😂","😍","🤔","😴"].map((e, i) => (
						<button
							key={`${bounceKey}-${i}`}
							onClick={() => { onReact(e); setBounceKey(x => x + 1); }}
							className="text-3xl hover:scale-125 active:animate-bounce transition"
							title="React"
						>
							{e}
						</button>
					))}
				</div>
				<div className="flex items-center justify-center gap-4 mt-6">
					<button
						onClick={() => { setShake(true); setTimeout(() => setShake(false), 300); onGiggle && onGiggle(); onNext(); }}
						className={`px-7 py-4 rounded-2xl text-white font-bold hover:brightness-110 transition ${shake ? "animate-bounce" : ""}`}
						style={{ background: "var(--feelheal-purple)", boxShadow: "0 8px 18px rgba(123, 44, 191, .3)" }}
					>
						😂 Make Me Laugh!
					</button>
					<button
						onClick={() => { onToggleFav(); if (!isFav && onGlowSaved) onGlowSaved(); }}
						className={`px-5 py-4 rounded-2xl font-bold transition ${isFav ? "text-white" : "text-gray-800"}`}
						style={{ background: isFav ? "#F59E0B" : "rgba(255,255,255,.9)", border: "1px solid rgba(255,255,255,.7)" }}
						title="Add to Saved Smiles"
					>
						{isFav ? "❤️ Saved" : "🤍 Favorite"}
					</button>
					<button
						onClick={onShare}
						className="px-5 py-4 rounded-2xl text-gray-800 font-bold transition"
						style={{ background: "rgba(255,255,255,.9)", border: "1px solid rgba(255,255,255,.7)" }}
						title="Copy joke"
					>
						🔗 Share
					</button>
				</div>
			</div>
		</div>
	);
}


