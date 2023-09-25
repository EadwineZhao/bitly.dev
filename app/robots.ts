import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    sitemap: "https://bitly.dev/sitemap.xml",
    host: "https://bitly.dev",
  }
}
