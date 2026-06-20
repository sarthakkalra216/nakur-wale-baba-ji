"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { MapPin } from "lucide-react"
import { gurujiProfile } from "@/data/guruji-profile"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.11 } } }

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 100% 50%, rgba(88,28,135,0.13), transparent), radial-gradient(ellipse 40% 40% at 0% 50%, rgba(212,168,67,0.05), transparent)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            className="text-amber-400 text-xs font-semibold uppercase tracking-[0.25em]"
          >
            Life & Legacy
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-3 font-serif text-3xl sm:text-5xl font-bold text-amber-50"
          >
            About <span className="gold-text">Guruji</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="section-divider" />
        </motion.div>

        {/* Bio grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-24">
          {/* Left – image placeholder + values */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Image tile */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-md mx-auto lg:mx-0">
              <Image
                src="/gallery/photo2.jpeg"
                alt="Guruji Nakur Wale Baba Ji"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 448px"
              />
              {/* Gold border */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{ border: "1px solid rgba(212,168,67,0.2)" }}
              />
            </div>

            {/* Location */}
            <div className="mt-6 flex items-center gap-2 text-amber-200/55 text-sm">
              <MapPin size={14} className="text-amber-400 shrink-0" />
              {gurujiProfile.location}
            </div>

            {/* Values chips */}
            <div className="mt-5 flex flex-wrap gap-2">
              {gurujiProfile.values.map((v) => (
                <span
                  key={v}
                  className="px-4 py-1.5 rounded-full text-xs font-medium"
                  style={{
                    background: "rgba(212,168,67,0.08)",
                    border: "1px solid rgba(212,168,67,0.2)",
                    color: "#fde68a",
                  }}
                >
                  {v}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right – bio text */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.blockquote
              variants={fadeUp}
              className="font-serif text-lg sm:text-xl text-amber-300/90 font-medium italic leading-relaxed mb-8 border-l-2 border-amber-400/40 pl-5"
            >
              &ldquo;{gurujiProfile.shortBio}&rdquo;
            </motion.blockquote>

            {/* TODO: Replace gurujiProfile.longBio paragraphs with real biography text from Guruji's life story.
                Update data/guruji-profile.ts → longBio array with authentic content.
                Current placeholders describe the spiritual journey — replace with verified dates and events. */}
            {gurujiProfile.longBio.slice(1, 4).map((para, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                className="text-amber-100/65 leading-8 mb-4 text-[0.95rem]"
              >
                {para}
              </motion.p>
            ))}

            {/* Mission / Vision */}
            <motion.div
              variants={fadeUp}
              className="mt-8 grid sm:grid-cols-2 gap-4"
            >
              {[
                { emoji: "🎯", label: "Mission", text: gurujiProfile.mission },
                { emoji: "🌟", label: "Vision", text: gurujiProfile.vision },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-5 rounded-2xl"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(212,168,67,0.14)",
                  }}
                >
                  <div className="text-2xl mb-2">{item.emoji}</div>
                  <div className="text-amber-400 font-semibold text-xs mb-2 uppercase tracking-widest">
                    {item.label}
                  </div>
                  <p className="text-amber-100/60 text-sm leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
