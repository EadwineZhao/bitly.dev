import { cn } from "@/lib/utils"
import clsx from "clsx"
import Image from "next/image"
import { HTMLProps, Suspense } from "react"
import Icons from "./components/icons"
import Loading from "./components/loading"
import { getViewsCount } from "@/lib/metrics"
import ViewCounter from "./blog/view-counter"
import Link from "next/link"

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
          {`I began my journey in technology as a system engineer, and my passion for programming led me to transition into web development in 2019. I specialize in building modern web applications using technologies such as `}
          <span className="not-prose">
            <Badge href="https://react.dev">
              <Icons.react />
              React
            </Badge>
            {/* <Badge href="https://vercel.com">
              <Icons.nextjs />
              Vercel
            </Badge> */}
          </span>
          <span className="not-prose">
            ,
            <Badge href="https://nextjs.org">
              <Icons.nextjs />
              Next.js
            </Badge>
          </span>
          {`, GraphQL, MongoDB, and Prisma. I'm dedicated to creating elegant and
          efficient solutions that enhance user experiences.`}
        </Text>
        <Text className="my-8">
          {`As a web developer, I play a key role in designing and developing web applications that meet clients' needs. My responsibilities include frontend development using React and Next.js, as well as backend development utilizing GraphQL, MongoDB, and Prisma.`}
        </Text>
      </div>
      <div>
        <Text>{`I've been sharing my journey, experiences, and insights on my blog over the past five years. Here are some of the topics I've covered.`}</Text>
      </div>
      <div className="my-8 flex flex-col space-y-4 w-full">
        <Suspense fallback={<Loading />}>
          <BlogLink
            name="React: Exploring Front-End Power via Core Concentps"
            slug="2020-react"
          />
        </Suspense>
      </div>
      <div>
        {`Outside of programming, I love hiking, traveling, and cherishing moments with my son. These pursuits inspire my work-life balance and creativity.`}
      </div>
      <ul className="flex flex-col md:flex-row mt-8 space-x-0 md:space-x-4 space-y-2 md:space-y-0 font-sm text-neutral-600 dark:text-neutral-300">
        {/* <li>
          <a
            className="flex items-center hover:text-neutral-800 dark:hover:text-neutral-100 transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="https://twitter.com/leeerob"
          >
            <Icons.arrow />
            <p className="h-7 ml-2">follow me</p>
          </a>
        </li> */}
        <li>
          <Link
            href={"mailto:ed@bitly.dev"}
            className="flex items-center hover:text-neutral-800 dark:hover:text-neutral-100 transition-all"
            target="_blank"
          >
            <Icons.arrow />
            <p className="h-7 ml-2">send me an email</p>
          </Link>
        </li>
      </ul>
    </section>
  )
}
