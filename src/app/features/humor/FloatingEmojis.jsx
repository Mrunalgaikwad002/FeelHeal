"use client";

export default function FloatingEmojis() {
	return (
		<div className="floating-bg">
			{Array.from({ length: 14 }).map((_, i) => (
				<span
					key={i}
					className="petal-emoji"
					style={{
						left: `${(i * 7.2) % 100}%`,
						animationDelay: `${0.5 * i}s`,
						top: `-${(i % 5) * 18}%`,
						fontSize: 18 + (i % 3) * 4
					}}
				>
					{["😂","😄","😆","🤣"][i % 4]}
				</span>
			))}
		</div>
	);
}


