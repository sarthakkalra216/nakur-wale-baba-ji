"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ChevronDown, Sparkles, Volume2, VolumeX } from "lucide-react"

const TAGLINE = "दिव्य ज्ञान, सेवा, प्रेम और आध्यात्मिक जागृति का प्रसार"

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
  const [particles, setParticles] = useState<Particle[]>([])
  const [isMuted, setIsMuted] = useState(true)
  const [videoError, setVideoError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

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
      className="relative min-h-screen flex flex-col items-center justify-start sm:justify-center overflow-hidden"
    >
      {/* Base background */}
      <div className="absolute inset-0 bg-[#04000c]" />

      {/* Video background — upper portion only, fades into the page colour */}
      {!videoError && (
        <div className="absolute inset-x-0 top-0 h-[58%] overflow-hidden pointer-events-none">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onError={() => setVideoError(true)}
          >
            <source src="/background%20effect/hero-bg.mp4" type="video/mp4" />
          </video>
          {/* Fade the video's bottom edge into the page background */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 40%, rgba(4,0,12,0.85) 80%, #04000c 100%)",
            }}
          />
        </div>
      )}

      {/* Fallback: photo when video can't load — upper part only */}
      {videoError && (
        <div
          className="absolute inset-x-0 top-0 h-[58%] bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, transparent 40%, #04000c 100%), url('/images/photo3.jpg')",
          }}
        />
      )}

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/65" />

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

      {/* Decorative Om */}
      <div
        className="absolute select-none pointer-events-none text-[28rem] font-bold leading-none opacity-[0.015]"
        style={{
          fontFamily: "serif",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -52%)",
          color: "#d4a843",
        }}
      >
        ॐ
      </div>

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

      {/* Content */}
      <div className="relative z-20 px-4 sm:px-6 max-w-4xl mx-auto pt-28 pb-20 sm:py-16">
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
          <span>जय गुरुजी — नकुड़ वाले बाबा जी</span>
          <Sparkles size={13} className="animate-pulse" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="font-hindi font-bold mb-5 sm:mb-6"
          lang="hi"
        >
          <span
            className="block text-amber-200/90 text-base sm:text-2xl lg:text-3xl mb-2 font-medium"
            style={{ lineHeight: 1.6, paddingBlock: "0.1em" }}
          >
            परम श्रद्धेय
          </span>
          <span
            className="block gold-text text-3xl sm:text-5xl lg:text-6xl"
            style={{ lineHeight: 1.5, paddingBlock: "0.14em" }}
          >
            श्री श्री १०८ स्वामी रामानन्द
          </span>
          <span
            className="block text-amber-50 text-3xl sm:text-5xl lg:text-6xl"
            style={{ lineHeight: 1.5, paddingBlock: "0.14em" }}
          >
            सरस्वती जी महाराज
          </span>
          <span
            className="block purple-text text-2xl sm:text-4xl lg:text-5xl mt-2 sm:mt-3"
            style={{ lineHeight: 1.55, paddingBlock: "0.16em" }}
          >
            (नकुड़ वाले बाबा जी)
          </span>
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
          lang="hi"
        >
          {TAGLINE}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-10 sm:mb-16"
        >
          <button
            onClick={() => scrollTo("#about")}
            className="font-hindi w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 font-bold text-base hover:from-amber-300 hover:to-yellow-400 transition-all duration-300 shadow-xl shadow-amber-500/25 hover:shadow-amber-400/45 hover:scale-105 cursor-pointer"
            lang="hi"
          >
            गुरुजी को जानें
          </button>
          <Link
            href="/contact"
            className="font-hindi w-full sm:w-auto px-8 py-4 rounded-full border border-amber-400/40 text-amber-300 font-bold text-base hover:bg-amber-400/10 hover:border-amber-400 hover:text-amber-400 transition-all duration-300 backdrop-blur-sm cursor-pointer text-center"
            lang="hi"
          >
            संपर्क करें
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="grid grid-cols-3 gap-6 max-w-sm mx-auto"
        >
          {[
            { value: "५०+", label: "वर्षों की सेवा" },
            { value: "१ लाख+", label: "श्रद्धालु" },
            { value: "∞", label: "दिव्य प्रेम" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-hindi text-2xl sm:text-3xl font-bold text-amber-400">
                {s.value}
              </div>
              <div className="font-hindi text-xs text-amber-200/60 mt-1 tracking-wide" lang="hi">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        onClick={() => scrollTo("#about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-amber-400/50 hover:text-amber-400 transition-colors cursor-pointer"
      >
        <span className="font-hindi text-[11px] tracking-[0.2em]" lang="hi">दर्शन</span>
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
