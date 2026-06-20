"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

const VIDEOS = [
  {
    src: "/gallery/video1.mp4",
    poster: "/gallery/photo3.jpeg",
    title: "Ashram Darshan",
    subtitle: "Sacred moments from Guruji's Nakur ashram",
    label: "01",
  },
  {
    src: "/gallery/video2.mp4",
    poster: "/gallery/photo1.jpeg",
    title: "Divine Presence",
    subtitle: "Blessed satsang recordings from Nakur",
    label: "02",
  },
]

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

// ── Individual video card ────────────────────────────────────────────────────

interface VideoData {
  src: string
  poster: string
  title: string
  subtitle: string
  label: string
}

function VideoCard({ video }: { video: VideoData }) {
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted]     = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Sync muted state to DOM property after every render.
  // We do NOT put `muted` as a prop on <video> — React sets only the HTML
  // attribute (sticky), not the DOM property (what the browser reads).
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted
  })

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!videoRef.current) return
    if (playing) {
      videoRef.current.pause()
      setPlaying(false)
    } else {
      videoRef.current.muted = muted
      videoRef.current.play().catch(() => setPlaying(false))
      setPlaying(true)
    }
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!videoRef.current) return
    const next = !videoRef.current.muted
    videoRef.current.muted = next
    setMuted(next)
  }

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="paper-card flex flex-col rounded-3xl overflow-hidden"
    >
      {/* ── Video area — fixed aspect ratio so both cards are always equal ── */}
      <div className="relative aspect-video bg-maroon-deep overflow-hidden">
        {/* Video — NO muted prop */}
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          playsInline
          loop
          className="w-full h-full object-cover"
          onEnded={() => setPlaying(false)}
          onClick={handlePlay}
          style={{ cursor: "pointer" }}
        />

        {/* Dim overlay + centre play button when paused */}
        {!playing && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "rgba(43,24,18,0.3)" }}
            onClick={handlePlay}
          >
            <motion.div
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.93 }}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center cursor-pointer shadow-xl"
              style={{ background: "rgba(255,253,248,0.94)" }}
            >
              <Play size={28} className="text-maroon ml-1" fill="currentColor" />
            </motion.div>
          </div>
        )}

        {/* Top bar: label + pause button (only when playing) */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          <span
            className="text-[11px] font-bold tabular-nums px-2.5 py-1 rounded-full text-paper"
            style={{
              background: "rgba(224,122,30,0.85)",
            }}
          >
            {video.label}
          </span>

          {playing && (
            <button
              onClick={handlePlay}
              aria-label="Pause"
              className="pointer-events-auto w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
              style={{
                background: "rgba(43,24,18,0.55)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,253,248,0.15)",
              }}
            >
              <Pause size={15} className="text-paper" fill="currentColor" />
            </button>
          )}
        </div>

        {/* Bottom bar: mute button */}
        <div className="absolute bottom-3 right-3 pointer-events-none">
          <button
            onClick={toggleMute}
            aria-label={muted ? "Unmute" : "Mute"}
            className="pointer-events-auto w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
            style={{
              background: "rgba(43,24,18,0.55)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,253,248,0.15)",
            }}
          >
            {muted
              ? <VolumeX size={15} className="text-paper/70" />
              : <Volume2 size={15} className="text-marigold" />
            }
          </button>
        </div>

        {/* Playing indicator pulse */}
        {playing && (
          <div className="absolute top-3 right-3 pointer-events-none">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse inline-block" />
          </div>
        )}
      </div>

      {/* ── Info bar ── */}
      <div className="px-5 py-4 flex items-center justify-between">
        <div>
          <h3 className="font-display text-base sm:text-lg font-bold text-ink leading-tight">
            {video.title}
          </h3>
          <p className="text-ink-soft text-xs mt-0.5">{video.subtitle}</p>
        </div>
        <button
          onClick={handlePlay}
          aria-label={playing ? "Pause" : "Play"}
          className="shrink-0 ml-4 px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all duration-200 hover:scale-105"
          style={
            playing
              ? {
                  background: "rgba(123,30,43,0.07)",
                  border: "1px solid rgba(123,30,43,0.2)",
                  color: "#7b1e2b",
                }
              : {
                  background: "linear-gradient(135deg,#f1a93a,#e07a1e)",
                  color: "#fffdf8",
                }
          }
        >
          {playing ? "Pause" : "Play"}
        </button>
      </div>
    </motion.div>
  )
}

// ── Section ──────────────────────────────────────────────────────────────────

export default function VideoGallery() {
  return (
    <section id="videos" className="relative py-24 sm:py-32 overflow-hidden bg-paper">
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center mb-12"
        >
          <motion.span variants={fadeUp} className="eyebrow">
            Ashram Recordings
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-3 font-display text-4xl sm:text-5xl font-bold text-ink"
          >
            Sacred <span className="accent-text">Videos</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-ink-soft max-w-xl mx-auto text-[0.95rem]"
          >
            Immerse yourself in the divine atmosphere of Guruji&apos;s ashram.
            Click play — sound is on.
          </motion.p>
          <motion.div variants={fadeUp} className="ornament">
            <span>✦</span>
          </motion.div>
        </motion.div>

        {/* Equal-size video grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {VIDEOS.map((v) => (
            <VideoCard key={v.src} video={v} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
