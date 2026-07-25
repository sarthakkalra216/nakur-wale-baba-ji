"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { RamBackground } from "@/components/decor/SacredBackground"
import { ImageReveal, Parallax, TiltCard } from "@/components/motion"

// Portraits + names are always shown in Hindi, independent of the site's
// language toggle — these are names, not translatable copy.
const PORTRAITS = [
  { src: "/images/Devi%20ji/photo29.jpg.jpeg", name: "सुश्री सौम्या सरस्वती जी" },
  { src: "/images/Devi%20ji/photo30.jpg.jpeg", name: "सुश्री समीक्षा सरस्वती जी" },
]

export default function Disciples() {
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
                </TiltCard>
                {/* Name — always Hindi, shown below the photo */}
                <p
                  className="mt-4 text-center font-serif text-sm sm:text-base font-semibold text-heading"
                  lang="hi"
                >
                  {p.name}
                </p>
              </motion.div>
            </Parallax>
          ))}
        </div>
      </div>
    </section>
  )
}
