"use client";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* ---------------------------------
   STEP TITLES
---------------------------------- */
const stepTitle = (step) => {
  if (step === 1) return "What holds you back most?";
  if (step === 2) return "What outcome do you want right now?";
  if (step === 3) return "Tune to your desired frequency";
  if (step === 4) return "Your recommendation";
  return "";
};

/* ---------------------------------
   QUESTIONS & OPTIONS
---------------------------------- */

// Step 1 — Problems
const problems = [
  { id: "racing", label: "Racing thoughts" },
  { id: "jitter", label: "Hard time concentrating" },
  { id: "low",    label: "Feeling mentally/physically sluggish" },
  { id: "toss",   label: "Difficulty falling/staying asleep" },
];

// Step 2 — Outcomes (4 each for clean layout)
const outcomesByProblem = {
  racing: [
    { id: "unwind",        label: "Unwind without sedation" },
    { id: "recenter",      label: "Re‑center and keep working" },
    { id: "socialEase",    label: "Settle nerves for social or meetings" },
    { id: "sleepTonight",  label: "Quiet mind to sleep tonight" }, // Sleep path
  ],
  jitter: [
    { id: "singleTask",    label: "Single‑task clarity (deep work)" },
    { id: "calmAlert",     label: "Calm‑but‑alert (presenting/meetings)" },
    { id: "reduceNoise",   label: "Reduce mental noise (fewer tabs)" },
    { id: "planPrioritize",label: "Plan & prioritize quickly" },
  ],
  low: [
    { id: "cleanLift",     label: "Clean lift (no jitters)" },
    { id: "steadyArc",     label: "Steady arc for 2–3 hours" },
    { id: "moodUp",        label: "A little more upbeat" },
    { id: "resetSleep",    label: "Reset your sleep signal" },     // Sleep path
  ],
  toss: [
    { id: "fallAsleep",    label: "Fall asleep easier" },
    { id: "stayAsleep",    label: "Stay asleep, smoother wake" },
    { id: "windDown",      label: "Wind‑down ritual (non‑groggy)" },
    { id: "gentleWake",    label: "Wake clear, avoid heavy feel" },
  ],
};

/* ---------------------------------
   VISUAL SCALE (cool → warm) + TEXT BANDS
---------------------------------- */

const emotionBands = [
  { key: "low",     label: "Completely Relaxed • Stress Free",    range: [0, 24]   },
  { key: "midLow",  label: "Centered • Mindful & Aware",          range: [25, 49]  },
  { key: "midHigh", label: "Flow‑State • Increased Productivity", range: [50, 74]  },
  { key: "high",    label: "Upbeat • Ready to take on the World", range: [75, 100] },
];

// Five-stop gradient (no repeats)
const COOL_1 = "#4F46E5"; // indigo
const COOL_2 = "#22D3EE"; // cyan
const MID    = "#34D399"; // emerald
const WARM_1 = "#F59E0B"; // amber
const WARM_2 = "#EF4444"; // red

function hexToRgb(hex){const h=hex.replace("#","");const n=parseInt(h,16);return{r:(n>>16)&255,g:(n>>8)&255,b:n&255}}
function rgbToHex({r,g,b}){const to=(x)=>x.toString(16).padStart(2,"0");return `#${to(r)}${to(g)}${to(b)}`}
function lerp(a,b,t){return a+(b-a)*t}
function lerpRgb(a,b,t){return rgbToHex({r:Math.round(lerp(a.r,b.r,t)),g:Math.round(lerp(a.g,b.g,t)),b:Math.round(lerp(a.b,b.b,t))})}
const stops=[
  {t:0.00,c:hexToRgb(COOL_1)},
  {t:0.25,c:hexToRgb(COOL_2)},
  {t:0.50,c:hexToRgb(MID)},
  {t:0.75,c:hexToRgb(WARM_1)},
  {t:1.00,c:hexToRgb(WARM_2)},
];
function multiLerpColor01(t){
  if(t<=0)return COOL_1;if(t>=1)return WARM_2;
  let i=0;while(i<stops.length-1 && t>stops[i+1].t)i++;
  const a=stops[i],b=stops[i+1];const local=(t-a.t)/(b.t-a.t);
  return lerpRgb(a.c,b.c,local);
}

