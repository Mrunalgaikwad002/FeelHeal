"use client";

export default function SavedSmiles({ favorites, reactions, onRemove }) {
	return (
		<div className="max-w-3xl mx-auto">
			{favorites.length === 0 ? (
				<div className="text-center bg-white/80 border border-white/60 rounded-3xl p-8 shadow">
					<p className="text-lg text-gray-700">No saved jokes yet. Tap “🤍 Favorite” to save one.</p>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{favorites.map((f, idx) => (
						<div key={idx} className="bg-white/85 border border-white/60 rounded-2xl p-4 shadow">
							<p className="text-gray-800">{f}</p>
							<div className="flex items-center justify-between mt-3">
								<span className="text-sm text-gray-600">Reaction: {reactions[f] || "—"}</span>
								<button
									onClick={() => onRemove(f)}
									className="text-sm text-red-500 hover:underline"
								>
									Remove
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}


