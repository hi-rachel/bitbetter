import type { Metadata } from "next";

import ClientLayout from "@/components/layout/ClientLayout";

import "./globals.css";

export const metadata: Metadata = {
  title: "BitBetter",
  description: "1% Everyday Better",
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
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
};

export default RootLayout;
