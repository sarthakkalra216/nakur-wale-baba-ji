"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { RamBackground, Lotus } from "@/components/decor/SacredBackground"
import { useSite } from "@/components/providers/SiteProvider"
import type { Lang } from "@/lib/i18n"

// ─────────────────────────────────────────────────────────────────────────────
// संक्षिप्त जीवन परिचय — श्री श्री 108 स्वामी रामानन्द सरस्वती जी महाराज
// (नकुड़ वाले बाबा जी). Chapter prose lives in lib/i18n.ts (journey.chapters);
// the language-neutral year + image for each chapter stay here, zipped by index.
// ─────────────────────────────────────────────────────────────────────────────

interface ChapterMeta {
  year?: string
  image: string
}

const META: ChapterMeta[] = [
  { image: "/hero%20page/hero1.jpg" },
  { year: "1912", image: "/hero%20page/hero2.jpg" },
  { image: "/hero%20page/hero%203.jpg" },
  { year: "1934", image: "/hero%20page/hero%204.jpg" },
  { year: "1936", image: "/hero%20page/hero%205.jpg" },
  { year: "1949–50", image: "/hero%20page/hero%206.jpg" },
  { year: "1953–54", image: "/hero%20page/hero%207.jpg" },
  { year: "1960", image: "/hero%20page/hero%208.jpg" },
  { year: "1981", image: "/hero%20page/hero%209.jpg" },
  { year: "2003", image: "/hero%20page/hero%2010.jpg" },
  { image: "/hero%20page/hero%2011.jpg" },
  { image: "/hero%20page/hero%2012.jpg" },
]

interface Chapter extends ChapterMeta {
  era: string
  title: string
  text: string
}

// Alternating scroll-driven timeline row — image on one side of the central
// rail, text on the other, flipping sides every chapter. On mobile it collapses
// to a single stacked column (image above text) against a left rail.
function JourneyRow({ ch, i, lang }: { ch: Chapter; i: number; lang: Lang }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -40])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0.2, 1, 1, 0.35])

  // Even rows: image left / text right. Odd rows: text left / image right.
  const imageLeft = i % 2 === 0

  const imageBlock = (
    <div
      className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl"
      style={{ background: "var(--surface-2)" }}
    >
      <Image
        src={ch.image}
        alt={ch.title}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 100vw, 420px"
      />
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          border: "1px solid var(--border-gold)",
          boxShadow: "inset 0 0 40px rgba(0,0,0,0.12)",
        }}
      />
    </div>
  )

  const textBlock = (
    <div
      className="rounded-2xl p-5 sm:p-6"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border-gold)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="flex items-center gap-3 mb-2 flex-wrap">
        <span
          className="text-[10px] font-semibold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full"
          style={{
            background: "var(--surface-2)",
            border: "1px solid var(--border-gold)",
            color: "var(--gold)",
          }}
          lang={lang}
        >
          {ch.era}
        </span>
        {ch.year && (
          <span className="font-serif text-xl font-bold gold-text">{ch.year}</span>
        )}
      </div>
      <h3 className="font-serif text-lg sm:text-xl font-semibold text-heading mb-2" lang={lang}>
        {ch.title}
      </h3>
      <p className="text-[0.95rem] sm:text-base leading-8 text-muted-themed" lang={lang}>
        {ch.text}
      </p>
    </div>
  )

  return (
    <div ref={ref} className="relative">
      {/* Mobile: horizontal divider with a centred node, sitting in the gap
          between chapters (no divider above the first row). */}
      {i > 0 && (
        <div className="md:hidden flex items-center gap-3 mb-10" aria-hidden>
          <span
            className="h-px flex-1"
            style={{ background: "linear-gradient(to right, transparent, var(--gold))" }}
          />
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{
              background: "var(--bg)",
              border: "2px solid var(--gold)",
              boxShadow: "0 0 12px rgba(212,168,67,0.55)",
            }}
          />
          <span
            className="h-px flex-1"
            style={{ background: "linear-gradient(to left, transparent, var(--gold))" }}
          />
        </div>
      )}

      {/* Node on the central rail — desktop only */}
      <div
        className="hidden md:block absolute top-3 md:left-1/2 md:-translate-x-1/2 w-3.5 h-3.5 rounded-full z-10"
        style={{
          background: "var(--bg)",
          border: "2px solid var(--gold)",
          boxShadow: "0 0 12px rgba(212,168,67,0.55)",
        }}
      />

      <motion.div
        style={{ y, opacity }}
        className="grid gap-5 md:grid-cols-2 md:gap-12 items-center will-change-transform"
      >
        <div className={imageLeft ? "md:order-1" : "md:order-2"}>{imageBlock}</div>
        <div className={imageLeft ? "md:order-2" : "md:order-1"}>{textBlock}</div>
      </motion.div>
    </div>
  )
}

export default function LifeJourney() {
  const { t, lang } = useSite()
  const chapters: Chapter[] = t.journey.chapters.map((c, i) => ({ ...c, ...META[i] }))

  return (
    <section id="life-journey" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Section glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(88,28,135,0.16), transparent), radial-gradient(ellipse 50% 45% at 50% 100%, rgba(212,168,67,0.05), transparent)",
        }}
      />
      {/* Sacred राम watermark — vertical columns on desktop; on mobile they
          crowd the narrow column, so use horizontal राम marquee rows instead. */}
      <RamBackground variant="vertical" opacity={0.3} className="hidden md:block" />
      <RamBackground variant="marquee" opacity={0.08} className="md:hidden" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-4"
        >
          <span
            className="text-xs font-semibold uppercase tracking-[0.25em]"
            style={{ color: "var(--gold)" }}
            lang={lang}
          >
            {t.journey.eyebrow}
          </span>
          <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-bold text-heading" lang={lang}>
            <span className="gold-text">{t.journey.titleLead}</span> {t.journey.titleEm}
          </h2>
          <p className="mt-4 ram-glyph text-base sm:text-lg" style={{ opacity: 0.85 }} lang={lang}>
            {t.journey.subtitle}
          </p>
          <div className="flex justify-center mt-5">
            <Lotus className="w-24 h-14 opacity-50" />
          </div>
        </motion.div>

        {/* Guiding principle */}
        <motion.blockquote
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto mb-16 max-w-2xl rounded-2xl px-6 py-7 text-center"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border-gold)",
            backdropFilter: "blur(14px)",
          }}
        >
          <p
            className="font-serif text-lg sm:text-2xl italic leading-relaxed"
            style={{ color: "var(--gold)" }}
            lang={lang}
          >
            {t.journey.quoteLine1}
            <br className="hidden sm:block" /> {t.journey.quoteLine2}
          </p>
        </motion.blockquote>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical rail — desktop only (centred). On mobile the timeline
              uses horizontal dividers between chapters instead. */}
          <div
            className="hidden md:block absolute md:left-1/2 md:-translate-x-1/2 top-2 bottom-2 w-px"
            style={{
              background:
                "linear-gradient(to bottom, transparent, var(--gold), var(--gold), transparent)",
              opacity: 0.55,
            }}
          />

          <div className="space-y-12 md:space-y-16">
            {chapters.map((ch, i) => (
              <JourneyRow key={i} ch={ch} i={i} lang={lang} />
            ))}
          </div>
        </div>

        {/* Closing seal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 text-center"
        >
          <p className="ram-glyph text-2xl sm:text-3xl mb-3" style={{ opacity: 0.9 }} lang={lang}>
            {t.journey.closingGlyph}
          </p>
          <p className="text-sm text-muted-themed" lang={lang}>
            {t.journey.closingSub}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
