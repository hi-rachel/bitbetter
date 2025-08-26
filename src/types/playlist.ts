import { PlaylistCategory, PlaylistType } from "@/constants/playlist";

export interface PlaylistItem {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  type: PlaylistType;
  category: PlaylistCategory;
  isCustom?: boolean;
  createdAt?: number;
}
