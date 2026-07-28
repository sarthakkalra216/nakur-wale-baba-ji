"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { MapPin, Mail, ArrowRight } from "lucide-react"
import { RamBackground } from "@/components/decor/SacredBackground"
import { useSite } from "@/components/providers/SiteProvider"

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65 } },
}

const CONTACT_EMAIL = "nakurwalebabaji@gmail.com"

export default function ContactMini() {
  const { t, lang, theme } = useSite()

  return (
    <section id="contact-mini" className="relative py-16 sm:py-20 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 0% 100%, rgba(212,168,67,0.07), transparent), radial-gradient(ellipse 50% 45% at 100% 0%, rgba(88,28,135,0.1), transparent)",
        }}
      />
      <RamBackground variant="tiled" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.span
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.25em]"
            style={{ color: "var(--gold)" }}
            lang={lang}
          >
            {t.contact.eyebrow}
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-3 font-serif text-3xl sm:text-5xl font-bold text-heading"
            lang={lang}
          >
            {t.contact.titleLead} <span className="gold-text">{t.contact.titleEm}</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 max-w-md text-sm leading-relaxed text-muted-themed" lang={lang}>
            {t.contact.subtitle}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "var(--surface-2)", color: "var(--gold)" }}
              >
                <MapPin size={17} />
              </div>
              <span className="text-sm text-muted-themed" lang={lang}>
                {t.contact.address}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "var(--surface-2)", color: "var(--gold)" }}
              >
                <Mail size={17} />
              </div>
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-sm text-muted-themed hover:text-heading transition-colors">
                {CONTACT_EMAIL}
              </a>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 transition-all duration-300 shadow-lg shadow-amber-500/20 hover:scale-105 cursor-pointer"
              style={{ color: "var(--on-accent)" }}
              lang={lang}
            >
              {t.nav.cta}
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid var(--border-gold)" }}
        >
          <div className="relative aspect-video">
            <iframe
              title="Nakur Wale Baba Ji Ka Ashram location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d216.07798300968773!2d77.53344246072008!3d29.94355222826942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390eeb753256bc79%3A0x6774fd08e0a36e90!2sNakur%20Wale%20Baba%20Ji%20Ka%20Ashram!5e0!3m2!1sen!2sin!4v1782116314659!5m2!1sen!2sin"
              className="absolute inset-0 w-full h-full"
              style={{
                border: 0,
                filter:
                  theme === "dark"
                    ? "invert(0.9) hue-rotate(180deg) brightness(0.95) contrast(0.9)"
                    : "none",
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
