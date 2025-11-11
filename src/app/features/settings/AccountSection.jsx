"use client";

export default function AccountSection({ user, progress }) {
  return (
    <section className="bg-white/75 backdrop-blur-md border border-white/40 rounded-3xl p-8 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">👤</span>
        <div>
          <h3 className="text-2xl font-semibold" style={{ color: "var(--feelheal-purple)" }}>
            Account & Profile
          </h3>
          <p className="text-gray-600">Keep your FeelHeal identity updated.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr,1fr,1fr]">
        <div className="rounded-2xl bg-white/70 border border-white/60 p-5">
          <p className="text-sm text-gray-500 uppercase tracking-[0.2em] mb-2">Name</p>
          <p className="text-lg font-semibold text-[#2b2150]">{user.name || "Set your name"}</p>
        </div>
        <div className="rounded-2xl bg-white/70 border border-white/60 p-5">
          <p className="text-sm text-gray-500 uppercase tracking-[0.2em] mb-2">Email</p>
          <p className="text-lg font-semibold text-[#2b2150]">{user.email || "Add your email"}</p>
        </div>
        <div className="rounded-2xl bg-white/70 border border-white/60 p-5">
          <p className="text-sm text-gray-500 uppercase tracking-[0.2em] mb-2">Linked account</p>
          <p className="text-lg font-semibold text-[#2b2150]">Google (coming soon)</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-white/70 border border-white/60 p-5">
        <p className="text-sm text-gray-500 uppercase tracking-[0.2em] mb-2">My progress</p>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white/90 border border-white/80 p-4 flex flex-col items-center">
            <span className="text-3xl mb-2">🌟</span>
            <p className="text-3xl font-bold text-[#7d54c2]">{progress.goals}</p>
            <p className="text-sm text-gray-500 text-center mt-1">Goals shining</p>
          </div>
          <div className="rounded-2xl bg-white/90 border border-white/80 p-4 flex flex-col items-center">
            <span className="text-3xl mb-2">😂</span>
            <p className="text-3xl font-bold text-[#7d54c2]">{progress.smiles}</p>
            <p className="text-sm text-gray-500 text-center mt-1">Smiles saved</p>
          </div>
          <div className="rounded-2xl bg-white/90 border border-white/80 p-4 flex flex-col items-center">
            <span className="text-3xl mb-2">💃</span>
            <p className="text-3xl font-bold text-[#7d54c2]">{progress.dances}</p>
            <p className="text-sm text-gray-500 text-center mt-1">Dances celebrated</p>
          </div>
        </div>
      </div>
    </section>
  );
}

