"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import { allBlogs } from "contentlayer/generated";

import BlogPage from "@/app/blog/page";

import BlogSidebar from "./BlogSidebar";
import TOCContainer from "./TOCContainer";

interface BlogLayoutClientProps {
  children: React.ReactNode;
}

const BlogLayoutClient = ({ children }: BlogLayoutClientProps) => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const isDetailPage = pathSegments.length > 1 && pathSegments[0] === "blog";
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 실제 포스트(slug)와 일치하는지 판별
  const currentSlug = pathSegments.slice(1).join("/").toLowerCase();
  const isPostPage = allBlogs.some((post) => post.slug === currentSlug);

  return (
    <div className="flex min-h-screen bg-white text-gray-900">
      {/* 왼쪽 사이드바 */}
      <aside className="hidden lg:block w-64 flex-shrink-0 border-r border-gray-200 bg-gray-50 px-4 lg:px-6 py-8">
        <BlogSidebar
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 min-w-0 px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-10">
        <div className="max-w-4xl mx-auto w-full">
          {/* 블로그 메인 페이지면 BlogPage에 props로 직접 렌더링, 상세/기타 페이지면 children 그대로 */}
          {!isDetailPage ? <BlogPage /> : children}
        </div>
      </main>

      {/* 오른쪽 목차 (상세 글 페이지에서만 표시) */}
      {isDetailPage && isPostPage && (
        <aside className="hidden xl:block w-64 flex-shrink-0 border-l border-gray-200 px-4 xl:px-6 py-8 relative">
          <div className="h-screen overflow-y-auto">
            <TOCContainer />
          </div>
        </aside>
      )}
    </div>
  );
};

export default BlogLayoutClient;
