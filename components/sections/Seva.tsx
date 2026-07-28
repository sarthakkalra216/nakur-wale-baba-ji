"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Copy, Check } from "lucide-react"
import { RamBackground } from "@/components/decor/SacredBackground"
import { TiltCard } from "@/components/motion"
import { useSite } from "@/components/providers/SiteProvider"

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65 } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }

export default function Seva() {
  const { t, lang } = useSite()
  const sevas = t.seva.items
  const [copied, setCopied] = useState(false)

  const copyUpiId = async () => {
    try {
      await navigator.clipboard.writeText(t.seva.upiId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard permissions can be denied by the browser; fail silently
    }
  }
  return (
    <section id="seva" className="relative py-24 sm:py-32 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 100%, rgba(16,185,129,0.06), transparent), radial-gradient(ellipse 40% 35% at 100% 0%, rgba(88,28,135,0.1), transparent)",
        }}
      />
      {/* Sacred mandala + राम watermark */}
      <RamBackground variant="mandala" opacity={0.06} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
            {t.seva.eyebrow}
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-3 font-serif text-3xl sm:text-5xl font-bold text-heading"
            lang={lang}
          >
            {t.seva.titleLead} <span className="gold-text">{t.seva.titleEm}</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-2xl mx-auto text-sm leading-relaxed text-muted-themed"
            lang={lang}
          >
            {t.seva.intro}
          </motion.p>
          <motion.div variants={fadeUp} className="section-divider" />
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {sevas.map((seva, idx) => (
            <TiltCard
              key={idx}
              variants={fadeUp}
              maxTilt={5}
              lift={4}
              glare
              className="h-full rounded-xl px-6 py-4 flex items-center"
              style={{
                background: "var(--surface)",
                borderLeft: "3px solid var(--gold)",
                boxShadow: "var(--card-shadow)",
              }}
            >
              <h3 className="font-serif text-lg font-semibold text-heading" lang={lang}>
                {seva.title}
              </h3>
            </TiltCard>
          ))}
        </motion.div>

        {/* Donation */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center mt-16"
        >
          <motion.span
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.25em]"
            style={{ color: "var(--gold)" }}
            lang={lang}
          >
            {t.seva.donationTitle}
          </motion.span>
          <motion.h3
            variants={fadeUp}
            className="mt-3 font-serif text-2xl sm:text-3xl font-bold text-heading"
            lang={lang}
          >
            {t.seva.donationHeading}
          </motion.h3>

          <motion.div
            variants={fadeUp}
            className="mt-8 mx-auto max-w-sm rounded-2xl p-6 flex flex-col items-center gap-5"
            style={{ background: "#5a1a1a" }}
          >
            <button
              type="button"
              onClick={copyUpiId}
              className="w-full flex items-center justify-center gap-2 text-xs sm:text-sm font-mono font-semibold px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
              style={{
                background: copied ? "rgba(16,185,129,0.25)" : "rgba(255,255,255,0.12)",
                color: "#fdf6e9",
              }}
              lang={lang}
            >
              {t.seva.upiLabel}: {t.seva.upiId}
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>

            <div className="w-56 rounded-lg overflow-hidden bg-white p-3">
              <div className="relative w-full aspect-square">
                <Image
                  src="/images/donation-qr.jpg"
                  alt={`${t.seva.upiLabel}: ${t.seva.upiId}`}
                  fill
                  className="object-contain"
                  sizes="224px"
                />
              </div>
              <div className="mt-2 text-center text-[11px] font-serif font-semibold text-black">
                {t.seva.upiLabel}: {t.seva.upiId}
              </div>
            </div>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-4 text-sm text-muted-themed"
            lang={lang}
          >
            {t.seva.donationNote}
          </motion.p>
        </motion.div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <blockquote
            className="font-serif text-xl sm:text-2xl italic max-w-2xl mx-auto"
            style={{ color: "var(--gold)" }}
            lang={lang}
          >
            &ldquo;{t.seva.bottomQuote}&rdquo;
          </blockquote>
          <p className="mt-3 text-sm text-muted-themed" lang={lang}>{t.seva.bottomAttrib}</p>
        </motion.div>
      </div>
    </section>
  )
}
