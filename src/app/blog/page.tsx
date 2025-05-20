import Link from "next/link";
import { allBlogs } from "contentlayer/generated";
import { format } from "date-fns";

const BlogPage = () => {
  // 날짜순으로 블로그 정렬 (최신순)
  const sortedBlogs = allBlogs.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold">블로그 게시물</h1>

      <div className="space-y-8">
        {sortedBlogs.map((post) => (
          <article key={post.slug} className="border-b border-gray-200 pb-8">
            <Link href={`/blog/${post.slug}`} className="block group">
              <h2 className="text-2xl font-semibold group-hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
              <time className="text-sm text-gray-500 block mt-1">
                {format(new Date(post.date), "yyyy년 MM월 dd일")}
              </time>
              {post.description && (
                <p className="mt-3 text-gray-700">{post.description}</p>
              )}
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
