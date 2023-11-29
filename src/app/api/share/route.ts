import { NextRequest } from "next/server";
import { createClient } from "@vercel/kv";

const kv =
  process.env?.KV_REST_API_URL && process.env?.KV_REST_API_TOKEN
    ? createClient({
        url: process.env.KV_REST_API_URL,
        token: process.env.KV_REST_API_TOKEN,
      })
    : null;

export async function POST(req: NextRequest) {
  const { key, image } = await req.json();

  if (!kv || !key || !image) {
    return new Response("", {
      status: 200,
    });
  }

  const slug = key.replace(/[^a-zA-Z0-9]/g, "_");

  await kv.set(slug, image);

  return new Response("", {
    status: 200,
  });
}

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("share");

  if (!kv || !key) {
    return new Response("", {
      status: 200,
    });
  }
  const slug = key.replace(/[^a-zA-Z0-9]/g, "_");
  const image = await kv.get<string>(slug);

  if (!image) {
    return new Response("", {
      status: 200,
    });
  }

  return new Response(image, {
    status: 200,
  });
}
