"use client";

import { useRouter } from "next/navigation";

import { allBlogs } from "contentlayer/generated";
import { FileText } from "lucide-react";

import { BlogTreeNode } from "@/types/blog/folder";
import type { BlogPost } from "@/types/blog/post";

import BlogTree from "./BlogTree";

interface BlogSidebarProps {
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

// slug 배열로 트리 구조 생성
const buildBlogTree = (posts: BlogPost[]): BlogTreeNode[] => {
  const root: BlogTreeNode[] = [];

  posts.forEach((post) => {
    const parts = post.slug.split("/");
    let currentLevel = root;

    parts.forEach((part, idx) => {
      let node = currentLevel.find((n) => n.name === part);

      if (!node) {
        node = { name: part };
        currentLevel.push(node);
      }

      if (idx === parts.length - 1) {
        node.post = post;
      } else {
        if (!node.children) node.children = [];
        currentLevel = node.children;
      }
    });
  });

  // 트리 정렬 함수 (알파벳 순)
  const sortNodes = (nodes: BlogTreeNode[]): void => {
    nodes.sort((a, b) => a.name.localeCompare(b.name, "en"));
    nodes.forEach((node) => {
      if (node.children) sortNodes(node.children);
    });
  };

  sortNodes(root);
  return root;
};

const BlogSidebar = ({
  selectedCategory,
  onCategorySelect,
}: BlogSidebarProps) => {
  const tree = buildBlogTree(allBlogs);
  const router = useRouter();

  // 카테고리 클릭 시 라우팅
  const handleCategorySelect = (category: string | null) => {
    onCategorySelect(category);
    if (category) {
      router.push(`/blog/${category}`);
    } else {
      router.push(`/blog`);
    }
  };

  return (
    <nav className="space-y-4 text-sm font-medium">
      <button
        onClick={() => handleCategorySelect(null)}
        className="text-gray-700 hover:text-indigo-600 flex items-center gap-2 w-full text-left"
        type="button"
      >
        <FileText size={16} />
        전체 글 보기
        <span className="ml-1 text-xs text-gray-400">({allBlogs.length})</span>
      </button>
      <div className="mt-4">
        <BlogTree
          nodes={tree}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />
      </div>
    </nav>
  );
};

export default BlogSidebar;
