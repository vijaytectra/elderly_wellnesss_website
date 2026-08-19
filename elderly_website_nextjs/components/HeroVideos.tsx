"use client";

import { useEffect, useRef, useState } from "react";

const SLIDES = [
  { label: "Physio", src: "/videos/home/1.mp4", poster: "/videos/home/poster-1.jpg" },
  { label: "Nursing", src: "/videos/home/2.mp4", poster: "/videos/home/poster-2.jpg" },
  { label: "Geriatric", src: "/videos/home/3.mp4", poster: "/videos/home/poster-3.jpg" },
] as const;

export function HeroVideos() {
  const [index, setIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const slide = SLIDES[index] ?? SLIDES[0];

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    const play = el.play();
    if (play) void play.catch(() => undefined);
  }, [slide.src]);

  return (
    <div className="relative mx-auto w-full max-w-[560px] md:ml-auto">
      <div className="relative aspect-square w-full overflow-hidden rounded-[40px] bg-[#181a22]">
        <video
          ref={videoRef}
          key={slide.src}
          src={slide.src}
          poster={slide.poster}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 overflow-hidden rounded-full bg-black/55 p-1">
        {SLIDES.map((s, i) => (
          <button
            key={s.label}
            type="button"
            onClick={() => setIndex(i)}
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
