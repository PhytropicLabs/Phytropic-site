// components/HowItWorks.jsx
const STEPS = [
  { k: "01", t: "Place", d: "Tuck pouch high in gum/cheek (buccal) to absorb actives fast." },
  { k: "02", t: "Breathe", d: "Slow nasal breathing (4–6 cycles) to prime your state." },
  { k: "03", t: "Notice", d: "Most feel a shift within minutes; adjust session length by feel." },
];

export default function HowItWorks() {
  return (
    <ol className="grid gap-4">
      {STEPS.map((s) => (
        <li key={s.k} className="rounded-xl border border-white/10 p-4 bg-white/[0.02]">
          <div className="text-xs text-text/60">{s.k}</div>
          <div className="font-semibold mt-1">{s.t}</div>
          <div className="text-text/80 text-sm mt-1">{s.d}</div>
        </li>
      ))}
    </ol>
  );
}
