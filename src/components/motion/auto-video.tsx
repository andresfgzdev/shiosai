"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { observe } from "./observer";
import { prefersReducedMotion } from "./use-reduced-motion";

type AutoVideoProps = {
  src: string;
  poster: string;
  sizes: string;
  label?: string;
  className?: string;
};

export function AutoVideo({ src, poster, sizes, label, className }: AutoVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || prefersReducedMotion()) return;
    const onPlaying = () => {
      video.dataset.ready = "";
    };
    video.addEventListener("playing", onPlaying, { once: true });
    const stop = observe(
      video,
      (entry) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.1 },
    );
    return () => {
      video.removeEventListener("playing", onPlaying);
      stop();
    };
  }, []);

  const classes = className ? `media ${className}` : "media";
  return (
    <>
      <Image className={classes} src={poster} alt="" fill sizes={sizes} quality={70} />
      <video
        ref={ref}
        className={`${classes} auto-video`}
        src={src}
        muted
        loop
        playsInline
        preload="none"
        tabIndex={-1}
        aria-label={label}
        aria-hidden={label ? undefined : true}
      />
    </>
  );
}
