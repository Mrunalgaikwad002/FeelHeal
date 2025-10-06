export default function LandingPage() {
  return (
    <div className="min-h-screen feelheal-hero-gradient scroll-smooth">
      {/* Navbar */}
      <header className="fixed inset-x-0 top-0 z-50 border-b" style={{borderColor: "#eee"}}>
        <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <a href="#top" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full feelheal-pill" />
            <span className="text-xl font-semibold" style={{color: "var(--feelheal-purple)"}}>FeelHeal 🌸</span>
          </a>
          <nav className="hidden sm:flex items-center gap-5 text-sm">
            <a className="hover:opacity-90" style={{color: "var(--feelheal-purple)"}} href="#top">Home</a>
            <a className="hover:opacity-90" style={{color: "var(--feelheal-purple)"}} href="#about">About</a>
            <a className="hover:opacity-90" style={{color: "var(--feelheal-purple)"}} href="#features">Features</a>
            <a className="hover:opacity-90" style={{color: "var(--feelheal-purple)"}} href="#footer">Contact</a>
            <button className="rounded-full px-4 py-2 text-white transition hover:opacity-90" style={{background: "var(--feelheal-purple)"}}>Get Started</button>
          </nav>
        </div>
      </header>
      <div className="h-14" />

      <main className="max-w-[1440px] mx-auto px-6 md:px-10">
        {/* Hero */}
        <section id="top" className="relative overflow-hidden py-0 md:py-4">
          <div className="blob" style={{left: "-10%", top: "-10%", width: "380px", height: "280px", background: "var(--feelheal-lightPurple)"}} />
          <div className="blob" style={{right: "-10%", top: "10%", width: "320px", height: "240px", background: "var(--feelheal-blue)"}} />
          <img src="/cloud.jpg" alt="" className="absolute left-4 top-8 opacity-70 rounded-2xl" width="160" height="100" />
          <img src="/cloud.jpg" alt="" className="absolute right-4 bottom-4 opacity-70 rounded-2xl" width="200" height="120" />
          <img src="/stars.svg" alt="" className="absolute right-6 top-6 opacity-80" width="140" height="60" />
          <div className="grid md:grid-cols-2 gap-2 items-center -mt-4 md:-mt-12">
            <div className="text-center md:text-left md:pl-8 lg:pl-16">
              <h1 className="text-7xl md:text-9xl font-extrabold tracking-tight display script headline-gradient leading-[0.85]">
                Feel Heal
              </h1>
              <p className="mt-1 md:mt-2 text-3xl md:text-4xl max-w-2xl script tagline-shadow">
                <span style={{color: "color-mix(in oklab, var(--feelheal-purple) 70%, white)", fontWeight: 700}}>Feel</span>{" "}
                <span style={{color: "var(--feelheal-blue)", fontWeight: 700}}>lighter</span>
                <span>, </span>
                <span style={{color: "color-mix(in oklab, var(--feelheal-purple) 70%, white)", fontWeight: 700}}>Heal</span>{" "}
                <span style={{color: "#f2b300", fontWeight: 700}}>brighter</span>
              </p>
              <p className="mt-3 text-base md:text-lg text-black/70 max-w-xl">
                Your daily companion to track emotions, find calm, and practice mindfulness.
              </p>
              <div className="mt-8 flex items-center gap-3 justify-center md:justify-start">
                <a href="/mood-tracker" className="btn-primary">Get Started</a>
                <a href="#features" className="btn-ghost">Explore Features</a>
              </div>
            </div>
            <div className="relative md:pr-0 md:-mr-6 lg:-mr-10">
              <img
                src="/image%201.png"
                alt="Calm pastel illustration"
                className="w-full h-auto rounded-3xl md:w-[110%] md:max-w-none"
                style={{border: 0, outline: 'none', boxShadow: 'none'}}
                loading="eager"
              />
            </div>
          </div>
        </section>

        {/* About / Mission */}
        <section id="about" className="py-12 feelheal-soft-bg rounded-3xl shadow-sm mb-6 md:mb-10">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-2xl md:text-3xl font-semibold mb-3" style={{color: "var(--feelheal-purple)"}}>About FeelHeal</h2>
            <p className="text-black/80">
              At FeelHeal, we believe mental wellness starts with understanding your emotions. Our platform provides tools to express,
              track, and heal your mind gently — one day at a time.
            </p>
          </div>
        </section>

        {/* Full‑bleed showcase band */}
        <section className="relative py-16 -mx-6 md:-mx-10 lg:-mx-20 mt-6 mb-12 md:mb-16">
          <div className="absolute inset-0" style={{background: "linear-gradient(90deg, #faf7ff, #eef6ff)"}} />
          <div className="relative max-w-7xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-center" style={{color: "var(--feelheal-purple)"}}>Explore FeelHeal tools</h2>
            <p className="text-center text-black/80 mt-2 mb-8">Quick, soothing helpers you can use anywhere, anytime.</p>
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              <ToolCard
                title="Calming breaths"
                imgSrc="/calming.png"
                desc="2–3 minute guided breathing to reset quickly."
                accent="var(--feelheal-purple)"
              />
              <ToolCard
                title="Gentle sleep"
                imgSrc="/sleep.png"
                desc="Wind‑down prompts and ambient sounds."
                accent="var(--feelheal-blue)"
              />
              <ToolCard
                title="Ease anxiety"
                imgSrc="/ease anxiety.png"
                desc="Grounding exercises to feel steady again."
                accent="var(--feelheal-cyan)"
              />
            </div>
          </div>
        </section>

        {/* Benefits in 2x2 around a center image */}
        <section id="features" className="pb-16 mt-6 md:mt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center">
            {/* Top-left */}
            <Card className="md:col-span-1" title="Unified Mental Health Support Hub" accent="var(--feelheal-purple)">
              FeelHeal offers a centralized platform where users can assess their mental well‑being, seek guidance, and access helpful resources—all in one place.
            </Card>

            {/* Center image (spans two rows on desktop) */}
            <div className="hidden md:flex md:col-span-1 md:row-span-2 items-center justify-center">
              <img src="/two%20face.png" alt="FeelHeal connection" className="max-w-full md:max-w-[380px] lg:max-w-[460px]" />
            </div>

            {/* Top-right */}
            <Card className="md:col-span-1" title="Personalized Emotional Check‑ins" accent="var(--feelheal-lightPurple)">
              Intelligent questioning helps users self‑identify their mental state and mood patterns, with daily or weekly emotional check‑ins.
            </Card>

            {/* Bottom-left */}
            <Card className="md:col-span-1" title="Actionable Guidance and Support" accent="var(--feelheal-blue)">
              Based on responses, FeelHeal provides customized suggestions, coping strategies, and pathways to professional help.
            </Card>

            {/* Bottom-right */}
            <Card className="md:col-span-1" title="Confidential and User‑Friendly Experience" accent="var(--feelheal-cyan)">
              Designed with privacy and simplicity in mind, ensuring users feel safe, heard, and supported without judgment.
            </Card>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="py-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-center" style={{color: "var(--feelheal-purple)"}}>How FeelHeal works</h2>
          <p className="text-center text-black/80 mt-2 mb-10">Three gentle steps to go from overwhelmed to okay.</p>
          <div className="grid md:grid-cols-3 gap-6">
            <Step num="1" title="Check in" color="var(--feelheal-purple)">
              Log your mood in under 30 seconds with quick taps and optional notes.
            </Step>
            <Step num="2" title="Get guidance" color="var(--feelheal-blue)">
              Receive tailored tips, breathing, journaling, and grounding exercises.
            </Step>
            <Step num="3" title="See progress" color="var(--feelheal-cyan)">
              Weekly insights highlight trends and celebrate healthy routines.
            </Step>
          </div>
        </section>

        {/* Removed library tabs section as requested */}

        {/* Preview (optional) */}
        <section className="py-12 relative">
          <img src="/stars.svg" alt="" className="absolute left-6 -top-4 opacity-60" width="120" height="50" />
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8" style={{color: "var(--feelheal-purple)"}}>Preview</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <MockCard title="Mood Tracker" src="/preview1.png">Simple. Soothing. Supportive.</MockCard>
            <MockCard title="Meditation" src="/preview2.png">Talk freely with empathy.</MockCard>
            <MockCard title="Community" src="/image%203.jpg">See gentle trends.</MockCard>
          </div>
        </section>

        {/* Quotes / Social proof */}
        <section className="py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8" style={{color: "var(--feelheal-purple)"}}>What people say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <QuoteCard caption="Forming more helpful habits">
              I appreciate the gentle reminders to be kind and patient with myself.
            </QuoteCard>
            <QuoteCard caption="Thinking in more helpful ways">
              FeelHeal helped me step back from racing thoughts and find perspective.
            </QuoteCard>
            <QuoteCard caption="Working through feelings">
              The practices changed the way I relate to my emotions each day.
            </QuoteCard>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8" style={{color: "var(--feelheal-purple)"}}>Frequently asked questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <Faq q="What is FeelHeal?" a="A companion app to track emotions, reduce stress, and practice mindfulness." />
            <Faq q="Is my data private?" a="Yes. Entries stay private with clear controls; we do not sell personal data." />
            <Faq q="What can I do in 5 minutes?" a="Quick check‑in, a brief breathing exercise, and a calming affirmation." />
            <Faq q="Is it free?" a="You can start free; advanced insights can be added later as plans." />
          </div>
        </section>

        {/* CTA */}
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
      </main>

      {/* Footer */}
      <footer id="footer" className="border-t py-8 text-center text-sm text-black/60" style={{borderColor: "color-mix(in oklab, var(--feelheal-purple) 20%, transparent)"}}>
        <div className="mb-2"><a href="#about" className="hover:underline">About</a> · <a href="#footer" className="hover:underline">Contact</a> · <a href="#" className="hover:underline">Privacy Policy</a></div>
        <div>Made with 💖 by Mrunal · © {new Date().getFullYear()} FeelHeal</div>
      </footer>
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


