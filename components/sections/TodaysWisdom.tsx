"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { RamBackground, Lotus } from "@/components/decor/SacredBackground"
import { useSite } from "@/components/providers/SiteProvider"
import { wisdomQuotes } from "@/data/wisdom-quotes"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }

function dayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0)
  return Math.floor((date.getTime() - start.getTime()) / 86400000)
}

export default function TodaysWisdom() {
  const { t, lang } = useSite()

  // Picked client-side only (day-of-year % list length) so a stale build
  // time or timezone difference between server and browser can't cause a
  // hydration mismatch — same pattern as Hero's particle positions.
  const [index, setIndex] = useState<number | null>(null)
  useEffect(() => {
    setIndex(dayOfYear(new Date()) % wisdomQuotes.length)
  }, [])

  const quote = index === null ? null : wisdomQuotes[index]

  return (
    <section id="wisdom" className="relative py-16 sm:py-20 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(212,168,67,0.08), transparent), radial-gradient(ellipse 55% 45% at 100% 100%, rgba(88,28,135,0.1), transparent)",
        }}
      />
      <RamBackground variant="tiled" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
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
            {t.wisdom.eyebrow}
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-3 font-serif text-3xl sm:text-5xl font-bold text-heading"
            lang={lang}
          >
            {t.wisdom.title}
          </motion.h2>
          <motion.div variants={fadeUp} className="flex justify-center mt-5">
            <Lotus className="w-24 h-14 opacity-50" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[2rem] p-8 sm:p-12 text-center glass"
          style={{ border: "1px solid var(--border-gold)", boxShadow: "var(--card-shadow)" }}
        >
          {quote ? (
            <motion.div
              key={quote.verse}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p
                className="font-hindi text-xl sm:text-2xl font-semibold gold-text leading-relaxed"
                lang="hi"
              >
                {quote.verse}
              </p>
              <p
                className="mt-6 text-[0.95rem] sm:text-base leading-8 text-muted-themed"
                lang={lang}
              >
                {quote.explanation[lang]}
              </p>
              <p className="mt-4 text-xs uppercase tracking-[0.2em]" style={{ color: "var(--gold)" }}>
                — {quote.source[lang]}
              </p>
            </motion.div>
          ) : (
            // Skeleton shown briefly before the client picks today's quote
            <div aria-hidden className="animate-pulse">
              <div className="h-7 w-3/4 mx-auto rounded" style={{ background: "var(--surface-2)" }} />
              <div className="h-4 w-full mt-6 rounded" style={{ background: "var(--surface-2)" }} />
              <div className="h-4 w-5/6 mx-auto mt-2 rounded" style={{ background: "var(--surface-2)" }} />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
