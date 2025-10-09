"use client";

export default function GardenDisplay({ garden }) {
  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 min-h-[400px] relative overflow-hidden">
      <h3 className="text-lg font-semibold mb-4 text-center" style={{color: "var(--feelheal-purple)"}}>
        Your Garden ({garden.length} plants)
      </h3>
      {garden.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <span className="text-6xl mb-4">🌱</span>
          <p className="text-lg">Your garden is waiting for its first plant!</p>
          <p className="text-sm">Select a mood above to start growing 🌸</p>
        </div>
      ) : (
        <div className="relative h-64">
          {garden.map((plant) => (
            <div
              key={plant.id}
              className="absolute cursor-pointer hover:scale-110 transition-transform duration-200"
              style={{
                left: `${plant.position.x}%`,
                top: `${plant.position.y}%`,
                fontSize: `${1.5 * plant.size}rem`
              }}
              title={`${plant.name} - ${plant.date}`}
            >
              {plant.emoji}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
