"use client";

import { useEffect, useRef, useState } from "react";

const WORDS = [
	"You're enough", "Keep glowing", "You're doing great", "Brave", "Kind", "Caring", "Wonderful",
	"Smile", "Peace", "Hope", "Giggle", "Shine", "Hug", "Calm", "Joy"
];
const COLORS = ["#FFC6FF","#BDE0FE","#CDEAC0","#FFF3B0","#FFD6A5","#B9FBC0","#E9AFFF","#A0E7E5"];

export default function ComplimentCatcher() {
	const boxRef = useRef(null);
	const [handX, setHandX] = useState(50);
	const [handY, setHandY] = useState(80);
	const [bubbles, setBubbles] = useState([]);
	const [score, setScore] = useState(0);
	const [msg, setMsg] = useState("");

	useEffect(() => {
		const id = setInterval(() => {
			setBubbles(prev => [
				...prev,
				{ id: Date.now(), x: Math.random() * 80 + 10, y: Math.random() * 40 + 10, text: WORDS[Math.floor(Math.random() * WORDS.length)], color: COLORS[Math.floor(Math.random()*COLORS.length)] }
			]);
		}, 1200);
		return () => clearInterval(id);
	}, []);

	useEffect(() => {
		const id = setInterval(() => {
			setBubbles(prev => prev.map(b => ({...b, x: b.x + (Math.random()*6-3), y: b.y + (Math.random()*6-3)})));
		}, 200);
		return () => clearInterval(id);
	}, []);

	useEffect(() => {
		setBubbles(prev => prev.filter(b => {
			const caught = Math.abs(b.x - handX) < 8 && Math.abs(b.y - handY) < 8;
			if (caught) {
				setScore(s => s + 1);
				setMsg("Sparkle! You caught kindness ✨");
				setTimeout(() => setMsg(""), 800);
			}
			return !caught;
		}));
	}, [handX, handY, bubbles.length]); // eslint-disable-line

	return (
		<div className="w-full text-[#2b2150]">
			<div className="flex items-center justify-between mb-3">
				<div className="text-2xl font-semibold" style={{color: "var(--feelheal-purple)"}}>Compliments: {score}</div>
				{msg && <div className="text-green-700 text-base">{msg}</div>}
			</div>
			<div
				ref={boxRef}
				className="relative rounded-3xl border bg-white/80 h-[36rem] overflow-hidden"
				onMouseMove={e => {
					const r = boxRef.current.getBoundingClientRect();
					const x = ((e.clientX - r.left) / r.width) * 100;
					const y = ((e.clientY - r.top) / r.height) * 100;
					setHandX(Math.max(5, Math.min(95, x)));
					setHandY(Math.max(5, Math.min(95, y)));
				}}
			>
				{bubbles.map(b => (
					<div
						key={b.id}
						className="absolute select-none rounded-full px-4 py-2 text-lg border shadow"
						style={{
							left: `${b.x}%`,
							top: `${b.y}%`,
							background: `linear-gradient(135deg, ${b.color} 0%, #ffffff 100%)`,
							color: "#2b2150",
							borderColor: "rgba(0,0,0,.06)"
						}}
					>
						{b.text}
					</div>
				))}
				<div className="absolute" style={{ left: `calc(${handX}% - 18px)`, top: `calc(${handY}% - 18px)` }}>
					<span className="text-5xl select-none">✋</span>
				</div>
			</div>
			<div className="text-center text-green-700 mt-4 text-lg">Look at all the positivity you caught today! 💖</div>
		</div>
	);
}


