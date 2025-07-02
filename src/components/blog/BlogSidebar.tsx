"use client";

import Link from "next/link";

import { allBlogs } from "contentlayer/generated";
import { FileText } from "lucide-react";

import { BlogTreeNode } from "@/types/blog/folder";
import type { BlogPost } from "@/types/blog/post";

import BlogTree from "./BlogTree";

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

  return root;
};

const BlogSidebar = () => {
  const tree = buildBlogTree(allBlogs);

  return (
    <nav className="space-y-4 text-sm font-medium">
      <Link
        href="/blog"
        className="text-gray-700 hover:text-indigo-600 block flex items-center gap-2"
      >
        <FileText size={16} />
        전체 글 보기
      </Link>
      <div className="mt-4">
        <BlogTree nodes={tree} />
      </div>
    </nav>
  );
};

export default BlogSidebar;
