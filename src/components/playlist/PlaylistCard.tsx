import Image from "next/image";

import { CardBody, CardContainer, CardItem } from "@/components/ui/Card3D";
import { PLAYLIST_CATEGORIES } from "@/constants/playlist";
import { PlaylistItem } from "@/types/playlist";

interface PlaylistCardProps {
  playlist: PlaylistItem;
  index: number;
}

const categoryColors = {
  [PLAYLIST_CATEGORIES.ALL]: "bg-gray-100 text-gray-800 border-gray-200",
  [PLAYLIST_CATEGORIES.POP]: "bg-pink-100 text-pink-800 border-pink-200",
  [PLAYLIST_CATEGORIES.LOFI]: "bg-blue-100 text-blue-800 border-blue-200",
  [PLAYLIST_CATEGORIES.JAZZ]: "bg-purple-100 text-purple-800 border-purple-200",
  [PLAYLIST_CATEGORIES.MY_PLAYLIST]:
    "bg-green-100 text-green-800 border-green-200",
};

const categoryIcons = {
  [PLAYLIST_CATEGORIES.ALL]: "🎵",
  [PLAYLIST_CATEGORIES.POP]: "🎵",
  [PLAYLIST_CATEGORIES.LOFI]: "🎧",
  [PLAYLIST_CATEGORIES.JAZZ]: "🎷",
  [PLAYLIST_CATEGORIES.MY_PLAYLIST]: "⭐",
};

export const PlaylistCard = ({ playlist, index }: PlaylistCardProps) => {
  return (
    <CardContainer
      className="w-full h-[384px] cursor-pointer"
      containerClassName="w-full h-[384px]"
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        window.open(playlist.url, "_blank", "noopener,noreferrer");
      }}
    >
      <CardBody className="w-full h-[384px] bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 group/card relative pointer-events-auto">
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
        <CardItem translateZ={100} className="p-6 flex flex-col h-full">
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

          <p className="text-gray-600 text-sm mb-3 line-clamp-3 min-h-[4.5rem] flex-1">
            {playlist.description}
          </p>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
};
