export default function SiteFooter() {
  return (
    <footer id="footer" className="border-t py-8 text-center text-sm text-black/60" style={{borderColor: "color-mix(in oklab, var(--feelheal-purple) 20%, transparent)"}}>
      <div className="mb-2"><a href="#about" className="hover:underline">About</a> · <a href="#footer" className="hover:underline">Contact</a> · <a href="#" className="hover:underline">Privacy Policy</a></div>
      <div>Made with 💖 by Mrunal · © {new Date().getFullYear()} FeelHeal</div>
    </footer>
  );
}


