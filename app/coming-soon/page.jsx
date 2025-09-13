export const metadata = { title: "Coming Soon — Phytropic" };

export default function ComingSoon() {
  return (
    <main className="min-h-[70vh] grid place-items-center px-6 py-20 bg-base text-text">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl md:text-5xl font-semibold">We’re still tuning this.</h1>
        <p className="mt-4 text-lg text-text/80">
          The full Phytropic experience is coming soon. In the meantime, you can try the MOD tuner.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <a href="/finder" className="rounded-2xl px-6 py-3 bg-calm text-black">Try the MOD quiz</a>
          <a href="/" className="rounded-2xl px-6 py-3 border border-white/15">Back to home</a>
        </div>
      </div>
    </main>
  );
}

