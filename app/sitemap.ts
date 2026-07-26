import type { MetadataRoute } from "next"

const SITE_URL = "https://nakurwalebabaji.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const routes = ["", "/about", "/gallery", "/videos", "/seva", "/contact"]

  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }))
}
