"use client"

import { useEffect, useRef, useState } from "react"
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import Link from "next/link"
import { ChevronDown, Sparkles, Volume2, VolumeX } from "lucide-react"
import { Magnetic } from "@/components/motion"
import { useSite } from "@/components/providers/SiteProvider"

// The hero stays cinematically dark in BOTH themes (it sits over a video), so
// these bright gradients are inlined instead of the theme-aware .gold-text /
// .purple-text classes (which darken in light mode and would vanish here).
const goldGradient = {
  background: "linear-gradient(135deg,#fde68a 0%,#f59e0b 45%,#d4a843 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
} as const
const purpleGradient = {
  background: "linear-gradient(135deg,#c4b5fd 0%,#a78bfa 50%,#7c3aed 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
} as const

interface Particle {
  id: number
  left: string
  top: string
  size: number
  color: string
  duration: number
  delay: number
  blur: number
  range: number
}

const COLORS = [
  "rgba(212,168,67,0.7)",
  "rgba(124,58,237,0.6)",
  "rgba(255,255,255,0.5)",
  "rgba(251,191,36,0.6)",
  "rgba(167,139,250,0.5)",
  "rgba(244,114,182,0.4)",
]

export default function Hero() {
  const { t, lang } = useSite()
  const [particles, setParticles] = useState<Particle[]>([])
  const [isMuted, setIsMuted] = useState(true)
  const [videoError, setVideoError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  // Apple-style scroll depth: as the hero scrolls away, the backdrop drifts
  // down and zooms while the content rises, shrinks, and fades — layered
  // parallax that reads as real depth. Transform/opacity only.
  // Reduced motion flattens the ranges instead of branching the markup —
  // all ranges start at their resting value, so SSR/client HTML matches
  // regardless of the user's motion preference.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const videoY = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["0%", "24%"])
  const contentY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -90])
  const contentScale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1, 0.95])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], reduced ? [1, 1] : [1, 0])

  // Mouse-follow spotlight — a soft gold/violet glow trailing the cursor.
  // Starts far offscreen so nothing shows until the mouse enters.
  const mx = useMotionValue(-1000)
  const my = useMotionValue(-1000)
  const spotX = useSpring(mx, { stiffness: 60, damping: 20 })
  const spotY = useSpring(my, { stiffness: 60, damping: 20 })
  const spotlight = useMotionTemplate`radial-gradient(560px circle at ${spotX}px ${spotY}px, rgba(245,185,66,0.09), rgba(124,58,237,0.05) 45%, transparent 70%)`

  const onSpotlightMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduced || e.pointerType !== "mouse") return
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set(e.clientX - rect.left)
    my.set(e.clientY - rect.top)
  }

  useEffect(() => {
    setParticles(
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        left: `${2 + Math.random() * 96}%`,
        top: `${5 + Math.random() * 88}%`,
        size: 2 + Math.random() * 6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        duration: 2.5 + Math.random() * 3,
        delay: Math.random() * 3,
        blur: 1 + Math.random() * 3,
        range: 12 + Math.random() * 20,
      }))
    )
  }, [])

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
  }

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" })

  return (
    <section
      id="hero"
      ref={sectionRef}
      onPointerMove={onSpotlightMove}
      className="relative min-h-screen flex flex-col items-center justify-start sm:justify-center overflow-hidden"
    >
      {/* Base background */}
      <div className="absolute inset-0 bg-[#04000c]" />

      {/* Video background — covers the full hero, no leftover solid-black
          area below it like the old 78%-tall box left behind. */}
      {!videoError && (
        <motion.div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ y: videoY }}
        >
          {/* No scroll-linked scale on the video — scaling a <video> via CSS
              transform produced a persistent GPU compositing seam (a faint
              rainbow line) at the container's clipped edge, independent of
              scroll position. Translate-only avoids it entirely.
              No fade-to-black effect on the video either (previously a
              gradient div, then a mask) — both produced the same seam on
              the reporter's device/browser and couldn't be reproduced or
              debugged from here, so it's removed rather than re-tuned
              again. The video now shows at full brightness within its box
              and simply ends at a hard edge; the section's other overlays
              (radial glows, dark tint, grid) still carry the rest of the
              atmosphere. */}
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center 30%" }}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onError={() => setVideoError(true)}
          >
            <source src="/background%20effect/hero-bg.mp4" type="video/mp4" />
          </video>
        </motion.div>
      )}

      {/* Fallback: photo when video can't load — covers the full hero */}
      {videoError && (
        <motion.div
          className="absolute inset-0 bg-cover"
          style={{
            backgroundPosition: "center 30%",
            backgroundImage: "url('/images/Nakud%20wale%20baba%20ji/photo3.jpg')",
            y: videoY,
          }}
        />
      )}

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Radial glows on top of video */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 110% 65% at 50% -5%, rgba(88,28,135,0.45), transparent),
            radial-gradient(ellipse 55% 45% at 85% 60%, rgba(212,168,67,0.07), transparent),
            radial-gradient(ellipse 55% 45% at 15% 55%, rgba(88,28,135,0.14), transparent)
          `,
        }}
      />

      {/* Cinematic lighting — two soft light blobs drifting slowly through
          the scene, like temple lamps breathing behind the haze. The global
          MotionConfig stills them for reduced-motion users. */}
      <motion.div
        aria-hidden
        className="absolute -left-40 top-1/4 w-[36rem] h-[36rem] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.14), transparent 65%)",
          filter: "blur(50px)",
        }}
        animate={{ x: [0, 110, 0], y: [0, -70, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -right-40 top-1/2 w-[32rem] h-[32rem] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(245,185,66,0.1), transparent 65%)",
          filter: "blur(55px)",
        }}
        animate={{ x: [0, -100, 0], y: [0, 80, 0] }}
        transition={{ duration: 27, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Mouse-follow spotlight (desktop only) */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none hidden md:block"
        style={{ background: spotlight }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            filter: `blur(${p.blur}px)`,
          }}
          animate={{ y: [-p.range, p.range], opacity: [0.3, 0.85, 0.3] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}

      {/* Mute/Unmute button */}
      {!videoError && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
          className="absolute top-24 right-4 sm:right-6 z-20 w-10 h-10 rounded-full flex items-center justify-center border border-white/20 bg-black/40 backdrop-blur-sm text-white/70 hover:text-white hover:border-amber-400/50 transition-all duration-300 cursor-pointer"
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </motion.button>
      )}

      {/* Content — rises, shrinks, and fades as the hero scrolls away */}
      <motion.div
        className="relative z-20 px-4 sm:px-6 max-w-4xl mx-auto pt-28 pb-20 sm:py-16"
        style={{ y: contentY, scale: contentScale, opacity: contentOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-center"
        >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-5 sm:mb-8 px-4 sm:px-5 py-2 rounded-full border border-amber-400/30 bg-amber-400/[0.06] text-amber-400 text-xs sm:text-sm font-medium font-hindi"
          lang="hi"
        >
          <Sparkles size={13} className="animate-pulse" />
          <span lang={lang}>{t.hero.badge}</span>
          <Sparkles size={13} className="animate-pulse" />
        </motion.div>

        {/* Heading — each line tips up out of 3D space in sequence */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-hindi font-bold mb-5 sm:mb-6"
          style={{ perspective: 800 }}
          lang={lang}
        >
          <motion.span
            initial={{ opacity: 0, y: 34, rotateX: 28 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="block text-amber-200/90 text-base sm:text-2xl lg:text-3xl mb-2 font-medium"
            style={{ lineHeight: 1.6, paddingBlock: "0.1em" }}
          >
            {t.hero.eyebrow}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 34, rotateX: 28 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.85, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="block text-3xl sm:text-5xl lg:text-6xl"
            style={{ ...goldGradient, lineHeight: 1.5, paddingBlock: "0.14em" }}
          >
            {t.hero.name1}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 34, rotateX: 28 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.85, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
            className="block text-amber-50 text-3xl sm:text-5xl lg:text-6xl"
            style={{ lineHeight: 1.5, paddingBlock: "0.14em" }}
          >
            {t.hero.name2}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 34, rotateX: 28 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.85, delay: 0.56, ease: [0.22, 1, 0.36, 1] }}
            className="block text-2xl sm:text-4xl lg:text-5xl mt-2 sm:mt-3"
            style={{ ...purpleGradient, lineHeight: 1.55, paddingBlock: "0.16em" }}
          >
            {t.hero.name3}
          </motion.span>
        </motion.h1>

        {/* Ornament divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="flex items-center justify-center gap-3 mb-6 sm:mb-8"
        >
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-400/50" />
          <span className="text-amber-400 text-xl">✦</span>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-amber-400/50" />
        </motion.div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="font-hindi text-base sm:text-xl lg:text-2xl text-amber-200/80 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed"
          lang={lang}
        >
          {t.hero.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-10 sm:mb-16"
        >
          <Magnetic className="w-full sm:w-auto" strength={0.28}>
            <button
              onClick={() => scrollTo("#life-journey")}
              className="font-hindi w-full px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 font-bold text-base hover:from-amber-300 hover:to-yellow-400 transition-all duration-300 shadow-xl shadow-amber-500/25 hover:shadow-amber-400/45 hover:scale-105 cursor-pointer"
              lang={lang}
            >
              {t.hero.ctaPrimary}
            </button>
          </Magnetic>
          <Magnetic className="w-full sm:w-auto" strength={0.28}>
            <Link
              href="/contact"
              className="font-hindi block w-full px-8 py-4 rounded-full border border-amber-400/40 text-amber-300 font-bold text-base hover:bg-amber-400/10 hover:border-amber-400 hover:text-amber-400 transition-all duration-300 backdrop-blur-sm cursor-pointer text-center"
              lang={lang}
            >
              {t.hero.ctaSecondary}
            </Link>
          </Magnetic>
        </motion.div>

        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        onClick={() => scrollTo("#life-journey")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-amber-400/50 hover:text-amber-400 transition-colors cursor-pointer"
      >
        <span className="font-hindi text-[11px] tracking-[0.2em]" lang={lang}>{t.hero.scrollCue}</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  )
}
