"use client"

import { motion } from "framer-motion"
import { RamBackground } from "@/components/decor/SacredBackground"
import { useSite } from "@/components/providers/SiteProvider"
import { teachings, type Teaching } from "@/data/teachings"

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

function TeachingCard({ item, lang }: { item: Teaching; lang: "hi" | "en" }) {
  return (
    <div
      className="shrink-0 w-72 sm:w-80 rounded-2xl p-6 flex flex-col gap-3 mx-3"
      style={{ background: "var(--surface)", border: "1px solid var(--border-gold)", backdropFilter: "blur(16px)" }}
    >
      <h3 className="font-serif text-base sm:text-lg font-semibold text-heading" lang={lang}>
        {item.title[lang]}
      </h3>
      <p className="text-sm leading-relaxed italic text-muted-themed" lang={lang}>
        &ldquo;{item.quote[lang]}&rdquo;
      </p>
    </div>
  )
}

export default function Teachings() {
  const { t, lang } = useSite()
  // Duplicated once so the CSS marquee (translateX(-50%) over 2 identical
  // halves) loops seamlessly — same technique as Testimonials.
  const row = [...teachings, ...teachings]

  return (
    <section id="teachings" className="relative py-24 sm:py-32 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 0% 50%, rgba(212,168,67,0.06), transparent), radial-gradient(ellipse 55% 45% at 100% 50%, rgba(88,28,135,0.1), transparent)",
        }}
      />
      <RamBackground variant="tiled" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center mb-14"
        >
          <motion.span
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.25em]"
            style={{ color: "var(--gold)" }}
            lang={lang}
          >
            {t.teachings.eyebrow}
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-3 font-serif text-3xl sm:text-5xl font-bold text-heading"
            lang={lang}
          >
            {t.teachings.title}
          </motion.h2>
          <motion.div variants={fadeUp} className="section-divider" />
        </motion.div>
      </div>

      <div className="overflow-hidden">
        <div className="marquee-left flex w-max">
          {row.map((item, i) => (
            <TeachingCard key={i} item={item} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  )
}
