import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://bitbetter.vercel.app"),
  title: "BitBetter | 1%",
  description: "나의 깃허브 커밋을 분석하고 성장 기록을 확인해 보세요.",
  openGraph: {
    title: "매일 1%씩 성장하는 개발자",
    description:
      "깃허브 아이디를 입력하고 나의 GitHub 활동과 성장 기록을 확인해 보세요.",
    images: [
      {
        url: "/images/open-graph/1percent-og.png",
        width: 1200,
        height: 630,
        alt: "매일 1%씩 성장하는 개발자 - BitBetter",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BitBetter | 1%",
    description:
      "깃허브 아이디를 입력하고 나의 GitHub 활동과 성장 기록을 확인해 보세요.",
    images: ["/images/open-graph/1percent-og.png"],
  },
};

export default function OnePercentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
