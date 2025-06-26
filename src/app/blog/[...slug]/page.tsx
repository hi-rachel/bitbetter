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
    return segments?.slice(1).join("/");
  }, [pathname]);

  const post = allBlogs.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-extrabold mb-3 sm:mb-4 leading-tight break-words">
        {post.title}
      </h1>
      <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-8">
        {format(new Date(post.date), "yyyy-MM-dd")}
      </p>
      <hr className="mb-4 sm:mb-8" />
      <article className="w-full overflow-x-auto">
        <div className="w-full">
          <MDXRenderer code={post.body.code} />
        </div>
      </article>
    </div>
  );
};

export default BlogDetailPage;
