import { BlogPost } from "./post";

export interface FolderStructure {
  [key: string]: {
    posts: BlogPost[];
    isOpen: boolean;
    displayName: string;
  };
}

export interface BlogTreeNode {
  name: string;
  children?: BlogTreeNode[];
  post?: BlogPost;
}
