// app/page.jsx
import BrandHero from "@/components/BrandHero";
import PressBar from "@/components/PressBar";
import FeatureTiles from "@/components/FeatureTiles";
import HowItWorks from "@/components/HowItWorks";
import RitualBanner from "@/components/RitualBanner";
import CTASection from "@/components/CTASection";

export const metadata = {
  title: "Phytropic Labs — Ancient Meets Advanced",
  description: "Natural tools for modern states. MOD helps you tune into Calm, Focus, Energize, and Sleep—without guesswork."
};

export default function Home() {
  return (
    <main className="flex flex-col">
      <BrandHero />

      <section className="border-t border-white/10 bg-base">
        <div className="container mx-auto max-w-6xl px-6 py-10">
          <PressBar />
        </div>
      </section>

      <section className="border-t border-white/10 bg-surface">
        <div className="container mx-auto max-w-6xl px-6 py-16">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold">Ancient meets advanced.</h2>
              <p className="mt-4 text-text/80 leading-relaxed">
                We combine time‑tested botanicals with modern delivery to help you click into the
                state you’re after—calm, focus, energize, or sleep. A simple ritual. A measurable shift.
              </p>
              <ul className="mt-6 space-y-2 text-text/80">
                <li>• Clinically‑informed formulas</li>
                <li>• Fast onset buccal pouches</li>
                <li>• Clean label, consistent experience</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 p-6 bg-gradient-to-b from-white/3 to-transparent">
              <HowItWorks />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-base">
        <div className="container mx-auto max-w-6xl px-6 py-16">
          <h3 className="text-center text-3xl md:text-4xl font-semibold">The MOD effects</h3>
          <p className="mt-3 text-center text-text/70">Four precise directions. One pouch‑based ritual.</p>
          <div className="mt-10">
            <FeatureTiles />
          </div>
        </div>
      </section>

      <RitualBanner />

      <section className="border-t border-white/10 bg-surface">
        <div className="container mx-auto max-w-6xl px-6 py-16">
          <div className="grid md:grid-cols-3 gap-6">
            <CardStat k="Avg onset" v="5–10 min" />
            <CardStat k="Artificial flavors" v="0" />
            <CardStat k="Satisfaction" v="97%" />
          </div>
          <p className="text-xs text-text/60 mt-4">Self‑reported by early customers. Results vary.</p>
        </div>
      </section>

      <CTASection />
    </main>
  );
}

function CardStat({ k, v }) {
  return (
    <div className="rounded-2xl border border-white/10 p-6 bg-white/[0.02]">
      <div className="text-text/70 text-sm uppercase tracking-wide">{k}</div>
      <div className="text-3xl font-semibold mt-2">{v}</div>
    </div>
  );
}
