"use client"

import { useRef, useEffect, useState } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion"
import { useIsMobile } from "@/hooks/useIsMobile"

// ── Scene data ──────────────────────────────────────────────────────────────

interface SceneData {
  chapter: string
  era: string
  titleLine1: string
  titleLine2: string
  subtitle: string
  quote: string
  description: string
  icon: string
  gradient: string
  accentColor: string
  glowColor: string
}

const SCENES: SceneData[] = [
  {
    chapter: "01", era: "Origin",
    titleLine1: "A Divine Soul", titleLine2: "Enters the World",
    subtitle: "Nakur, Saharanpur",
    quote: "\"The soil of Nakur was chosen to receive his blessed footsteps.\"",
    description: "In the sacred land of Nakur, Saharanpur, a child was born whose very presence would transform thousands of lives. From his earliest years, Guruji displayed an extraordinary stillness — an inexplicable light in his eyes and a compassion that seemed ageless, as though his soul had arrived with a mission already inscribed within it.",
    icon: "🌅",
    gradient: "radial-gradient(ellipse 110% 90% at 50% 0%, rgba(109,40,217,0.55) 0%, rgba(4,0,12,0.97) 70%)",
    accentColor: "#a78bfa", glowColor: "rgba(124,58,237,0.35)",
  },
  {
    chapter: "02", era: "Awakening",
    titleLine1: "The Divine Light", titleLine2: "Ignites Within",
    subtitle: "Spiritual Revelation",
    quote: "\"When the Guru awakens, the entire universe takes notice.\"",
    description: "As Guruji grew, he was drawn into deep states of meditation and prayer that would last for hours. Visions, revelations, and an unshakeable sense of divine purpose became the compass of his life. The eternal flame that burned within him began to radiate outward — and those near him could feel its warmth and transforming power.",
    icon: "🔥",
    gradient: "radial-gradient(ellipse 110% 90% at 50% 15%, rgba(217,119,6,0.52) 0%, rgba(4,0,12,0.97) 68%)",
    accentColor: "#fbbf24", glowColor: "rgba(217,119,6,0.38)",
  },
  {
    chapter: "03", era: "Wisdom",
    titleLine1: "Words That", titleLine2: "Transform Souls",
    subtitle: "The Sacred Satsangs Begin",
    quote: "\"The truth he spoke needed no translation — the heart understood.\"",
    description: "Guruji began to share his wisdom — first in intimate gatherings, then in satsangs that drew hundreds. His teachings were not mere philosophy; they were living truth, delivered with a warmth that bypassed the mind and spoke directly to the heart. Seva, faith, and boundless love became the three pillars of his eternal message.",
    icon: "📿",
    gradient: "radial-gradient(ellipse 110% 90% at 50% 15%, rgba(15,118,110,0.48) 0%, rgba(4,0,12,0.97) 68%)",
    accentColor: "#34d399", glowColor: "rgba(15,118,110,0.35)",
  },
  {
    chapter: "04", era: "Service",
    titleLine1: "Serving the Divine", titleLine2: "in Every Soul",
    subtitle: "Community & Compassion",
    quote: "\"He saw the face of God in every hungry child, every weeping mother.\"",
    description: "Guruji established a life of selfless service — langars that fed thousands, medical camps, and shelter for the vulnerable. The ashram at Nakur became a sanctuary where no one was turned away. He taught that God is most clearly seen in the face of one who suffers — and he embodied that truth with every breath he took.",
    icon: "🙏",
    gradient: "radial-gradient(ellipse 110% 90% at 50% 20%, rgba(190,18,60,0.42) 0%, rgba(4,0,12,0.97) 68%)",
    accentColor: "#fb7185", glowColor: "rgba(190,18,60,0.33)",
  },
  {
    chapter: "05", era: "Presence",
    titleLine1: "A Living Shelter", titleLine2: "for All Seekers",
    subtitle: "Divine Grace & Protection",
    quote: "\"In his presence, even the deepest doubt dissolves and faith is reborn.\"",
    description: "Word of Guruji's grace spread far and wide. Devotees arrived from across India — each carrying their burdens, each leaving lighter. His darshan was not merely a meeting; it was a transformation. Through personal guidance, Guruji became the shelter that thousands had long been searching for, without knowing exactly what they sought.",
    icon: "🕊️",
    gradient: "radial-gradient(ellipse 110% 90% at 50% 15%, rgba(212,168,67,0.48) 0%, rgba(4,0,12,0.97) 68%)",
    accentColor: "#d4a843", glowColor: "rgba(212,168,67,0.4)",
  },
  {
    chapter: "06", era: "Legacy",
    titleLine1: "The Journey", titleLine2: "Continues Forever",
    subtitle: "An Eternal Flame",
    quote: "\"His story is not the past — it is the living present, and the path forward.\"",
    description: "Today, Guruji's mission burns brighter than ever. His teachings ripple across generations; his love is a lighthouse for all who seek meaning. The ashram at Nakur remains a living sanctuary of devotion, seva, and divine light. His path is not a historical record — it is a living invitation extended to every searching soul, in every age.",
    icon: "✨",
    gradient: "radial-gradient(ellipse 130% 110% at 50% 25%, rgba(88,28,135,0.52) 0%, rgba(212,168,67,0.1) 50%, rgba(4,0,12,0.97) 72%)",
    accentColor: "#d4a843", glowColor: "rgba(212,168,67,0.45)",
  },
]

