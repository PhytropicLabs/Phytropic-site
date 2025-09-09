"use client";
export default function CTAButton({children,href="#",variant="primary"}){
  const base = "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5";
  const styles = variant==="outline" ? "border border-white/20 text-text hover:border-white/40" : "bg-calm text-base hover:opacity-90";
  return <a href={href} className={base+" "+styles}>{children}</a>
}
