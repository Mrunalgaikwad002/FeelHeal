"use client";

export default function JournalHeader({ user, locked, setLocked }) {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📓</span>
          <div>
            <h1 className="text-xl font-bold" style={{color: "var(--feelheal-purple)"}}>My Digital Diary</h1>
            <p className="text-xs text-gray-600">This space is just for you 💗</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {user && <span className="text-sm text-gray-600">Hi, {user.name} 👋</span>}
          <button
            className="px-3 py-1.5 rounded-lg bg-white shadow hover:shadow-md text-sm"
            style={{color: "var(--feelheal-purple)"}}
            onClick={() => setLocked(!locked)}
          >
            {locked ? "Unlock" : "Safe Space Mode"}
          </button>
        </div>
      </div>
    </header>
  );
}