/* ---------------------------------
   WAVE PATH (single bottom wave under slider)
---------------------------------- */
function makeChirpSamples(width,height,fStart,fEnd,amp,points=360){
  const midY=height/2;const xs=new Array(points+1);const ys=new Array(points+1);
  let d=`M 0 ${midY}`;let phase=0;
  for(let i=0;i<=points;i++){
    const t=i/points;const x=t*width;const freq=fStart+(fEnd-fStart)*t;
    phase+=(freq*Math.PI*2)/points;const y=midY+Math.sin(phase)*amp;
    xs[i]=x;ys[i]=y;d+=` L ${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return {d,xs,ys};
}

/* ---------------------------------
   SOFT SCORING (no hard eliminations before final)
---------------------------------- */

// A) Problem priors (light bias)
const problemPrior = {
  racing:   { sleep:0.26, calm:0.29, focus:0.27, energize:0.18 },
  jitter:   { sleep:0.18, calm:0.26, focus:0.38, energize:0.18 },
  low:      { sleep:0.20, calm:0.22, focus:0.28, energize:0.30 },
  toss:     { sleep:0.45, calm:0.30, focus:0.15, energize:0.10 },
};

// B) Outcome deltas (gentle nudges)
const outcomeDelta = {
  // racing
  unwind:         { sleep:+0.06, calm:+0.12, focus:+0.02, energize:-0.02 },
  recenter:       { sleep:+0.02, calm:+0.10, focus:+0.08, energize:-0.02 },
  socialEase:     { sleep:+0.04, calm:+0.10, focus:+0.04, energize:-0.02 },
  sleepTonight:   { sleep:+0.25, calm:+0.08, focus:-0.06, energize:-0.10 },

  // jitter
  singleTask:     { sleep:-0.02, calm:+0.04, focus:+0.16, energize:+0.00 },
  calmAlert:      { sleep:+0.00, calm:+0.08, focus:+0.10, energize:-0.02 },
  reduceNoise:    { sleep:+0.00, calm:+0.08, focus:+0.10, energize:-0.02 },
  planPrioritize: { sleep:-0.02, calm:+0.00, focus:+0.14, energize:+0.04 },

  // low
  cleanLift:      { sleep:-0.02, calm:+0.00, focus:+0.08, energize:+0.14 },
  steadyArc:      { sleep:+0.00, calm:+0.04, focus:+0.08, energize:+0.08 },
  moodUp:         { sleep:-0.02, calm:+0.08, focus:+0.06, energize:+0.08 },
  resetSleep:     { sleep:+0.22, calm:+0.08, focus:-0.04, energize:-0.10 },

  // toss
  fallAsleep:     { sleep:+0.25, calm:+0.06, focus:-0.06, energize:-0.10 },
  stayAsleep:     { sleep:+0.22, calm:+0.08, focus:-0.06, energize:-0.10 },
  windDown:       { sleep:+0.16, calm:+0.12, focus:-0.02, energize:-0.06 },
  gentleWake:     { sleep:+0.10, calm:+0.14, focus:+0.04, energize:-0.06 },
};

// C) Slider bias — STRONG driver (low ⇒ Sleep/Calm, high ⇒ Focus/Energize)
function sliderBias(freq, problem){
  const t = Math.max(0, Math.min(100, freq)) / 100; // 0..1
  let sleep = 0, calm = 0, focus = 0, energize = 0;

  if (t <= 0.20) {
    const u = t / 0.20;
    sleep    += 0.70 * (1 - u);
    calm     += 0.40 * (1 - u*0.7);
  } else if (t <= 0.50) {
    const u = (t - 0.20) / 0.30;
    calm     += 0.30 * (1 - Math.abs(u - 0.5) * 2);
    focus    += 0.18 * u;
    sleep    += 0.08 * (1 - u);
  } else if (t <= 0.80) {
    const u = (t - 0.50) / 0.30;
    focus    += 0.35 * (0.5 + 0.5*u);
    energize += 0.30 * u;
    calm     += 0.06 * (1 - u);
  } else {
    const u = (t - 0.80) / 0.20;
    energize += 0.70 * (0.2 + 0.8*u);
    focus    += 0.30 * (0.5 + 0.5*u);
  }

  if (problem === "jitter" && sleep > 0.10) sleep = 0.10;
  if (problem === "toss"   && energize > 0.05) energize = 0.05;

  return { sleep, calm, focus, energize };
}

// Combine priors + deltas + bias → scores
function computeScores({ problem, outcome, freq }) {
  const base = { ...problemPrior[problem] };
  const delta = outcomeDelta[outcome] || { sleep:0, calm:0, focus:0, energize:0 };
  const bias = sliderBias(freq, problem);

  const scores = {
    sleep:    (base.sleep    || 0) + (delta.sleep    || 0) + (bias.sleep    || 0),
    calm:     (base.calm     || 0) + (delta.calm     || 0) + (bias.calm     || 0),
    focus:    (base.focus    || 0) + (delta.focus    || 0) + (bias.focus    || 0),
    energize: (base.energize || 0) + (delta.energize || 0) + (bias.energize || 0),
  };

  // Normalize 0..1
  const minV = Math.min(scores.sleep, scores.calm, scores.focus, scores.energize);
  const shifted = {
    sleep: scores.sleep - minV,
    calm: scores.calm - minV,
    focus: scores.focus - minV,
    energize: scores.energize - minV,
  };
  const sum = shifted.sleep + shifted.calm + shifted.focus + shifted.energize || 1;
  const norm = {
    sleep: shifted.sleep / sum,
    calm: shifted.calm / sum,
    focus: shifted.focus / sum,
    energize: shifted.energize / sum,
  };

  let effect = "calm"; let maxV = -Infinity;
  for (const k of ["sleep","calm","focus","energize"]) {
    if (norm[k] > maxV) { maxV = norm[k]; effect = k; }
  }
  return { effect, norm, raw: scores };
}

/* ---------------------------------
   BEFORE/AFTER & DISCLAIMERS
---------------------------------- */
const beforeAfterMap = {
  calm:     { before: "Overclocked", after: "Even" },
  focus:    { before: "Scattered",   after: "Sharp" },
  energize: { before: "Sluggish",    after: "Ready" },
  sleep:    { before: "Restless",    after: "Rested" },
};

const effectColorClass = {
  calm: "bg-calm",
  focus: "bg-focus",
  energize: "bg-energize",
  sleep: "bg-sleep",
};

const disclaimersForEffect = (effect) => {
  const notes = [];
  if (effect === "calm") {
    notes.push("Contains kanna. If you take SSRI/SNRI or MAOI medications, talk with your clinician before use.");
    notes.push("Includes relaxing botanicals (blue lotus, magnolia bark, passionflower) and L‑theanine. If you use sedatives or prescription sleep meds, consult your clinician.");
  }
  if (effect === "energize") {
    notes.push("Includes caffeine. A caffeine‑free Energize variant is planned for stimulant‑sensitive users.");
  }
  return notes;
};

function recommend({ problem, outcome, freq }) {
  if (!problem || !outcome) return null;
  const { effect, norm } = computeScores({ problem, outcome, freq });

  const why = [];
  const human = freq < 25 ? "lower" : freq < 50 ? "mid‑low" : freq < 75 ? "mid‑high" : "higher";
  why.push(`Your goal and tuning point toward ${effect}.`);
  why.push(`You tuned toward a ${human} frequency, which adjusts the balance.`);

  if (problem === "racing" && outcome === "sleepTonight") {
    why.push("Racing thoughts were linked to sleep disruption, so Sleep remained in play.");
  }
  if (problem === "low" && outcome === "resetSleep") {
    why.push("Low energy tied to off‑kilter sleep signals, so Sleep stayed valid.");
  }

  const protocol = [
    "Place pouch high in gum/cheek (buccal). Start a standard session; adjust by feel.",
  ];

  return { effect, why, protocol, beforeAfter: beforeAfterMap[effect], scores: norm };
}

/* ---------------------------------
   SMALL UI PARTS
---------------------------------- */

function Stepper({ step }) {
  const items = ["Problem", "Outcome", "Tune", "Result"];
  return (
    <div className="mx-auto mb-10 flex max-w-3xl items-center justify-center gap-3 text-sm text-text/80">
      {items.map((label, i) => {
        const n = i + 1;
        const active = step === n;
        const done = step > n;
        return (
          <div key={label} className="flex items-center gap-2">
            <div
              className={`h-6 w-6 rounded-full border border-white/15 text-xs grid place-items-center ${
                active || done ? "bg-white/20" : "bg-white/10"
              }`}
            >
              {n}
            </div>
            <span className={`${active ? "opacity-100" : "opacity-80"}`}>{label}</span>
            {n < items.length && <div className="mx-2 h-px w-6 bg-white/15" />}
          </div>
        );
      })}
    </div>
  );
}

function CardButton({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl p-5 text-left border transition-all
        ${active
          ? "border-white/40 bg-white/10 shadow-soft"
          : "border-white/15 hover:border-white/30 hover:bg-white/[0.08]"
        }`}
    >
      <div className="text-base leading-relaxed text-text">{children}</div>
    </button>
  );
}

