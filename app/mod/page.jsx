import { effects } from "@/lib/content";
import EffectCard from "@/components/EffectCard";

export default function Page(){
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-semibold">MOD: Modulate your moment.</h1>
      <p className="text-muted">Four targeted pouches to help you shift with intention.</p>
      <div className="grid md:grid-cols-4 gap-4">
        {effects.map(e => <EffectCard key={e.slug} effect={e} />)}
      </div>
    </div>
  )
}
