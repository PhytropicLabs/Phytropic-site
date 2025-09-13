// app/page.jsx
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Phytropic — Nature’s Frequency, Your Balance",
  description: "The story of Phytropic and the inspiration behind MOD.",
};

function Section({ children, className = "" }) {
  return (
    <section className={`w-full px-6 md:px-10 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="flex flex-col">
      {/* HERO */}
      <Section className="pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
              Phytropic
            </h1>
            <p className="mt-4 text-lg md:text-xl text-text/80 leading-relaxed">
              Ancient plant wisdom, refined with modern delivery. We help you
              tune your moment’s frequency, from deeply calm to fully energized, through
              human-plant synergy and clean formulation.
            </p>
            <div className="mt-8 flex gap-3">
              <Link
                href="#story"
                className="rounded-2xl px-5 py-3 border border-white/15 hover:border-white/30"
              >
                Our story
              </Link>
              <Link
                href="/mod"
                className="rounded-2xl px-5 py-3 bg-calm text-black/90 hover:opacity-90"
              >
                Explore MOD
              </Link>
            </div>
          </div>

          {/* Drop your emblem file at /public/brand/mod-emblem.svg */}
          <div className="relative aspect-square">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 to-white/0" />
            <div className="absolute inset-0 grid place-items-center">
              <Image
                src="/brand/mod-emblem.svg"
                width={360}
                height={360}
                alt="Phytropic emblem"
                className="opacity-90"
                priority
              />
            </div>
            {/* emanating rings – subtle */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" aria-hidden>
              {[18,32,46,60,74,88].map((r) => (
                <circle key={r} cx="50" cy="50" r={r/2} className="fill-none"
                        stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.7"/>
              ))}
            </svg>
          </div>
        </div>
      </Section>

      {/* STORY */}
      <Section id="story" className="py-14 md:py-20">
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-5">
            <h2 className="text-2xl md:text-3xl font-semibold">Why Phytropic?</h2>
          </div>
          <div className="md:col-span-7 text-text/85 leading-relaxed space-y-4">
            <p>
              Phytropic comes from "Phyto" (plant) and "tropic" (stimulus caused growth.) It’s our belief that the
              nervous system already knows where balance lives, sometimes you just need a
              nudge in the right direction. We pair revered botanicals with a
              fast, clean pouch delivery to make the ritual effortless.
            </p>
            <p>
              Every blend is built to be felt quickly, yet remain gentle and
              sustainable. No harsh spikes. No foggy "comedowns" (as common with synthetics). Just a clear
              shift into the state you meant to be in.
            </p>
          </div>
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section className="py-14 md:py-20">
        <h3 className="text-xl md:text-2xl font-semibold">How it works</h3>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {[
            ["Choose your state", "Calm, Focus, Sleep, or Energize—guided by a quick tuner quiz."],
            ["Place the pouch", "Buccal placement (gum/cheek) for fast perception and steady arc."],
            ["Feel it Function", "Keep in for 20-40 minutes or until you want lighter effects. Breathing excercises compound the effect."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl p-6 bg-surface border border-white/10">
              <div className="font-medium">{t}</div>
              <div className="mt-2 text-text/80">{d}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* MOD TEASER */}
      <Section className="py-16 md:py-24">
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-semibold">MOD</h3>
              <p className="mt-4 text-text/80">
                Our flagship adaptogen pouch. MOD.
              </p>
              <div className="mt-6 flex gap-3">
                <Link href="/finder" className="rounded-2xl px-5 py-3 border border-white/15 hover:border-white/30">
                  Find your MOD
                </Link>
                <Link href="/mod" className="rounded-2xl px-5 py-3 bg-white/90 text-black hover:opacity-90">
                  Learn more
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl bg-gradient-to-br from-calm/30 to-transparent border border-white/10">
              {/* Drop a straight-on tin render to /public/brand/tin-front.png when ready */}
              <Image
                src="/brand/tin-front.png"
                alt="MOD tin"
                fill
                className="object-contain p-6 opacity-95"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="py-16 md:py-24">
        <div className="rounded-3xl p-10 bg-surface border border-white/10 text-center">
          <h4 className="text-2xl md:text-3xl font-semibold">Start your ritual</h4>
          <p className="mt-3 text-text/80">
            Answer two quick questions, tune your frequency, and get a personalized suggestion.
          </p>
          <div className="mt-6">
            <Link href="/finder" className="rounded-2xl px-6 py-3 bg-calm text-black/90 hover:opacity-90">
              Take the quiz
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}
