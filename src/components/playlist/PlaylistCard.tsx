import Image from "next/image";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

import { CardBody, CardContainer, CardItem } from "@/components/ui/Card3D";
import { PLAYLIST_CATEGORIES } from "@/constants/playlist";
import { PlaylistItem } from "@/types/playlist";

interface PlaylistCardProps {
  playlist: PlaylistItem;
  index: number;
}

const categoryColors = {
  [PLAYLIST_CATEGORIES.POP]: "bg-pink-100 text-pink-800 border-pink-200",
  [PLAYLIST_CATEGORIES.LOFI]: "bg-blue-100 text-blue-800 border-blue-200",
  [PLAYLIST_CATEGORIES.JAZZ]: "bg-purple-100 text-purple-800 border-purple-200",
  [PLAYLIST_CATEGORIES.MY_PLAYLIST]:
    "bg-green-100 text-green-800 border-green-200",
};

const categoryIcons = {
  [PLAYLIST_CATEGORIES.POP]: "🎵",
  [PLAYLIST_CATEGORIES.LOFI]: "🎧",
  [PLAYLIST_CATEGORIES.JAZZ]: "🎷",
  [PLAYLIST_CATEGORIES.MY_PLAYLIST]: "⭐",
};

export const PlaylistCard = ({ playlist, index }: PlaylistCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <CardContainer
        className="w-full cursor-pointer"
        containerClassName="w-full"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation();
          window.open(playlist.url, "_blank", "noopener,noreferrer");
        }}
      >
        <CardBody className="w-full h-96 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 group/card relative pointer-events-auto">
          {/* Thumbnail */}
          <CardItem translateZ={50} className="relative group">
            <div className="w-full h-48 relative overflow-hidden">
              <Image
                src={playlist.thumbnail}
                alt={playlist.title}
                fill
                priority={index < 2}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />

              <div className="absolute top-3 right-3">
                <span className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                  {playlist.type}
                </span>
              </div>
            </div>
          </CardItem>

          {/* Content */}
          <CardItem translateZ={100} className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${
                  categoryColors[playlist.category]
                }`}
              >
                <span className="pr-1">{categoryIcons[playlist.category]}</span>
                {playlist.category === PLAYLIST_CATEGORIES.POP && "Pop Song"}
                {playlist.category === PLAYLIST_CATEGORIES.LOFI && "Lofi"}
                {playlist.category === PLAYLIST_CATEGORIES.JAZZ && "Jazz"}
                {playlist.category === PLAYLIST_CATEGORIES.MY_PLAYLIST &&
                  "My Playlist"}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
              {playlist.title}
            </h3>

            <p className="text-gray-600 text-sm mb-3 line-clamp-3 min-h-[4.5rem]">
              {playlist.description}
            </p>

            <div className="flex items-center justify-between mt-auto">
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {playlist.isCustom
                  ? "나만의 플레이리스트"
                  : "추천 플레이리스트"}
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(playlist.url, "_blank", "noopener,noreferrer");
                }}
                className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 text-sm font-medium transition-colors pointer-events-auto relative z-50 bg-transparent border-none cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                듣기
              </button>
            </div>
          </CardItem>
        </CardBody>
      </CardContainer>
    </motion.div>
  );
};
