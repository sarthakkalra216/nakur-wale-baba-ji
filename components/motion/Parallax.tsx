"use client"

import { useRef, type CSSProperties, type ReactNode } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

/**
 * Scroll-linked parallax wrapper — drifts its children vertically as the
 * element travels through the viewport, creating layered depth. Transform
 * only (compositor-friendly). Motion is strictly proportional to the user's
 * own scrolling (never autonomous), and the drift is attached uncondition-
 * ally so SSR markup is identical across motion preferences.
 */
interface ParallaxProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  /** total drift in px; positive = starts below, ends above */
  offset?: number
}

export function Parallax({ children, className, style, offset = 40 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset])

  return (
    <motion.div ref={ref} className={className} style={{ ...style, y }}>
      {children}
    </motion.div>
  )
}
