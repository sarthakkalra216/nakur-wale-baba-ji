"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Mail, CheckCircle, Send, ExternalLink } from "lucide-react"
import { RamBackground } from "@/components/decor/SacredBackground"
import { useSite } from "@/components/providers/SiteProvider"

const CONTACT_EMAIL = "nakurwalebabaji@gmail.com"

// Web3Forms access key registered to nakurwalebabaji@gmail.com — submissions are
// delivered straight to that inbox. (Safe to expose; Web3Forms keys are public.)
const WEB3FORMS_ACCESS_KEY = "aac5011a-7ce9-487a-8b9c-e244620b4db8"

interface FormState {
  name: string
  email: string
  phone: string
  message: string
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65 } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }

export default function Contact() {
  const { t, lang, theme } = useSite()
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.message) return
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "New message from Nakur Wale Baba Ji website contact form",
          from_name: "Nakur Wale Baba Ji Website",
          name: form.name,
          email: form.email || "Not provided",
          phone: form.phone || "Not provided",
          message: form.message,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
      } else {
        setError(data.message || t.contact.errorGeneric)
      }
    } catch {
      setError(t.contact.errorNetwork)
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass =
    "w-full rounded-xl px-4 py-3 text-sm text-body placeholder:opacity-40 outline-none transition-all duration-200 focus:ring-1 focus:ring-amber-400/40"
  const inputStyle = {
    background: "var(--surface-2)",
    border: "1px solid var(--border)",
  }

  return (
    <section id="contact" className="relative py-16 sm:py-20 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 0% 100%, rgba(212,168,67,0.07), transparent), radial-gradient(ellipse 50% 45% at 100% 0%, rgba(88,28,135,0.1), transparent)",
        }}
      />
      <RamBackground variant="tiled" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
            {t.contact.eyebrow}
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-3 font-serif text-3xl sm:text-5xl font-bold text-heading"
            lang={lang}
          >
            {t.contact.titleLead} <span className="gold-text">{t.contact.titleEm}</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-xl mx-auto text-sm text-muted-themed"
            lang={lang}
          >
            {t.contact.subtitle}
          </motion.p>
          <motion.div variants={fadeUp} className="section-divider" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {submitted ? (
              <div
                className="h-full flex flex-col items-center justify-center text-center gap-5 p-10 rounded-3xl"
                style={{
                  background: "var(--surface)",
                  border: "1px solid rgba(16,185,129,0.3)",
                }}
              >
                <CheckCircle size={52} className="text-emerald-400" />
                <div>
                  <h3 className="font-serif text-xl font-bold text-heading mb-2" lang={lang}>
                    {t.contact.successTitle}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-themed" lang={lang}>
                    {t.contact.successBody}
                  </p>
                </div>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", message: "" }) }}
                  className="px-6 py-2.5 rounded-full border text-sm hover:bg-amber-400/10 transition-all cursor-pointer"
                  style={{ borderColor: "var(--border-gold)", color: "var(--gold)" }}
                  lang={lang}
                >
                  {t.contact.sendAnother}
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4 p-6 sm:p-8 rounded-3xl"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs mb-1.5 uppercase tracking-wide" style={{ color: "var(--gold)" }} lang={lang}>
                      {t.contact.nameLabel}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder={t.contact.namePlaceholder}
                      className={inputClass}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label className="block text-xs mb-1.5 uppercase tracking-wide" style={{ color: "var(--gold)" }} lang={lang}>
                      {t.contact.emailLabel}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder={t.contact.emailPlaceholder}
                      className={inputClass}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs mb-1.5 uppercase tracking-wide" style={{ color: "var(--gold)" }} lang={lang}>
                    {t.contact.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder={t.contact.phonePlaceholder}
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label className="block text-xs mb-1.5 uppercase tracking-wide" style={{ color: "var(--gold)" }} lang={lang}>
                    {t.contact.messageLabel}
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder={t.contact.messagePlaceholder}
                    className={`${inputClass} resize-none`}
                    style={inputStyle}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting || !form.name || !form.message}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 font-bold text-sm hover:from-amber-300 hover:to-yellow-400 transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-amber-400/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 cursor-pointer"
                  style={{ color: "var(--on-accent)" }}
                  lang={lang}
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black/20 border-t-black/70 rounded-full animate-spin" />
                      {t.contact.sending}
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      {t.contact.send}
                    </>
                  )}
                </button>

                {error && (
                  <p className="text-red-400 text-xs text-center">{error}</p>
                )}
              </form>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            {/* Contact details */}
            <div
              className="p-6 rounded-2xl space-y-5"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border-gold)",
              }}
            >
              <h3 className="font-serif text-lg font-semibold text-heading" lang={lang}>
                {t.contact.ashramContact}
              </h3>

              {[
                { icon: <MapPin size={16} />, label: t.contact.addressLabel, value: t.contact.address },
                { icon: <Mail size={16} />, label: t.contact.emailInfoLabel, value: CONTACT_EMAIL },
              ].map((item) => (
                <div key={item.label} className="flex gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: "var(--surface-2)",
                      color: "var(--gold)",
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: "var(--gold)" }} lang={lang}>
                      {item.label}
                    </div>
                    <div className="text-sm text-muted-themed" lang={lang}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Map */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border-gold)",
              }}
            >
              <div className="flex items-center justify-between gap-3 px-5 pt-5 pb-3">
                <div className="flex items-center gap-2 text-heading">
                  <MapPin size={16} className="shrink-0" style={{ color: "var(--gold)" }} />
                  <h3 className="font-serif text-lg font-semibold" lang={lang}>
                    {t.contact.findAshram}
                  </h3>
                </div>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Nakur+Wale+Baba+Ji+Ka+Ashram"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors shrink-0"
                  style={{ color: "var(--gold)" }}
                  lang={lang}
                >
                  {t.contact.directions}
                  <ExternalLink size={12} />
                </a>
              </div>
              <div className="relative aspect-video mx-3 mb-3 rounded-xl overflow-hidden ring-1 ring-amber-400/15">
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
