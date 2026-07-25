"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"
import { RamBackground } from "@/components/decor/SacredBackground"

interface Testimonial {
  id: number
  name: string
  location: string
  role: string
  text: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Ramesh Sharma",
    location: "Saharanpur, UP",
    role: "Devotee since 2005",
    text: "Nakur Wale Baba Ji's satsangs transformed my life completely. I came to him lost and confused, and left with clarity, peace, and a renewed sense of purpose. Jai Nakur Wale Baba Ji!",
  },
  {
    id: 2,
    name: "Sunita Devi",
    location: "Dehradun, Uttarakhand",
    role: "Regular Sevak",
    text: "Joining the langar seva was the most fulfilling decision of my life. Nakur Wale Baba Ji says serving food is serving God — I have experienced that truth every single day.",
  },
  {
    id: 3,
    name: "Vikram Chauhan",
    location: "Delhi",
    role: "First-time visitor",
    text: "I visited the ashram for the first time last year. The peace and love I felt in Nakur Wale Baba Ji's presence was unlike anything I had experienced before. I keep returning.",
  },
  {
    id: 4,
    name: "Meera Kapoor",
    location: "Muzaffarnagar, UP",
    role: "Kirtan Sevak",
    text: "Nakur Wale Baba Ji's kirtans make me forget all worries. The vibration of that music carries you to another dimension entirely. My family life has become so harmonious.",
  },
  {
    id: 5,
    name: "Suresh Agarwal",
    location: "Meerut, UP",
    role: "Devotee since 2012",
    text: "I was suffering from a serious illness and found immense strength in Nakur Wale Baba Ji's teachings on acceptance and surrender. His words healed me from within.",
  },
  {
    id: 6,
    name: "Priya Verma",
    location: "Haridwar, Uttarakhand",
    role: "Young Devotee",
    text: "As a student, Nakur Wale Baba Ji's teaching on discipline completely changed how I approach my studies and my life. I feel centered and motivated every morning.",
  },
  {
    id: 7,
    name: "Jagdish Prasad",
    location: "Roorkee, Uttarakhand",
    role: "Ashram volunteer",
    text: "I have been volunteering at the ashram for 8 years. The community of devotees here is like a second family — united by love for Nakur Wale Baba Ji and for each other.",
  },
  {
    id: 8,
    name: "Kavita Singh",
    location: "Shamli, UP",
    role: "Devotee",
    text: "Nakur Wale Baba Ji's simple words — 'Love everyone, serve everyone, remember God' — changed my entire outlook on life. My heart feels lighter than it ever has.",
  },
]

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div
      className="shrink-0 w-72 sm:w-80 rounded-2xl p-6 flex flex-col gap-4 mx-3"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(212,168,67,0.13)",
        backdropFilter: "blur(16px)",
      }}
    >
      <Quote size={20} className="text-amber-400/40" />
      <p className="text-amber-100/70 text-sm leading-relaxed flex-1 italic">
        &ldquo;{t.text}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-2 border-t border-white/5">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-slate-900 text-sm shrink-0"
          style={{ background: "linear-gradient(135deg,#d4a843,#f59e0b)" }}
        >
          {t.name.charAt(0)}
        </div>
        <div>
          <div className="text-amber-50 text-sm font-semibold leading-none">{t.name}</div>
          <div className="text-amber-200/45 text-xs mt-1">
            {t.location} · {t.role}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const row1 = [...TESTIMONIALS.slice(0, 4), ...TESTIMONIALS.slice(0, 4)]
  const row2 = [...TESTIMONIALS.slice(4), ...TESTIMONIALS.slice(4)]

  return (
    <section
      id="testimonials"
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(88,28,135,0.1), transparent)",
        }}
      />
      <RamBackground variant="tiled" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-14"
        >
          <span className="text-amber-400 text-xs font-semibold uppercase tracking-[0.25em]">
            Devotee Stories
          </span>
          <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-bold text-amber-50">
            Voices of <span className="gold-text">Devotion</span>
          </h2>
          <p className="mt-4 text-amber-100/60 max-w-xl mx-auto text-sm">
            Thousands of lives touched by Nakur Wale Baba Ji&apos;s presence, wisdom, and love.
          </p>
          <div className="section-divider" />
        </motion.div>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="overflow-hidden mb-5">
        <div className="marquee-left flex w-max">
          {row1.map((t, i) => (
            <TestimonialCard key={`r1-${i}`} t={t} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="overflow-hidden">
        <div className="marquee-right flex w-max">
          {row2.map((t, i) => (
            <TestimonialCard key={`r2-${i}`} t={t} />
          ))}
        </div>
      </div>

      {/* Bottom note */}
      <div className="mt-12 text-center">
        <p className="text-amber-200/30 text-xs">
          Join thousands of devotees who have found peace and purpose through Nakur Wale Baba Ji&apos;s guidance.
        </p>
      </div>
    </section>
  )
}
