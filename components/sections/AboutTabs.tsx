"use client"

import { useState } from "react"
import LifeJourney from "@/components/sections/LifeJourney"
import Successor from "@/components/sections/Successor"
import { useSite } from "@/components/providers/SiteProvider"

type Tab = "journey" | "devi"

export default function AboutTabs() {
  const { t, lang } = useSite()
  const [tab, setTab] = useState<Tab>("journey")

  const tabs: { key: Tab; label: string }[] = [
    { key: "journey", label: t.about.tabJourney },
    { key: "devi", label: t.about.tabDevi },
  ]

  return (
    <>
      <div className="relative z-10 flex justify-center gap-3 flex-wrap px-4 pt-10 sm:pt-14">
        {tabs.map((tb) => (
          <button
            key={tb.key}
            onClick={() => setTab(tb.key)}
            lang={lang}
            className="px-5 sm:px-6 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 cursor-pointer"
            style={
              tab === tb.key
                ? {
                    background: "linear-gradient(135deg,#f59e0b,#d4a843)",
                    color: "var(--on-accent)",
                  }
                : {
                    background: "var(--surface-2)",
                    border: "1px solid var(--border-gold)",
                    color: "var(--text-muted)",
                  }
            }
          >
            {tb.label}
          </button>
        ))}
      </div>

      {tab === "journey" ? <LifeJourney /> : <Successor />}
    </>
  )
}
