"use client";
import { Dice } from "@/components/dice";
import { EmojiSelector } from "@/components/emoji-selector";
import { GithubForkRibbon } from "@/components/github";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Toaster } from "@/components/ui/toaster";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { presetImage, presetArtStyles } from "@/util/presets";
import { usePrevious } from "@/util/use-previous";
import { useResponse } from "@/util/use-response";
import { getShareUrl, Option, useShare } from "@/util/use-share";
import { clsx } from "clsx";
import { Check, Download, Share2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterShareButton,
  XIcon,
} from "react-share";
import { setEmojiFavicon } from "@/util/set-emoji-favicon";

export default function TryEmoji() {
  const { option: presetOption, hasShare } = useShare();
  const { toast } = useToast();
  const [emoji, setEmoji] = useState({
    emoji: presetOption.emoji,
    name: presetOption.name,
  });
  const [preset, setPreset] = useState(
    presetArtStyles.find((p) => p.prompt === presetOption.prompt)!,
  );
  const [strength, setStrength] = useState(presetOption.strength);
  const [seed, setSeed] = useState(presetOption.seed);

  const shareOption: Option = useMemo(() => {
    return {
      emoji: emoji.emoji,
      name: emoji.name,
      prompt: preset.prompt,
      seed: seed,
      strength: strength,
    };
  }, [emoji.emoji, emoji.name, preset.prompt, seed, strength]);

  const { image, loading } = useResponse(
    hasShare,
    emoji.emoji,
    emoji.name,
    preset.prompt,
    strength,
    seed,
  );
  const previousImage = usePrevious(image);

  const mergedImage = useMemo(
    () => image || previousImage || presetImage,
    [image, previousImage],
  );

  useEffect(() => {
    setEmojiFavicon(emoji.emoji);
  }, [emoji.emoji]);

  const shareKey = useMemo(() => {
    return getShareUrl(shareOption);
  }, [shareOption]);

  const shareUrl = useMemo(() => {
    return `https://tryemoji.com?share=${shareKey}`;
  }, [shareKey]);

  const warmOrg: Promise<void> = useMemo(() => {
    if (image) {
      return fetch("/api/share", {
        method: "POST",
        body: JSON.stringify({
          image: image,
          key: shareKey,
        }),
      }).then();
    } else {
      return new Promise((resolve) => resolve());
    }
  }, [image, shareKey]);

  return (
    <TooltipProvider delayDuration={50}>
      <Toaster />
      <div className="min-h-screen flex flex-col gap-4 bg-zinc-950 items-center justify-center py-12">
        <GithubForkRibbon></GithubForkRibbon>
        <div className="text-6xl text-zinc-100">
          {emoji.emoji || "🐱"} tryEmoji{" "}
        </div>
        <div className="text-xl text-zinc-100">
          Turn emoji into amazing artwork via AI
        </div>
        <div className="flex items-center justify-center flex-col md:flex-row gap-4">
          <div className="flex-0 w-full md:w-80">
            <EmojiSelector
              onSelect={(e) => {
                const keyword = e.keywords.join(", ");
                const emoji = e.native;
                const name = `${e.name}, ${keyword}`;
                setEmoji({ emoji, name });
              }}
            ></EmojiSelector>
          </div>
          <div className="flex-1">
            <div className="max-w-[100vw] h-[512px] w-[512px] rounded-lg overflow-hidden bg-zinc-900 relative">
              <img src={mergedImage} className="h-full w-full object-contain" />
              <div
                className={clsx("transition absolute inset-0", {
                  "backdrop-blur-xl": loading,
                })}
              ></div>
              <div className="absolute top-2 right-2 flex gap-2 items-center">
                <FacebookShareButton
                  beforeOnClick={() => warmOrg}
                  url={shareUrl}
                >
                  <FacebookIcon className="rounded" size={24}></FacebookIcon>
                </FacebookShareButton>
                <TwitterShareButton onClick={() => warmOrg} url={shareUrl}>
                  <XIcon className="rounded" size={24} />
                </TwitterShareButton>
                <LinkedinShareButton onClick={() => warmOrg} url={shareUrl}>
                  <LinkedinIcon className="rounded" size={24} />
                </LinkedinShareButton>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => {
                        warmOrg.then(() => {
                          navigator.clipboard.writeText(shareUrl).then(() => {
                            toast({
                              description: (
                                <div className="flex gap-2 text-sm items-center">
                                  <Check className="text-green-500"></Check>
                                  Copied, paste to share
                                </div>
                              ),
                            });
                          });
                        });
                      }}
                      className="flex-0 rounded bg-amber-600 w-6 flex items-center justify-center h-6 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                    >
                      <Share2 size={16}></Share2>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="absolute bottom-2 left-2 right-2 flex gap-2 flex-wrap">
                <div className="flex flex-auto gap-2 w-full md:w-auto">
                  <div className="text-xl text-zinc-100">AI</div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Slider
                        className="flex-1"
                        defaultValue={[strength]}
                        onValueChange={(v) => setStrength(v[0])}
                        max={0.7}
                        min={0.5}
                        step={0.025}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>AI strength</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="flex flex-auto md:flex-grow-0 gap-2 w-full md:w-auto">
                  <Select
                    value={preset.artist}
                    onValueChange={(value) =>
                      setPreset(
                        presetArtStyles.find((p) => p.artist === value)!,
                      )
                    }
                  >
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SelectTrigger className="flex-1 w-56 border-0 rounded bg-amber-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600">
                          <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Art style</p>
                      </TooltipContent>
                    </Tooltip>

                    <SelectContent>
                      {presetArtStyles.map((p) => (
                        <SelectItem key={p.artist} value={p.artist}>
                          {p.artist}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => {
                          setSeed(Math.floor(Math.random() * 2159232));
                        }}
                        className="flex-0 rounded bg-amber-600 px-0.5 py-0.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                      >
                        <Dice></Dice>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Random</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href={image}
                        download
                        className="flex-0 block rounded bg-amber-600 px-0.5 py-0.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                      >
                        <Download />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Download</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-xs text-zinc-500 font-sans mt-8 hover:text-zinc-100">
          <a href="https://lepton.ai" target="_blank">
            Powered by Lepton AI
          </a>
        </div>
      </div>
    </TooltipProvider>
  );
}
