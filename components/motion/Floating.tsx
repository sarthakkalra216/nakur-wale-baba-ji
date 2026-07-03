"use client"

import type { CSSProperties, ReactNode } from "react"
import { motion } from "framer-motion"

/**
 * Gentle perpetual float — a slow vertical drift with optional subtle
 * rotation, for decorative elements that should feel weightless.
 * The global MotionConfig stills it for reduced-motion users; markup is
 * identical for all users, so SSR hydration is stable.
 */
interface FloatingProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  /** vertical travel in px (each direction) */
  amplitude?: number
  /** rotation sway in degrees (each direction) */
  rotate?: number
  duration?: number
  delay?: number
}

export function Floating({
  children,
  className,
  style,
  amplitude = 8,
  rotate = 0,
  duration = 6,
  delay = 0,
}: FloatingProps) {
  return (
    <motion.div
      className={className}
      style={style}
      animate={{ y: [-amplitude, amplitude], rotate: [-rotate, rotate] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}
