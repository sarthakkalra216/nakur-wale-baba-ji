"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { RamBackground } from "@/components/decor/SacredBackground"
import { ImageReveal, TiltCard } from "@/components/motion"
import { useSite } from "@/components/providers/SiteProvider"
import { ashrams } from "@/data/ashrams"

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function Ashrams() {
  const { t, lang } = useSite()
  const homepageAshrams = ashrams.filter((a) => a.showOnHomepage)

  return (
    <section id="ashrams" className="relative py-16 sm:py-20 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(16,185,129,0.05), transparent), radial-gradient(ellipse 45% 40% at 100% 0%, rgba(88,28,135,0.09), transparent)",
        }}
      />
      <RamBackground variant="mandala" opacity={0.06} />

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
          <motion.div variants={fadeUp} className="section-divider" />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {homepageAshrams.map((ashram) => (
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

        <div className="mt-12 text-center">
          <Link
            href="/ashrams"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer"
            style={{ border: "1px solid var(--border-gold)", color: "var(--gold)" }}
            lang={lang}
          >
            {t.ashrams.viewAll}
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}
