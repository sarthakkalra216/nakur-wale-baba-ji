import { gurujiProfile } from "@/data/guruji-profile"
import { Tv, ExternalLink, Link } from "lucide-react"

const NAV = [
  { label: "About Guruji", href: "#about" },
  { label: "Teachings", href: "#teachings" },
  { label: "Gallery", href: "#gallery" },
  { label: "Kirtan", href: "#kirtan" },
  { label: "Seva", href: "#seva" },
  { label: "Ask Guruji", href: "#ask-guruji" },
  { label: "Contact", href: "#contact" },
]

export default function Footer() {
  return (
    <footer className="relative bg-maroon-deep text-paper">
      {/* Top accent line */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg,transparent,rgba(241,169,58,0.6),transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🕉</span>
              <div>
                <div className="font-display text-lg font-bold text-marigold">
                  Guruji Nakur Wale Baba Ji
                </div>
                <div className="text-xs text-paper/45 uppercase tracking-widest">
                  {gurujiProfile.location}
                </div>
              </div>
            </div>
            <p className="text-paper/60 text-sm leading-relaxed max-w-xs mb-6">
              {gurujiProfile.shortBio.slice(0, 120)}…
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {[
                { icon: <Tv size={18} />, href: gurujiProfile.social.youtube, label: "YouTube" },
                { icon: <Link size={18} />, href: gurujiProfile.social.facebook, label: "Facebook" },
                { icon: <ExternalLink size={18} />, href: gurujiProfile.social.instagram, label: "Instagram" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-paper/65 hover:text-marigold transition-all duration-300 hover:scale-110"
                  style={{ background: "rgba(255,253,248,0.07)", border: "1px solid rgba(255,253,248,0.12)" }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-marigold text-xs font-semibold uppercase tracking-widest mb-5">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {NAV.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-paper/60 text-sm hover:text-marigold transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact quick */}
          <div>
            <h3 className="text-marigold text-xs font-semibold uppercase tracking-widest mb-5">
              Contact
            </h3>
            <address className="not-italic space-y-3 text-sm text-paper/60">
              <p>{gurujiProfile.contact.address}</p>
              <p>
                <a href={`tel:${gurujiProfile.contact.phone}`} className="hover:text-marigold transition-colors">
                  {gurujiProfile.contact.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${gurujiProfile.contact.email}`} className="hover:text-marigold transition-colors">
                  {gurujiProfile.contact.email}
                </a>
              </p>
            </address>

            {/* Values */}
            <div className="mt-6">
              <h3 className="text-marigold text-xs font-semibold uppercase tracking-widest mb-3">
                Core Values
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {gurujiProfile.values.slice(0, 4).map((v) => (
                  <span
                    key={v}
                    className="text-[10px] px-2 py-0.5 rounded-full text-marigold"
                    style={{
                      background: "rgba(241,169,58,0.1)",
                      border: "1px solid rgba(241,169,58,0.2)",
                    }}
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="my-10 h-px"
          style={{ background: "linear-gradient(90deg,transparent,rgba(255,253,248,0.12),transparent)" }}
        />

        {/* Quote + copyright */}
        <div className="text-center">
          <blockquote className="font-display text-lg sm:text-xl italic mb-6 text-marigold/90">
            &ldquo;Sab mein Ishwar hai — har sehal mein Seva, har qadam mein Bhakti.&rdquo;
          </blockquote>
          <p className="text-paper/40 text-xs">
            © {new Date().getFullYear()} Shri Guruji Nakur Wale Baba Ji. All Rights Reserved. Built with devotion.
          </p>
        </div>
      </div>
    </footer>
  )
}
