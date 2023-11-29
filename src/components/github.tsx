import React from "react";

export function GithubForkRibbon() {
  return (
    <div className="overflow-hidden w-[150px] h-[150px] absolute top-0 z-50 right-0">
      <div className="bg-zinc-100 text-zinc-950 font-bold shadow-2xl absolute p-2 z-50 top-[28px] right-[-55px] rotate-45">
        <a
          className="w-[200px] inline-block p-2 text-center"
          href="https://github.com/leptonai/tryemoji"
          target="_blank"
        >
          Fork me on GitHub
        </a>
      </div>
    </div>
  );
}
