"use client";

export default function HowToUse() {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-center" style={{color: "var(--feelheal-purple)"}}>
        🌱 How to Grow Your Garden
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="text-center">
          <div className="text-3xl mb-2">1️⃣</div>
          <h3 className="font-semibold mb-2" style={{color: "var(--feelheal-purple)"}}>Select Your Mood</h3>
          <p className="text-gray-600">Choose how you're feeling from the mood buttons below</p>
        </div>
        <div className="text-center">
          <div className="text-3xl mb-2">2️⃣</div>
          <h3 className="font-semibold mb-2" style={{color: "var(--feelheal-purple)"}}>Watch It Grow</h3>
          <p className="text-gray-600">Each mood creates a unique plant in your garden</p>
        </div>
        <div className="text-center">
          <div className="text-3xl mb-2">3️⃣</div>
          <h3 className="font-semibold mb-2" style={{color: "var(--feelheal-purple)"}}>Nurture & Explore</h3>
          <p className="text-gray-600">Hover over plants to see when they were planted</p>
        </div>
      </div>
      <div className="mt-4 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
        <p className="text-center text-sm text-gray-700">
          <span className="font-semibold">💡 Tip:</span> Your garden background changes colors based on your recent moods,
          creating a beautiful reflection of your emotional journey!
        </p>
      </div>
    </div>
  );
}
