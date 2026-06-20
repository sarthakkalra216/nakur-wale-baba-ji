"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Heart, Handshake, Brain, Users, Sparkles, Flame,
} from "lucide-react"
import { teachingCategories, teachings } from "@/data/guruji-knowledge"

const iconMap: Record<string, React.ReactNode> = {
  Heart: <Heart size={22} />,
  Handshake: <Handshake size={22} />,
  Brain: <Brain size={22} />,
  Users: <Users size={22} />,
  Sparkles: <Sparkles size={22} />,
  Flame: <Flame size={22} />,
}

const gradientMap: Record<string, string> = {
  "from-rose-500 to-pink-600": "linear-gradient(135deg,#f43f5e,#db2777)",
  "from-amber-500 to-orange-600": "linear-gradient(135deg,#f59e0b,#ea580c)",
  "from-violet-500 to-purple-600": "linear-gradient(135deg,#8b5cf6,#7c3aed)",
  "from-sky-500 to-blue-600": "linear-gradient(135deg,#0ea5e9,#2563eb)",
  "from-emerald-500 to-teal-600": "linear-gradient(135deg,#10b981,#0d9488)",
  "from-yellow-500 to-amber-600": "linear-gradient(135deg,#eab308,#d97706)",
}

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }

export default function Teachings() {
  const [active, setActive] = useState<string | null>(null)

  const filtered = active ? teachings.filter((t) => t.categoryId === active) : teachings

  return (
    <section id="teachings" className="relative py-24 sm:py-32 overflow-hidden bg-paper">
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center mb-12"
        >
          <motion.span variants={fadeUp} className="eyebrow">
            Spiritual Wisdom
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-3 font-display text-4xl sm:text-5xl font-bold text-ink"
          >
            Guruji&apos;s <span className="accent-text">Teachings</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-ink-soft max-w-xl mx-auto text-[0.95rem] leading-relaxed"
          >
            Timeless wisdom across six pillars of spiritual life — explore and be
            transformed.
          </motion.p>
          <motion.div variants={fadeUp} className="ornament">
            <span>✦</span>
          </motion.div>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <button
            onClick={() => setActive(null)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
              active === null
                ? "btn-primary"
                : "border border-maroon/25 text-ink-soft hover:border-maroon/50 hover:text-maroon"
            }`}
          >
            All Teachings
          </button>
          {teachingCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(active === cat.id ? null : cat.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                active === cat.id
                  ? "btn-primary"
                  : "border border-maroon/25 text-ink-soft hover:border-maroon/50 hover:text-maroon"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active ?? "all"}
            initial="hidden"
            animate="show"
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((teaching) => {
              const cat = teachingCategories.find((c) => c.id === teaching.categoryId)
              return (
                <motion.div
                  key={teaching.id}
                  variants={fadeUp}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="paper-card rounded-2xl p-6 flex flex-col gap-4 cursor-default"
                >
                  {/* Icon + category */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0"
                      style={{
                        background: cat
                          ? gradientMap[cat.color] ?? "linear-gradient(135deg,#f59e0b,#d97706)"
                          : "linear-gradient(135deg,#f59e0b,#d97706)",
                        boxShadow: "0 8px 20px -8px rgba(87,18,32,0.45)",
                      }}
                    >
                      {iconMap[cat?.icon ?? "Sparkles"]}
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full text-maroon bg-maroon/[0.06] border border-maroon/12">
                      {cat?.label}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-lg font-semibold text-ink leading-snug">
                    {teaching.title}
                  </h3>

                  {/* Quote */}
                  <p className="text-sm text-maroon italic leading-relaxed border-l-2 border-saffron pl-3 font-display">
                    {teaching.quote}
                  </p>

                  {/* Explanation */}
                  <p className="text-ink-soft text-sm leading-relaxed flex-1">
                    {teaching.explanation}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {teaching.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded-full text-saffron-deep bg-saffron/[0.1] border border-saffron/20"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
