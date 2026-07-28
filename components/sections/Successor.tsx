"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { Award, ChevronDown } from "lucide-react"
import { RamBackground, Lotus, Mandala } from "@/components/decor/SacredBackground"
import { ImageReveal, Parallax } from "@/components/motion"
import { useSite } from "@/components/providers/SiteProvider"

// सद्गुरुदेव की उत्तराधिकारिणी — सुश्री देवी सुदीक्षा सरस्वती जी (राष्ट्रपति पदक से सम्मानित)
// स्रोत: public/about me/about me_extracted_text.txt (अंतिम अनुच्छेद)

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }

export default function Successor() {
  const { t, lang } = useSite()
  const [expanded, setExpanded] = useState(false)
  return (
    <section id="successor" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Section glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 100% 50%, rgba(88,28,135,0.14), transparent), radial-gradient(ellipse 45% 45% at 0% 50%, rgba(212,168,67,0.06), transparent)",
        }}
      />
      {/* Sacred राम watermark — vertical columns on desktop, horizontal
          marquee rows on mobile (columns crowd the narrow phone width). */}
      <RamBackground variant="vertical" opacity={0.3} className="hidden md:block" />
      <RamBackground variant="marquee" opacity={0.08} className="md:hidden" />

      {/* Faint mandalas filling the flat corners */}
      <div aria-hidden className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute -left-28 top-10 w-80 h-80 spin-slow-rev" style={{ opacity: 0.05 }}>
          <Mandala className="w-full h-full" />
        </div>
        <div className="absolute -right-32 bottom-4 w-[26rem] h-[26rem] spin-slow" style={{ opacity: 0.05 }}>
          <Mandala className="w-full h-full" />
        </div>
      </div>

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
            className="text-xs font-semibold uppercase tracking-[0.25em] font-hindi"
            style={{ color: "var(--gold)" }}
            lang={lang}
          >
            {t.successor.eyebrow}
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-3 font-hindi font-bold text-3xl sm:text-5xl text-heading"
            lang={lang}
            style={{ lineHeight: 1.4, paddingBlock: "0.08em" }}
          >
            {t.successor.titleLead} <span className="gold-text">{t.successor.titleEm}</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="flex justify-center mt-5">
            <Lotus className="w-24 h-14 opacity-50" />
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Content — LEFT (on desktop) — short bio card */}
          <div
            className="order-2 lg:order-1 relative glass rounded-[2rem] p-6 sm:p-9 lg:p-10 overflow-hidden"
            style={{ border: "1px solid var(--border-gold)", boxShadow: "var(--card-shadow)" }}
          >
            {/* Decorative back layer — faint राम watermark filling the panel corner */}
            <div aria-hidden className="absolute inset-0 z-0 pointer-events-none select-none">
              <span
                className="ram-glyph absolute -top-8 -right-3"
                style={{ fontSize: "8rem", lineHeight: 1, opacity: 0.06 }}
              >
                राम
              </span>
            </div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={stagger}
              className="relative z-10"
            >
              <motion.h3
                variants={fadeUp}
                className="font-hindi gold-text font-bold text-3xl sm:text-4xl mb-5"
                lang={lang}
                style={{ lineHeight: 1.4, paddingBottom: "0.06em" }}
              >
                {t.successor.bioTitle}
              </motion.h3>
              <motion.p
                variants={fadeUp}
                lang={lang}
                className="font-hindi leading-8 text-[0.97rem] text-muted-themed"
              >
                {t.successor.bioText}
              </motion.p>
            </motion.div>
          </div>

          {/* Image — RIGHT (on desktop), shown first on mobile — Devi Ji's
              photo. devi-ji-portrait.jpg is a pre-cropped close-up (source:
              Devi ji/devi-ji.png, a wide side-by-side collage that doesn't
              crop well at arbitrary widths).
              Disciple photos (सौम्या, समीक्षा) removed here for now. */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 relative max-w-xl mx-auto lg:mx-0 w-full"
          >
            <div
              className="absolute -inset-4 rounded-[2rem] pointer-events-none ram-breathe"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 35%, rgba(245,185,66,0.18), transparent 70%)",
                filter: "blur(22px)",
              }}
            />
            <Parallax offset={30}>
              <div
                className="relative rounded-2xl overflow-hidden aspect-[4/3]"
                style={{ border: "1px solid var(--border-gold)" }}
              >
                <ImageReveal fill>
                  <Image
                    src="/images/devi-ji-portrait.jpg"
                    alt={t.successor.imgAlt1}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 520px"
                  />
                </ImageReveal>
              </div>
              {/* Name — always Hindi, independent of the site's language toggle */}
              <p
                className="mt-2.5 text-center font-serif text-xs sm:text-sm font-semibold text-heading"
                lang="hi"
              >
                सुश्री देवी सुदीक्षा सरस्वती जी
              </p>
            </Parallax>
          </motion.div>
        </div>

        {/* समर्पण — the full dedication text, collapsed behind an expand
            button so the tab opens on the short bio + image, not a wall of
            text. */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative glass rounded-[2rem] mt-10 lg:mt-14 p-6 sm:p-9 lg:p-10 overflow-hidden"
          style={{ border: "1px solid var(--border-gold)", boxShadow: "var(--card-shadow)" }}
        >
          <div aria-hidden className="absolute inset-0 z-0 pointer-events-none select-none">
            <Lotus className="absolute -bottom-5 -left-4 w-36 h-20 opacity-10" />
          </div>

          <div className="relative z-10">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="w-full flex items-center justify-between gap-4 cursor-pointer"
            >
              <span
                className="font-hindi gold-text font-bold text-4xl sm:text-5xl lg:text-6xl inline-block"
                lang={lang}
                style={{ lineHeight: 1.6, paddingTop: "0.18em", paddingBottom: "0.14em" }}
              >
                {t.successor.samarpan}
              </span>
              <span
                className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-full transition-colors"
                style={{
                  background: "var(--surface-2)",
                  border: "1px solid var(--border-gold)",
                  color: "var(--gold)",
                }}
                lang={lang}
              >
                {expanded ? t.successor.collapse : t.successor.expand}
                <ChevronDown
                  size={16}
                  className="transition-transform duration-300"
                  style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  key="samarpan-body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pt-8">
                    {t.successor.paras.map((para, i) => (
                      <p
                        key={i}
                        lang={lang}
                        className="font-hindi leading-8 mb-4 text-[0.97rem] text-muted-themed"
                      >
                        {para}
                      </p>
                    ))}

                    {/* Sacred couplets — glass strip over a slow mandala */}
                    <div
                      className="relative my-7 py-5 px-5 rounded-2xl text-center overflow-hidden glass"
                      style={{ border: "1px solid var(--border-gold)" }}
                    >
                      <div
                        aria-hidden
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 spin-slow pointer-events-none"
                        style={{ opacity: 0.1 }}
                      >
                        <Mandala className="w-full h-full" />
                      </div>
                      <div className="relative z-10">
                        {t.successor.couplets.map((c) => (
                          <p
                            key={c}
                            lang={lang}
                            className="font-hindi italic text-base sm:text-lg leading-relaxed"
                            style={{ color: "var(--gold)" }}
                          >
                            {c}
                          </p>
                        ))}
                      </div>
                    </div>

                    <p
                      lang={lang}
                      className="font-hindi leading-8 mb-4 text-[0.97rem] text-muted-themed"
                    >
                      {t.successor.closing}
                    </p>

                    {/* Designation / signature */}
                    <div
                      className="mt-8 pt-6"
                      style={{ borderTop: "1px solid var(--border-gold)" }}
                    >
                      <div
                        className="font-hindi font-bold text-xl sm:text-2xl gold-text"
                        lang={lang}
                        style={{ lineHeight: 1.4, paddingBottom: "0.06em" }}
                      >
                        {t.successor.name}
                      </div>
                      <div
                        className="inline-flex items-center gap-2.5 mt-3 px-4 py-2 rounded-full"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(245,158,11,0.15), rgba(212,168,67,0.08))",
                          border: "1px solid var(--border-gold)",
                        }}
                      >
                        <Award size={18} className="shrink-0" style={{ color: "var(--gold)" }} />
                        <span
                          className="font-hindi text-sm font-semibold"
                          style={{ color: "var(--heading)" }}
                          lang={lang}
                        >
                          {t.successor.award}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
