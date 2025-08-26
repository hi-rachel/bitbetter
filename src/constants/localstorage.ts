export const LOCALSTORAGE_KEYS = {
  CUSTOM_PLAYLISTS: "custom-playlists",
  MY_PLAYLIST_TITLE: "my-playlist-title",
  SELECTED_CATEGORY: "selected-category",
} as const;

export type LocalStorageKey =
  (typeof LOCALSTORAGE_KEYS)[keyof typeof LOCALSTORAGE_KEYS];
