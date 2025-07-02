"use client";

import { useState } from "react";
import Link from "next/link";

import { allBlogs, Blog } from "contentlayer/generated";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";

const getAllTags = (posts: Blog[]): string[] => {
  const tagSet = new Set<string>();
  posts.forEach((post) => {
    post.tags?.forEach((tag: string) => tagSet.add(tag));
  });
  return Array.from(tagSet);
};

const BlogPage = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  // 날짜순으로 블로그 정렬 (최신순)
  const sortedBlogs = allBlogs.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const allTags = getAllTags(allBlogs as Blog[]);
  const filteredBlogs = selectedTag
    ? sortedBlogs.filter((post) => post.tags?.includes(selectedTag))
    : sortedBlogs;

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold">블로그 게시물</h1>

      {/* 태그 뱃지 목록 */}
      <div className="flex flex-wrap gap-2 mb-4">
        {allTags.map((tag: string) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className="focus:outline-none"
            type="button"
          >
            <Badge
              variant={selectedTag === tag ? "default" : "secondary"}
              className="cursor-pointer transition-colors"
            >
              {tag}
            </Badge>
          </button>
        ))}
      </div>

      {/* 선택된 태그 표시 및 전체 해제 */}
      {selectedTag && (
        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm text-gray-600">선택된 태그:</span>
          <Badge variant="default">{selectedTag}</Badge>
          <button
            onClick={() => setSelectedTag(null)}
            className="ml-2 text-xs text-blue-500 underline hover:text-blue-700"
            type="button"
          >
            전체 해제
          </button>
        </div>
      )}

      <div className="space-y-8">
        {filteredBlogs.map((post: Blog) => (
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
              {/* 포스트별 태그 뱃지 */}
              {post.tags && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {post.tags.map((tag: string) => (
                    <Badge
                      key={tag}
                      variant={selectedTag === tag ? "default" : "secondary"}
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedTag(tag);
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </Link>
          </article>
        ))}
        {filteredBlogs.length === 0 && (
          <div className="text-gray-500 text-center py-10">
            해당 태그의 게시물이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
