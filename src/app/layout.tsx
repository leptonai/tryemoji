import type { Metadata, Viewport } from "next";
import { Sriracha } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";

const inter = Sriracha({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "useEmoji",
  description: "What do emojis look like in the real world?",
};
const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: false,
  maximumScale: 1,
  minimumScale: 1,
};
export { viewport };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