const TOTAL = SCENES.length

// ═══════════════════════════════════════════════════════════════════════════════
// MOBILE VERSION — lightweight stacked cards, no scroll-driven animations
// ═══════════════════════════════════════════════════════════════════════════════

function MobileLifeJourney() {
  return (
    <section id="life-journey" className="relative py-20 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(88,28,135,0.18), transparent)",
        }}
      />

      <div className="relative max-w-lg mx-auto px-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-amber-400 text-xs font-semibold uppercase tracking-[0.25em]">
            Spiritual Journey
          </span>
          <h2 className="mt-3 font-serif text-3xl font-bold text-amber-50">
            Life <span className="gold-text">Journey</span>
          </h2>
          <p className="mt-3 text-amber-200/45 text-sm leading-relaxed">
            Six chapters of grace, wisdom, and divine service
          </p>
          <div className="section-divider mt-4" />
        </motion.div>

        {/* Cards */}
        <div className="relative">
          {/* Vertical connector line */}
          <div
            className="absolute left-5 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(212,168,67,0.25), transparent)" }}
          />

          <div className="space-y-8 pl-14">
            {SCENES.map((s, i) => (
              <motion.div
                key={s.chapter}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: 0.05 * i }}
              >
                {/* Dot on the line */}
                <div
                  className="absolute left-[14px] w-3 h-3 rounded-full border-2 mt-4"
                  style={{
                    borderColor: s.accentColor,
                    background: "#04000c",
                    boxShadow: `0 0 8px ${s.accentColor}60`,
                    marginTop: "1.25rem",
                  }}
                />

                {/* Card */}
                <div
                  className="rounded-2xl p-5"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid ${s.accentColor}22`,
                  }}
                >
                  {/* Chapter + era */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{s.icon}</span>
                    <span
                      className="text-[10px] font-mono font-bold uppercase tracking-widest"
                      style={{ color: s.accentColor }}
                    >
                      {s.chapter} / {s.era}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif font-bold leading-tight mb-1">
                    <span className="block text-lg text-amber-50">{s.titleLine1}</span>
                    <span className="block text-lg" style={{ color: s.accentColor }}>
                      {s.titleLine2}
                    </span>
                  </h3>

                  {/* Quote */}
                  <p
                    className="text-xs italic mt-3 mb-2 leading-relaxed"
                    style={{ color: `${s.accentColor}cc` }}
                  >
                    {s.quote}
                  </p>

                  {/* Description */}
                  <p className="text-amber-100/55 text-xs leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// DESKTOP VERSION — full Apple-style sticky scroll (unchanged)
// ═══════════════════════════════════════════════════════════════════════════════

interface Pt {
  x: number; y: number; size: number; opacity: number
  dur: number; delay: number; color: string
}

const PT_COLORS = [
  "rgba(212,168,67,0.65)",
  "rgba(167,139,250,0.5)",
  "rgba(255,255,255,0.4)",
  "rgba(251,191,36,0.55)",
  "rgba(196,181,253,0.45)",
]

function ParticleField() {
  const [pts, setPts] = useState<Pt[]>([])
  useEffect(() => {
    setPts(
      Array.from({ length: 18 }, () => ({   // reduced from 26 → 18
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1.5 + Math.random() * 3,
        opacity: 0.1 + Math.random() * 0.4,
        dur: 4 + Math.random() * 5,
        delay: Math.random() * 4,
        color: PT_COLORS[Math.floor(Math.random() * PT_COLORS.length)],
      }))
    )
  }, [])
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      {pts.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size,
            backgroundColor: p.color,
          }}
          animate={{ y: [-14, 14], x: [-4, 4], opacity: [p.opacity * 0.35, p.opacity, p.opacity * 0.35] }}
          transition={{ duration: p.dur, repeat: Infinity, repeatType: "reverse", delay: p.delay }}
        />
      ))}
    </div>
  )
}

function ProgressIndicator({ progress }: { progress: MotionValue<number> }) {
  const [active, setActive] = useState(0)
  useMotionValueEvent(progress, "change", (v) => {
    setActive(Math.min(Math.floor(v * TOTAL), TOTAL - 1))
  })
  return (
    <>
      <div className="hidden sm:flex absolute right-6 lg:right-8 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-2.5">
        {SCENES.map((_, i) => (
          <motion.div
            key={i}
            animate={{ height: i === active ? 30 : 6, opacity: i === active ? 1 : 0.28 }}
            transition={{ duration: 0.38 }}
            className="rounded-full"
            style={{
              width: 3,
              background: i === active ? "linear-gradient(to bottom, #f59e0b, #d4a843)" : "rgba(255,255,255,0.45)",
            }}
          />
        ))}
      </div>
      <div className="flex sm:hidden absolute bottom-[4.5rem] left-1/2 -translate-x-1/2 z-40 gap-2 items-center">
        {SCENES.map((_, i) => (
          <motion.div
            key={i}
            animate={{ width: i === active ? 22 : 6, opacity: i === active ? 1 : 0.28 }}
            transition={{ duration: 0.38 }}
            className="rounded-full"
            style={{
              height: 3,
              background: i === active ? "linear-gradient(90deg, #f59e0b, #d4a843)" : "rgba(255,255,255,0.45)",
            }}
          />
        ))}
      </div>
    </>
  )
}

function Scene({ data, progress, index }: { data: SceneData; progress: MotionValue<number>; index: number }) {
  const start  = index / TOTAL
  const end    = (index + 1) / TOTAL
  const enter  = start + 0.022
  const settle = start + 0.055
  const leave  = end - 0.022

  const opacity = useTransform(progress, [start, enter, leave, end], [0, 1, 1, 0])
  const scale   = useTransform(progress, [start, settle, leave, end], [0.88, 1, 1.04, 1.08])
  const rotateX = useTransform(progress, [start, settle, leave, end], [7, 0, 0, -4])
  const glowY   = useTransform(progress, [start, end], [60, -60])
  const glowOp  = useTransform(progress, [start, (start + end) / 2, end], [0.15, 0.7, 0.15])
  const titleY  = useTransform(progress, [start, settle, leave], [100, 0, -32])
  const titleOp = useTransform(progress, [start, enter + 0.01, leave, end], [0, 1, 0.95, 0])
  const cardX   = useTransform(progress, [start, settle + 0.012, leave], [80, 0, -22])
  const cardOp  = useTransform(progress, [start, settle + 0.005, leave, end], [0, 1, 0.95, 0])
  const numY    = useTransform(progress, [start, end], [50, -50])
  const lineW   = useTransform(progress, [enter, settle], ["0%", "100%"])

  return (
    <motion.div
      style={{
        opacity, scale, rotateX, transformPerspective: 1400,
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 10,
      }}
    >
      <div className="absolute inset-0" style={{ background: data.gradient }} />

      <motion.div
        style={{ y: glowY, opacity: glowOp }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div
          className="w-[55vw] h-[55vh] rounded-full"
          style={{ background: data.glowColor, filter: "blur(80px)" }}
        />
      </motion.div>

      <div
        className="absolute inset-x-0 top-0 h-64 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, ${data.glowColor.replace(/[\d.]+\)$/, "0.1)")}, transparent)` }}
      />

      <motion.div
        style={{ y: numY }}
        aria-hidden
        className="absolute bottom-12 sm:bottom-16 right-2 sm:right-6 pointer-events-none select-none font-serif font-black leading-none"
      >
        <span
          className="text-[28vw] sm:text-[18vw] lg:text-[15vw]"
          style={{ color: data.accentColor, opacity: 0.045 }}
        >
          {data.chapter}
        </span>
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-10 lg:px-14">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">

          <motion.div style={{ y: titleY, opacity: titleOp }}>
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.38em] uppercase font-bold" style={{ color: data.accentColor }}>
                {data.chapter}&ensp;/&ensp;{data.era}
              </span>
              <div className="flex-1 h-px overflow-hidden" style={{ maxWidth: 56 }}>
                <motion.div style={{ width: lineW, background: `${data.accentColor}55`, height: 1 }} />
              </div>
            </div>

            <motion.span
              className="inline-block text-4xl sm:text-5xl mb-5"
              animate={{ rotate: [0, 3, -3, 0], y: [0, -4, 0] }}
              transition={{ duration: 5, repeat: Infinity, repeatType: "mirror" }}
            >
              {data.icon}
            </motion.span>

            <h3 className="font-serif font-bold leading-[1.06] mb-4">
              <span className="block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl" style={{ color: "#fef9f0" }}>
                {data.titleLine1}
              </span>
              <span className="block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl" style={{ color: data.accentColor }}>
                {data.titleLine2}
              </span>
            </h3>

            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.32em]" style={{ color: `${data.accentColor}70` }}>
              {data.subtitle}
            </p>
          </motion.div>

          <motion.div style={{ x: cardX, opacity: cardOp }}>
            <div
              className="rounded-3xl p-6 sm:p-8 lg:p-9"
              style={{
                background: "rgba(255,255,255,0.032)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: `1px solid ${data.accentColor}26`,
                boxShadow: `0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)`,
              }}
            >
              <blockquote className="font-serif text-sm sm:text-base lg:text-lg italic leading-relaxed mb-5" style={{ color: data.accentColor }}>
                {data.quote}
              </blockquote>
              <div className="h-px mb-5" style={{ background: `linear-gradient(90deg, ${data.accentColor}40, transparent)` }} />
              <p className="text-amber-100/62 text-sm sm:text-[0.95rem] leading-[1.88]">{data.description}</p>
              <div className="flex items-center justify-between mt-5 pt-4" style={{ borderTop: `1px solid ${data.accentColor}15` }}>
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.32em] opacity-35" style={{ color: data.accentColor }}>
                  Chapter {data.chapter} of {TOTAL}
                </span>
                <span className="text-amber-400/20 text-lg">✦</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  )
}

