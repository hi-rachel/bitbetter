"use client";

import { useMemo } from "react";

import { motion } from "framer-motion";

import { MyPlaylistSection } from "@/components/playlist/MyPlaylistSection";
import { PlaylistList } from "@/components/playlist/PlaylistList";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { PLAYLIST_CATEGORIES } from "@/constants/playlist";
import { usePlaylists } from "@/hooks/usePlaylists";

const PlaylistPage = () => {
  const {
    allPlaylists,
    myPlaylistTitle,
    selectedCategory,
    updateSelectedCategory,
  } = usePlaylists();

  const filteredPlaylists = allPlaylists.filter((playlist) => {
    const matchesCategory =
      selectedCategory === PLAYLIST_CATEGORIES.ALL ||
      selectedCategory === null ||
      playlist.category === selectedCategory;
    return matchesCategory;
  });

  const categories = useMemo(
    () => [
      ...Array.from(
        new Set(
          allPlaylists
            .filter((p) => p.category !== PLAYLIST_CATEGORIES.MY_PLAYLIST)
            .map((p) => p.category)
        )
      ),
      PLAYLIST_CATEGORIES.MY_PLAYLIST,
    ],
    [allPlaylists, myPlaylistTitle]
  );

  return (
    <AuroraBackground className="min-h-screen">
      <div className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-4">
              <span className="block bg-gradient-to-r from-blue-600 via-purple-700 to-violet-800 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient-x pb-1">
                Playlist
              </span>
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              집중력 향상과 창의적 사고를 위한 최고의 유튜브 플레이리스트들을
              모았습니다.
              <br />
              작업할 때 듣기 좋은 음악들로 생산성을 높여보세요!
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3 relative z-10">
              <button
                onClick={() => updateSelectedCategory(PLAYLIST_CATEGORIES.ALL)}
                className={`px-4 py-2 rounded-full border transition-all relative z-10 ${
                  selectedCategory === PLAYLIST_CATEGORIES.ALL ||
                  selectedCategory === null
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-gray-600 border-gray-300 hover:border-indigo-300"
                }`}
              >
                전체
              </button>
              {categories.map((category) => (
                <button
                  key={
                    category === PLAYLIST_CATEGORIES.MY_PLAYLIST
                      ? `${category}-${myPlaylistTitle}`
                      : category
                  }
                  onClick={() => updateSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full border transition-all relative z-10 ${
                    selectedCategory === category
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-gray-600 border-gray-300 hover:border-indigo-300"
                  }`}
                >
                  {category === PLAYLIST_CATEGORIES.POP && "Pop Song"}
                  {category === PLAYLIST_CATEGORIES.LOFI && "Lofi"}
                  {category === PLAYLIST_CATEGORIES.JAZZ && "Jazz"}
                  {category === PLAYLIST_CATEGORIES.MY_PLAYLIST &&
                    myPlaylistTitle}
                </button>
              ))}
            </div>
          </motion.div>

          {/* My Playlist Section */}
          {selectedCategory === PLAYLIST_CATEGORIES.MY_PLAYLIST && (
            <MyPlaylistSection />
          )}

          {/* Playlist List */}
          {(selectedCategory === PLAYLIST_CATEGORIES.ALL ||
            selectedCategory === null ||
            selectedCategory !== PLAYLIST_CATEGORIES.MY_PLAYLIST) && (
            <PlaylistList playlists={filteredPlaylists} />
          )}
        </div>
      </div>
    </AuroraBackground>
  );
};

export default PlaylistPage;
