export default function Cta() {
  return (
    <section className="py-16 text-center">
      <div className="rounded-3xl p-8 md:p-12 feelheal-card">
        <h3 className="text-2xl md:text-3xl font-semibold" style={{color: "var(--feelheal-purple)"}}>Start your 5‑minute reset</h3>
        <p className="mt-2 text-black/70">Join free. No judgment, just gentle guidance.</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button className="rounded-full px-6 py-3 text-white" style={{background: "var(--feelheal-purple)"}}>Create account</button>
          <button className="rounded-full px-6 py-3 border" style={{borderColor: "var(--feelheal-blue)", color: "var(--feelheal-blue)"}}>Try a demo</button>
        </div>
      </div>
    </section>
  );
}


