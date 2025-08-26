import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://bitbetter.vercel.app"),
  title: "BitBetter | Blog",
  description: "개발 기술 블로그",
  openGraph: {
    title: "BitBetter 기술 블로그",
    description: "개발 기술 블로그",
    images: [
      {
        url: "/images/open-graph/main-og.png",
        width: 1200,
        height: 630,
        alt: "개발과 기술 블로그 - BitBetter",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BitBetter | Blog",
    description: "개발 기술 블로그",
    images: ["/images/open-graph/main-og.png"],
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
