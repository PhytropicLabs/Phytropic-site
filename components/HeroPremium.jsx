"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroPremium() {
  return (
    <section className="relative overflow-hidden py-28">
      {/* subtle animated line at the top (science-meets-feeling) */}
      <motion.div
        className="absolute top-0 left-0 h-1 w-full"
        style={{ background: "linear-gradient(90deg,#67A6A9,#8BA4FF,#FF8A4B,#9C83D7)" }}
        animate={{ backgroundPositionX: ["0%", "100%"] }}
        transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
      />

      {/* soft glow */}
      <div className="pointer-events-none absolute inset-0"
           style={{ background: "radial-gradient(60% 40% at 50% 10%, rgba(255,255,255,0.06), transparent)" }} />

      <div className="container mx-auto px-4 text-center max-w-5xl">
        <motion.h1
          className="text-5xl md:text-7xl font-semibold leading-tight"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Ancient meets <span className="opacity-80"> advanced</span>.
        </motion.h1>

        <motion.p
          className="mt-6 text-lg md:text-xl text-muted max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          A natural tool to help double down on your strenghts, or tune into states that don't come as easy to you. <br />
          MOD is a nudge in the right direction.
        </motion.p>

        <motion.div
          className="mt-10 flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          <Link href="/finder" className="rounded-2xl px-6 py-3 bg-calm hover:opacity-90">Is MOD for Me?</Link>
          <Link href="/science" className="rounded-2xl px-6 py-3 border border-white/15 hover:border-white/30">How Does it Work?</Link>
        </motion.div>
      </div>
    </section>
  );
}
