"use client"

import { motion } from "framer-motion"

/**
 * Premium page transition — each route's content rises and fades in on
 * navigation (templates remount per navigation, unlike layouts). Header
 * and footer live in the layout, so they stay put. Transform resolves to
 * `none` at rest, so fixed-position overlays inside pages are unaffected.
 * The global MotionConfig drops the transform for reduced-motion users.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
