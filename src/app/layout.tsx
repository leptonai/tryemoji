import type { Metadata, Viewport } from "next";
import { Sriracha } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";

const inter = Sriracha({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "useEmoji",
  description: "Turn emoji into amazing artwork via AI",
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
      <Analytics></Analytics>
    </html>
  );
}
