export default function PackagingStrip() {
  const packs = [
    { name: "Calm", color: "calm" },
    { name: "Focus", color: "focus" },
    { name: "Energize", color: "energize" },
    { name: "Sleep", color: "sleep" },
  ];
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-2xl font-semibold text-center">Packaging that mirrors the experience</h2>
      <div className="grid md:grid-cols-4 gap-4 mt-6">
        {packs.map(p => (
          <div key={p.name} className="rounded-2xl p-6 bg-surface border border-white/10 text-center">
            <div className={`mx-auto h-40 w-28 rounded-xl bg-${p.color}`}/>
            <div className="mt-3">{p.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
