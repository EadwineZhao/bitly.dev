import { allBlogs } from "contentlayer/generated"
import { MetadataRoute } from "next"

export default async function sitemap() {
  const blogs: MetadataRoute.Sitemap = allBlogs.map((post) => ({
    url: `https://bitly.dev/blog/${post.slug}`,
    lastModified: post.publishedAt,
  }))

  const routes: MetadataRoute.Sitemap = ["", "/blog", "/guestbook"].map(
    (route) => ({
      url: `https://bitly.dev${route}`,
      lastModified: new Date().toISOString().split("T")[0],
    })
  )

  return [...routes, ...blogs]
}
