import React from "react";

export function GithubForkRibbon() {
  return (
    <div className="hidden md:block overflow-hidden w-[150px] h-[150px] absolute top-0 z-50 right-0">
      <div className="bg-amber-600 text-zinc-100 shadow-2xl absolute p-1 z-50 top-[35px] right-[-45px] rotate-45">
        <a
          className="w-[200px] inline-block p-1 text-center"
          href="https://github.com/leptonai/tryemoji"
          target="_blank"
        >
          Fork me on GitHub
        </a>
      </div>
    </div>
  );
}
