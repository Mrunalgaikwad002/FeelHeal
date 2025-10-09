"use client";

export default function MoodOptions({ options, onSelect }) {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-center" style={{color: "var(--feelheal-purple)"}}>
        How are you feeling today?
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {options.map((mood) => (
          <button
            key={mood.value}
            onClick={() => onSelect(mood)}
            className="flex flex-col items-center p-4 rounded-xl hover:scale-105 transition-all duration-200 bg-white/50 hover:bg-white/80"
            style={{ borderColor: mood.color }}
          >
            <span className="text-3xl mb-2">{mood.emoji}</span>
            <span className="text-sm font-medium" style={{color: "var(--feelheal-purple)"}}>
              {mood.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
