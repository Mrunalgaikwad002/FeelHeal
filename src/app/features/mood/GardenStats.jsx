"use client";

export default function GardenStats({ garden }) {
  if (garden.length === 0) return null;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center">
        <div className="text-2xl font-bold" style={{color: "var(--feelheal-purple)"}}>
          {garden.length}
        </div>
        <div className="text-sm text-gray-600">Total Plants</div>
      </div>
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center">
        <div className="text-2xl font-bold" style={{color: "var(--feelheal-purple)"}}>
          {new Set(garden.map(p => p.mood)).size}
        </div>
        <div className="text-sm text-gray-600">Mood Types</div>
      </div>
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center">
        <div className="text-2xl font-bold" style={{color: "var(--feelheal-purple)"}}>
          {garden.filter(p => p.date === new Date().toISOString().split('T')[0]).length}
        </div>
        <div className="text-sm text-gray-600">Today's Plants</div>
      </div>
    </div>
  );
}
