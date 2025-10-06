export default function TestimonialsSection() {
  return (
    <section className="py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8" style={{color: "var(--feelheal-purple)"}}>What people say</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <QuoteCard caption="Forming more helpful habits">I appreciate the gentle reminders to be kind and patient with myself.</QuoteCard>
        <QuoteCard caption="Thinking in more helpful ways">FeelHeal helped me step back from racing thoughts and find perspective.</QuoteCard>
        <QuoteCard caption="Working through feelings">The practices changed the way I relate to my emotions each day.</QuoteCard>
      </div>
    </section>
  );
}

function QuoteCard({ children, caption }) {
  return (
    <div className="rounded-3xl p-6 border shadow-sm hover:shadow-md transition hover:-translate-y-0.5" style={{background: "linear-gradient(180deg, #fffaf5, #ffffff)", borderColor: "color-mix(in oklab, var(--feelheal-purple) 20%, transparent)"}}>
      <div className="h-1 w-full rounded-full mb-4" style={{background: "linear-gradient(90deg, var(--feelheal-purple), var(--feelheal-blue))"}} />
      <p className="text-lg md:text-xl text-black/90">“{children}”</p>
      <div className="mt-6 text-sm" style={{color: "var(--feelheal-purple)"}}>Member on {caption}</div>
    </div>
  );
}


