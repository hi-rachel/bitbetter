"use client";

import { ReactNode } from "react";
import BlogSidebar from "@/components/blog/BlogSidebar";
import TOCContainer from "@/components/blog/TOCContainer";
import { usePathname } from "next/navigation";

interface BlogLayoutProps {
  children: ReactNode;
}

const BlogLayout = ({ children }: BlogLayoutProps) => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const isDetailPage = pathSegments.length > 1 && pathSegments[0] === "blog";

  return (
    <div className="flex min-h-screen bg-white text-gray-900">
      {/* 왼쪽 사이드바 */}
      <aside className="hidden lg:block w-64 border-r border-gray-200 bg-gray-50 px-6 py-8">
        <BlogSidebar />
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-10">{children}</main>

      {/* 오른쪽 목차 (상세 페이지에서만 표시) */}
      {isDetailPage && (
        <aside className="hidden xl:block w-64 border-l border-gray-200 px-6 py-8 relative">
          <div className="h-screen overflow-hidden">
            <TOCContainer />
          </div>
        </aside>
      )}
    </div>
  );
};

export default BlogLayout;