function DesktopLifeJourney() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85, damping: 24, restDelta: 0.001,
  })

  const headerOp = useTransform(scrollYProgress, [0, 0.055], [1, 0])
  const headerY  = useTransform(scrollYProgress, [0, 0.055], [0, -44])
  const hintOp   = useTransform(scrollYProgress, [0, 0.035], [1, 0])

  return (
    <section id="life-journey" ref={containerRef} className="relative" style={{ height: "600vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden" style={{ transform: "translateZ(0)" }}>
        <div className="absolute inset-0 bg-[#04000c]" />
        <ParticleField />

        <motion.div
          style={{ opacity: headerOp, y: headerY }}
          className="absolute inset-x-0 top-[15vh] z-20 text-center px-6 pointer-events-none"
        >
          <span className="text-amber-400 text-xs font-semibold uppercase tracking-[0.3em]">Spiritual Journey</span>
          <h2 className="mt-3 font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-amber-50">
            Life <span className="gold-text">Journey</span>
          </h2>
          <p className="mt-3 text-amber-200/45 text-sm max-w-sm mx-auto leading-relaxed">
            Six chapters of grace, wisdom, and divine service
          </p>
          <div className="section-divider mt-5" />
        </motion.div>

        {SCENES.map((scene, i) => (
          <Scene key={scene.chapter} data={scene} progress={smoothProgress} index={i} />
        ))}

        <ProgressIndicator progress={smoothProgress} />

        <motion.div
          style={{ opacity: hintOp }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-amber-400/45">Scroll to journey</span>
          <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-amber-400/35 text-base">
            ↓
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ── Root: branches on screen size ───────────────────────────────────────────

export default function LifeJourney() {
  const isMobile = useIsMobile()
  return isMobile ? <MobileLifeJourney /> : <DesktopLifeJourney />
}
