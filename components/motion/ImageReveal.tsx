"use client"

import type { CSSProperties, ReactNode } from "react"
import { motion } from "framer-motion"

/**
 * Premium image reveal — a theme-coloured curtain wipes away while the
 * image settles from a gentle over-scale, the classic award-site entrance.
 * Runs once when scrolled into view. Markup is identical for all users;
 * the global MotionConfig makes both transforms resolve instantly for
 * reduced-motion users (an immediate reveal instead of a wipe).
 *
 * Wrap it around an <Image>. For `fill` images set the `fill` prop so the
 * wrapper stretches over its positioned parent; intrinsic images wrap in
 * normal flow.
 */
interface ImageRevealProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  delay?: number
  /** stretch over the nearest positioned parent (for next/image `fill`) */
  fill?: boolean
}

const ease = [0.65, 0, 0.35, 1] as const

export function ImageReveal({ children, className, style, delay = 0, fill = false }: ImageRevealProps) {
  return (
    <div
      className={`${fill ? "absolute inset-0" : "relative"} overflow-hidden ${className ?? ""}`}
      style={style}
    >
      <motion.div
        className="relative h-full w-full"
        initial={{ scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.1, ease, delay }}
      >
        {children}
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: "linear-gradient(160deg, var(--bg-2), var(--bg))",
          transformOrigin: "bottom",
        }}
        initial={{ scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease, delay }}
      />
    </div>
  )
}
