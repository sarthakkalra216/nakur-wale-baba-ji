"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X, ZoomIn, ImageOff } from "lucide-react"
import { RamBackground } from "@/components/decor/SacredBackground"
import { AmbientVideo } from "@/components/decor/AmbientVideo"
import { useSite } from "@/components/providers/SiteProvider"
import type { GallerySection } from "@/lib/media"

const ALT = "Guruji Nakur Wale Baba Ji — sacred moment at the Nakur ashram"

const headerStagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
}
const eventFadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

// Spring used for the shared-element (thumbnail ⇄ fullscreen) morph
const morph = { type: "spring" as const, stiffness: 220, damping: 28 }

export default function Gallery({ sections }: { sections: GallerySection[] }) {
  const { t, lang } = useSite()
  const [active, setActive] = useState<number | null>(null)

  // Flatten every event section into one ordered list so the fullscreen
  // viewer's Prev/Next can move seamlessly across event boundaries, while
  // each section still renders its own labeled grid below.
  const flat = sections.flatMap((s) => s.images)
  const count = flat.length
  let offset = 0
  const sectionsWithOffset = sections.map((s) => {
    const withOffset = { section: s, offset }
    offset += s.images.length
    return withOffset
  })

  const close = useCallback(() => setActive(null), [])
  const paginate = useCallback(
    (dir: number) => setActive((i) => (i === null ? i : (i + dir + count) % count)),
    [count]
  )

  useEffect(() => {
    if (active === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      else if (e.key === "ArrowRight") paginate(1)
      else if (e.key === "ArrowLeft") paginate(-1)
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [active, close, paginate])

  const activeImg = active !== null ? flat[active] : null

  return (
    <section id="gallery" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Ambient video backdrop above the gallery — blends into page */}
      <div className="absolute top-0 inset-x-0 h-[78vh] z-0">
        <AmbientVideo src="/background%20effect/gallery-bg.mp4" />
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 10%, rgba(88,28,135,0.14), transparent)",
        }}
      />
      <RamBackground variant="floating" opacity={0.06} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={headerStagger}
          className="text-center mb-12"
        >
          <motion.span
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.25em]"
            style={{ color: "var(--gold)" }}
            lang={lang}
          >
            {t.gallery.eyebrow}
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-3 font-serif text-3xl sm:text-5xl font-bold text-heading"
            lang={lang}
          >
            {t.gallery.titleLead} <span className="gold-text">{t.gallery.titleEm}</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-xl mx-auto text-sm leading-relaxed text-muted-themed"
            lang={lang}
          >
            {t.gallery.subtitle}
          </motion.p>
          <motion.div variants={fadeUp} className="section-divider" />
        </motion.div>

        {/* ── Event-grouped masonry grids ── */}
        {count === 0 ? (
          <div className="flex flex-col items-center gap-3 py-20 text-muted-themed">
            <ImageOff size={36} />
            <p className="text-sm" lang={lang}>{t.gallery.empty} <code>public/images</code>.</p>
          </div>
        ) : (
          <div className="space-y-16 sm:space-y-20">
            {sectionsWithOffset.map(({ section, offset: sectionOffset }) => (
              <div key={section.slug}>
                {/* Event heading */}
                <motion.div
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={headerStagger}
                  className="mb-6 sm:mb-8"
                >
                  <motion.h3
                    variants={eventFadeUp}
                    className="font-serif text-xl sm:text-2xl font-bold text-heading"
                    lang={lang}
                  >
                    {section.slug === "guruji" ? t.gallery.guruji : section.title[lang]}
                  </motion.h3>
                  <motion.div
                    variants={eventFadeUp}
                    className="mt-3 h-px w-full"
                    style={{
                      background:
                        "linear-gradient(90deg, var(--border-gold), transparent)",
                    }}
                  />
                </motion.div>

                {/* Masonry grid for this event's photos */}
                <div className="columns-2 md:columns-3 lg:columns-4 gap-4 sm:gap-5">
                  {section.images.map((img, i) => {
                    const globalIndex = sectionOffset + i
                    return (
                      <motion.button
                        key={img.src}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.4) }}
                        onClick={() => setActive(globalIndex)}
                        className="group relative mb-4 sm:mb-5 block w-full break-inside-avoid overflow-hidden rounded-2xl cursor-pointer"
                        style={{ border: "1px solid var(--border-gold)" }}
                        aria-label={`Open image ${globalIndex + 1}`}
                      >
                        {/* Shared-element thumbnail (morphs into the fullscreen view) */}
                        <motion.img
                          layoutId={`gal-${img.src}`}
                          transition={morph}
                          src={img.src}
                          alt={ALT}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-auto block transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/55 via-black/10 to-transparent">
                          <div
                            className="w-12 h-12 rounded-full flex items-center justify-center translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                            style={{
                              background: "rgba(0,0,0,0.5)",
                              backdropFilter: "blur(10px)",
                              border: "1px solid rgba(212,168,67,0.4)",
                            }}
                          >
                            <ZoomIn size={20} className="text-amber-400" />
                          </div>
                        </div>
                        <div
                          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                          style={{ boxShadow: "inset 0 0 0 2px rgba(212,168,67,0.55)" }}
                        />
                      </motion.button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Expanded view (shared-element morph) ── */}
      <AnimatePresence>
        {activeImg && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-12"
            style={{ background: "rgba(0,0,0,0.94)", backdropFilter: "blur(24px)" }}
            onClick={close}
          >
            {/* Counter */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.15 }}
              className="absolute top-5 left-1/2 -translate-x-1/2 text-amber-300/70 text-sm font-mono"
            >
              {String(active! + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </motion.div>

            {/* The morphing image */}
            <motion.img
              key={activeImg.src}
              layoutId={`gal-${activeImg.src}`}
              transition={morph}
              src={activeImg.src}
              alt={ALT}
              onClick={(e) => e.stopPropagation()}
              className="w-auto h-auto max-w-[94vw] max-h-[84vh] rounded-2xl block"
              style={{
                boxShadow:
                  "0 48px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(212,168,67,0.2)",
                cursor: "default",
              }}
            />

            {/* Prev */}
            {count > 1 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.15 }}
                onClick={(e) => { e.stopPropagation(); paginate(-1) }}
                aria-label="Previous image"
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", border: "1px solid rgba(212,168,67,0.25)" }}
              >
                <ChevronLeft size={20} className="text-amber-300" />
              </motion.button>
            )}
            {/* Next */}
            {count > 1 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.15 }}
                onClick={(e) => { e.stopPropagation(); paginate(1) }}
                aria-label="Next image"
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", border: "1px solid rgba(212,168,67,0.25)" }}
              >
                <ChevronRight size={20} className="text-amber-300" />
              </motion.button>
            )}

            {/* Close */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              aria-label="Close"
              className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-amber-400 transition-colors cursor-pointer"
              style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <X size={18} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
