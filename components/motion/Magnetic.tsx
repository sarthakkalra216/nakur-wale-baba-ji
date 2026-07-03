"use client"

import type { ReactNode } from "react"
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion"

/**
 * Magnetic hover wrapper — the child is gently pulled toward the cursor
 * while it hovers, and springs back on leave. Motion-value driven (no
 * re-renders); inert for touch input and reduced-motion users.
 */
interface MagneticProps {
  children: ReactNode
  className?: string
  /** pull strength (0–1); fraction of the cursor's offset from centre */
  strength?: number
}

const spring = { stiffness: 220, damping: 16, mass: 0.7 }

export function Magnetic({ children, className, strength = 0.3 }: MagneticProps) {
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, spring)
  const sy = useSpring(y, spring)

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== "mouse") return
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      className={className}
      style={{ x: sx, y: sy }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  )
}
