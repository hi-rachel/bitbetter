import { useEffect, useMemo, useState } from "react";

import { LOCALSTORAGE_KEYS } from "@/constants/localstorage";
import { PLAYLIST_CATEGORIES, PLAYLIST_TYPES } from "@/constants/playlist";
import { playlistData } from "@/data/playlists";
import { PlaylistItem } from "@/types/playlist";

export const usePlaylists = () => {
  const [customPlaylists, setCustomPlaylists] = useState<PlaylistItem[]>([]);
  const [myPlaylistTitle, setMyPlaylistTitle] = useState("My Playlist");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    PLAYLIST_CATEGORIES.ALL
  );

  // 로컬 스토리지에서 커스텀 플레이리스트와 제목 로드
  useEffect(() => {
    const stored = localStorage.getItem(LOCALSTORAGE_KEYS.CUSTOM_PLAYLISTS);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setCustomPlaylists(parsed);
      } catch (error) {
        console.error("Failed to parse custom playlists:", error);
      }
    }

    const storedTitle = localStorage.getItem(
      LOCALSTORAGE_KEYS.MY_PLAYLIST_TITLE
    );
    if (storedTitle) {
      setMyPlaylistTitle(storedTitle);
    }

    const storedCategory = localStorage.getItem(
      LOCALSTORAGE_KEYS.SELECTED_CATEGORY
    );
    if (storedCategory) {
      setSelectedCategory(storedCategory);
    } else {
      setSelectedCategory(PLAYLIST_CATEGORIES.ALL);
    }
  }, []);

  // 커스텀 플레이리스트 저장
  const saveCustomPlaylists = (playlists: PlaylistItem[]) => {
    localStorage.setItem(
      LOCALSTORAGE_KEYS.CUSTOM_PLAYLISTS,
      JSON.stringify(playlists)
    );
    setCustomPlaylists(playlists);
  };

  // 커스텀 플레이리스트 추가
  const addCustomPlaylist = (
    playlist: Omit<
      PlaylistItem,
      "id" | "type" | "category" | "thumbnail" | "isCustom" | "createdAt"
    >
  ) => {
    const newPlaylist: PlaylistItem = {
      ...playlist,
      id: `custom-${Date.now()}`,
      type: PLAYLIST_TYPES.PLAYLIST,
      category: PLAYLIST_CATEGORIES.MY_PLAYLIST,
      thumbnail: generateThumbnailUrl(playlist.url),
      isCustom: true,
      createdAt: Date.now(),
    };

    const updatedPlaylists = [...customPlaylists, newPlaylist];
    saveCustomPlaylists(updatedPlaylists);
    return newPlaylist;
  };

  // 커스텀 플레이리스트 수정
  const updateCustomPlaylist = (id: string, updates: Partial<PlaylistItem>) => {
    const updatedPlaylists = customPlaylists.map((playlist) =>
      playlist.id === id
        ? {
            ...playlist,
            ...updates,
            thumbnail: updates.url
              ? generateThumbnailUrl(updates.url)
              : playlist.thumbnail,
          }
        : playlist
    );
    saveCustomPlaylists(updatedPlaylists);
  };

  // 커스텀 플레이리스트 삭제
  const deleteCustomPlaylist = (id: string) => {
    const updatedPlaylists = customPlaylists.filter(
      (playlist) => playlist.id !== id
    );
    saveCustomPlaylists(updatedPlaylists);
  };

  // 모든 플레이리스트 (기본 + 커스텀)
  const allPlaylists = useMemo(
    () => [...playlistData, ...customPlaylists],
    [customPlaylists]
  );

  // 플레이리스트 공유 텍스트 생성 (사용자 추가 플레이리스트만)
  const generateShareText = () => {
    return customPlaylists
      .map((playlist) => {
        let text = `${playlist.title}\n${playlist.url}`;
        if (playlist.description) {
          text += `\n${playlist.description}`;
        }
        return text;
      })
      .join("\n\n");
  };

  // 제목 업데이트 함수
  const updateMyPlaylistTitle = (newTitle: string) => {
    if (newTitle.trim()) {
      localStorage.setItem(
        LOCALSTORAGE_KEYS.MY_PLAYLIST_TITLE,
        newTitle.trim()
      );
      setMyPlaylistTitle(newTitle.trim());
    }
  };

  // 선택된 카테고리 업데이트
  const updateSelectedCategory = (category: string | null) => {
    if (category) {
      localStorage.setItem(LOCALSTORAGE_KEYS.SELECTED_CATEGORY, category);
    } else {
      localStorage.removeItem(LOCALSTORAGE_KEYS.SELECTED_CATEGORY);
    }
    setSelectedCategory(category || PLAYLIST_CATEGORIES.ALL);
  };

  return {
    customPlaylists,
    allPlaylists,
    myPlaylistTitle,
    isEditingTitle,
    selectedCategory,
    addCustomPlaylist,
    updateCustomPlaylist,
    deleteCustomPlaylist,
    updateMyPlaylistTitle,
    updateSelectedCategory,
    setIsEditingTitle,
    generateShareText,
  };
};

// URL 유효성 검사
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// YouTube URL에서 비디오 ID 추출
const extractVideoId = (url: string): string => {
  // URL이 유효하지 않으면 빈 문자열 반환
  if (!isValidUrl(url)) {
    return "";
  }

  const regex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : ""; // 빈 문자열 반환하여 기본 이미지 사용
};

// 썸네일 URL 생성
const generateThumbnailUrl = (url: string): string => {
  const videoId = extractVideoId(url);
  if (!videoId) {
    return "/images/default-playlist-thumbnail.svg";
  }
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
};