function BottomWave({ value /* 0..100 */ }) {
  const width  = 720;
  const height = 84;
  const fStart = 1.3;
  const fEnd   = 20;
  const amp    = 20;

  const { d, xs, ys } = useMemo(
    () => makeChirpSamples(width, height, fStart, fEnd, amp, 360),
    [width, height, fStart, fEnd, amp]
  );

  const t = Math.min(Math.max(value / 100, 0), 1);
  const idx = Math.round(t * (xs.length - 1));
  const mx = xs[idx];
  const my = ys[idx];
  const markerColor = useMemo(() => multiLerpColor01(t), [t]);

  return (
    <div className="w-full mt-6">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[84px]">
        <defs>
          <linearGradient id="coolWarmGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor={COOL_1} />
            <stop offset="25%"  stopColor={COOL_2} />
            <stop offset="50%"  stopColor={MID} />
            <stop offset="75%"  stopColor={WARM_1} />
            <stop offset="100%" stopColor={WARM_2} />
          </linearGradient>
        </defs>
        <path d={d} className="fill-none stroke-white/10" strokeWidth="5" />
        <path d={d} className="fill-none" stroke="url(#coolWarmGrad)" strokeWidth="3" />
        <motion.circle
          cx={mx}
          cy={my}
          r="5"
          fill={markerColor}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
        />
      </svg>
    </div>
  );
}

