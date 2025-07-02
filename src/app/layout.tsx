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
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
};

export default RootLayout;
