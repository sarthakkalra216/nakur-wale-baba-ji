"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Magnetic } from "@/components/motion"
import { useSite } from "@/components/providers/SiteProvider"
import SettingsToggles from "@/components/layout/SettingsToggles"

const navLinks: { key: keyof ReturnType<typeof useSite>["t"]["nav"]; href: string }[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "events", href: "/events" },
  { key: "gallery", href: "/gallery" },
  { key: "ashrams", href: "/ashrams" },
  { key: "videos", href: "/videos" },
  { key: "seva", href: "/seva" },
  { key: "contact", href: "/contact" },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const { t, lang } = useSite()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const isActive = (href: string) => {
    const route = href.split("#")[0] || "/"
    if (route === "/") return pathname === "/"
    return pathname === route || pathname.startsWith(route + "/")
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 backdrop-blur-xl border-b transition-shadow duration-500",
          scrolled ? "shadow-2xl" : ""
        )}
        style={{ background: "var(--header-bg)", borderColor: "var(--header-border)" }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
          {/* Logo — जय श्री राम */}
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer min-w-0 flex-1 lg:flex-initial">
            {/* Ashram emblem */}
            <span
              className="relative grid place-items-center w-11 h-11 sm:w-14 sm:h-14 rounded-full shrink-0 overflow-hidden transition-transform duration-300 group-hover:scale-105"
              style={{ boxShadow: "0 4px 16px rgba(212,168,67,0.4)" }}
            >
              <Image
                src="/images/logo.png"
                alt="Nakur Wale Baba Ji"
                fill
                className="object-cover"
                sizes="56px"
              />
            </span>
            <div className="leading-tight min-w-0">
              <div
                className="font-hindi font-bold gold-text text-base sm:text-xl md:text-2xl truncate"
                lang={lang}
                style={{ lineHeight: 1.35, paddingBottom: "0.06em" }}
              >
                {t.footer.brand}
              </div>
              <div
                className="font-hindi text-[9px] sm:text-[10px] text-muted-themed tracking-[0.18em] truncate"
                lang={lang}
              >
                {t.footer.location}
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "px-3 py-2 text-sm transition-colors rounded-lg cursor-pointer",
                    isActive(link.href)
                      ? "font-semibold underline decoration-2 underline-offset-8"
                      : ""
                  )}
                  style={{
                    color: isActive(link.href) ? "var(--heading)" : "var(--text)",
                    textDecorationColor: isActive(link.href) ? "var(--gold)" : undefined,
                  }}
                >
                  {t.nav[link.key]}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right cluster: toggles + CTA + hamburger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <SettingsToggles />

            <Magnetic className="hidden lg:block" strength={0.25}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 font-semibold text-sm px-5 py-2 rounded-full hover:from-amber-400 hover:to-yellow-300 transition-all duration-300 shadow-lg shadow-amber-500/20 hover:scale-105 cursor-pointer"
                style={{ color: "var(--on-accent)" }}
              >
                {t.nav.cta}
              </Link>
            </Magnetic>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden p-2 rounded-lg transition-colors cursor-pointer"
              style={{ color: "var(--gold)" }}
              aria-label="Toggle navigation"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? "x" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="block"
                >
                  {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-72 flex flex-col lg:hidden border-l"
              style={{ background: "var(--bg)", borderColor: "var(--header-border)" }}
            >
              <div
                className="flex items-center justify-between px-5 py-4 border-b"
                style={{ borderColor: "var(--header-border)" }}
              >
                <span className="font-semibold text-sm" style={{ color: "var(--gold)" }}>
                  🕉 {t.nav.navHeading}
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-1.5 transition-colors cursor-pointer"
                  style={{ color: "var(--text-muted)" }}
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block w-full text-left px-4 py-3 rounded-xl transition-all duration-200 text-sm cursor-pointer"
                      style={{
                        color: isActive(link.href) ? "var(--gold)" : "var(--text-muted)",
                        fontWeight: isActive(link.href) ? 600 : 400,
                      }}
                    >
                      {t.nav[link.key]}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div
                className="p-4 border-t space-y-4"
                style={{ borderColor: "var(--header-border)" }}
              >
                <div className="flex justify-center">
                  <SettingsToggles compact />
                </div>
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="block text-center w-full bg-gradient-to-r from-amber-500 to-yellow-400 font-semibold py-3 rounded-full hover:from-amber-400 hover:to-yellow-300 transition-all text-sm cursor-pointer"
                  style={{ color: "var(--on-accent)" }}
                >
                  {t.nav.cta}
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
