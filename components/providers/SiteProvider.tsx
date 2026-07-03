"use client"

import { createContext, useContext, useState, useCallback } from "react"
import { MotionConfig } from "framer-motion"
import { dict, type Lang, type Dictionary } from "@/lib/i18n"

export type Theme = "light" | "dark"

interface SiteContextValue {
  theme: Theme
  lang: Lang
  t: Dictionary
  setTheme: (theme: Theme) => void
  setLang: (lang: Lang) => void
  toggleTheme: () => void
  toggleLang: () => void
}

const SiteContext = createContext<SiteContextValue | null>(null)

const ONE_YEAR = 60 * 60 * 24 * 365

function writeCookie(name: string, value: string) {
  document.cookie = `${name}=${value}; path=/; max-age=${ONE_YEAR}; SameSite=Lax`
}

export function SiteProvider({
  initialTheme,
  initialLang,
  children,
}: {
  initialTheme: Theme
  initialLang: Lang
  children: React.ReactNode
}) {
  const [theme, setThemeState] = useState<Theme>(initialTheme)
  const [lang, setLangState] = useState<Lang>(initialLang)

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
    writeCookie("theme", next)
    document.documentElement.dataset.theme = next
  }, [])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    writeCookie("lang", next)
    document.documentElement.lang = next
    document.documentElement.dataset.lang = next
  }, [])

  const toggleTheme = useCallback(
    () => setTheme(theme === "dark" ? "light" : "dark"),
    [theme, setTheme]
  )
  const toggleLang = useCallback(
    () => setLang(lang === "hi" ? "en" : "hi"),
    [lang, setLang]
  )

  return (
    <SiteContext.Provider
      value={{
        theme,
        lang,
        t: dict[lang],
        setTheme,
        setLang,
        toggleTheme,
        toggleLang,
      }}
    >
      {/* Honour prefers-reduced-motion for every Framer Motion animation site-wide */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </SiteContext.Provider>
  )
}

export function useSite() {
  const ctx = useContext(SiteContext)
  if (!ctx) throw new Error("useSite must be used within a SiteProvider")
  return ctx
}
