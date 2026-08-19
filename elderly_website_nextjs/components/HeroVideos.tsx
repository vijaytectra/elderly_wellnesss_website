"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const SLIDES = [
  { label: "Physio", src: "/videos/home/1.mp4", poster: "/videos/home/poster-1.webp" },
  { label: "Nursing", src: "/videos/home/2.mp4", poster: "/videos/home/poster-2.jpg" },
  { label: "Geriatric", src: "/videos/home/3.mp4", poster: "/videos/home/poster-3.jpg" },
] as const;

export function HeroVideos() {
  const [index, setIndex] = useState(0);
  const [canPlayVideo, setCanPlayVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const slide = SLIDES[index] ?? SLIDES[0];

  useEffect(() => {
    const enable = () => setCanPlayVideo(true);
    const onLoad = () => {
      const timer = setTimeout(enable, 400);
      return timer;
    };
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (document.readyState === "complete") {
      timer = onLoad();
    } else {
      const handler = () => {
        timer = onLoad();
      };
      window.addEventListener("load", handler, { once: true });
      return () => {
        window.removeEventListener("load", handler);
        if (timer) clearTimeout(timer);
      };
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!canPlayVideo) return;
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    const play = el.play();
    if (play) void play.catch(() => undefined);
  }, [canPlayVideo, slide.src]);

  return (
    <div className="relative mx-auto w-full max-w-[560px] md:ml-auto">
      <div className="relative aspect-square w-full overflow-hidden rounded-[40px] bg-[#181a22]">
        <Image
          src={SLIDES[0].poster}
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 100vw, 560px"
          className={`object-cover transition-opacity duration-300 ${
            canPlayVideo ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        />
        {canPlayVideo ? (
          <video
            ref={videoRef}
            key={slide.src}
            src={slide.src}
            poster={slide.poster}
            muted
            loop
            playsInline
            autoPlay
            preload="none"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}
      </div>
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 overflow-hidden rounded-full bg-black/55 p-1">
        {SLIDES.map((s, i) => (
          <button
            key={s.label}
            type="button"
            onClick={() => {
              setIndex(i);
              setCanPlayVideo(true);
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
