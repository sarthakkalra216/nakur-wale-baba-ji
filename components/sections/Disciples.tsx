"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { RamBackground, Lotus } from "@/components/decor/SacredBackground"
import { ImageReveal, Parallax, TiltCard } from "@/components/motion"
import { useSite } from "@/components/providers/SiteProvider"

// Portraits + names are always shown in Hindi, independent of the site's
// language toggle — these are names, not translatable copy.
const PORTRAITS = [
  { src: "/images/Devi%20ji/photo29.jpg.jpeg", name: "सुश्री सौम्या सरस्वती जी" },
  { src: "/images/Devi%20ji/photo30.jpg.jpeg", name: "सुश्री समीक्षा सरस्वती जी" },
]

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }

export default function Disciples() {
  const { t, lang } = useSite()
  return (
    <section id="disciples" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Section glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 0% 50%, rgba(212,168,67,0.07), transparent), radial-gradient(ellipse 55% 45% at 100% 50%, rgba(88,28,135,0.12), transparent)",
        }}
      />
      <RamBackground variant="vertical" opacity={0.3} className="hidden md:block" />
      <RamBackground variant="marquee" opacity={0.08} className="md:hidden" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
            {t.disciples.eyebrow}
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-3 font-serif text-3xl sm:text-5xl font-bold text-heading"
            lang={lang}
          >
            {t.disciples.titleLead} <span className="gold-text">{t.disciples.titleEm}</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="flex justify-center mt-5">
            <Lotus className="w-24 h-14 opacity-50" />
          </motion.div>
        </motion.div>

        {/* Portraits */}
        <div className="grid sm:grid-cols-2 gap-8 sm:gap-10 max-w-2xl mx-auto">
          {PORTRAITS.map((p, i) => (
            <Parallax key={p.src} offset={22}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                className="relative"
              >
                {/* Soft golden halo — sits outside the card's overflow-hidden edge */}
                <div
                  className="absolute -inset-4 rounded-[2rem] pointer-events-none ram-breathe"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 30%, rgba(245,185,66,0.16), transparent 70%)",
                    filter: "blur(20px)",
                  }}
                />
                <TiltCard
                  maxTilt={6}
                  lift={5}
                  glare
                  className="relative rounded-3xl overflow-hidden aspect-[4/5]"
                  style={{ border: "1px solid var(--border-gold)" }}
                >
                  <ImageReveal fill delay={i * 0.1}>
                    <Image
                      src={p.src}
                      alt={p.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 340px"
                    />
                  </ImageReveal>
                  {/* Name — always Hindi */}
                  <div
                    className="absolute inset-x-0 bottom-0 px-4 py-4 pointer-events-none"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.78), transparent)" }}
                  >
                    <span
                      className="font-serif text-sm sm:text-base font-semibold text-amber-50"
                      lang="hi"
                    >
                      {p.name}
                    </span>
                  </div>
                </TiltCard>
              </motion.div>
            </Parallax>
          ))}
        </div>
      </div>
    </section>
  )
}
