"use client";

export default function MeditationSection({ isFirstTime }) {
  const meditations = [
    { title: "5-Minute Breathing", duration: "5 min", type: "Breathing" },
    { title: "Body Scan", duration: "10 min", type: "Mindfulness" },
    { title: "Loving Kindness", duration: "8 min", type: "Compassion" },
    { title: "Quick Reset", duration: "3 min", type: "Stress Relief" }
  ];

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-lg">
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-3">🧘‍♀️</span>
        <h3 className="text-xl font-semibold" style={{color: "var(--feelheal-purple)"}}>
          Meditation
        </h3>
      </div>

      {isFirstTime ? (
        <div className="text-center">
          <div className="mb-4">
            <div className="text-4xl mb-2">🧘‍♀️</div>
            <p className="text-gray-600 mb-4">Access guided meditations and breathing exercises</p>
            <p className="text-sm text-gray-500">
              Take a moment to center yourself and find peace.
            </p>
          </div>
          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 text-white font-medium hover:from-green-600 hover:to-teal-600 transition-all">
            Start Meditating
          </button>
        </div>
      ) : (
        <div>
          <p className="text-sm text-gray-600 mb-4">Choose a meditation session:</p>
          <div className="space-y-3">
            {meditations.map((meditation, index) => (
              <button
                key={index}
                className="w-full p-3 rounded-xl bg-white/50 hover:bg-white/70 border border-white/30 transition-all text-left"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-800">{meditation.title}</div>
                    <div className="text-sm text-gray-500">{meditation.type}</div>
                  </div>
                  <div className="text-sm font-medium" style={{color: "var(--feelheal-purple)"}}>
                    {meditation.duration}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
