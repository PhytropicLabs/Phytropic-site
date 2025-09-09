// components/FeatureTiles.jsx
import Link from "next/link";

const EFFECTS = [
  {
    id: "calm",
    title: "Calm",
    copy:
      "Smooth the edges without dulling who you are. Kanna + blue lotus + magnolia bark + passionflower + L‑theanine.",
    chip: "bg-calm",
    href: "/mod/calm",
  },
  {
    id: "focus",
    title: "Focus",
    copy:
      "Cleaner attention, fewer tabs. Ingredients finalized with the same clean‑label approach (TBD).",
    chip: "bg-focus",
    href: "/mod/focus",
  },
  {
    id: "energize",
    title: "Energize",
    copy:
      "Upbeat, ready. Includes caffeine; a stimulant‑free version is planned for sensitive users.",
    chip: "bg-energize",
    href: "/mod/energize",
  },
  {
    id: "sleep",
    title: "Sleep",
    copy:
      "A wind‑down that lands. Non‑groggy arc with botanicals selected for night use (TBD).",
    chip: "bg-sleep",
    href: "/mod/sleep",
  },
];

export default function FeatureTiles() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {EFFECTS.map((e) => (
        <article key={e.id} className="rounded-2xl border border-white/10 p-6 bg-white/[0.02]">
          <div className="inline-flex items-center rounded-xl px-3 py-1 text-xs text-black font-medium mb-3">
            <span className={`${e.chip} rounded-lg px-2 py-1`}>{e.title}</span>
          </div>
          <h4 className="text-xl font-semibold">{e.title}</h4>
          <p className="mt-2 text-text/80">{e.copy}</p>
          <div className="mt-4">
            <Link href={e.href} className="text-sm underline underline-offset-4">
              Learn more
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
