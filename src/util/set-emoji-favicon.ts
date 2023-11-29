"use client";

export const setEmojiFavicon = (emoji: string) => {
  if (typeof document === "undefined") return;
  const href = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${emoji}</text></svg>`;
  const link =
    document.querySelector("link[rel*='icon']") ||
    document.createElement("link");
  link.setAttribute("rel", "icon");
  link.setAttribute("href", href);
  document.head.appendChild(link);
};
