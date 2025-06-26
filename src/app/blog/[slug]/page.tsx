"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { allBlogs } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import MDXRenderer from "@/components/blog/MDXRenderer";

const BlogDetailPage = () => {
  const pathname = usePathname();

  const slug = useMemo(() => {
    const segments = pathname?.split("/").filter(Boolean);
    return segments?.[1]; // 0 = 'blog', 1 = slug
  }, [pathname]);

  const post = allBlogs.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-4">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-8">
          {format(new Date(post.date), "yyyy-MM-dd")}
        </p>
        <hr />
        <article>
          <MDXRenderer code={post.body.code} />
        </article>
      </div>
    </main>
  );
};

export default BlogDetailPage;
