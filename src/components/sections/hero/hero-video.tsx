"use client";

import { useEffect, useRef } from "react";
import { observe } from "@/components/motion/observer";
import { prefersReducedMotion } from "@/components/motion/use-reduced-motion";
import styles from "./hero.module.css";

type Connection = { saveData?: boolean; effectiveType?: string };

function canStream() {
  const connection = (navigator as Navigator & { connection?: Connection }).connection;
  if (connection?.saveData) return false;
  if (connection?.effectiveType && connection.effectiveType !== "4g") return false;
  return window.matchMedia("(min-width: 721px)").matches;
}

function whenIdle(callback: () => void) {
  if ("requestIdleCallback" in window) {
    const id = window.requestIdleCallback(callback, { timeout: 2500 });
    return () => window.cancelIdleCallback(id);
  }
  const id = setTimeout(callback, 1200);
  return () => clearTimeout(id);
}

export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || prefersReducedMotion() || !canStream()) return;
    let stop = () => {};
    let cancelIdle = () => {};
    const begin = () => {
      cancelIdle = whenIdle(start);
    };
    const start = () => {
      video.src = "/media/hero.mp4";
      stop = observe(
        video,
        (entry) => {
          if (entry.isIntersecting) video.play().catch(() => {});
          else video.pause();
        },
        { threshold: 0.1 },
      );
    };
    const onPlaying = () => {
      video.dataset.ready = "";
    };
    video.addEventListener("playing", onPlaying, { once: true });
    if (document.readyState === "complete") begin();
    else window.addEventListener("load", begin, { once: true });
    return () => {
      window.removeEventListener("load", begin);
      cancelIdle();
      video.removeEventListener("playing", onPlaying);
      stop();
    };
  }, []);

  return (
    <video
      ref={ref}
      className={`${styles.video} media`}
      muted
      loop
      playsInline
      preload="none"
      tabIndex={-1}
    />
  );
}
