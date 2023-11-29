import type { Metadata, Viewport } from "next";
import { Sriracha } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";

const inter = Sriracha({ weight: "400", subsets: ["latin"] });

const title = "tryEmoji";
const description = "Turn emoji into amazing artwork via AI";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    url: "https://tryemoji.com",
    images: [
      {
        url: "https://tryemoji.com/og.png",
        width: 630,
        height: 473,
        alt: "tryEmoji",
      },
    ],
  },
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
