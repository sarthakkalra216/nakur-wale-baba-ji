"use client"

import { useState, type CSSProperties, type ReactNode } from "react"
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion"

/**
 * 3D perspective tilt card — Apple-style hover: the card tilts toward the
 * cursor, lifts, scales, and (optionally) shows a light sheen that follows
 * the pointer. Pointer tracking uses motion values only (no re-renders),
 * so it stays compositor-driven at 60fps. Disabled for touch input and
 * for users who prefer reduced motion.
 *
 * The outer element owns grid/column placement (`outerClassName`) and the
 * CSS perspective; the inner element is the visible card (`className` +
 * `style`). Pass `variants` to participate in a parent's stagger.
 */
interface TiltCardProps {
  children: ReactNode
  /** classes for the visible card (visuals + inner layout) */
  className?: string
  style?: CSSProperties
  /** classes for the outer wrapper (grid/column placement, margins) */
  outerClassName?: string
  /** max tilt in degrees */
  maxTilt?: number
  /** hover scale */
  scale?: number
  /** hover lift in px */
  lift?: number
  /** soft light sheen following the cursor */
  glare?: boolean
  /** entry-animation passthrough (inherits parent stagger) */
  variants?: Variants
}

const spring = { stiffness: 260, damping: 22, mass: 0.8 }

export function TiltCard({
  children,
  className,
  style,
  outerClassName,
  maxTilt = 8,
  scale = 1.02,
  lift = 5,
  glare = false,
  variants,
}: TiltCardProps) {
  const reduced = useReducedMotion()
  const [hovered, setHovered] = useState(false)

  // Normalised pointer position within the card (0–1)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), spring)
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), spring)

  const gx = useTransform(px, (v) => v * 100)
  const gy = useTransform(py, (v) => v * 100)
  const glareBg = useMotionTemplate`radial-gradient(380px circle at ${gx}% ${gy}%, rgba(255,255,255,0.13), transparent 65%)`

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== "mouse") return
    const rect = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  const reset = () => {
    px.set(0.5)
    py.set(0.5)
    setHovered(false)
  }

  return (
    <motion.div
      className={outerClassName}
      style={{ perspective: 900 }}
      variants={variants}
    >
      {/* rotateX/rotateY stay at 0 for touch and reduced-motion users because
          the pointer handler never moves them — markup is identical either
          way, so SSR hydration is stable across motion preferences. */}
      <motion.div
        onPointerMove={onPointerMove}
        onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
        onPointerLeave={reset}
        whileHover={reduced ? undefined : { scale, y: -lift }}
        transition={{ type: "spring", ...spring }}
        className={className}
        style={{
          ...style,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
        {glare && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] z-10"
            style={{ background: glareBg }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}
