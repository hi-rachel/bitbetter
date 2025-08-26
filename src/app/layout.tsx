import type { Metadata } from "next";

import { GoogleAnalytics } from "@next/third-parties/google";

import ClientLayout from "@/components/layout/ClientLayout";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bitbetter.vercel.app"),
  title: "BitBetter",
  description: "매일 1%씩 성장하며, 더 나은 삶과 소프트웨어를 설계합니다.",
  openGraph: {
    title: "BitBetter",
    description: "매일 1%씩 성장하며, 더 나은 삶과 소프트웨어를 설계합니다.",
    images: [
      {
        url: "/images/open-graph/main-og.png",
        width: 1200,
        height: 630,
        alt: "BitBetter - 매일 1%씩 성장하는 개발자",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BitBetter",
    description: "매일 1%씩 성장하며, 더 나은 삶과 소프트웨어를 설계합니다.",
    images: ["/images/open-graph/main-og.png"],
  },
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta
          name="google-site-verification"
          content="gPP7sY1hto9tigiWfmR9RgG3B7_Ts2S-SLsfxt5X-Xo"
        />
      </head>
      <GoogleAnalytics gaId="G-7ZDMQ4RV2D" />
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
};

export default RootLayout;
