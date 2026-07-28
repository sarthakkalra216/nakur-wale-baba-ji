"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Utensils, BookOpen, HeartPulse, Home, Leaf, IndianRupee, ArrowRight, Copy, Check } from "lucide-react"
import { RamBackground } from "@/components/decor/SacredBackground"
import { TiltCard } from "@/components/motion"
import { useSite } from "@/components/providers/SiteProvider"

// Language-neutral visuals for each seva card; title/description/impact come
// from the i18n dictionary (seva.items) in matching order.
const SEVA_META = [
  {
    icon: <Utensils size={22} />,
    gradient: "linear-gradient(135deg,rgba(245,158,11,0.08),rgba(212,168,67,0.04))",
    iconBg: "linear-gradient(135deg,#f59e0b,#d97706)",
  },
  {
    icon: <BookOpen size={22} />,
    gradient: "linear-gradient(135deg,rgba(59,130,246,0.08),rgba(37,99,235,0.04))",
    iconBg: "linear-gradient(135deg,#3b82f6,#2563eb)",
  },
  {
    icon: <HeartPulse size={22} />,
    gradient: "linear-gradient(135deg,rgba(239,68,68,0.08),rgba(185,28,28,0.04))",
    iconBg: "linear-gradient(135deg,#ef4444,#b91c1c)",
  },
  {
    icon: <Home size={22} />,
    gradient: "linear-gradient(135deg,rgba(124,58,237,0.08),rgba(91,33,182,0.04))",
    iconBg: "linear-gradient(135deg,#7c3aed,#5b21b6)",
  },
  {
    icon: <Leaf size={22} />,
    gradient: "linear-gradient(135deg,rgba(16,185,129,0.08),rgba(5,150,105,0.04))",
    iconBg: "linear-gradient(135deg,#10b981,#059669)",
  },
  {
    icon: <IndianRupee size={22} />,
    gradient: "linear-gradient(135deg,rgba(212,168,67,0.08),rgba(180,83,9,0.04))",
    iconBg: "linear-gradient(135deg,#d4a843,#b45309)",
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65 } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }

export default function Seva() {
  const { t, lang } = useSite()
  const sevas = t.seva.items.map((item, i) => ({ ...item, ...SEVA_META[i] }))
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
              maxTilt={7}
              lift={6}
              glare
              className="group relative h-full rounded-2xl p-6 flex flex-col gap-4"
              style={{
                background: seva.gradient,
                border: "1px solid var(--border)",
                backdropFilter: "blur(16px)",
              }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0"
                style={{
                  background: seva.iconBg,
                  boxShadow: "0 6px 24px rgba(0,0,0,0.4)",
                }}
              >
                {seva.icon}
              </div>

              {/* Title + impact */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-serif text-lg font-semibold text-heading" lang={lang}>
                    {seva.title}
                  </h3>
                  <span
                    className="shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      background: "rgba(16,185,129,0.15)",
                      color: "#0f9b6e",
                      border: "1px solid rgba(16,185,129,0.3)",
                    }}
                    lang={lang}
                  >
                    {seva.impact}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-themed" lang={lang}>
                  {seva.description}
                </p>
              </div>

              {/* CTA */}
              <Link
                href="/contact"
                className="mt-auto inline-flex items-center gap-2 text-sm font-semibold transition-colors group/btn cursor-pointer"
                style={{ color: "var(--gold)" }}
                lang={lang}
              >
                {t.seva.joinCta}
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover/btn:translate-x-1"
                />
              </Link>
            </TiltCard>
          ))}
        </motion.div>

        {/* Donation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 mx-auto max-w-lg rounded-2xl p-8 text-center"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border-gold)",
            boxShadow: "var(--card-shadow)",
          }}
        >
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-heading" lang={lang}>
            {t.seva.donationTitle}
          </h3>
          <p className="mt-2 text-sm text-muted-themed" lang={lang}>
            {t.seva.donationNote}
          </p>

          <div
            className="mt-6 flex items-center justify-between gap-3 rounded-xl px-4 py-3"
            style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
          >
            <div className="text-left">
              <div className="text-[10px] uppercase tracking-[0.15em] text-muted-themed" lang={lang}>
                {t.seva.upiLabel}
              </div>
              <div className="font-mono text-sm sm:text-base font-semibold text-heading">
                {t.seva.upiId}
              </div>
            </div>
            <button
              type="button"
              onClick={copyUpiId}
              className="shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full transition-colors cursor-pointer"
              style={{
                background: copied ? "rgba(16,185,129,0.15)" : "var(--surface-strong)",
                color: copied ? "#0f9b6e" : "var(--gold)",
                border: `1px solid ${copied ? "rgba(16,185,129,0.3)" : "var(--border-gold)"}`,
              }}
              lang={lang}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? t.seva.copied : t.seva.copy}
            </button>
          </div>
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
