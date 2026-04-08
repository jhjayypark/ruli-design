import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ruli DS — Design System Playground",
  description: "Ruli design system component playground",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
