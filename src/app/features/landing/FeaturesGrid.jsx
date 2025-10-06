export default function FeaturesGrid() {
  return (
    <section id="features" className="pb-16 mt-6 md:mt-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center">
        <Card title="Unified Mental Health Support Hub" accent="var(--feelheal-purple)">
          FeelHeal offers a centralized platform where users can assess their mental well‑being, seek guidance, and access helpful resources—all in one place.
        </Card>
        <div className="hidden md:flex md:col-span-1 md:row-span-2 items-center justify-center">
          <img src="/two%20face.png" alt="FeelHeal connection" className="max-w-full md:max-w-[380px] lg:max-w-[460px]" />
        </div>
        <Card title="Personalized Emotional Check‑ins" accent="var(--feelheal-lightPurple)">
          Intelligent questioning helps users self‑identify their mental state and mood patterns, with daily or weekly emotional check‑ins.
        </Card>
        <Card title="Actionable Guidance and Support" accent="var(--feelheal-blue)">
          Based on responses, FeelHeal provides customized suggestions, coping strategies, and pathways to professional help.
        </Card>
        <Card title="Confidential and User‑Friendly Experience" accent="var(--feelheal-cyan)">
          Designed with privacy and simplicity in mind, ensuring users feel safe, heard, and supported without judgment.
        </Card>
      </div>
    </section>
  );
}

function Card({ title, accent, children, className = "" }) {
  const bar = `linear-gradient(90deg, ${accent}, color-mix(in oklab, ${accent} 35%, white))`;
  const bg = `color-mix(in oklab, ${accent} 6%, white)`;
  const borderGrad = `linear-gradient(135deg, ${accent}, color-mix(in oklab, ${accent} 35%, white))`;
  return (
    <div
      className={`relative shadow-sm hover:shadow-md transition overflow-hidden ${className}`}
      style={{ padding: '2px', borderRadius: '28px 56px 28px 56px', background: `${borderGrad} border-box` }}
    >
      <div className="bg-white/90" style={{ borderRadius: '26px 54px 26px 54px', background: bg, padding: '22px' }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="h-1.5 flex-1 rounded-full" style={{ background: bar }} />
        </div>
        <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--feelheal-purple)' }}>{title}</h3>
        <p className="text-black/75 text-base leading-relaxed">{children}</p>
      </div>
    </div>
  );
}


