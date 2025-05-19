import { defineDocumentType, makeSource } from "contentlayer/source-files";

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
});
