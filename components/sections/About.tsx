"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { MapPin } from "lucide-react"
import { gurujiProfile } from "@/data/guruji-profile"

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.11 } } }

export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 overflow-hidden bg-paper-2"
    >
      {/* Top hairline */}
      <div className="absolute inset-x-0 top-0 hairline" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp} className="eyebrow">
            Life &amp; Legacy
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-3 font-display text-4xl sm:text-5xl font-bold text-ink"
          >
            About <span className="accent-text">Guruji</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="ornament">
            <span>✦</span>
          </motion.div>
        </motion.div>

        {/* Bio grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — portrait + values */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative max-w-md mx-auto lg:mx-0">
              <div className="relative rounded-[1.5rem] p-2 bg-card border border-gold/25 shadow-[0_36px_72px_-40px_rgba(87,18,32,0.4)]">
                <div className="relative rounded-[1.1rem] overflow-hidden aspect-[4/5]">
                  <Image
                    src="/gallery/photo1.jpeg"
                    alt="Shri Guruji Nakur Wale Baba Ji — morning satsang at Nakur ashram"
                    fill
                    sizes="(max-width: 1024px) 90vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </div>
              {/* Floating quote seal */}
              <div className="absolute -bottom-5 -right-3 px-4 py-2.5 rounded-2xl bg-maroon text-paper shadow-lg max-w-[60%]">
                <p className="font-display text-sm italic leading-snug">
                  &ldquo;Sab mein Ishwar hai.&rdquo;
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="mt-9 flex items-center gap-2 text-sm text-ink-soft">
              <MapPin size={15} className="text-saffron shrink-0" />
              {gurujiProfile.location}
            </div>

            {/* Values chips */}
            <div className="mt-5 flex flex-wrap gap-2">
              {gurujiProfile.values.map((v) => (
                <span
                  key={v}
                  className="px-4 py-1.5 rounded-full text-xs font-medium text-maroon bg-card border border-maroon/12"
                >
                  {v}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — bio text */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.blockquote
              variants={fadeUp}
              className="font-display text-xl sm:text-2xl text-maroon font-medium leading-relaxed mb-8 pl-5 border-l-2 border-saffron"
            >
              {gurujiProfile.shortBio}
            </motion.blockquote>

            {gurujiProfile.longBio.slice(1, 4).map((para, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                className="text-ink-soft leading-8 mb-4 text-[0.97rem]"
              >
                {para}
              </motion.p>
            ))}

            {/* Mission / Vision */}
            <motion.div variants={fadeUp} className="mt-8 grid sm:grid-cols-2 gap-4">
              {[
                { emoji: "🎯", label: "Mission", text: gurujiProfile.mission },
                { emoji: "🌟", label: "Vision", text: gurujiProfile.vision },
              ].map((item) => (
                <div key={item.label} className="paper-card p-5 rounded-2xl">
                  <div className="text-2xl mb-2">{item.emoji}</div>
                  <div className="eyebrow !text-[0.65rem] mb-2">{item.label}</div>
                  <p className="text-ink-soft text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
