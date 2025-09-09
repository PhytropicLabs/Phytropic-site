// app/page.jsx
import Link from "next/link";

export const metadata = {
  title: "Phytropic Labs — Ancient meets Advanced",
  description:
    "Natural tools for modern states. Tune into Calm, Focus, Energize, or Sleep with MOD.",
};

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* HERO */}
      <section className="relative overflow-hidden bg-base">
        <div className="container mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs text-text/80">
                Phytropic Labs LLC
                <span className="h-1 w-1 rounded-full bg-calm inline-block" />
                Ancient meets advanced
              </div>

              <h1 className="mt-5 text-4xl md:text-6xl font-semibold leading-tight">
                Natural tools for modern states.
              </h1>

              <p className="mt-4 text-lg text-text/80 max-w-xl">
                MOD is a simple, fast‑acting ritual that helps you tune into the
                state you need—without feeling out of character.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/finder"
                  className="rounded-2xl px-6 py-3 bg-calm text-black font-medium"
                >
                  Find your MOD
                </Link>
                <Link
                  href="/mod"
                  className="rounded-2xl px-6 py-3 border border-white/15"
                >
                  Explore effects
                </Link>
              </div>

              <p className="mt-4 text-xs text-text/60">
                General information only. Not medical advice. Talk with your
                clinician.
              </p>
            </div>

            {/* simple brand visual */}
            <div className="rounded-3xl border border-white/10 p-6 bg-gradient-to-br from-white/[0.04] to-transparent">
              <div className="aspect-[4/3] rounded-2xl bg-[radial-gradient(circle_at_30%_20%,rgba(89,179,165,.35),transparent_45%),radial-gradient(circle_at_70%_80%,rgba(122,160,255,.35),transparent_40%)] border border-white/10" />
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <Badge label="Clean label" />
                <Badge label="Fast onset" />
                <Badge label="Calm • Focus • Energize • Sleep" />
                <Badge label="Consistent dose" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* “HOW IT WORKS” */}
      <section className="border-t border-white/10 bg-surface">
        <div className="container mx-auto max-w-6xl px-6 py-16">
          <div className="grid md:grid-cols-3 gap-6">
            <HowCard n="01" t="Place" d="Tuck pouch high in gum/cheek (buccal) for fast onset." />
            <HowCard n="02" t="Breathe" d="Slow nasal breaths (4–6 cycles) to prime your state." />
            <HowCard n="03" t="Notice" d="Most feel a shift in minutes; adjust session by feel." />
          </div>
        </div>
      </section>

      {/* EFFECTS */}
      <section className="border-t border-white/10 bg-base">
        <div className="container mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-center text-3xl md:text-4xl font-semibold">
            The MOD effects
          </h2>
          <p className="mt-3 text-center text-text/70">
            Four precise directions. One pouch‑based ritual.
          </p>

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <EffectCard
              chipClass="bg-calm"
              title="Calm"
              copy="Smooth the edges without dulling who you are. Kanna, blue lotus, magnolia bark, passionflower, L‑theanine."
              href="/mod/calm"
            />
            <EffectCard
              chipClass="bg-focus"
              title="Focus"
              copy="Cleaner attention, fewer tabs. Ingredients finalized with the same clean‑label approach (TBD)."
              href="/mod/focus"
            />
            <EffectCard
              chipClass="bg-energize"
              title="Energize"
              copy="Upbeat, ready. Includes caffeine; a stimulant‑free version is planned for sensitive users."
              href="/mod/energize"
            />
            <EffectCard
              chipClass="bg-sleep"
              title="Sleep"
              copy="A wind‑down that lands. Non‑groggy arc with botanicals selected for night use (TBD)."
              href="/mod/sleep"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 bg-surface">
        <div className="container mx-auto max-w-6xl px-6 py-16 text-center">
          <h3 className="text-3xl md:text-4xl font-semibold">
            Ready to tune your day?
          </h3>
          <p className="text-text/80 mt-3">
            Answer a couple of questions and get a personalized recommendation.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/finder"
              className="rounded-2xl px-6 py-3 bg-calm text-black font-medium"
            >
              Find your MOD
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function Badge({ label }) {
  return (
    <div className="rounded-xl border border-white/10 px-3 py-2 bg-white/[0.03] text-text/80">
      {label}
    </div>
  );
}

function HowCard({ n, t, d }) {
  return (
    <div className="rounded-2xl border border-white/10 p-6 bg-white/[0.02]">
      <div className="text-xs text-text/60">{n}</div>
      <div className="font-semibold mt-1">{t}</div>
      <div className="text-text/80 text-sm mt-1">{d}</div>
    </div>
  );
}

function EffectCard({ chipClass, title, copy, href }) {
  return (
    <article className="rounded-2xl border border-white/10 p-6 bg-white/[0.02]">
      <div className="inline-flex items-center rounded-xl px-3 py-1 text-xs text-black font-medium mb-3">
        <span className={`${chipClass} rounded-lg px-2 py-1`}>{title}</span>
      </div>
      <h4 className="text-xl font-semibold">{title}</h4>
      <p className="mt-2 text-text/80">{copy}</p>
      <div className="mt-4">
        <Link href={href} className="text-sm underline underline-offset-4">
          Learn more
        </Link>
      </div>
    </article>
  );
}
