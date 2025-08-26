import { motion } from "framer-motion";

import { PlaylistCard } from "@/components/playlist/PlaylistCard";
import { PlaylistItem } from "@/types/playlist";

interface PlaylistListProps {
  playlists: PlaylistItem[];
  showDeleteButton?: boolean;
  onDelete?: (id: string) => void;
}

export const PlaylistList = ({
  playlists,
  showDeleteButton = false,
  onDelete,
}: PlaylistListProps) => {
  if (playlists.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <div className="text-gray-400 mb-4">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-2xl">🎵</span>
          </div>
          <p className="text-lg">플레이리스트가 없습니다</p>
          <p className="text-sm">플레이리스트를 추가해보세요!</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="flex flex-wrap gap-6 w-full justify-center"
    >
      {playlists.map((playlist, index) => (
        <div
          key={playlist.id}
          className="flex-1 min-w-[280px] max-w-[320px] h-[384px] relative group"
        >
          <PlaylistCard playlist={playlist} index={index} />
          {showDeleteButton && onDelete && (
            <button
              onClick={() => onDelete(playlist.id)}
              className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity z-50 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      ))}
    </motion.div>
  );
};
