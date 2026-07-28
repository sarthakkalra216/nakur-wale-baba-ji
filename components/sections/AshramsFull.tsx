"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { RamBackground, Lotus } from "@/components/decor/SacredBackground"
import { ImageReveal, Parallax, TiltCard } from "@/components/motion"
import { useSite } from "@/components/providers/SiteProvider"
import { ashrams } from "@/data/ashrams"

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function AshramsFull() {
  const { t, lang } = useSite()
  const primary = ashrams.find((a) => a.primary)
  const others = ashrams.filter((a) => !a.primary)

  return (
    <section className="relative py-16 sm:py-20 overflow-hidden">
      <RamBackground variant="vertical" opacity={0.3} className="hidden md:block" />
      <RamBackground variant="marquee" opacity={0.08} className="md:hidden" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            {t.ashrams.eyebrow}
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-3 font-serif text-3xl sm:text-5xl font-bold text-heading"
            lang={lang}
          >
            {t.ashrams.title}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-xl mx-auto text-sm leading-relaxed text-muted-themed"
            lang={lang}
          >
            {t.ashrams.subtitle}
          </motion.p>
          <motion.div variants={fadeUp} className="flex justify-center mt-5">
            <Lotus className="w-24 h-14 opacity-50" />
          </motion.div>
        </motion.div>

        {/* Primary ashram — fuller feature */}
        {primary && (
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Parallax offset={26}>
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3] max-w-lg mx-auto lg:mx-0">
                  <ImageReveal fill>
                    <Image
                      src={primary.image}
                      alt={primary.name[lang]}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 520px"
                    />
                  </ImageReveal>
                  <div
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                    style={{ border: "1px solid var(--border-gold)" }}
                  />
                </div>
              </Parallax>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.span
                variants={fadeUp}
                className="text-xs font-semibold uppercase tracking-[0.25em]"
                style={{ color: "var(--gold)" }}
                lang={lang}
              >
                {primary.tag[lang]}
              </motion.span>
              <motion.h3
                variants={fadeUp}
                className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-heading"
                lang={lang}
              >
                {primary.name[lang]}
              </motion.h3>
              <motion.p
                variants={fadeUp}
                className="mt-4 leading-8 text-[0.95rem] text-muted-themed"
                lang={lang}
              >
                {primary.description[lang]}
              </motion.p>
              <motion.p variants={fadeUp} className="mt-4 text-sm" lang={lang}>
                <strong className="text-heading">{t.ashrams.dailyAartiLabel}</strong>{" "}
                <span className="text-muted-themed">{t.ashrams.dailyAartiTime}</span>
              </motion.p>
              {primary.directionsUrl && (
                <motion.a
                  variants={fadeUp}
                  href={primary.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 transition-all duration-300 shadow-lg shadow-amber-500/20 hover:scale-105 cursor-pointer"
                  style={{ color: "var(--on-accent)" }}
                  lang={lang}
                >
                  {t.ashrams.getDirections}
                  <ArrowRight size={16} />
                </motion.a>
              )}
            </motion.div>
          </div>
        )}

        {/* Other centres */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="text-center mb-10"
        >
          <motion.span
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.25em]"
            style={{ color: "var(--gold)" }}
            lang={lang}
          >
            {t.ashrams.moreCentres}
          </motion.span>
          <motion.h3 variants={fadeUp} className="mt-2 font-serif text-xl sm:text-2xl font-bold text-heading" lang={lang}>
            {t.ashrams.otherAshrams}
          </motion.h3>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {others.map((ashram) => (
            <motion.div key={ashram.slug} variants={fadeUp}>
              <TiltCard
                maxTilt={5}
                lift={5}
                glare
                className="rounded-2xl overflow-hidden h-full flex flex-col"
                style={{ background: "var(--surface)", border: "1px solid var(--border-gold)" }}
              >
                <div className="relative aspect-[4/3]">
                  <ImageReveal fill>
                    <Image
                      src={ashram.image}
                      alt={ashram.name[lang]}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw, 33vw"
                    />
                  </ImageReveal>
                </div>
                <div className="p-6 flex flex-col gap-2 flex-1">
                  <span
                    className="inline-block w-fit text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{ background: "var(--surface-2)", border: "1px solid var(--border-gold)", color: "var(--gold)" }}
                    lang={lang}
                  >
                    {ashram.tag[lang]}
                  </span>
                  <h3 className="font-serif text-lg font-semibold text-heading" lang={lang}>
                    {ashram.name[lang]}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-themed" lang={lang}>
                    {ashram.description[lang]}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
