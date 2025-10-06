export default function ExploreTools() {
  return (
    <section className="relative py-16 -mx-6 md:-mx-10 lg:-mx-20 mt-6 mb-12 md:mb-16">
      <div className="absolute inset-0" style={{background: "linear-gradient(90deg, #faf7ff, #eef6ff)"}} />
      <div className="relative max-w-7xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-center" style={{color: "var(--feelheal-purple)"}}>Explore FeelHeal tools</h2>
        <p className="text-center text-black/80 mt-2 mb-8">Quick, soothing helpers you can use anywhere, anytime.</p>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          <ToolCard title="Calming breaths" imgSrc="/calming.png" desc="2–3 minute guided breathing to reset quickly." accent="var(--feelheal-purple)" />
          <ToolCard title="Gentle sleep" imgSrc="/sleep.png" desc="Wind‑down prompts and ambient sounds." accent="var(--feelheal-blue)" />
          <ToolCard title="Ease anxiety" imgSrc="/ease anxiety.png" desc="Grounding exercises to feel steady again." accent="var(--feelheal-cyan)" />
        </div>
      </div>
    </section>
  );
}

function ToolCard({ title, imgSrc, desc, accent = "var(--feelheal-purple)" }) {
  return (
    <div className="rounded-3xl p-6 bg-white shadow-sm border hover:shadow-md transition" style={{borderColor: "#eee"}}>
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 grid place-items-center rounded-2xl" style={{background: `color-mix(in oklab, ${accent} 18%, white)`}}>
          <img src={imgSrc} alt="" className="h-10 w-10 object-contain" />
        </div>
        <div>
          <h3 className="text-lg font-semibold" style={{color: accent}}>{title}</h3>
          <p className="text-black/70 text-sm">{desc}</p>
        </div>
      </div>
      <div className="mt-5 flex items-center gap-2">
        <span className="text-xs px-2 py-1 rounded-full" style={{background: `color-mix(in oklab, ${accent} 12%, white)`, color: accent}}>Try now</span>
        <a href="#" className="text-sm font-medium" style={{color: accent}}>Learn more →</a>
      </div>
    </div>
  );
}


