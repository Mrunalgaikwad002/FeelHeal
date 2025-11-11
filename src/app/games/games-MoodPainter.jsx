"use client";

import { useEffect, useRef, useState } from "react";

const PALETTES = {
	happy: ["#FFD166", "#FCA311", "#FF90BC"],
	calm: ["#A1D6E2", "#BEE3F8", "#8FD3FE"],
	energized: ["#90EE90", "#7AE582", "#4ADE80"]
};

export default function MoodPainter() {
	const canvasRef = useRef(null);
	const [mood, setMood] = useState("calm");
	const [color, setColor] = useState(PALETTES.calm[0]);
	const [drawing, setDrawing] = useState(false);

	useEffect(() => {
		setColor(PALETTES[mood][0]);
	}, [mood]);

	useEffect(() => {
		const c = canvasRef.current;
		if (!c) return;
		const ctx = c.getContext("2d");
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, c.width, c.height);
	}, []);

	const draw = (e) => {
		if (!drawing) return;
		const c = canvasRef.current;
		const rect = c.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const ctx = c.getContext("2d");
		const grad = ctx.createRadialGradient(x, y, 5, x, y, 24);
		grad.addColorStop(0, color);
		grad.addColorStop(1, `${color}00`);
		ctx.fillStyle = grad;
		ctx.beginPath();
		ctx.arc(x, y, 24, 0, Math.PI * 2);
		ctx.fill();
		// emoji dust
		ctx.font = "16px serif";
		ctx.fillText(["✨","🌸","🌿","💫"][Math.floor(Math.random()*4)], x + (Math.random()*20-10), y + (Math.random()*20-10));
	};

	return (
		<div className="w-full text-[#2b2150]">
			<div className="flex items-center gap-3 mb-3">
				<select
					value={mood}
					onChange={e => setMood(e.target.value)}
					className="px-3 py-2 rounded-xl border bg-white"
					style={{ color: "var(--feelheal-purple)" }}
				>
					<option value="happy">Happy</option>
					<option value="calm">Calm</option>
					<option value="energized">Energized</option>
				</select>
				<div className="flex items-center gap-2">
					{PALETTES[mood].map(c => (
						<button key={c} onClick={() => setColor(c)} className="w-8 h-8 rounded-full border" style={{ background: c }} />
					))}
				</div>
			</div>
			<canvas
				ref={canvasRef}
				width={1200}
				height={520}
				className="w-full rounded-3xl border bg-white shadow"
				onMouseDown={() => setDrawing(true)}
				onMouseUp={() => setDrawing(false)}
				onMouseLeave={() => setDrawing(false)}
				onMouseMove={draw}
			/>
			<div className="text-center mt-3 text-green-700">Your mood looks peaceful today 🌿</div>
		</div>
	);
}


