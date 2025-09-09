// components/CTASection.jsx
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="border-t border-white/10 bg-base">
      <div className="container mx-auto max-w-6xl px-6 py-16 text-center">
        <h3 className="text-3xl md:text-4xl font-semibold">Ready to tune your day?</h3>
        <p className="text-text/80 mt-3">
          Answer two quick questions and we’ll recommend your MOD.
        </p>
        <div className="mt-6 flex justify-center">
          <Link href="/finder" className="rounded-2xl px-6 py-3 bg-calm text-black font-medium">
            Find your MOD
          </Link>
        </div>
        <p className="text-xs text-text/60 mt-4">
          General information only. Not medical advice. Talk with your clinician.
        </p>
      </div>
    </section>
  );
}
