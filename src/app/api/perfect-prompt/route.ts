import { NextRequest } from "next/server";

const API_URL = process.env?.PERFECT_PROMPT_API_URL || "";
const API_TOKEN = process.env?.PERFECT_PROMPT_API_TOKEN || "";

const systemPrompt =
  "A chat between a curious user and an artificial intelligence assistant. The assistant gives helpful, detailed, and polite answers to the user's questions.Please reply in English no matter what language the user uses. ";

export const maxDuration = 300;
export async function GET(request: NextRequest) {
  const userPrompt = request.nextUrl.searchParams.get("prompt") || "";
  const prompt =
    systemPrompt +
    "USER: Give me an image description of" +
    userPrompt +
    " ASSISTANT: ";
  const headers = new Headers();
  headers.set("Authorization", `Bearer ${API_TOKEN}`);
  headers.set(
    "Content-Type",
    request.headers.get("Content-Type") || "application/json",
  );
  const url = new URL("/api/v1/completions", API_URL);
  return fetch(url.toString(), {
    body: JSON.stringify({
      model: "multi-turn-v18",
      prompt,
      max_tokens: 1000,
    }),
    method: "POST",
    headers,
  });
}
