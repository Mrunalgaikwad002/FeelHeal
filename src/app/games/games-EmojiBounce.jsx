"use client";

import { useEffect, useRef, useState } from "react";

export default function EmojiBounce() {
	const boxRef = useRef(null);
	const [y, setY] = useState(50);
	const [vy, setVy] = useState(-0.5);
	const [playing, setPlaying] = useState(true);
	const raf = useRef(null);

	useEffect(() => {
		function loop() {
			if (!playing) return;
			setY(prev => Math.min(96, Math.max(4, prev + vy)));
			setVy(prev => prev + 0.12); // gravity
			raf.current = requestAnimationFrame(loop);
		}
		raf.current = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf.current);
	}, [playing, vy]);

	useEffect(() => {
		if (y >= 96) setPlaying(false);
	}, [y]);

	return (
		<div
			ref={boxRef}
			className="relative rounded-3xl border bg-white/80 h-[32rem] overflow-hidden text-[#2b2150]"
			onClick={() => { setVy(-3.2); setPlaying(true); }}
		>
			<div className="absolute text-5xl select-none" style={{ left: "48%", top: `${y}%` }}>😂</div>
			{!playing && (
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="bg-white/90 rounded-2xl px-6 py-4 text-center shadow">
						<div className="mb-2">Oops! Laughter took a break… want to try again?</div>
						<button onClick={() => { setY(50); setVy(-2.8); setPlaying(true); }} className="px-5 py-2 rounded-2xl text-white" style={{ background: "var(--feelheal-purple)" }}>
							Restart
						</button>
					</div>
				</div>
			)}
		</div>
	);
}


