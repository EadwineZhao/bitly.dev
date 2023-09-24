import { defineDocumentType, makeSource } from "contentlayer/source-files";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export const Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    publishedAt: { type: "string", required: true },
    summary: { type: "string", required: true },
    image: { type: "string" },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath,
    },
    tweetIds: {
      type: "list",
      resolve: (doc) => {
        const tweetMatches = doc.body.raw.match(
          /<StaticTweet\sid="[0-9]+"\s\/>/g
        );
        //@ts-ignore
        return tweetMatches?.map((tweet) => tweet.match(/[0-9]+/g)[0]) || [];
      },
    },
    structuredData: {
      type: "json",
      resolve: (doc) => ({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: doc.title,
        datePublished: doc.publishedAt,
        dateModified: doc.publishedAt,
        description: doc.summary,
        image: doc.image
          ? `https://bitly.dev${doc.image}`
          : `https://bitly.dev/og?title=${doc.title}`,
        url: `https://bitly.dev/blog/${doc._raw.flattenedPath}`,
        author: {
          "@type": "Person",
          name: "Ed Zhao",
        },
      }),
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Blog],
  mdx: {
    remarkPlugins: [remarkGfm],

    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "one-dark-pro",
          //@ts-ignore
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          //@ts-ignore
          onVisitHighlightedLine(node) {
            node.properties.className.push("line--highlighted");
          },
          //@ts-ignore
          onVisitHighlightedWord(node) {
            node.properties.className = ["word--highlighted"];
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["anchor"],
          },
        },
      ],
    ],
  },
});
