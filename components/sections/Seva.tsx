"use client"

import { motion } from "framer-motion"
import { Utensils, BookOpen, HeartPulse, Home, Leaf, IndianRupee, ArrowRight } from "lucide-react"

interface SevaItem {
  id: number
  icon: React.ReactNode
  title: string
  description: string
  impact: string
  iconBg: string
}

const SEVAS: SevaItem[] = [
  {
    id: 1,
    icon: <Utensils size={22} />,
    title: "Langar Seva",
    description:
      "Serve free meals daily at the ashram's community kitchen. Thousands of devotees and visitors are fed every day — no one leaves hungry.",
    impact: "500+ meals / day",
    iconBg: "linear-gradient(135deg,#f59e0b,#d97706)",
  },
  {
    id: 2,
    icon: <BookOpen size={22} />,
    title: "Education Seva",
    description:
      "Support underprivileged children with books, stationery, and scholarships. Help the next generation access quality education.",
    impact: "200+ students helped",
    iconBg: "linear-gradient(135deg,#3b82f6,#2563eb)",
  },
  {
    id: 3,
    icon: <HeartPulse size={22} />,
    title: "Medical Seva",
    description:
      "Participate in free medical camps providing health check-ups, medicines, and specialist consultations to rural communities.",
    impact: "4 camps / year",
    iconBg: "linear-gradient(135deg,#ef4444,#b91c1c)",
  },
  {
    id: 4,
    icon: <Home size={22} />,
    title: "Temple Seva",
    description:
      "Help maintain the ashram premises — cleaning, decorating, and preparing for satsangs, kirtans, and special events.",
    impact: "Daily opportunity",
    iconBg: "linear-gradient(135deg,#8b5cf6,#6d28d9)",
  },
  {
    id: 5,
    icon: <Leaf size={22} />,
    title: "Environment Seva",
    description:
      "Join tree-plantation drives, river-cleaning yatras, and eco-friendly festival initiatives led by the ashram sangat.",
    impact: "1000+ trees planted",
    iconBg: "linear-gradient(135deg,#10b981,#059669)",
  },
  {
    id: 6,
    icon: <IndianRupee size={22} />,
    title: "Donation Seva",
    description:
      "Contribute financially to sustain all seva activities. Every rupee donated goes directly toward feeding, healing, and educating.",
    impact: "100% transparent",
    iconBg: "linear-gradient(135deg,#e07a1e,#b45309)",
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65 } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }

export default function Seva() {
  return (
    <section id="seva" className="relative py-24 sm:py-32 overflow-hidden bg-paper">
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
            Selfless Service
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-3 font-display text-4xl sm:text-5xl font-bold text-ink"
          >
            Join <span className="accent-text">Seva</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-ink-soft max-w-2xl mx-auto text-[0.95rem] leading-relaxed"
          >
            &ldquo;Seva se badi koi pooja nahi.&rdquo; — Guruji. Discover ways to serve and
            experience the transformative joy of selfless giving.
          </motion.p>
          <motion.div variants={fadeUp} className="ornament">
            <span>✦</span>
          </motion.div>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SEVAS.map((seva) => (
            <motion.div
              key={seva.id}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="group paper-card rounded-2xl p-6 flex flex-col gap-4"
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0"
                style={{
                  background: seva.iconBg,
                  boxShadow: "0 10px 24px -10px rgba(87,18,32,0.5)",
                }}
              >
                {seva.icon}
              </div>

              {/* Title + impact */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {seva.title}
                  </h3>
                  <span
                    className="shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      background: "rgba(74,107,63,0.1)",
                      color: "#3f6212",
                      border: "1px solid rgba(74,107,63,0.22)",
                    }}
                  >
                    {seva.impact}
                  </span>
                </div>
                <p className="text-ink-soft text-sm leading-relaxed">
                  {seva.description}
                </p>
              </div>

              {/* CTA */}
              <button
                onClick={() =>
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-saffron-deep hover:text-maroon transition-colors group/btn cursor-pointer"
              >
                Join this Seva
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover/btn:translate-x-1"
                />
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <blockquote className="font-display text-2xl sm:text-3xl text-maroon italic max-w-2xl mx-auto leading-snug">
            &ldquo;When you serve others without expectation of reward, you serve God
            Himself.&rdquo;
          </blockquote>
          <p className="mt-4 eyebrow">— Guruji Nakur Wale Baba Ji</p>
        </motion.div>
      </div>
    </section>
  )
}
