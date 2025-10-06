import HeaderNav from "./HeaderNav";
import Hero from "./Hero";
import About from "./About";
import ExploreTools from "./ExploreTools";
import FeaturesGrid from "./FeaturesGrid";
import HowItWorks from "./HowItWorks";
import PreviewSection from "./PreviewSection";
import TestimonialsSection from "./TestimonialsSection";
import FaqSection from "./FaqSection";
import Cta from "./Cta";
import SiteFooter from "./SiteFooter";

export default function LandingPage() {
  return (
    <div className="min-h-screen feelheal-hero-gradient scroll-smooth">
      <HeaderNav />
      <div className="h-14" />
      <main className="max-w-[1440px] mx-auto px-6 md:px-10">
        <Hero />
        <About />
        <ExploreTools />
        <FeaturesGrid />
        <HowItWorks />
        <PreviewSection />
        <TestimonialsSection />
        <FaqSection />
        <Cta />
      </main>
      <SiteFooter />
    </div>
  );
}


function Card({ title, accent, children, className = "" }) {
  const bar = `linear-gradient(90deg, ${accent}, color-mix(in oklab, ${accent} 35%, white))`;
  const bg = `color-mix(in oklab, ${accent} 6%, white)`;
  const borderGrad = `linear-gradient(135deg, ${accent}, color-mix(in oklab, ${accent} 35%, white))`;
  return (
    <div
      className={`relative shadow-sm hover:shadow-md transition overflow-hidden ${className}`}
      style={{
        padding: '2px',
        borderRadius: '28px 56px 28px 56px',
        background: `${borderGrad} border-box`,
      }}
    >
      <div
        className="bg-white/90"
        style={{
          borderRadius: '26px 54px 26px 54px',
          background: bg,
          padding: '22px',
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="h-1.5 flex-1 rounded-full" style={{background: bar}} />
        </div>
        <h3 className="text-xl font-semibold mb-2" style={{color: 'var(--feelheal-purple)'}}>{title}</h3>
        <p className="text-black/75 text-base leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

function MockCard({ title, src, children }) {
  return (
    <div className="rounded-2xl p-6 feelheal-card">
      {src ? (
        <img src={src} alt="" className="h-48 w-full object-contain rounded-xl mb-3 bg-white p-2" />
      ) : (
        <div className="h-32 rounded-xl mb-3" style={{background: "linear-gradient(135deg, var(--feelheal-lavender), var(--feelheal-pink))"}} />
      )}
      <h4 className="font-semibold mb-1" style={{color: "var(--feelheal-purple)"}}>{title}</h4>
      <p className="text-black/80 text-sm">{children}</p>
    </div>
  );
}

function IntentCard({ label, icon, imgSrc }) {
  return (
    <a
      href="#"
      className="flex items-center justify-between rounded-2xl p-5 border bg-white hover:shadow-sm transition"
      style={{ borderColor: "color-mix(in oklab, var(--feelheal-purple) 20%, #eaeaea)" }}
    >
      <span className="text-lg font-medium text-black/90">{label}</span>
      {imgSrc ? (
        <img src={imgSrc} alt="" className="h-8 w-8 object-contain" />
      ) : (
        <span className="text-2xl" aria-hidden>{icon}</span>
      )}
    </a>
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

function QuoteCard({ children, caption }) {
  return (
    <div
      className="rounded-3xl p-6 border shadow-sm hover:shadow-md transition hover:-translate-y-0.5"
      style={{
        background: "linear-gradient(180deg, #fffaf5, #ffffff)",
        borderColor: "color-mix(in oklab, var(--feelheal-purple) 20%, transparent)",
      }}
    >
      <div className="h-1 w-full rounded-full mb-4" style={{background: "linear-gradient(90deg, var(--feelheal-purple), var(--feelheal-blue))"}} />
      <p className="text-lg md:text-xl text-black/90">“{children}”</p>
      <div className="mt-6 text-sm" style={{color: "var(--feelheal-purple)"}}>Member on {caption}</div>
    </div>
  );
}

function Faq({ q, a }) {
  return (
    <details className="group rounded-3xl border shadow-sm overflow-hidden bg-white">
      <summary className="cursor-pointer flex items-center justify-between p-5">
        <span className="font-semibold" style={{color: 'var(--feelheal-purple)'}}>{q}</span>
        <span className="ml-4 inline-flex h-6 w-6 items-center justify-center rounded-full text-sm text-white group-open:rotate-45 transition" style={{background: 'linear-gradient(90deg, var(--feelheal-purple), var(--feelheal-blue))'}}>+</span>
      </summary>
      <div className="px-5 pb-5 pt-0">
        <div className="h-1 w-full rounded-full mb-4" style={{background: 'linear-gradient(90deg, var(--feelheal-purple), var(--feelheal-blue))'}} />
        <p className="text-black/80 leading-relaxed">{a}</p>
      </div>
    </details>
  );
}

function Step({ num, title, color, children }) {
  return (
    <div className="relative" style={{padding: '2px', borderRadius: '24px'}}>
      <div className="absolute inset-0" style={{
        borderRadius: '24px',
        background: `linear-gradient(135deg, ${color}, color-mix(in oklab, ${color} 30%, white))`
      }} />
      <div className="relative bg-white/95" style={{borderRadius: '22px', padding: '18px'}}>
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-lg font-semibold" style={{color: 'var(--feelheal-purple)'}}>{title}</h3>
        </div>
        <p className="text-black/70 text-sm md:text-base leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

// CircleFlow and FlowNode removed per request

function Testimonial({ name, role, children }) {
  return (
    <div className="rounded-2xl p-6 feelheal-card">
      <p className="text-black/80">“{children}”</p>
      <div className="mt-4 text-sm text-black/60">— {name}, {role}</div>
    </div>
  );
}


