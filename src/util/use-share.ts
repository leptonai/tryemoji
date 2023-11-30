import { presetArtStyles } from "@/util/presets";
import {
  decompressFromEncodedURIComponent,
  compressToEncodedURIComponent,
} from "lz-string";
import { useSearchParams } from "next/navigation";

export interface Option {
  emoji: string;
  name: string;
  prompt: string;
  seed: number;
  strength: number;
}

const fallbackOptions: Option = {
  emoji: "🐤",
  name: "cat",
  prompt: presetArtStyles[0].prompt,
  seed: 2159232,
  strength: 0.7,
};

export const shareString2Json = (shareString: string): Option => {
  try {
    return JSON.parse(decompressFromEncodedURIComponent(shareString));
  } catch (_) {
    return fallbackOptions;
  }
};

export const useShare = (): { option: Option; hasShare: boolean } => {
  const searchParams = useSearchParams();
  const shareParam = searchParams.get("share");
  if (shareParam) {
    try {
      return {
        option: JSON.parse(decompressFromEncodedURIComponent(shareParam)),
        hasShare: true,
      };
    } catch (_) {
      return { option: fallbackOptions, hasShare: false };
    }
  }
  return { option: fallbackOptions, hasShare: false };
};

export const getShareUrl = (option: Option) => {
  return compressToEncodedURIComponent(JSON.stringify(option));
};
