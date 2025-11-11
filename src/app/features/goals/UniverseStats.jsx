"use client";

export default function UniverseStats({ goals }) {
  const completed = goals.filter(g => g.completed).length;
  const active = goals.filter(g => !g.completed).length;
  const totalProgress = goals.length > 0
    ? Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / goals.length)
    : 0;

  if (goals.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 animate-fadeInSoft">
      <h3 className="text-2xl font-semibold text-white mb-5 text-center">Universe Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-5 bg-white/10 rounded-xl hover:bg-white/15 transition-all duration-300 hover:scale-105">
          <div className="text-4xl mb-3 animate-pulse">🌠</div>
          <div className="text-3xl font-bold text-white mb-1">{goals.length}</div>
          <div className="text-base text-white/80 font-medium">Total Stars</div>
        </div>
        <div className="text-center p-5 bg-white/10 rounded-xl hover:bg-white/15 transition-all duration-300 hover:scale-105">
          <div className="text-4xl mb-3 animate-pulse">⭐</div>
          <div className="text-3xl font-bold text-white mb-1">{completed}</div>
          <div className="text-base text-white/80 font-medium">Constellations</div>
        </div>
        <div className="text-center p-5 bg-white/10 rounded-xl hover:bg-white/15 transition-all duration-300 hover:scale-105">
          <div className="text-4xl mb-3 animate-pulse">📈</div>
          <div className="text-3xl font-bold text-white mb-1">{totalProgress}%</div>
          <div className="text-base text-white/80 font-medium">Average Progress</div>
        </div>
      </div>
    </div>
  );
}