/* ---------------------------------
   PAGE
---------------------------------- */

export default function Finder() {
  const [step, setStep] = useState(1);
  const [pickedProblem, setPickedProblem] = useState(null);
  const [pickedOutcome, setPickedOutcome] = useState(null);
  const [freq, setFreq] = useState(35); // start slightly calm

  // ESC to exit to home
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        window.location.href = "/";
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const outcomes = pickedProblem ? outcomesByProblem[pickedProblem] : [];
  const gridCols = (count) => (count === 3 ? "md:grid-cols-3" : "md:grid-cols-2");

  const rec = pickedProblem && pickedOutcome
    ? recommend({ problem: pickedProblem, outcome: pickedOutcome, freq })
    : null;

  return (
    <div className="min-h-[calc(100vh-140px)] grid place-items-center relative">
      {/* Exit button (persists across steps) */}
      <div className="absolute top-4 right-4">
        <Link
          href="/"
          className="rounded-xl border border-white/15 bg-white/[0.06] backdrop-blur px-3 py-2 text-sm hover:bg-white/[0.1]"
          title="Exit quiz (Esc)"
        >
          ← Exit
        </Link>
      </div>

      <div className="w-full max-w-5xl px-6 py-16">
        <Stepper step={step} />

        <h1 className="text-center text-4xl md:text-5xl font-semibold">
          {stepTitle(step)}
        </h1>

        <div className="mt-10">
          <AnimatePresence mode="wait">
            {/* Step 1: Problem */}
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <div className={`grid ${gridCols(problems.length)} gap-5`}>
                  {problems.map((p) => (
                    <CardButton
                      key={p.id}
                      active={pickedProblem === p.id}
                      onClick={() => { setPickedProblem(p.id); setPickedOutcome(null); }}
                    >
                      {p.label}
                    </CardButton>
                  ))}
                </div>
                <div className="mt-10 flex justify-end">
                  <button
                    disabled={!pickedProblem}
                    className="rounded-2xl px-6 py-3 bg-calm disabled:opacity-40"
                    onClick={() => setStep(2)}
                  >
                    Next
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Outcome */}
            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <div className="rounded-2xl p-6 bg-surface border border-white/10">
                  <div className="text-sm text-text/80 mb-4">What outcome do you want right now?</div>
                  <div className={`grid ${gridCols(outcomes.length)} gap-5`}>
                    {outcomes.map((o) => (
                      <CardButton
                        key={o.id}
                        active={pickedOutcome === o.id}
                        onClick={() => setPickedOutcome(o.id)}
                      >
                        {o.label}
                      </CardButton>
                    ))}
                  </div>
                </div>
                <div className="mt-10 flex justify-between">
                  <button className="rounded-2xl px-6 py-3 border border-white/10" onClick={() => setStep(1)}>Back</button>
                  <button
                    disabled={!pickedOutcome}
                    className="rounded-2xl px-6 py-3 bg-calm disabled:opacity-40"
                    onClick={() => setStep(3)}
                  >
                    Next
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Tuner (slider + bottom wave) */}
            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <div className="rounded-2xl p-8 bg-surface border border-white/10">
                  <div className="grid grid-cols-4 gap-4 text-xs text-text/70 mb-4">
                    {emotionBands.map((b) => (
                      <div key={b.key} className="text-center">
                        <div className={`${freq >= b.range[0] && freq <= b.range[1] ? "text-text" : ""}`}>
                          {b.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="px-2">
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={1}
                      value={freq}
                      onChange={(e) => setFreq(parseInt(e.target.value, 10))}
                      className="w-full accent-calm"
                      aria-label="Tune your frequency"
                    />
                  </div>

                  <BottomWave value={freq} />

                  <div className="mt-6 text-text/80 text-sm">
                    Slide to set your frequency. We’ll use this to fine‑tune your recommendation without removing options.
                  </div>
                </div>

                <div className="mt-10 flex justify-between">
                  <button className="rounded-2xl px-6 py-3 border border-white/10" onClick={() => setStep(2)}>Back</button>
                  <button className="rounded-2xl px-6 py-3 bg-calm" onClick={() => setStep(4)}>See Recommendation</button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Result */}
            {step === 4 && rec && (
              <motion.div key="s4" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="rounded-2xl p-6 bg-surface border border-white/10">
                    <div className="text-xs uppercase tracking-wider text-text/70">Before → After</div>
                    <div className="mt-2 text-xl">
                      {rec.beforeAfter.before} → <span className="font-semibold">{rec.beforeAfter.after}</span>
                    </div>

                    <div className="mt-4 text-text/80">We recommend:</div>
                    <div className={`mt-2 inline-flex rounded-2xl px-4 py-2 text-sm ${effectColorClass[rec.effect]}`}>
                      {rec.effect.charAt(0).toUpperCase() + rec.effect.slice(1)}
                    </div>

                    <div className="mt-3 text-xs text-text/70">
                      <div>How we weighed it:</div>
                      <div className="mt-1 grid grid-cols-4 gap-2">
                        {(["sleep","calm","focus","energize"]).map(k => (
                          <div key={k} className="rounded-lg border border-white/10 p-2 text-center">
                            <div className="uppercase text-[10px] opacity-70">{k}</div>
                            <div className="font-semibold">{Math.round(rec.scores[k]*100)}%</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Subtle disclaimers */}
                    {(() => {
                      const tiny = disclaimersForEffect(rec.effect);
                      return tiny.length > 0 ? (
                        <div className="mt-3 space-y-1">
                          {tiny.map((t, i) => (
                            <p key={i} className="text-xs text-text/70 leading-relaxed">{t}</p>
                          ))}
                          <p className="text-xs text-text/70 mt-2">
                            This is general information, not medical advice. Please speak with your clinician.
                          </p>
                        </div>
                      ) : null;
                    })()}
                  </div>

                  <div className="rounded-2xl p-6 bg-surface border border-white/10">
                    <div className="font-semibold">How to use</div>
                    <ul className="list-disc pl-5 text-text/80 mt-2 space-y-1">
                      {rec.protocol.map((line, i) => <li key={i}>{line}</li>)}
                    </ul>

                    <div className="mt-6 font-semibold">Why this fit</div>
                    <ul className="list-disc pl-5 text-text/80 mt-2 space-y-1">
                      {rec.why.map((line, i) => <li key={i}>{line}</li>)}
                    </ul>

                    <div className="mt-6 flex gap-3">
                      <Link href={`/mod/${rec.effect}`} className="rounded-2xl px-6 py-3 bg-white/90 text-black">Learn more</Link>
                      <a href="#" className="rounded-2xl px-6 py-3 border border-white/15">Add to cart</a>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex justify-between">
                  <button className="rounded-2xl px-6 py-3 border border-white/10" onClick={() => setStep(3)}>Back</button>
                  <button
                    className="rounded-2xl px-6 py-3 border border-white/10"
                    onClick={() => {
                      setStep(1);
                      setPickedProblem(null);
                      setPickedOutcome(null);
                      setFreq(35);
                    }}
                  >
                    Start over
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
