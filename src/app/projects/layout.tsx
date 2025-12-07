import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://bitbetter.vercel.app"),
  title: "BitBetter | Projects",
  description:
    "개발한 프로젝트들을 확인하고, 각 프로젝트의 서비스 링크와 GitHub 저장소를 탐색해보세요.",
  openGraph: {
    title: "Raina's Projects",
    description:
      "개발한 프로젝트들을 확인하고, 각 프로젝트의 서비스 링크와 GitHub 저장소를 탐색해보세요.",
    images: [
      {
        url: "/images/open-graph/projects-og.png",
        width: 1200,
        height: 630,
        alt: "개발 프로젝트 모음 - BitBetter",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BitBetter | Projects",
    description:
      "개발한 프로젝트들을 확인하고, 각 프로젝트의 서비스 링크와 GitHub 저장소를 탐색해보세요.",
    images: ["/images/open-graph/projects-og.png"],
  },
};

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
