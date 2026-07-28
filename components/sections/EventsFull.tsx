"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { RamBackground, Lotus } from "@/components/decor/SacredBackground"
import { ImageReveal, TiltCard } from "@/components/motion"
import { useSite } from "@/components/providers/SiteProvider"
import { events } from "@/data/events"

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function EventsFull() {
  const { t, lang } = useSite()

  return (
    <section className="relative py-16 sm:py-20 overflow-hidden">
      <RamBackground variant="tiled" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-xl mx-auto text-sm leading-relaxed text-muted-themed"
            lang={lang}
          >
            {t.events.subtitle}
          </motion.p>
          <motion.div variants={fadeUp} className="flex justify-center mt-5">
            <Lotus className="w-24 h-14 opacity-50" />
          </motion.div>
        </motion.div>

        {/* Regular schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl p-6 sm:p-7 mb-12 flex flex-wrap gap-x-8 gap-y-3 items-center"
          style={{ background: "var(--surface)", border: "1px solid var(--border-gold)" }}
        >
          <div>
            <div
              className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full inline-block mb-2"
              style={{ background: "var(--surface-2)", border: "1px solid var(--border-gold)", color: "var(--gold)" }}
              lang={lang}
            >
              {t.events.scheduleTag}
            </div>
            <div className="font-serif font-semibold text-heading" lang={lang}>
              {t.events.scheduleTime}
            </div>
          </div>
          <p className="flex-1 min-w-[220px] text-sm leading-relaxed text-muted-themed" lang={lang}>
            {t.events.scheduleDesc}
          </p>
        </motion.div>

        {/* Event list */}
        <div className="max-w-2xl mx-auto space-y-6">
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <TiltCard
                maxTilt={4}
                lift={4}
                className="rounded-2xl overflow-hidden sm:flex"
                style={{ background: "var(--surface)", border: "1px solid var(--border-gold)" }}
              >
                <div className="relative w-full sm:w-64 aspect-[4/3] sm:aspect-auto shrink-0">
                  <ImageReveal fill delay={i * 0.1}>
                    <Image
                      src={event.image}
                      alt={event.title[lang]}
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
                    {event.date[lang]}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-semibold text-heading" lang={lang}>
                    {event.title[lang]}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-themed" lang={lang}>
                    {event.description[lang]}
                  </p>
                  <a
                    href={event.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold transition-colors cursor-pointer"
                    style={{ color: "var(--gold)" }}
                    lang={lang}
                  >
                    {t.events.watchVideo}
                  </a>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
