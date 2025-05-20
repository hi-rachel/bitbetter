import { allBlogs } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import MDXRenderer from "@/components/blog/MDXRenderer";

interface Props {
  params: Promise<{ slug: string }> | { slug: string };
}

const BlogDetailPage = async ({ params }: Props) => {
  // params를 await하여 사용
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const post = allBlogs.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-4">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-8">
          {format(new Date(post.date), "yyyy-MM-dd")}
        </p>
        <article>
          <MDXRenderer code={post.body.code} />
        </article>
      </div>
    </main>
  );
};

export default BlogDetailPage;

// 빌드 시간에 모든 가능한 경로를 생성
export const generateStaticParams = async (): Promise<{ slug: string }[]> => {
  return allBlogs.map((post) => ({
    slug: post.slug,
  }));
};
