"use client"

/**
 * Sacred "राम" background pattern system
 * ─────────────────────────────────────────────────────────────────────────────
 * Reusable, premium, temple-inspired background motifs used site-wide so the
 * Ram-pattern theme stays consistent across every section.
 *
 * Rules (enforced by design):
 *  - Always a background layer only: absolutely positioned, pointer-events-none,
 *    aria-hidden, behind content (z-0).
 *  - Very low opacity (3%–8%) so text always stays clearly readable.
 *  - Animations are slow & gentle (float / breathe / drift / spin) and respect
 *    prefers-reduced-motion (handled in globals.css).
 *
 * Usage:
 *   <section className="relative overflow-hidden">
 *     <RamBackground variant="tiled" />
 *     ...content (give content `relative z-10`)...
 *   </section>
 */

type Variant = "hero" | "tiled" | "vertical" | "floating" | "mandala" | "marquee"

interface RamBackgroundProps {
  variant?: Variant
  /** master opacity for the whole layer (0–1). Defaults are tuned per variant. */
  opacity?: number
  className?: string
}

// Fixed (non-random) scatter so server & client render identically (no hydration drift)
const FLOATING_TOKENS = [
  { text: "राम", top: "8%", left: "10%", size: "3.5rem", delay: "0s", dur: "16s" },
  { text: "श्री राम", top: "22%", left: "72%", size: "2.4rem", delay: "2s", dur: "19s" },
  { text: "ॐ", top: "44%", left: "20%", size: "4rem", delay: "1s", dur: "14s" },
  { text: "राम", top: "62%", left: "82%", size: "3rem", delay: "3s", dur: "18s" },
  { text: "जय श्री राम", top: "78%", left: "14%", size: "2rem", delay: "0.5s", dur: "21s" },
  { text: "राम", top: "34%", left: "48%", size: "2.6rem", delay: "2.5s", dur: "17s" },
  { text: "श्री राम", top: "88%", left: "60%", size: "2.2rem", delay: "1.5s", dur: "20s" },
  { text: "ॐ", top: "14%", left: "40%", size: "2.8rem", delay: "3.5s", dur: "15s" },
]

