export default function FaqSection() {
  return (
    <section className="py-16">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8" style={{color: "var(--feelheal-purple)"}}>Frequently asked questions</h2>
      <div className="max-w-3xl mx-auto space-y-4">
        <Faq q="What is FeelHeal?" a="A companion app to track emotions, reduce stress, and practice mindfulness." />
        <Faq q="Is my data private?" a="Yes. Entries stay private with clear controls; we do not sell personal data." />
        <Faq q="What can I do in 5 minutes?" a="Quick check‑in, a brief breathing exercise, and a calming affirmation." />
        <Faq q="Is it free?" a="You can start free; advanced insights can be added later as plans." />
      </div>
    </section>
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


