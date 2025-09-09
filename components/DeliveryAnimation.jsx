"use client";
import { motion } from "framer-motion";

export default function DeliveryAnimation() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-semibold text-center">How it works (minutes, not hours)</h2>
      <p className="text-muted text-center mt-2">Buccal absorption: place pouch high in gum/cheek.</p>

      <div className="mt-8 mx-auto max-w-3xl rounded-2xl p-6 bg-surface border border-white/10">
        <div className="relative h-40">
          {/* “cheek” background */}
          <div className="absolute inset-0 rounded-xl" style={{ background: "linear-gradient(180deg, #1a2420, #0E1A15)" }} />

          {/* pouch */}
          <motion.div
            className="absolute left-8 top-1/2 -translate-y-1/2 rounded-xl px-4 py-2 bg-white/90 text-black"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            MOD Pouch
          </motion.div>

          {/* diffusion pulses */}
          {[0,1,2,3].map(i => (
            <motion.span
              key={i}
              className="absolute left-28 top-1/2 -translate-y-1/2 rounded-full"
              style={{ width: 10, height: 10, background: "rgba(255,255,255,.15)" }}
              animate={{ x: [0, 220], opacity: [0.6, 0] }}
              transition={{ delay: i * 0.6, duration: 2.8, repeat: Infinity }}
            />
          ))}
        </div>
        <ul className="mt-4 text-sm text-muted list-disc pl-5">
          <li>Place pouch; breathe slowly 4–6 cycles.</li>
          <li>Most feel the shift within minutes.</li>
          <li>Adjust duration to your day; no crashy arc.</li>
        </ul>
      </div>
    </section>
  );
}
