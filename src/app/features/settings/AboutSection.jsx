"use client";

export default function AboutSection() {
  return (
    <section className="bg-white/75 backdrop-blur-md border border-white/40 rounded-3xl p-8 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">✨</span>
        <div>
          <h3 className="text-2xl font-semibold" style={{ color: "var(--feelheal-purple)" }}>
            About FeelHeal
          </h3>
          <p className="text-gray-600">Made with ❤️ by Mrunal. To heal hearts through emotion, creativity, and play.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-white/70 border border-white/60 p-5">
          <p className="text-lg font-semibold text-[#2b2150]">Mission</p>
          <p className="text-sm text-gray-600 mt-2">
            "To heal hearts through emotion, creativity, and play." We're building gentle spaces where you can feel, create,
            and recharge.
          </p>
        </div>
        <div className="rounded-2xl bg-white/70 border border-white/60 p-5">
          <p className="text-lg font-semibold text-[#2b2150]">App Version</p>
          <p className="text-sm text-gray-600 mt-2">v1.0.0 · Last updated {new Date().toLocaleDateString()}</p>
          <button className="mt-4 px-4 py-2 rounded-full bg-[#f2e8ff] text-[#7d54c2] font-semibold">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}

