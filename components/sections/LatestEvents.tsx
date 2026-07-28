"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { RamBackground } from "@/components/decor/SacredBackground"
import { ImageReveal, TiltCard } from "@/components/motion"
import { useSite } from "@/components/providers/SiteProvider"
import { events } from "@/data/events"

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function LatestEvents() {
  const { t, lang } = useSite()
  const latest = events[0]
  if (!latest) return null

  return (
    <section id="latest-events" className="relative py-24 sm:py-32 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 100% 0%, rgba(212,168,67,0.07), transparent), radial-gradient(ellipse 50% 45% at 0% 100%, rgba(88,28,135,0.1), transparent)",
        }}
      />
      <RamBackground variant="floating" opacity={0.06} />

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
            {t.events.eyebrow}
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-3 font-serif text-3xl sm:text-5xl font-bold text-heading"
            lang={lang}
          >
            {t.events.title}
          </motion.h2>
          <motion.div variants={fadeUp} className="section-divider" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <TiltCard
            maxTilt={4}
            lift={4}
            className="rounded-2xl overflow-hidden sm:flex"
            style={{ background: "var(--surface)", border: "1px solid var(--border-gold)" }}
          >
            <div className="relative w-full sm:w-64 aspect-[4/3] sm:aspect-auto shrink-0">
              <ImageReveal fill>
                <Image
                  src={latest.image}
                  alt={latest.title[lang]}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 256px"
                />
              </ImageReveal>
            </div>
            <div className="p-6 sm:p-7 flex flex-col gap-2">
              <span
                className="inline-block w-fit text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
                style={{ background: "var(--surface-2)", border: "1px solid var(--border-gold)", color: "var(--gold)" }}
                lang={lang}
              >
                {latest.date[lang]}
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-semibold text-heading" lang={lang}>
                {latest.title[lang]}
              </h3>
              <p className="text-sm leading-relaxed text-muted-themed" lang={lang}>
                {latest.description[lang]}
              </p>
              <a
                href={latest.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold transition-colors group/link cursor-pointer"
                style={{ color: "var(--gold)" }}
                lang={lang}
              >
                {t.events.watchVideo}
              </a>
            </div>
          </TiltCard>
        </motion.div>

        <div className="mt-9 text-center">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer"
            style={{ border: "1px solid var(--border-gold)", color: "var(--gold)" }}
            lang={lang}
          >
            {t.events.viewAll}
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}
