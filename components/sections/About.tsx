"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { RamBackground, Lotus } from "@/components/decor/SacredBackground"
import { useSite } from "@/components/providers/SiteProvider"

// ── परिचय (about me) — स्रोत: public/about me/about me_extracted_text.txt ─────

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.11 } } }

export default function About() {
  const { t, lang } = useSite()
  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Section glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 100% 50%, rgba(88,28,135,0.13), transparent), radial-gradient(ellipse 40% 40% at 0% 50%, rgba(212,168,67,0.05), transparent)",
        }}
      />
      {/* Sacred राम watermark — vertical columns on desktop, horizontal
          marquee rows on mobile (columns crowd the narrow phone width). */}
      <RamBackground variant="vertical" opacity={0.3} className="hidden md:block" />
      <RamBackground variant="marquee" opacity={0.08} className="md:hidden" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.25em]"
            style={{ color: "var(--gold)" }}
            lang={lang}
          >
            {t.about.eyebrow}
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-3 font-serif text-3xl sm:text-5xl font-bold text-heading"
            lang={lang}
          >
            {t.about.titleLead} <span className="gold-text">{t.about.titleEm}</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="flex justify-center mt-5">
            <Lotus className="w-24 h-14 opacity-50" />
          </motion.div>
        </motion.div>

        {/* Bio grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left – image + values */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-md mx-auto lg:mx-0">
              {/* Soft golden halo */}
              <div
                className="absolute -inset-4 rounded-[2rem] pointer-events-none ram-breathe"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 30%, rgba(245,185,66,0.18), transparent 70%)",
                  filter: "blur(20px)",
                }}
              />
              <Image
                src="/images/photo2.jpg"
                alt={t.about.imgAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 448px"
              />
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{ border: "1px solid var(--border-gold)" }}
              />
            </div>
          </motion.div>

          {/* Right – bio text */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.blockquote
              variants={fadeUp}
              lang={lang}
              className="font-serif text-lg sm:text-xl font-medium italic leading-relaxed mb-8 border-l-2 pl-5"
              style={{ color: "var(--gold)", borderColor: "var(--border-gold)" }}
            >
              &ldquo;{t.about.shortBio}&rdquo;
            </motion.blockquote>

            {t.about.paras.map((para, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                lang={lang}
                className="leading-8 mb-4 text-[0.95rem] text-muted-themed"
              >
                {para}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
