import { useState } from "react";
import Link from "next/link";

import { ChevronDown, ChevronRight, Folder } from "lucide-react";

import { FOLDER_NAME_MAPPING } from "@/constants/blog";
import { BlogTreeNode } from "@/types/blog/folder";

interface BlogTreeProps {
  nodes: BlogTreeNode[];
  depth?: number;
  selectedCategory?: string | null;
  onCategorySelect?: (category: string | null) => void;
  parentPath?: string;
}

// 하위까지 포함한 포스트 개수 계산 함수
const countPosts = (node: BlogTreeNode): number => {
  if (node.post && !node.children) return 1;
  if (node.children)
    return node.children.reduce((sum, child) => sum + countPosts(child), 0);
  return 0;
};

const BlogTree: React.FC<BlogTreeProps> = ({
  nodes,
  depth = 0,
  selectedCategory,
  onCategorySelect,
  parentPath = "",
}) => {
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});

  const toggleFolder = (path: string) => {
    setOpenFolders((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const selectCategory = (path: string) => {
    if (onCategorySelect) {
      onCategorySelect(path);
    }
  };

  return (
    <ul>
      {nodes.map((node) => {
        // currentPath를 항상 소문자+trim으로 생성
        const currentPath = (
          parentPath ? `${parentPath}/${node.name}` : node.name
        )
          .toLowerCase()
          .trim();
        const liClass = depth > 0 ? "border-l border-gray-200" : "";
        if (node.post && !node.children) {
          // 파일(포스트)
          return (
            <li key={currentPath} className={liClass}>
              <Link
                href={`/blog/${node.post.slug}`}
                className={`block text-gray-600 hover:text-indigo-500 truncate py-1 transition-colors pl-6`}
                title={node.post.title}
              >
                {node.post.title}
              </Link>
            </li>
          );
        }
        // 폴더
        const displayName =
          FOLDER_NAME_MAPPING[node.name.toLowerCase()] || node.name;
        const isSelected = selectedCategory === currentPath;
        const postCount = countPosts(node);
        // 폴더 레벨별 스타일
        const folderTextClass =
          depth === 0 ? "text-base font-extrabold" : "font-bold";
        return (
          <li
            key={currentPath}
            style={{ paddingLeft: depth > 0 ? 10 : 0 }}
            className={depth > 0 ? "border-l border-gray-200" : ""}
          >
            <div className="flex items-center w-full">
              {/* 화살표 아이콘: 열고 닫기만 */}
              <button
                type="button"
                onClick={() => toggleFolder(currentPath)}
                className="flex items-center justify-center focus:outline-none"
                tabIndex={-1}
                aria-label={
                  openFolders[currentPath] !== false ? "폴더 닫기" : "폴더 열기"
                }
              >
                {openFolders[currentPath] !== false ? (
                  <ChevronDown size={14} />
                ) : (
                  <ChevronRight size={14} />
                )}
              </button>
              {/* 폴더 아이콘+이름: 카테고리 선택만 */}
              <button
                type="button"
                onClick={() => selectCategory(currentPath)}
                className={`flex items-center gap-2 flex-1 text-left py-1 transition-colors pl-2 ${
                  isSelected
                    ? "text-indigo-600 font-bold"
                    : "text-gray-700 hover:text-indigo-600"
                }`}
              >
                <Folder size={16} className="text-indigo-500" />
                <span className={`font-medium truncate ${folderTextClass}`}>
                  {displayName}
                </span>
                <span className="ml-1 text-xs text-gray-400">
                  ({postCount})
                </span>
              </button>
            </div>
            {openFolders[currentPath] !== false && node.children && (
              <BlogTree
                nodes={node.children}
                depth={depth + 1}
                selectedCategory={selectedCategory}
                onCategorySelect={onCategorySelect}
                parentPath={currentPath}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default BlogTree;
