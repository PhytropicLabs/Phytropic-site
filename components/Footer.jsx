export default function Footer(){
  return (
    <footer className="mt-16 border-t border-white/5">
      <div className="container py-10 grid md:grid-cols-4 gap-8 text-sm text-muted">
        <div>
          <div className="text-text font-semibold mb-2">Phytropic Labs LLC</div>
          <p>Modern plant-backed state shifting.</p>
        </div>
        <div>
          <div className="text-text font-semibold mb-2">Company</div>
          <ul className="space-y-2">
            <li><a href="/about">About</a></li>
            <li><a href="/sourcing">Sourcing</a></li>
            <li><a href="/quality">Quality & Testing</a></li>
          </ul>
        </div>
        <div>
          <div className="text-text font-semibold mb-2">Help</div>
          <ul className="space-y-2">
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/support">Support/Contact</a></li>
            <li><a href="/returns">Returns</a></li>
          </ul>
        </div>
        <div>
          <div className="text-text font-semibold mb-2">Subscribe</div>
          <form className="flex gap-2">
            <input className="bg-surface border border-white/10 rounded-xl px-3 py-2 w-full" placeholder="Email"/>
            <button className="bg-focus rounded-xl px-4">Join</button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/5 py-6 text-center text-xs text-muted">© Phytropic Labs LLC</div>
    </footer>
  )
}
