export default function HeaderNav() {
  return (
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
          <a href="/signup" className="rounded-full px-4 py-2 border" style={{borderColor: "var(--feelheal-blue)", color: "var(--feelheal-blue)"}}>Signup</a>
          <a href="/login" className="rounded-full px-4 py-2 text-white transition hover:opacity-90" style={{background: "var(--feelheal-purple)"}}>Login</a>
         
        </nav>
      </div>
    </header>
  );
}