export function RamBackground({ variant = "tiled", opacity, className }: RamBackgroundProps) {
  const base =
    "absolute inset-0 overflow-hidden pointer-events-none select-none z-0"

  // ── HERO: huge faded राम calligraphy + golden glow behind content ──────────
  if (variant === "hero") {
    return (
      <div
        aria-hidden
        className={`${base} ${className ?? ""}`}
        style={{ opacity: opacity ?? 1 }}
      >
        {/* Golden core glow */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full ram-breathe"
          style={{
            background:
              "radial-gradient(circle, rgba(245,185,66,0.16), rgba(212,168,67,0.05) 45%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        {/* Giant राम calligraphy — kept very faint so foreground text stays readable */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="ram-glyph ram-glyph-gold leading-none text-center"
            style={{
              fontSize: "min(42vw, 26rem)",
              opacity: 0.05,
              textShadow: "0 0 60px rgba(245,185,66,0.12)",
            }}
          >
            राम
          </span>
        </div>
        {/* Sacred top seal */}
        <span
          className="ram-glyph absolute left-1/2 -translate-x-1/2 top-[12%] tracking-[0.4em]"
          style={{ fontSize: "1.5rem", opacity: 0.07 }}
        >
          ॥ राम ॥
        </span>
      </div>
    )
  }

  // ── VERTICAL: two राम columns only — left scrolls UP, right scrolls DOWN,
  //    both at the same speed. Content is duplicated so it loops seamlessly and
  //    always covers the full section height (the text never "ends"). ─────────
  if (variant === "vertical") {
    const SPEED = "120s"
    // padding from the main content — sits in the side gutter
    const EDGE = "clamp(0.5rem, 2vw, 2.25rem)"
    const columns: { side: "left" | "right"; dir: "normal" | "reverse" }[] = [
      { side: "left", dir: "normal" },   // left  → upward
      { side: "right", dir: "reverse" }, // right → downward
    ]
    const stack = (
      <div className="flex flex-col items-center gap-8 shrink-0 py-4">
        {Array.from({ length: 70 }).map((_, i) => (
          <span
            key={i}
            className="ram-glyph"
            style={{
              fontSize: "1.6rem",
              writingMode: "vertical-rl",
              letterSpacing: "0.35em",
              textShadow:
                "0 0 18px rgba(245,185,66,0.6), 0 0 6px rgba(245,185,66,0.5)",
            }}
          >
            राम
          </span>
        ))}
      </div>
    )
    return (
      <div
        aria-hidden
        className={`${base} ram-glow-pulse ${className ?? ""}`}
        style={{ opacity: opacity ?? 0.06 }}
      >
        {columns.map((col, ci) => (
          <div
            key={ci}
            className="absolute inset-y-0 overflow-hidden hidden md:block"
            style={col.side === "left" ? { left: EDGE } : { right: EDGE }}
          >
            <div
              className="flex flex-col ram-scroll-y"
              style={{ animationDuration: SPEED, animationDirection: col.dir }}
            >
              {/* two identical halves → translateY(-50%) loops seamlessly */}
              {stack}
              {stack}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // ── FLOATING: scattered Sanskrit tokens drifting slowly (gallery) ──────────
  if (variant === "floating") {
    return (
      <div
        aria-hidden
        className={`${base} ${className ?? ""}`}
        style={{ opacity: opacity ?? 0.07 }}
      >
        {FLOATING_TOKENS.map((t, i) => (
          <span
            key={i}
            className="ram-glyph ram-float-y absolute"
            style={{
              top: t.top,
              left: t.left,
              fontSize: t.size,
              animationDelay: t.delay,
              animationDuration: t.dur,
            }}
          >
            {t.text}
          </span>
        ))}
      </div>
    )
  }

  // ── MANDALA: rotating mandala + राम watermark (seva) ───────────────────────
  if (variant === "mandala") {
    return (
      <div
        aria-hidden
        className={`${base} ${className ?? ""}`}
        style={{ opacity: opacity ?? 0.06 }}
      >
        <div className="absolute -right-24 top-1/4 w-[34rem] h-[34rem] spin-slow">
          <Mandala />
        </div>
        <div className="absolute -left-28 bottom-0 w-[26rem] h-[26rem] spin-slow-rev">
          <Mandala />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="ram-glyph ram-breathe"
            style={{ fontSize: "min(28vw, 18rem)", opacity: 0.5 }}
          >
            राम
          </span>
        </div>
      </div>
    )
  }

  // ── MARQUEE: continuous "राम राम राम" rows (footer) ────────────────────────
  if (variant === "marquee") {
    const row = "राम राम राम राम राम राम राम राम राम राम राम राम "
    return (
      <div
        aria-hidden
        className={`${base} ${className ?? ""}`}
        style={{ opacity: opacity ?? 0.05 }}
      >
        {[0, 1, 2, 3].map((r) => (
          <div
            key={r}
            className={`absolute w-[200%] whitespace-nowrap ${
              r % 2 === 0 ? "marquee-left" : "marquee-right"
            }`}
            style={{ top: `${12 + r * 24}%` }}
          >
            <span
              className="ram-glyph"
              style={{ fontSize: "2.5rem", letterSpacing: "0.3em" }}
            >
              {row}
              {row}
            </span>
          </div>
        ))}
      </div>
    )
  }

  // ── TILED (default): elegant repeating "॥ राम ॥" watermark grid ────────────
  const cells = Array.from({ length: 60 })
  return (
    <div
      aria-hidden
      className={`${base} ${className ?? ""}`}
      style={{ opacity: opacity ?? 0.045 }}
    >
      <div
        className="absolute inset-0 grid ram-float-y"
        style={{
          gridTemplateColumns: "repeat(6, 1fr)",
          alignItems: "center",
          justifyItems: "center",
          gap: "2.5rem",
          padding: "2rem",
          animationDuration: "22s",
        }}
      >
        {cells.map((_, i) => (
          <span
            key={i}
            className="ram-glyph"
            style={{
              fontSize: "1.35rem",
              letterSpacing: "0.25em",
              transform: i % 2 ? "rotate(-4deg)" : "rotate(4deg)",
            }}
          >
            ॥ राम ॥
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Decorative SVGs ─────────────────────────────────────────────────────────

/** Concentric temple mandala with lotus-petal rings (gold strokes). */
export function Mandala({ className }: { className?: string }) {
  const petals = Array.from({ length: 16 })
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden>
      <g stroke="#d4a843" strokeWidth="0.6">
        <circle cx="100" cy="100" r="96" />
        <circle cx="100" cy="100" r="78" />
        <circle cx="100" cy="100" r="44" />
        <circle cx="100" cy="100" r="22" />
        {petals.map((_, i) => {
          const a = (i * 360) / petals.length
          return (
            <g key={i} transform={`rotate(${a} 100 100)`}>
              <path
                d="M100 12 C112 40, 112 60, 100 78 C88 60, 88 40, 100 12 Z"
                stroke="#e9c46a"
                strokeWidth="0.5"
              />
              <line x1="100" y1="22" x2="100" y2="44" />
            </g>
          )
        })}
        {/* inner 8-petal lotus */}
        {Array.from({ length: 8 }).map((_, i) => (
          <g key={i} transform={`rotate(${(i * 360) / 8} 100 100)`}>
            <path d="M100 56 C107 72, 107 84, 100 96 C93 84, 93 72, 100 56 Z" />
          </g>
        ))}
        <circle cx="100" cy="100" r="6" fill="#d4a843" stroke="none" />
      </g>
    </svg>
  )
}

/** Simple sacred lotus bloom. */
export function Lotus({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 70" className={className} fill="none" aria-hidden>
      <g stroke="#d4a843" strokeWidth="1" strokeLinecap="round">
        <path d="M60 64 C60 30, 60 22, 60 10 C66 26, 66 46, 60 64 Z" />
        <path d="M60 64 C48 34, 40 28, 30 20 C44 30, 56 46, 60 64 Z" />
        <path d="M60 64 C72 34, 80 28, 90 20 C76 30, 64 46, 60 64 Z" />
        <path d="M60 64 C40 44, 26 42, 12 40 C34 44, 52 54, 60 64 Z" />
        <path d="M60 64 C80 44, 94 42, 108 40 C86 44, 68 54, 60 64 Z" />
      </g>
    </svg>
  )
}
