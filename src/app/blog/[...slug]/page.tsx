"use client";

import React from "react";
import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { notFound } from "next/navigation";

import { allBlogs } from "contentlayer/generated";
import { format } from "date-fns";

import MDXRenderer from "@/components/blog/MDXRenderer";
import { FOLDER_NAME_MAPPING } from "@/constants/blog";

const BlogDetailPage = () => {
  const pathname = usePathname();

  const slug = useMemo(() => {
    const segments = pathname?.split("/").filter(Boolean);
    return segments?.slice(1).join("/");
  }, [pathname]);

  const post = allBlogs.find((p) => p.slug === slug);
  const postsInCategory = allBlogs.filter(
    (p) => p.slug.startsWith(slug + "/") || p.slug === slug
  );

  // 글도 없고, 카테고리 글도 없을 때만 404
  if (!post && postsInCategory.length === 0) {
    notFound();
  }

  // 카테고리 글 목록만 있을 때 목록만 렌더링 (전체 글 목록 UI와 동일하게)
  if (!post && postsInCategory.length > 0) {
    // slug의 마지막 값만 추출해서 매핑
    const slugArr = slug.split("/");
    const lastSlug = slugArr[slugArr.length - 1]?.toLowerCase().trim();
    const displayName = FOLDER_NAME_MAPPING[lastSlug] || lastSlug;
    return (
      <div className="max-w-4xl mx-auto space-y-10 px-4">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {displayName}
          </h1>
        </div>
        <div className="space-y-6">
          {postsInCategory.map((p) => (
            <article
              key={p.slug}
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
            >
              <Link href={`/blog/${p.slug}`} className="block group">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {p.title}
                    </h2>
                    <time className="text-sm text-gray-500 whitespace-nowrap">
                      {format(new Date(p.date), "yy/MM/dd")}
                    </time>
                  </div>
                  {p.description && (
                    <p className="text-gray-600 line-clamp-2 text-sm leading-relaxed">
                      {p.description}
                    </p>
                  )}
                  {/* 포스트별 태그 */}
                  {p.tags && p.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className={
                            "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    );
  }

  // post가 존재할 때만 상세 페이지 렌더링
  if (post) {
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
  }
};

export default BlogDetailPage;
