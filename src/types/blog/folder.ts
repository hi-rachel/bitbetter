import { BlogPost } from "./post";

export interface FolderStructure {
  [key: string]: {
    posts: BlogPost[];
    isOpen: boolean;
    displayName: string;
  };
}
