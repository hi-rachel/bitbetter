import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";

const Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    description: { type: "string", required: false },
    tags: { type: "list", of: { type: "string" }, required: false },
    category: { type: "string", required: false },
    author: { type: "string", required: false },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
    },
  },
}));

export default makeSource({
  contentDirPath: "src/content",
  documentTypes: [Blog],
  mdx: {
    rehypePlugins: [
      [
        // @ts-expect-error vfile 타입 충돌 무시
        rehypePrettyCode,
        {
          theme: "dracula",
        },
      ],
      rehypeSlug,
    ],
  },
});
