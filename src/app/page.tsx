import { Metadata } from "next";
import TryEmoji from "@/components/try-emoji";

type Props = {
  params: { share?: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(po: Props): Promise<Metadata> {
  // read route params
  const share = po.searchParams?.share;

  const siteUrl =
    process.env.NODE_ENV === "production"
      ? "https://www.tryemoji.com/"
      : "http://localhost:3000/";
  const ogUrl = new URL("og", siteUrl);
  if (share) {
    ogUrl.searchParams.set("share", share as string);
  }
  return {
    openGraph: {
      images: [
        {
          url: ogUrl.toString(),
          width: 630,
          height: 473,
          alt: "tryEmoji",
        },
      ],
    },
  };
}

export default function Home() {
  return <TryEmoji />;
}
