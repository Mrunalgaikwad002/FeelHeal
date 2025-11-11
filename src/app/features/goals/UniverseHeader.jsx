"use client";

export default function UniverseHeader({ viewMode, setViewMode, completedCount, totalCount }) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-5xl font-bold mb-3 animate-pulse" style={{color: "#ffffff"}}>
        🌌 Goal Universe
      </h1>
      <p className="text-lg text-white/80 mb-6 animate-fadeInSoft">Your dreams light up the night sky</p>
      
      {/* View Mode Toggle */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <button
          onClick={() => setViewMode("universe")}
          className={`px-6 py-3 rounded-xl text-base font-medium transition-all ${
            viewMode === "universe"
              ? "bg-white/20 text-white shadow-lg"
              : "bg-white/10 text-white/70 hover:bg-white/15"
          }`}
        >
          🌠 All Stars
        </button>
        <button
          onClick={() => setViewMode("constellation")}
          className={`px-6 py-3 rounded-xl text-base font-medium transition-all ${
            viewMode === "constellation"
              ? "bg-white/20 text-white shadow-lg"
              : "bg-white/10 text-white/70 hover:bg-white/15"
          }`}
        >
          ⭐ Constellations ({completedCount})
        </button>
      </div>

      {totalCount > 0 && (
        <p className="text-base text-white/70">
          {completedCount} of {totalCount} goals completed • Your universe grows with every step you take
        </p>
      )}
    </div>
  );
}

