"use client";

export default function SidebarNav({ isOpen }) {
	return (
		<aside
			className={`${isOpen ? "w-64" : "w-16"} transition-all duration-300 bg-white/70 backdrop-blur-sm border-r border-white/20 min-h-[calc(100vh-64px)] sticky top-16 hidden md:block`}
		>
			<nav className="p-4 space-y-1.5 text-base">
				{[
					{ icon: "🏠", label: "Dashboard", href: "/dashboard" },
					{ icon: "🌦️", label: "Mood Garden", href: "/features/mood" },
					{ icon: "✍️", label: "Journal", href: "/features/journal" },
					{ icon: "🌌", label: "Goal Universe", href: "/features/goals" },
					{ icon: "🧘‍♀️", label: "Meditation", href: "/features/meditation" },
					{ icon: "🤖", label: "MyBuddy", href: "/features/companion" },
					{ icon: "🕹️", label: "Games", href: "/games" },
					{ icon: "😂", label: "Humor", href: "/features/humor" },
					{ icon: "⚙️", label: "Settings", href: "/settings" },
					{ icon: "🔓", label: "Logout", href: "/logout" }
				].map((item, idx) => (
					<div
						key={idx}
						className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 cursor-pointer ${item.href === "/features/humor" ? "bg-gray-100" : ""}`}
						style={{color: "var(--feelheal-purple)", fontSize: "16px"}}
						onClick={() => { if (item.href) window.location.href = item.href; }}
					>
						<span className="text-xl w-6 text-center">{item.icon}</span>
						{isOpen && <span className="truncate font-medium">{item.label}</span>}
					</div>
				))}
			</nav>
		</aside>
	);
}


