import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BitBetter",
  description: "1% Everyday Better",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"antialiased"}>{children}</body>
    </html>
  );
}
