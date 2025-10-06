export default function PreviewSection() {
  return (
    <section className="py-12 relative">
      <img src="/stars.svg" alt="" className="absolute left-6 -top-4 opacity-60" width="120" height="50" />
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8" style={{color: "var(--feelheal-purple)"}}>Preview</h2>
      <div className="grid md:grid-cols-3 gap-6 text-center">
        <MockCard title="Mood Tracker" src="/preview1.png">Simple. Soothing. Supportive.</MockCard>
        <MockCard title="Meditation" src="/preview2.png">Talk freely with empathy.</MockCard>
        <MockCard title="Community" src="/image%203.jpg">See gentle trends.</MockCard>
      </div>
    </section>
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


