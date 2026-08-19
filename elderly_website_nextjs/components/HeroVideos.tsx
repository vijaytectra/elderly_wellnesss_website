"use client";

import Image from "next/image";
import { useState } from "react";

const SLIDES = [
  { label: "Physio", src: "/videos/home/1.mp4", poster: "/videos/home/poster-1.jpg" },
  { label: "Nursing", src: "/videos/home/2.mp4", poster: "/videos/home/poster-2.jpg" },
  { label: "Geriatric", src: "/videos/home/3.mp4", poster: "/videos/home/poster-3.jpg" },
] as const;

export function HeroVideos() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const slide = SLIDES[index] ?? SLIDES[0];

  return (
    <div className="relative mx-auto w-full max-w-[560px] md:ml-auto">
      <div className="relative aspect-square w-full overflow-hidden rounded-[40px] bg-[#181a22]">
        {playing ? (
          <video
            key={slide.src}
            src={slide.src}
            poster={slide.poster}
            muted
            loop
            playsInline
            autoPlay
            preload="none"
            className="h-full w-full object-cover"
          />
        ) : (
          <Image
            src={slide.poster}
            alt="Elderly care at home in Chennai"
            fill
            priority={index === 0}
            quality={80}
            sizes="(max-width: 768px) 100vw, 560px"
            className="object-cover"
          />
        )}
        {!playing ? (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="absolute inset-0 z-10 flex items-center justify-center bg-black/20"
            aria-label={`Play ${slide.label} video`}
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--color-brand)] text-white shadow-lg">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        ) : null}
      </div>
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 overflow-hidden rounded-full bg-black/55 p-1">
        {SLIDES.map((s, i) => (
          <button
            key={s.label}
            type="button"
            onClick={() => {
              setIndex(i);
              setPlaying(false);
            }}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
              i === index
                ? "bg-[color:var(--color-brand)] font-bold text-white"
                : "text-white/85"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
