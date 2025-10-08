"use client";

export default function GamesSection({ isFirstTime }) {
  const games = [
    { name: "Breathing Game", icon: "🌬️", description: "Guided breathing exercise" },
    { name: "Color Therapy", icon: "🎨", description: "Relaxing coloring activity" },
    { name: "Memory Match", icon: "🧠", description: "Improve focus and memory" },
    { name: "Gratitude Jar", icon: "🫙", description: "Collect positive moments" }
  ];

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-lg">
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-3">🕹️</span>
        <h3 className="text-xl font-semibold" style={{color: "var(--feelheal-purple)"}}>
          Mini Games
        </h3>
      </div>

      {isFirstTime ? (
        <div className="text-center">
          <div className="mb-4">
            <div className="text-4xl mb-2">🎮</div>
            <p className="text-gray-600 mb-4">Fun activities for mood-boost and focus</p>
            <p className="text-sm text-gray-500">
              Play relaxing games designed to improve your mental wellness.
            </p>
          </div>
          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:from-indigo-600 hover:to-purple-600 transition-all">
            Start Playing
          </button>
        </div>
      ) : (
        <div>
          <p className="text-sm text-gray-600 mb-4">Choose a game to play:</p>
          <div className="grid grid-cols-2 gap-3">
            {games.map((game, index) => (
              <button
                key={index}
                className="p-3 rounded-xl bg-white/50 hover:bg-white/70 border border-white/30 transition-all text-center"
              >
                <div className="text-2xl mb-1">{game.icon}</div>
                <div className="text-xs font-medium text-gray-700">{game.name}</div>
                <div className="text-xs text-gray-500">{game.description}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
