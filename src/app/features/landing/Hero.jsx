export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden py-0 md:py-4">
      <div className="blob" style={{left: "-10%", top: "-10%", width: "380px", height: "280px", background: "var(--feelheal-lightPurple)"}} />
      <div className="blob" style={{right: "-10%", top: "10%", width: "320px", height: "240px", background: "var(--feelheal-blue)"}} />
      <img src="/cloud.jpg" alt="" className="absolute left-4 top-8 opacity-70 rounded-2xl" width="160" height="100" />
      <img src="/cloud.jpg" alt="" className="absolute right-4 bottom-4 opacity-70 rounded-2xl" width="200" height="120" />
      <img src="/stars.svg" alt="" className="absolute right-6 top-6 opacity-80" width="140" height="60" />
      <div className="grid md:grid-cols-2 gap-2 items-center -mt-4 md:-mt-12">
        <div className="text-center md:text-left md:pl-8 lg:pl-16">
          <h1 className="text-7xl md:text-9xl font-extrabold tracking-tight display script headline-gradient leading-[0.85]">Feel Heal</h1>
          <p className="mt-1 md:mt-2 text-3xl md:text-4xl max-w-2xl script tagline-shadow">
            <span style={{color: "color-mix(in oklab, var(--feelheal-purple) 70%, white)", fontWeight: 700}}>Feel</span>{" "}
            <span style={{color: "var(--feelheal-blue)", fontWeight: 700}}>lighter</span>
            <span>, </span>
            <span style={{color: "color-mix(in oklab, var(--feelheal-purple) 70%, white)", fontWeight: 700}}>Heal</span>{" "}
            <span style={{color: "#f2b300", fontWeight: 700}}>brighter</span>
          </p>
          <p className="mt-3 text-base md:text-lg text-black/70 max-w-xl">Your daily companion to track emotions, find calm, and practice mindfulness.</p>
          <div className="mt-8 flex items-center gap-3 justify-center md:justify-start">
            <a href="/mood-tracker" className="btn-primary">Get Started</a>
            <a href="#features" className="btn-ghost">Explore Features</a>
          </div>
        </div>
        <div className="relative md:pr-0 md:-mr-6 lg:-mr-10">
          <img src="/image%201.png" alt="Calm pastel illustration" className="w-full h-auto rounded-3xl md:w-[110%] md:max-w-none" style={{border: 0, outline: 'none', boxShadow: 'none'}} loading="eager" />
        </div>
      </div>
    </section>
  );
}


