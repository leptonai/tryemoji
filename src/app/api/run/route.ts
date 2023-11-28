import { NextRequest } from "next/server";

const API_URL = process.env?.API_URL || "http://127.0.0.1:8080";
const API_TOKEN = process.env?.API_TOKEN || "";

export async function POST(req: NextRequest) {
  const headers = new Headers();
  headers.set("Accept", `image/jpeg`);
  headers.set("Authorization", `Bearer ${API_TOKEN}`);
  headers.set(
    "Content-Type",
    req.headers.get("Content-Type") || "application/json",
  );
  const url = new URL("/run", API_URL);

  return fetch(url.toString(), {
    body: req.body,
    method: req.method,
    headers,
    duplex: "half",
  } as unknown as RequestInit);
}
