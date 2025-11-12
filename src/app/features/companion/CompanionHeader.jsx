// Companion page header

export default function CompanionHeader({ user, isSidebarOpen, onToggleSidebar }) {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              aria-label="Toggle sidebar"
              onClick={onToggleSidebar}
              className="p-2.5 rounded-lg hover:bg-gray-100 text-xl"
              style={{color: "var(--feelheal-purple)"}}
            >
              {isSidebarOpen ? "☰" : "☷"}
            </button>
            <span className="text-3xl">🌸</span>
            <h1 className="text-2xl font-bold" style={{color: "var(--feelheal-purple)"}}>FeelHeal</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-base font-medium text-gray-700">Hi, {user?.name || "User"} 👋</span>
          </div>
        </div>
      </div>
    </header>
  );
}

