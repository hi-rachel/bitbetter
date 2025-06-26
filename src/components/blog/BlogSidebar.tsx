"use client";

import Link from "next/link";
import { allBlogs } from "contentlayer/generated";
import { useState } from "react";
import { ChevronDown, ChevronRight, Folder, FileText } from "lucide-react";
import { FOLDER_NAME_MAPPING } from "@/constants/blog";
import { FolderStructure } from "@/types/blog/folder";

const BlogSidebar = () => {
  const [folders, setFolders] = useState<FolderStructure>(() => {
    // 초기 폴더 구조 생성
    const folderStructure: FolderStructure = {};

    allBlogs.forEach((post) => {
      const pathParts = post.slug.split("/");

      // 하위 폴더가 있는 경우에만 폴더로 분류
      if (pathParts.length > 1) {
        const folderName = pathParts[0];
        const displayName = FOLDER_NAME_MAPPING[folderName] || folderName;

        if (!folderStructure[folderName]) {
          folderStructure[folderName] = {
            posts: [],
            isOpen: true, // 기본적으로 열려있음
            displayName: displayName,
          };
        }

        folderStructure[folderName].posts.push({
          _id: post._id,
          slug: post.slug,
          title: post.title,
          category: post.category,
        });
      }
    });

    return folderStructure;
  });

  const toggleFolder = (folderName: string) => {
    setFolders((prev) => ({
      ...prev,
      [folderName]: {
        ...prev[folderName],
        isOpen: !prev[folderName].isOpen,
      },
    }));
  };

  // 루트 레벨 포스트들 (폴더가 없는 포스트들)
  const rootPosts = allBlogs.filter(
    (post) => post.slug.split("/").length === 1
  );

  return (
    <nav className="space-y-4 text-sm font-medium">
      <Link
        href="/blog"
        className="text-gray-700 hover:text-indigo-600 block flex items-center gap-2"
      >
        <FileText size={16} />
        전체 글 보기
      </Link>

      {/* 루트 레벨 포스트들 */}
      {rootPosts.length > 0 && (
        <div className="mt-4 space-y-1">
          {rootPosts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="block text-gray-600 hover:text-indigo-500 truncate py-1 pl-4 border-l border-gray-200 hover:border-indigo-300 transition-colors"
              title={post.title}
            >
              {post.title}
            </Link>
          ))}
        </div>
      )}

      {/* 하위 폴더들 */}
      {Object.keys(folders).length > 0 && (
        <div className="mt-4 space-y-2">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            카테고리
          </div>
          {Object.entries(folders).map(([folderName, folderData]) => (
            <div key={folderName} className="space-y-1">
              {/* 폴더 헤더 */}
              <button
                onClick={() => toggleFolder(folderName)}
                className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 w-full text-left py-1"
              >
                {folderData.isOpen ? (
                  <ChevronDown size={14} />
                ) : (
                  <ChevronRight size={14} />
                )}
                <Folder size={16} className="text-indigo-500" />
                <span className="font-medium">{folderData.displayName}</span>
                <span className="text-xs text-gray-500 ml-auto">
                  ({folderData.posts.length})
                </span>
              </button>

              {/* 폴더 내 포스트들 */}
              {folderData.isOpen && (
                <div className="ml-6 space-y-1">
                  {folderData.posts.map((post) => (
                    <Link
                      key={post._id}
                      href={`/blog/${post.slug}`}
                      className="block text-gray-600 hover:text-indigo-500 truncate py-1 pl-4 border-l border-gray-200 hover:border-indigo-300 transition-colors"
                      title={post.title}
                    >
                      {post.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default BlogSidebar;
