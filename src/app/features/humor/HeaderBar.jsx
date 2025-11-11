"use client";

export default function HeaderBar({ isSidebarOpen, onToggleSidebar, user }) {
	return (
		<header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
			<div className="px-6 py-5">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<button
							aria-label="Toggle sidebar"
							onClick={onToggleSidebar}
							className="p-3 rounded-lg hover:bg-gray-100 text-2xl"
							style={{color: "var(--feelheal-purple)"}}
						>
							{isSidebarOpen ? "☰" : "☷"}
						</button>
						<span className="text-3xl">🌸</span>
						<h1 className="text-2xl font-bold" style={{color: "var(--feelheal-purple)"}}>
							FeelHeal
						</h1>
					</div>
					<div className="flex items-center gap-4">
						<span className="text-lg font-semibold text-gray-700">Hey {user?.name || "Friend"} 😄</span>
					</div>
				</div>
			</div>
		</header>
	);
}


