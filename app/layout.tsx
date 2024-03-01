import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
import "98.css";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat on Next.js",
  description: "Experience AOL nostalgia by chatting on this Vercel powered app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
