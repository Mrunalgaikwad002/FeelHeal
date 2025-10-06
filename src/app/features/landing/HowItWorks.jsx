export default function HowItWorks() {
  return (
    <section id="how" className="py-16">
      <h2 className="text-2xl md:text-3xl font-semibold text-center" style={{color: "var(--feelheal-purple)"}}>How FeelHeal works</h2>
      <p className="text-center text-black/80 mt-2 mb-10">Three gentle steps to go from overwhelmed to okay.</p>
      <div className="grid md:grid-cols-3 gap-6">
        <Step title="Check in" color="var(--feelheal-purple)">Log your mood in under 30 seconds with quick taps and optional notes.</Step>
        <Step title="Get guidance" color="var(--feelheal-blue)">Receive tailored tips, breathing, journaling, and grounding exercises.</Step>
        <Step title="See progress" color="var(--feelheal-cyan)">Weekly insights highlight trends and celebrate healthy routines.</Step>
      </div>
    </section>
  );
}

function Step({ title, color, children }) {
  return (
    <div className="relative" style={{ padding: '2px', borderRadius: '24px' }}>
      <div className="absolute inset-0" style={{ borderRadius: '24px', background: `linear-gradient(135deg, ${color}, color-mix(in oklab, ${color} 30%, white))` }} />
      <div className="relative bg-white/95" style={{ borderRadius: '22px', padding: '18px' }}>
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-lg font-semibold" style={{ color: 'var(--feelheal-purple)' }}>{title}</h3>
        </div>
        <p className="text-black/70 text-sm md:text-base leading-relaxed">{children}</p>
      </div>
    </div>
  );
}


