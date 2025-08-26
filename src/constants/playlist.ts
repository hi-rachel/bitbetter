export const PLAYLIST_TYPES = {
  PLAYLIST: "Playlist",
  LIVE: "Live",
} as const;

export const PLAYLIST_CATEGORIES = {
  ALL: "all",
  MY_PLAYLIST: "my-playlist",
  POP: "pop",
  LOFI: "lofi",
  JAZZ: "jazz",
} as const;

export type PlaylistType = (typeof PLAYLIST_TYPES)[keyof typeof PLAYLIST_TYPES];
export type PlaylistCategory =
  (typeof PLAYLIST_CATEGORIES)[keyof typeof PLAYLIST_CATEGORIES];
