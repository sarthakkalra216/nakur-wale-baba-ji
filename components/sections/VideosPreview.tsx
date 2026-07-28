"use client"

import { motion } from "framer-motion"
import { RamBackground } from "@/components/decor/SacredBackground"
import { useSite } from "@/components/providers/SiteProvider"

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

// Same three videos featured on the reference site's homepage preview.
const FEATURED = [
  { id: "sif52bqb5RY", title: "Guru Purnima Ram Katha Day 5" },
  { id: "N9a1d86DzR4", title: "Guru Darshan — Justice Rajiv Bharti Ji" },
  { id: "VY44KoU8FEs", title: "Guru Purnima Mahotsav performance" },
]

export default function VideosPreview() {
  const { t, lang } = useSite()

  return (
    <section id="videos-preview" className="relative py-16 sm:py-20 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 50% at 50% 50%, rgba(88,28,135,0.1), transparent)",
        }}
      />
      <RamBackground variant="tiled" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <motion.div variants={fadeUp} className="section-divider" />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto"
        >
          {FEATURED.map((v) => (
            <motion.div
              key={v.id}
              variants={fadeUp}
              className="relative rounded-2xl overflow-hidden aspect-video"
              style={{ border: "1px solid var(--border-gold)", boxShadow: "0 16px 40px rgba(0,0,0,0.25)" }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${v.id}`}
                title={v.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <a
            href="https://www.youtube.com/@bawavideo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer"
            style={{ border: "1px solid var(--border-gold)", color: "var(--gold)" }}
            lang={lang}
          >
            {t.videos.watchMore}
          </a>
        </div>
      </div>
    </section>
  )
}
