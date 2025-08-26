import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "작업할 때 듣는 음악 | BitBetter",
  description:
    "작업할 때 듣기 좋은 음악을 확인하고, 나만의 플레이리스트를 만들어 친구, 동료와 공유해 보세요.",
  openGraph: {
    title: "BitBetter | Playlist",
    description:
      "작업할 때 듣기 좋은 음악을 확인하고, 나만의 플레이리스트를 만들어 친구, 동료와 공유해 보세요.",
    images: [
      {
        url: "/images/open-graph/playlist-og.png",
        width: 1200,
        height: 630,
        alt: "작업할 때 듣는 음악 - BitBetter 플레이리스트",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BitBetter | Playlist",
    description:
      "작업할 때 듣기 좋은 음악을 확인하고, 나만의 플레이리스트를 만들어 친구, 동료와 공유해 보세요.",
    images: ["/images/open-graph/playlist-og.png"],
  },
};

export default function PlaylistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
