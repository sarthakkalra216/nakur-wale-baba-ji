"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { RamBackground } from "@/components/decor/SacredBackground"
import { useSite } from "@/components/providers/SiteProvider"
import type { MediaFile } from "@/lib/media"

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const ALT = "Nakur Wale Baba Ji — sacred moment at the Nakur ashram"

export default function GalleryPreview({ images }: { images: MediaFile[] }) {
  const { t, lang } = useSite()

  return (
    <section id="gallery-preview" className="relative py-24 sm:py-32 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 10%, rgba(88,28,135,0.14), transparent)",
        }}
      />
      <RamBackground variant="floating" opacity={0.06} />

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
            {t.gallery.eyebrow}
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-3 font-serif text-3xl sm:text-5xl font-bold text-heading"
            lang={lang}
          >
            {t.gallery.titleLead} <span className="gold-text">{t.gallery.titleEm}</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="section-divider" />
        </motion.div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 sm:gap-5">
          {images.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.4) }}
              className="relative mb-4 sm:mb-5 block w-full break-inside-avoid overflow-hidden rounded-2xl"
              style={{ border: "1px solid var(--border-gold)" }}
            >
              <img
                src={img.src}
                alt={ALT}
                loading="lazy"
                decoding="async"
                className="w-full h-auto block"
              />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer"
            style={{ border: "1px solid var(--border-gold)", color: "var(--gold)" }}
            lang={lang}
          >
            {t.gallery.viewFull}
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}
