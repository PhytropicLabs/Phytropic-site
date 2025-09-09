"use client";
import { motion } from "framer-motion";
// You can swap these with Lottie later if you prefer
const items = [
  { name: "Magnolia Bark", note: "Eases over-activation", accent: "calm" },
  { name: "L‑Theanine", note: "Smooth focus synergy", accent: "focus" },
  { name: "Gentle Actives", note: "Clean, felt support", accent: "energize" },
];

export default function IngredientShowcase() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-semibold text-center">What’s inside — simplified</h2>
      <p className="text-muted text-center mt-2">Clean inputs. Clear roles. Tested for quality.</p>

      <div className="grid md:grid-cols-3 gap-4 mt-8">
        {items.map((it, i) => (
          <motion.div
            key={it.name}
            className="rounded-2xl p-6 bg-surface border border-white/10"
            initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <div className={`inline-block rounded-xl px-3 py-1 bg-${it.accent}/80`}>{it.name}</div>
            <p className="text-muted mt-3">{it.note}</p>
            {/* pseudo-visual: a pulsing dot ring */}
            <motion.div
              className="mt-6 h-24 rounded-xl"
              style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,.12), transparent 60%)" }}
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ repeat: Infinity, duration: 3 }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
