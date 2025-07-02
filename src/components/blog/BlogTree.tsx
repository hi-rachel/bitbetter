import { useState } from "react";
import Link from "next/link";

import { ChevronDown, ChevronRight, Folder } from "lucide-react";

import { FOLDER_NAME_MAPPING } from "@/constants/blog";
import { BlogTreeNode } from "@/types/blog/folder";

const BlogTree: React.FC<{ nodes: BlogTreeNode[]; depth?: number }> = ({
  nodes,
  depth = 0,
}) => {
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});

  const toggle = (path: string) => {
    setOpenFolders((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  return (
    <ul style={{ paddingLeft: 0 }}>
      {nodes.map((node) => {
        const path = node.post
          ? node.post.slug
          : node.name + (depth > 0 ? `-${depth}` : "");
        if (node.post && !node.children) {
          // 파일(포스트)
          return (
            <li key={path}>
              <Link
                href={`/blog/${node.post.slug}`}
                className="block text-gray-600 hover:text-indigo-500 truncate py-1 pl-4 border-l border-gray-200 hover:border-indigo-300 transition-colors"
                title={node.post.title}
              >
                {node.post.title}
              </Link>
            </li>
          );
        }
        // 폴더
        const displayName = FOLDER_NAME_MAPPING[node.name] || node.name;
        return (
          <li key={path}>
            <button
              type="button"
              onClick={() => toggle(path)}
              className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 w-full text-left py-1"
            >
              {openFolders[path] !== false ? (
                <ChevronDown size={14} />
              ) : (
                <ChevronRight size={14} />
              )}
              <Folder size={16} className="text-indigo-500" />
              <span className="font-medium">{displayName}</span>
            </button>
            {openFolders[path] !== false && node.children && (
              <BlogTree nodes={node.children} depth={depth + 1} />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default BlogTree;
