import { ImageResponse } from "next/og";
import { createClient } from "@vercel/kv";
import { shareString2Json } from "@/util/use-share";

const kv =
  process.env?.KV_REST_API_URL && process.env?.KV_REST_API_TOKEN
    ? createClient({
        url: process.env.KV_REST_API_URL,
        token: process.env.KV_REST_API_TOKEN,
      })
    : null;

export const runtime = "edge";

const siteUrl =
  process.env.NODE_ENV === "production"
    ? "https://www.tryemoji.com/"
    : "http://localhost:3000/";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const image = await fetch(new URL("./image.png", import.meta.url)).then(
    (res) => res.arrayBuffer(),
  );
  let base64URL = "";
  let emoji = "";
  const share = searchParams.get("share");
  const option = share ? shareString2Json(share as string) : null;
  const apiURL = new URL("api/share", siteUrl);
  if (share) {
    apiURL.searchParams.set("share", share);
    const res = await fetch(apiURL.toString());
    base64URL = await res.text();
    emoji = option?.emoji || "👍";
  }
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          background: "#f6f6f6",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <img
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
          width="1024"
          height="768"
          src={image as unknown as string}
        />
        {emoji && (
          <span
            style={{
              width: 40,
              height: 40,
              textAlign: "center",
              lineHeight: "40px",
              background: "#0a0a0b",
              position: "absolute",
              top: 30,
              left: 220,
              fontSize: 36,
              fontFamily: "sans-serif",
            }}
          >
            {emoji}
          </span>
        )}
        {base64URL && (
          <img
            src={base64URL}
            width="512"
            height="512"
            style={{
              position: "absolute",
              borderRadius: 2,
              top: 121,
              right: 54,
              width: 315,
              height: 315,
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        )}
      </div>
    ),
    {
      width: 630,
      height: 473,
    },
  );
}
