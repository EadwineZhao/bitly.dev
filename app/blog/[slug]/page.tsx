import { getViewsCount } from "@/lib/metrics"
import { allBlogs } from "contentlayer/generated"
import { Metadata, ResolvingMetadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import ViewCounter from "../view-counter"
import { Mdx } from "@/app/components/mdx"
import Balancer from "react-wrap-balancer"

interface BlogProps {
  params: {
    slug: string
  }
}

export async function generateMetadata(
  { params }: BlogProps,
  parent: ResolvingMetadata
): Promise<Metadata | undefined> {
  const post = allBlogs.find((post) => post.slug === params.slug)
  if (!post) {
    return
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
    slug,
  } = post
  const previousImages = (await parent).openGraph?.images || []
  const ogImage = image
    ? `https://bitly.dev${image}`
    : `https://bitly.dev/og?title=${post.title}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://bitly.dev/blog/${slug}`,
      images: [
        ogImage,
        // {
        //   url: ogImage,
        // },
        // ...previousImages,
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  }
}

function formatDate(date: string) {
  const currentDate = new Date()
  const targetDate = new Date(date)

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  const daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ""

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`
  } else {
    formattedDate = "Today"
  }

  const fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return `${fullDate} (${formattedDate})`
}

export default async function Blog({ params }: BlogProps) {
  const post = allBlogs.find((post) => post.slug === params.slug)
  if (!post) {
    notFound()
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(post.structuredData),
        }}
      ></script>
      <h1 className="font-bold text-2xl tracking-tighter   max-w-[650px]">
        <Balancer>{post.title}</Balancer>
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.publishedAt)}
        </p>
        <Suspense>
          <Views slug={post.slug} />
        </Suspense>
      </div>
      <Mdx code={post.body.code} />
    </section>
  )
}

async function Views({ slug }: { slug: string }) {
  let views: Awaited<ReturnType<typeof getViewsCount>> = []
  try {
    views = await getViewsCount()
  } catch (error) {
    console.error(error)
  }

  return <ViewCounter allViews={views} slug={slug} trackView />
}
