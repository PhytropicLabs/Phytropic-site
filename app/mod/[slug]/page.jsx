import { notFound } from "next/navigation";

const effects = {
  calm:    { name:"Calm",    color:"calm",    headline:"Exhale the edges." },
  focus:   { name:"Focus",   color:"focus",   headline:"Clarity without the buzz." },
  energize:{ name:"Energize",color:"energize",headline:"Smooth lift, steady arc." },
  sleep:   { name:"Sleep",   color:"sleep",   headline:"Wind down, drift deeper." }
};

export default function Page({ params }) {
  const e = effects[params.slug];
  if(!e) return notFound();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="rounded-2xl bg-surface border border-white/10 p-8">
          <div className={`inline-block rounded-xl px-3 py-1 bg-${e.color}`}>{e.name}</div>
          <h1 className="text-4xl font-semibold mt-4">{e.headline}</h1>
          <p className="text-muted mt-3">Designed for felt change within minutes—without the tradeoffs.</p>
          <div className="mt-6 flex gap-3">
            <a href="#" className="rounded-2xl px-6 py-3 bg-white text-black">Add to cart</a>
            <a href="#" className="rounded-2xl px-6 py-3 border border-white/15">Subscribe & Save</a>
          </div>
          <div className="mt-8 text-sm text-muted">
            Not intended to diagnose, treat, cure, or prevent any disease. Consult a professional if pregnant, nursing, or on medication.
          </div>
        </div>
        <div className="rounded-2xl bg-surface border border-white/10 p-8">
          <div className="font-semibold">Problem → Solution → Better</div>
          <ul className="list-disc pl-5 text-muted mt-2">
            <li>Before: day-frictions (e.g., racing thoughts, shallow breath).</li>
            <li>Solution: a pocketable ritual that supports {e.name.toLowerCase()}.</li>
            <li>Better: a steadier baseline so you choose your next move.</li>
          </ul>
          <div className="mt-8 font-semibold">Ingredients, simplified</div>
          <ul className="list-disc pl-5 text-muted mt-2">
            <li>Magnolia Bark (per effect), L‑Theanine, and clean co‑actors.</li>
            <li>No CBD, no nicotine. Transparent testing.</li>
          </ul>
          <div className="mt-8 font-semibold">How to use</div>
          <ul className="list-disc pl-5 text-muted mt-2">
            <li>Place high in gum/cheek (buccal). Notice the shift within minutes.</li>
            <li>Start with 1 pouch; adjust time to your day.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
