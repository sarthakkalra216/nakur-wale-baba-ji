"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Play, Music, Tv } from "lucide-react"
import { kirtanPlaylist } from "@/data/kirtan-playlist"

const PLAYLIST_URL =
  "https://www.youtube.com/playlist?list=PLBWCOzB55OJw7OFPxONBlVticcOfREi0_"

const N = kirtanPlaylist.length

function ytThumb(id: string) {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
}
function ytEmbed(id: string) {
  return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`
}

// No `ease` inside variant objects — Framer Motion v12 constraint
const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
}

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const fadeUp  = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function Kirtan() {
  const [current,   setCurrent]   = useState(0)
  const [direction, setDirection] = useState(1)
  const [playing,   setPlaying]   = useState(false)
  const thumbsRef = useRef<HTMLDivElement>(null)

  const paginate = (dir: number) => {
    setDirection(dir)
    setCurrent((prev) => ((prev + dir) % N + N) % N)
    setPlaying(false)
  }

  const goTo = (idx: number) => {
    if (idx === current) return
    setDirection(idx > current ? 1 : -1)
    setCurrent(idx)
    setPlaying(false)
    // Scroll the active thumbnail into view
    const el = thumbsRef.current?.children[idx] as HTMLElement | undefined
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
  }

  const k = kirtanPlaylist[current]

  return (
    <section id="kirtan" className="relative py-24 sm:py-32 overflow-hidden bg-paper-2">
      <div className="absolute inset-x-0 top-0 hairline" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center mb-12"
        >
          <motion.span variants={fadeUp} className="eyebrow">
            Devotional Music
          </motion.span>
          <motion.h2 variants={fadeUp} className="mt-3 font-display text-4xl sm:text-5xl font-bold text-ink">
            Sacred <span className="accent-text">Kirtan</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-ink-soft max-w-xl mx-auto text-[0.95rem]">
            Let the vibration of divine music penetrate your heart. Click any
            video to watch it right here — no redirects.
          </motion.p>
          <motion.div variants={fadeUp} className="ornament">
            <span>✦</span>
          </motion.div>
        </motion.div>

        {/* ── Carousel player ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          {/* Main frame */}
          <div
            className="relative rounded-3xl overflow-hidden p-2 bg-card"
            style={{
              boxShadow: "0 40px 90px -45px rgba(87,18,32,0.5), 0 0 0 1px rgba(184,137,59,0.2)",
            }}
          >
            <div className="relative rounded-[1.35rem] overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="sync">
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.42, ease: "easeOut" }}
                className="relative aspect-video bg-maroon-deep"
              >
                {playing ? (
                  /* ── Embedded YouTube player ── */
                  <iframe
                    src={ytEmbed(k.youtubeId)}
                    title={k.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full border-0"
                  />
                ) : (
                  /* ── Thumbnail + play overlay ── */
                  <>
                    <Image
                      src={ytThumb(k.youtubeId)}
                      alt={k.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 896px"
                      unoptimized
                      priority={current === 0}
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-maroon-deep/25" />

                    {/* Centre play button */}
                    <button
                      onClick={() => setPlaying(true)}
                      aria-label={`Play ${k.title}`}
                      className="absolute inset-0 w-full h-full flex items-center justify-center group cursor-pointer"
                    >
                      <motion.div
                        whileHover={{ scale: 1.12 }}
                        whileTap={{ scale: 0.93 }}
                        className="rounded-full flex items-center justify-center shadow-2xl transition-colors duration-200"
                        style={{ background: "rgba(255,253,248,0.94)", width: 72, height: 72 }}
                      >
                        <Play size={28} className="text-maroon ml-1" fill="currentColor" />
                      </motion.div>
                    </button>

                    {/* Info overlay bottom */}
                    <div
                      className="absolute bottom-0 inset-x-0 px-5 pb-5 pt-20 pointer-events-none"
                      style={{ background: "linear-gradient(to top, rgba(43,24,18,0.85), transparent)" }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Music size={12} className="text-marigold" />
                        <span className="text-marigold text-[10px] uppercase tracking-widest font-semibold">
                          Kirtan / Bhajan
                        </span>
                        {k.featured && (
                          <span
                            className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider text-paper"
                            style={{ background: "rgba(159,18,57,0.9)" }}
                          >
                            Featured
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-lg sm:text-2xl font-bold text-paper leading-snug line-clamp-2">
                        {k.title}
                      </h3>
                      <p className="text-paper/65 text-xs mt-0.5 line-clamp-1">{k.description}</p>
                    </div>

                    {/* Counter top-left */}
                    <div
                      className="absolute top-4 left-4 text-paper text-xs font-mono px-2.5 py-1 rounded-full pointer-events-none"
                      style={{ background: "rgba(43,24,18,0.5)", backdropFilter: "blur(8px)" }}
                    >
                      {String(current + 1).padStart(2, "0")}&thinsp;/&thinsp;{String(N).padStart(2, "0")}
                    </div>
                  </>
                )}

                {/* Close player button (only when playing) */}
                {playing && (
                  <button
                    onClick={() => setPlaying(false)}
                    aria-label="Close player"
                    className="absolute top-3 right-3 z-10 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all duration-200 hover:scale-105"
                    style={{
                      background: "rgba(43,24,18,0.7)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255,253,248,0.2)",
                      color: "#fffdf8",
                    }}
                  >
                    ✕ Close
                  </button>
                )}
              </motion.div>
            </AnimatePresence>

            {/* ← Prev arrow */}
            <button
              onClick={() => paginate(-1)}
              aria-label="Previous kirtan"
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95"
              style={{
                background: "rgba(255,253,248,0.92)",
                border: "1px solid rgba(184,137,59,0.3)",
              }}
            >
              <ChevronLeft size={20} className="text-maroon" />
            </button>

            {/* → Next arrow */}
            <button
              onClick={() => paginate(1)}
              aria-label="Next kirtan"
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95"
              style={{
                background: "rgba(255,253,248,0.92)",
                border: "1px solid rgba(184,137,59,0.3)",
              }}
            >
              <ChevronRight size={20} className="text-maroon" />
            </button>
            </div>
          </div>

          {/* ── Thumbnail strip ── */}
          <div
            ref={thumbsRef}
            className="flex gap-3 mt-5 overflow-x-auto pb-1 scrollbar-hide"
          >
            {kirtanPlaylist.map((item, i) => (
              <button
                key={item.youtubeId}
                onClick={() => goTo(i)}
                aria-label={`Go to: ${item.title}`}
                className="relative shrink-0 rounded-xl overflow-hidden cursor-pointer transition-all duration-300"
                style={{
                  width: 120,
                  height: 68,
                  outline: i === current ? "2px solid #e07a1e" : "2px solid rgba(123,30,43,0.12)",
                  outlineOffset: 2,
                  opacity: i === current ? 1 : 0.5,
                  boxShadow: i === current ? "0 6px 16px -6px rgba(224,122,30,0.5)" : "none",
                }}
              >
                <Image
                  src={ytThumb(item.youtubeId)}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="120px"
                  unoptimized
                />
                {/* Play icon on inactive thumbnails */}
                {i !== current && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(43,24,18,0.55)" }}
                    >
                      <Play size={10} className="text-paper ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* ── Dot indicators ── */}
          <div className="flex justify-center items-center gap-1.5 mt-4">
            {kirtanPlaylist.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to kirtan ${i + 1}`}
                className="rounded-full cursor-pointer transition-all duration-300"
                style={{
                  width:  i === current ? 24 : 5,
                  height: 5,
                  background: i === current
                    ? "linear-gradient(90deg, #e07a1e, #f1a93a)"
                    : "rgba(123,30,43,0.18)",
                }}
              />
            ))}
          </div>

          {/* ── Playlist CTA ── */}
          <div className="mt-8 text-center">
            <a
              href={PLAYLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-maroon/30 text-maroon hover:bg-maroon/[0.06] hover:border-maroon transition-all duration-300 text-sm font-medium"
            >
              <Tv size={16} /> View Full Playlist on YouTube
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
