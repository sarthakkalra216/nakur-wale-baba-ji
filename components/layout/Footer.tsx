"use client"

import NextLink from "next/link"
import { Tv, ExternalLink, Link } from "lucide-react"
import { RamBackground } from "@/components/decor/SacredBackground"
import { useSite } from "@/components/providers/SiteProvider"

const CONTACT = {
  email: "nakurwalebabaji@gmail.com",
}

const SOCIAL = {
  youtube: "https://www.youtube.com/@bawavideo",
  facebook: "https://www.facebook.com/bawajinakurwale",
  instagram: "https://www.instagram.com/nakur_wale_baba_ji/",
}

const NAV: { key: "home" | "journey" | "gallery" | "videos" | "seva" | "contact"; href: string }[] = [
  { key: "home", href: "/" },
  { key: "journey", href: "/#life-journey" },
  { key: "gallery", href: "/gallery" },
  { key: "videos", href: "/videos" },
  { key: "seva", href: "/seva" },
  { key: "contact", href: "/contact" },
]

export default function Footer() {
  const { t, lang } = useSite()

  return (
    <footer
      className="relative overflow-hidden border-t"
      style={{ borderColor: "var(--header-border)" }}
    >
      {/* Top glow */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,var(--border-gold),transparent)" }}
      />
      {/* Continuous राम राम राम watermark */}
      <RamBackground variant="marquee" opacity={0.05} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🕉</span>
              <div>
                <div
                  className="font-serif text-lg font-bold"
                  style={{ color: "var(--gold)" }}
                  lang={lang}
                >
                  {t.footer.brand}
                </div>
                <div
                  className="text-xs uppercase tracking-widest text-muted-themed"
                  lang={lang}
                >
                  {t.footer.location}
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-xs mb-6 text-muted-themed" lang={lang}>
              {t.footer.blurb}
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {[
                { icon: <Tv size={18} />, href: SOCIAL.youtube, label: "YouTube" },
                { icon: <Link size={18} />, href: SOCIAL.facebook, label: "Facebook" },
                { icon: <ExternalLink size={18} />, href: SOCIAL.instagram, label: "Instagram" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                    color: "var(--gold)",
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "var(--gold)" }}
              lang={lang}
            >
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2.5">
              {NAV.map((l) => (
                <li key={l.href}>
                  <NextLink
                    href={l.href}
                    className="text-sm transition-colors text-muted-themed hover:text-heading"
                    lang={lang}
                  >
                    {t.nav[l.key]}
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact quick */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "var(--gold)" }}
              lang={lang}
            >
              {t.footer.contactHeading}
            </h3>
            <address className="not-italic space-y-3 text-sm text-muted-themed">
              <p lang={lang}>{t.footer.address}</p>
              <p>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="transition-colors hover:text-heading"
                >
                  {CONTACT.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Divider */}
        <div
          className="my-10 h-px"
          style={{ background: "linear-gradient(90deg,transparent,var(--border),transparent)" }}
        />

        {/* Quote + copyright */}
        <div className="text-center">
          <blockquote
            className="font-serif text-base sm:text-lg italic mb-6"
            style={{ color: "var(--gold)" }}
            lang={lang}
          >
            &ldquo;{t.footer.quote}&rdquo;
          </blockquote>
          <p className="text-xs text-muted-themed" lang={lang}>
            © {new Date().getFullYear()} {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}
