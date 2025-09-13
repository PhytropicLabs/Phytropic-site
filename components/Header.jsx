import CTAButton from "@/components/CTAButton";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-base/70">
      <div className="container flex items-center justify-between py-4">
        <a href="/" className="flex items-center gap-3">
          <img src="/logo.svg" alt="Phytropic" className="h-7 w-7" />
          <span className="text-xl font-semibold">Phytropic</span>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm text-muted">
          <a href="/mod">MOD</a>
          <a href="/science">Science</a>
          <a href="/how-it-works">How It Works</a>
          <a href="/stories">Stories</a>
          <a href="/journal">Journal</a>
          <a href="/faq">FAQ</a>
          <a href="/support">Support</a>
        </nav>

        <div className="flex items-center gap-3">
          <CTAButton href="/mod">Explore MOD</CTAButton>
        </div>
      </div>
    </header>
  );
}
