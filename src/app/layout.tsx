import type { Metadata } from "next";
import "./globals.css";
import NavigationGuard from "./components/layout/NavigationGuard";

export const metadata: Metadata = {
  title: "BitBetter",
  description: "1% Everyday Better",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 준비 중으로 표시할 경로 목록
  const pendingRoutes = ["/blog", "/books", "/bookmark", "/1-percent"];

  return (
    <html lang="en">
      <body className={"antialiased"}>
        <NavigationGuard pendingRoutes={pendingRoutes}>
          {children}
        </NavigationGuard>
      </body>
    </html>
  );
}
