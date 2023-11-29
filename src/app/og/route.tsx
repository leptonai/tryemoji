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
          width="800"
          height="471"
          src={image as unknown as string}
        />
        {emoji && (
          <span
            style={{
              width: 45,
              height: 45,
              textAlign: "center",
              lineHeight: "40px",
              background: "#0a0a0b",
              position: "absolute",
              top: 38,
              left: 305,
              fontSize: 40,
              fontFamily: "sans-serif",
            }}
          >
            {emoji}
          </span>
        )}
        {base64URL && (
          <img
            src={base64URL}
            width="302"
            height="302"
            style={{
              position: "absolute",
              borderRadius: 8,
              top: 125,
              right: 150,
              width: 302,
              height: 302,
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        )}
      </div>
    ),
    {
      width: 800,
      height: 471,
    },
  );
}
