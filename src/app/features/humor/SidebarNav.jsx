"use client";

export default function SidebarNav({ isOpen }) {
	return (
		<aside
			className={`${isOpen ? "w-64" : "w-16"} transition-all duration-300 bg-white/70 backdrop-blur-sm border-r border-white/20 h-[calc(100vh-64px)] sticky top-16 self-start hidden md:block flex-shrink-0`}
		>
			<nav className="p-4 space-y-1.5 text-lg">
				{[
					{ icon: "🏠", label: "Dashboard", href: "/dashboard" },
					{ icon: "🌦️", label: "Mood Garden", href: "/features/mood" },
					{ icon: "✍️", label: "Journal", href: "/features/journal" },
					{ icon: "🌌", label: "Goal Universe", href: "/features/goals" },
					{ icon: "🧘‍♀️", label: "Meditation", href: "/features/meditation" },
					{ icon: "🤖", label: "MyBuddy", href: "/features/companion" },
					{ icon: "🕹️", label: "Games", href: "/games" },
					{ icon: "😂", label: "Humor", href: "/humor" },
					{ icon: "⚙️", label: "Settings", href: "/features/settings" },
					{ icon: "🔓", label: "Logout", href: "/logout" }
				].map((item, idx) => (
					<div
						key={idx}
						className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 cursor-pointer ${item.href === "/humor" ? "bg-gray-100" : ""}`}
						style={{color: "var(--feelheal-purple)", fontSize: "18px"}}
						onClick={() => { 
							if (item.label === "Logout") {
								localStorage.removeItem("feelheal_user");
								localStorage.removeItem("feelheal_seen_onboarding");
								localStorage.removeItem("feelheal_seen_dashboard");
								window.location.href = "/";
							} else if (item.href) { 
								window.location.href = item.href; 
							}
						}}
					>
						<span className="text-xl w-6 text-center">{item.icon}</span>
						{isOpen && <span className="truncate font-medium">{item.label}</span>}
					</div>
				))}
			</nav>
		</aside>
	);
}


