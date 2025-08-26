"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { allBlogs, Blog } from "contentlayer/generated";
import { format } from "date-fns";

const getAllTags = (posts: Blog[]): string[] => {
  const tagSet = new Set<string>();
  posts.forEach((post) => {
    post.tags?.forEach((tag: string) => tagSet.add(tag));
  });
  return Array.from(tagSet);
};

const BlogPageClient = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  // 날짜순으로 블로그 정렬 (최신순)
  const sortedBlogs: Blog[] = allBlogs.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const allTags: string[] = getAllTags(sortedBlogs as Blog[]);
  const filteredBlogs: Blog[] = selectedTag
    ? sortedBlogs.filter((post) => post.tags?.includes(selectedTag))
    : sortedBlogs;

  const handleTagClick = (tag: string): void => {
    setSelectedTag(selectedTag === tag ? null : tag);
    if (selectedTag !== tag) {
      setIsFilterOpen(true); // 태그 선택시 필터 열기
    }
  };

  const clearSelectedTag = (): void => {
    setSelectedTag(null);
  };

  const toggleFilter = (): void => {
    setIsFilterOpen(!isFilterOpen);
  };

  // 선택된 태그가 있으면 필터 열기
  useEffect(() => {
    if (selectedTag) {
      setIsFilterOpen(true);
    }
  }, [selectedTag]);

  return (
    <div className="max-w-4xl mx-auto space-y-10 px-4">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          블로그 게시물
        </h1>
        <p className="text-gray-600">관심 있는 주제를 선택해보세요</p>
      </div>

      {/* 태그 필터링 섹션 - 접기/펼치기 가능 */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* 필터 헤더 - 항상 표시 */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <button
              onClick={toggleFilter}
              className="flex items-center gap-2 text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors focus:outline-none focus:text-blue-600"
              type="button"
            >
              <span>태그 필터</span>
              <svg
                className={`w-5 h-5 transition-transform duration-200 ${
                  isFilterOpen ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {selectedTag && (
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-xs font-medium">
                  #{selectedTag}
                </div>
                <button
                  onClick={clearSelectedTag}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1"
                  type="button"
                >
                  <span>×</span>
                </button>
              </div>
            )}
          </div>

          {/* 선택된 태그가 없을 때 간단한 설명 */}
          {!selectedTag && (
            <p className="text-sm text-gray-500 mt-1">
              관심 있는 주제를 선택해보세요 ({allTags.length}개 태그)
            </p>
          )}
        </div>

        {/* 필터 내용 - 접기/펼치기 */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            isFilterOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="p-4 space-y-4">
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag: string) => {
                const isSelected = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full transition-all duration-200 hover:scale-105"
                    type="button"
                  >
                    <div
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        isSelected
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                      }`}
                    >
                      #{tag}
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedTag && (
              <div className="pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500">필터 결과:</span>
                  <span className="text-gray-700 font-medium">
                    {filteredBlogs.length}개 게시물
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 블로그 게시물 목록 */}
      <div className="space-y-6">
        {filteredBlogs.map((post: Blog) => (
          <article
            key={post.slug}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
          >
            <Link href={`/blog/${post.slug}`} className="block group">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <time className="text-sm text-gray-500 whitespace-nowrap">
                    {format(new Date(post.date), "yy/MM/dd")}
                  </time>
                </div>

                {post.description && (
                  <p className="text-gray-600 line-clamp-2 text-sm leading-relaxed">
                    {post.description}
                  </p>
                )}

                {/* 포스트별 태그 */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag: string) => {
                      const isTagSelected = selectedTag === tag;
                      return (
                        <span
                          key={tag}
                          onClick={(e) => {
                            e.preventDefault();
                            handleTagClick(tag);
                          }}
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer transition-all duration-200 hover:scale-105 ${
                            isTagSelected
                              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-sm"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          #{tag}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            </Link>
          </article>
        ))}

        {filteredBlogs.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <div className="space-y-3">
              <div className="text-4xl">🔍</div>
              <h3 className="text-lg font-medium text-gray-900">
                게시물을 찾을 수 없습니다
              </h3>
              <p className="text-gray-500 text-sm">
                {selectedTag} 태그에 해당하는 게시물이 없습니다.
              </p>
              <button
                onClick={clearSelectedTag}
                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                type="button"
              >
                전체 게시물 보기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPageClient;
