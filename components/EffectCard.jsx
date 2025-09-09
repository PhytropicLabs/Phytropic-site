export default function EffectCard({effect}){
  return (
    <a href={`/mod/${effect.slug}`} className="card p-6 block hover:shadow-soft transition-shadow" style={{borderColor: effect.color}}>
      <div className="text-xs uppercase tracking-wider text-muted">MOD</div>
      <h3 className="text-xl font-semibold mt-1">{effect.name}</h3>
      <p className="text-muted mt-2">{effect.oneLine}</p>
      <div className="mt-4 inline-flex items-center gap-2 text-sm" style={{color: effect.color}}>
        <span>See how it works</span>→
      </div>
    </a>
  )
}
