import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://bitbetter.vercel.app"),
  title: "BitBetter | Books",
  description: "개발 기술 서적 및 다양한 분야의 책을 추천합니다.",
  openGraph: {
    title: "개발자 추천 도서",
    description: "개발 기술 서적 및 다양한 분야의 책을 추천합니다.",
    images: [
      {
        url: "/images/open-graph/main-og.png",
        width: 1200,
        height: 630,
        alt: "개발자 추천 도서 - BitBetter",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BitBetter | Books",
    description: "개발 기술 서적 및 다양한 분야의 책을 추천합니다.",
    images: ["/images/open-graph/main-og.png"],
  },
};

export default function BooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
