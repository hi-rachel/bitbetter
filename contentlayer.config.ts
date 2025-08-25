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
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => {
        // blog/ 폴더를 제외하고 나머지 경로를 slug로 사용
        const relativePath = doc._raw.sourceFilePath.replace(/^.*?blog\//, "");
        // 파일 확장자 제거하고 소문자로 변환
        return relativePath.replace(/\.mdx$/, "").toLowerCase();
      },
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
