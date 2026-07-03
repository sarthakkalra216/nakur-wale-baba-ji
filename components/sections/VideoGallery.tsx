"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, Pause, Volume2, VolumeX, VideoOff } from "lucide-react"
import { RamBackground } from "@/components/decor/SacredBackground"
import { AmbientVideo } from "@/components/decor/AmbientVideo"
import { TiltCard } from "@/components/motion"
import { useSite } from "@/components/providers/SiteProvider"

export interface VideoItem {
  src: string
  name: string
}

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

function VideoCard({ video, index }: { video: VideoItem; index: number }) {
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [ratio, setRatio] = useState<number | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Keep the DOM `muted` property in sync (React only sets the attribute).
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted
  })

  // Read each video's real aspect ratio so its card matches its shape
  // (portrait or landscape) — like the photo gallery's masonry.
  const onMeta = () => {
    const v = videoRef.current
    if (v && v.videoWidth && v.videoHeight) setRatio(v.videoWidth / v.videoHeight)
  }

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

  const label = String(index + 1).padStart(2, "0")

  return (
    <TiltCard
      variants={fadeUp}
      maxTilt={5}
      lift={5}
      scale={1.015}
      outerClassName="mb-4 w-full break-inside-avoid"
      className="group relative block w-full overflow-hidden rounded-2xl"
      style={{
        background: "#000",
        border: "1px solid rgba(212,168,67,0.18)",
        boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
      }}
    >
      {/* Card sizes to the video's own aspect ratio — fills it fully, no bars */}
      <div
        className="relative w-full"
        style={{ aspectRatio: ratio ?? 9 / 16, background: "#000" }}
      >
        <video
          ref={videoRef}
          src={video.src}
          preload="metadata"
          playsInline
          loop
          onLoadedMetadata={onMeta}
          onEnded={() => setPlaying(false)}
          onClick={handlePlay}
          className="absolute inset-0 w-full h-full object-contain"
          style={{ cursor: "pointer" }}
        />

        {/* Number badge */}
        <span
          className="absolute top-3 left-3 z-10 font-serif font-bold tabular-nums text-sm px-3 py-1 rounded-full pointer-events-none"
          style={{
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(8px)",
            color: "#fde68a",
            border: "1px solid rgba(212,168,67,0.3)",
          }}
        >
          {label}
        </span>

        {/* Live dot */}
        {playing && (
          <span className="absolute top-3 right-3 z-10 w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse pointer-events-none" />
        )}

        {/* Centre play button when paused */}
        {!playing && (
          <button
            onClick={handlePlay}
            aria-label="Play"
            className="absolute inset-0 z-10 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.28)" }}
          >
            <motion.span
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.93 }}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-2xl shadow-amber-400/35"
              style={{ background: "rgba(212,168,67,0.94)" }}
            >
              <Play size={28} className="text-slate-900 ml-1" fill="currentColor" />
            </motion.span>
          </button>
        )}

        {/* Controls when playing */}
        {playing && (
          <button
            onClick={handlePlay}
            aria-label="Pause"
            className="absolute bottom-3 left-3 z-10 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
            style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.15)" }}
          >
            <Pause size={15} className="text-white" fill="currentColor" />
          </button>
        )}

        {/* Mute */}
        <button
          onClick={toggleMute}
          aria-label={muted ? "Unmute" : "Mute"}
          className="absolute bottom-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
          style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.15)" }}
        >
          {muted ? <VolumeX size={15} className="text-white/60" /> : <Volume2 size={15} className="text-amber-400" />}
        </button>
      </div>
    </TiltCard>
  )
}

export default function VideoGallery({ videos }: { videos: VideoItem[] }) {
  const { t, lang } = useSite()
  return (
    <section id="videos" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Ambient video backdrop above the gallery — blends into page */}
      <div className="absolute top-0 inset-x-0 h-[78vh] z-0">
        <AmbientVideo src="/background%20effect/gallery-bg.mp4" />
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 50% at 50% 50%, rgba(88,28,135,0.1), transparent)",
        }}
      />
      <RamBackground variant="tiled" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center mb-12"
        >
          <motion.span
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.25em]"
            style={{ color: "var(--gold)" }}
            lang={lang}
          >
            {t.videos.eyebrow}
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-3 font-serif text-3xl sm:text-5xl font-bold text-heading"
            lang={lang}
          >
            {t.videos.titleLead} <span className="gold-text">{t.videos.titleEm}</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-xl mx-auto text-sm text-muted-themed"
            lang={lang}
          >
            {t.videos.subtitle}
          </motion.p>
          <motion.div variants={fadeUp} className="section-divider" />
        </motion.div>

        {videos.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-20 text-muted-themed">
            <VideoOff size={36} />
            <p className="text-sm" lang={lang}>{t.videos.empty} <code>public/videos</code>.</p>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="columns-1 sm:columns-2 lg:columns-3 gap-4 max-w-6xl mx-auto"
          >
            {videos.map((v, i) => (
              <VideoCard key={v.src} video={v} index={i} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
