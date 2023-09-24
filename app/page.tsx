import { cn } from "@/lib/utils"
import clsx from "clsx"
import Image from "next/image"
import { HTMLProps, Suspense } from "react"
import Icons from "./components/icons"
import Loading from "./components/loading"
import { getViewsCount } from "@/lib/metrics"
import ViewCounter from "./blog/view-counter"

const H1 = (props: HTMLProps<HTMLHeadingElement>) => (
  <h1
    {...props}
    className={clsx(
      "font-bold text-2xl mb-8 tracking-tighter",
      props.className
    )}
  />
)
const Text = (props: HTMLProps<HTMLParagraphElement>) => (
  <p
    {...props}
    className={cn("prose prose-neutral dark:prose-invert", props.className)}
  />
)

const Badge = (props: HTMLProps<HTMLAnchorElement>) => (
  <a
    {...props}
    target="_blank"
    className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm inline-flex items-center leading-4 text-neutral-900 dark:text-neutral-100 no-underline"
  />
)

const BlogLink = async ({ slug, name }: { slug: string; name: string }) => {
  const allViews = await getViewsCount()

  console.log(allViews)
  return (
    <a
      href={`/blog/${slug}`}
      className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50  dark:bg-neutral-800 rounded flex items-center justify-between px-3 py-4 w-full"
    >
      <div className="flex flex-col">
        <p className="font-bold text-neutral-900 dark:text-neutral-100">
          {name}
        </p>
        <ViewCounter allViews={allViews} slug={slug} trackView={false} />
      </div>
      <div className="text-neutral-700 dark:text-neutral-300">
        <Icons.arrow />
      </div>
    </a>
  )
}

export default function HomePage() {
  return (
    <section>
      <div className="my-8">
        <H1>{`hey, I'm Ed.`}</H1>
        <Text>
          {`I'm a frontend developer, optimist, and community builder. I currently
        work as the VP of Developer Experience at `}
          <span className="not-prose">
            <Badge href="https://vercel.com">
              <Icons.nextjs />
              Vercel
            </Badge>
          </span>
          {`, where I lead the
        community for `}
          <Badge href="https://nextjs.org">
            <Icons.nextjs />
            Next.js
          </Badge>
          {`, an open-source web framework built with `}
          <Badge href="https://react.dev">
            <Icons.react />
            React
          </Badge>
          .
        </Text>
        <Text>
          {/* {`Over the past decade, I've written content on my blog and newsletter.
          I try to keep things simple. You'll find writing about technologies
          I'm interested in at the time, or how I'm learning and growing in my
          career, sharing knowledge along the way.`} */}
        </Text>
      </div>
      <div className="my-8 flex flex-col space-y-4 w-full">
        <Suspense fallback={<Loading />}>
          <BlogLink
            name="React: Exploring Front-End Power via Core Concentps"
            slug="2020-react"
          />
        </Suspense>
      </div>
    </section>
  )
}
