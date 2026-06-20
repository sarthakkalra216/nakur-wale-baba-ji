"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ChevronDown, Play, Pause, Volume2, VolumeX, MapPin } from "lucide-react"
import { gurujiProfile } from "@/data/guruji-profile"

const STATS = [
  { value: "50+", label: "Years of Seva" },
  { value: "100K+", label: "Devotees" },
  { value: "∞", label: "Divine Love" },
]

export default function Hero() {
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (playing) {
      v.pause()
      setPlaying(false)
    } else {
      v.muted = muted
      v.play().catch(() => setPlaying(false))
      setPlaying(true)
    }
  }

  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    const next = !v.muted
    v.muted = next
    setMuted(next)
  }

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" })

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden grain pt-24 pb-16 lg:pt-20 lg:pb-0"
    >
      {/* Soft warm washes */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 12% 8%, rgba(241,169,58,0.16), transparent 60%), radial-gradient(ellipse 55% 50% at 92% 85%, rgba(123,30,43,0.08), transparent 60%)",
        }}
      />
      {/* Faint giant Om watermark */}
      <div
        aria-hidden
        className="absolute select-none pointer-events-none font-display leading-none"
        style={{
          fontSize: "34rem",
          top: "50%",
          right: "-4%",
          transform: "translateY(-50%)",
          color: "rgba(184,137,59,0.05)",
        }}
      >
        ॐ
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
          {/* ── Left: editorial copy ── */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-7 px-4 py-1.5 rounded-full border border-gold/30 bg-card/70 backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-saffron animate-pulse" />
              <span className="eyebrow !tracking-[0.2em] text-maroon">
                Jai Guruji · Nakur Wale Baba Ji
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="font-display font-bold leading-[1.04] tracking-tight text-[2.7rem] sm:text-6xl lg:text-7xl"
            >
              <span className="block text-maroon">Shri Guruji</span>
              <span className="block text-ink">Nakur Wale</span>
              <span className="block accent-text">Baba Ji</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.35 }}
              className="ornament lg:justify-start mt-6"
            >
              <span>✦</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-6 text-lg sm:text-xl text-ink-soft max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              {gurujiProfile.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-5 flex items-center justify-center lg:justify-start gap-2 text-sm text-ink-faint"
            >
              <MapPin size={14} className="text-saffron" />
              {gurujiProfile.location}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="mt-9 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
            >
              <button
                onClick={() => scrollTo("#about")}
                className="btn-primary w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-base cursor-pointer"
              >
                Discover Guruji
              </button>
              <button
                onClick={() => scrollTo("#ask-guruji")}
                className="btn-ghost w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-base cursor-pointer"
              >
                ✦ Ask Guruji
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0"
            >
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className={`text-center lg:text-left ${
                    i > 0 ? "border-l border-maroon/12 pl-4" : ""
                  }`}
                >
                  <div className="font-display text-3xl sm:text-4xl font-bold text-maroon">
                    {s.value}
                  </div>
                  <div className="text-[11px] text-ink-faint mt-1 uppercase tracking-[0.12em]">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: framed media ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25 }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            {/* Floating gold Om medallion */}
            <div
              className="float-slow absolute -top-5 -left-5 z-20 w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-lg"
              style={{
                background: "linear-gradient(135deg,#f1a93a,#be610d)",
                color: "#fffdf8",
                boxShadow: "0 14px 30px -10px rgba(194,65,12,0.55)",
              }}
            >
              🕉
            </div>

            {/* Outer frame */}
            <div className="relative rounded-[1.75rem] p-2.5 bg-card border border-gold/25 shadow-[0_40px_80px_-40px_rgba(87,18,32,0.45)]">
              <div className="relative rounded-[1.35rem] overflow-hidden aspect-[4/5]">
                {/* Still image */}
                <Image
                  src="/gallery/photo4.jpeg"
                  alt="Blessed darshan of Shri Guruji Nakur Wale Baba Ji"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className={`object-cover transition-opacity duration-500 ${
                    playing ? "opacity-0" : "opacity-100"
                  }`}
                />

                {/* Inline video (revealed on play) */}
                <video
                  ref={videoRef}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    playing ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                  loop
                  playsInline
                  poster="/gallery/photo4.jpeg"
                  onEnded={() => setPlaying(false)}
                >
                  <source src="/gallery/video1.mp4" type="video/mp4" />
                  <source src="/gallery/video2.mp4" type="video/mp4" />
                </video>

                {/* Bottom gradient + caption */}
                <div
                  className="absolute inset-x-0 bottom-0 p-5 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(43,24,18,0.78), transparent)",
                  }}
                >
                  <div className="font-display text-lg font-bold text-paper">
                    Blessed Darshan
                  </div>
                  <div className="text-[11px] text-paper/70 tracking-wide uppercase mt-0.5">
                    Nakur Ashram
                  </div>
                </div>

                {/* Play / Pause */}
                <button
                  onClick={togglePlay}
                  aria-label={playing ? "Pause video" : "Play video"}
                  className="absolute inset-0 flex items-center justify-center group cursor-pointer"
                >
                  {!playing && (
                    <motion.span
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.94 }}
                      className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl"
                      style={{ background: "rgba(255,253,248,0.92)" }}
                    >
                      <Play size={26} className="text-maroon ml-1" fill="currentColor" />
                    </motion.span>
                  )}
                </button>

                {/* Controls when playing */}
                {playing && (
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                      onClick={toggleMute}
                      aria-label={muted ? "Unmute" : "Mute"}
                      className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
                      style={{
                        background: "rgba(43,24,18,0.55)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      {muted ? (
                        <VolumeX size={15} className="text-paper/80" />
                      ) : (
                        <Volume2 size={15} className="text-marigold" />
                      )}
                    </button>
                    <button
                      onClick={togglePlay}
                      aria-label="Pause"
                      className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
                      style={{
                        background: "rgba(43,24,18,0.55)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <Pause size={15} className="text-paper" fill="currentColor" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Decorative caption tag */}
            <div className="hidden lg:flex absolute -bottom-5 right-6 z-20 items-center gap-2 px-4 py-2 rounded-full bg-card border border-gold/30 shadow-md">
              <span className="text-saffron text-sm">✦</span>
              <span className="text-xs font-medium text-maroon">
                Watch a moment of grace
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        onClick={() => scrollTo("#about")}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1.5 text-ink-faint hover:text-maroon transition-colors cursor-pointer"
      >
        <span className="text-[10px] uppercase tracking-[0.25em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  )
}
