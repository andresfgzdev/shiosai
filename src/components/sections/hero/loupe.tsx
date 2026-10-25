"use client";

import { useEffect, useRef } from "react";
import { hero } from "@/content/site";
import styles from "./hero.module.css";

const PLATE = {
  src: "/media/hero-plate.webp",
  width: 1920,
  height: 1252,
  focusX: 0.6,
  focusY: 0.5,
};
const ZOOM = 2.6;
const HALF = 120;
const INNER = 108;

export function Loupe() {
  const lensRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lens = lensRef.current;
    const image = imageRef.current;
    const hero = lens?.parentElement;
    if (!lens || !image || !hero || !window.matchMedia("(pointer: fine)").matches) return;
    let loaded = false;

    const hide = () => {
      delete lens.dataset.on;
    };

    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest("[data-loupe-ignore]")) {
        hide();
        return;
      }
      if (!loaded) {
        image.style.backgroundImage = `url(${PLATE.src})`;
        loaded = true;
      }
      const rect = hero.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const scale = Math.max(rect.width / PLATE.width, rect.height / PLATE.height);
      const width = PLATE.width * scale;
      const height = PLATE.height * scale;
      const offsetX = (rect.width - width) * PLATE.focusX;
      const offsetY = (rect.height - height) * PLATE.focusY;
      lens.style.transform = `translate3d(${x - HALF}px, ${y - HALF}px, 0)`;
      image.style.backgroundSize = `${(width * ZOOM).toFixed(0)}px ${(height * ZOOM).toFixed(0)}px`;
      image.style.backgroundPosition = `${(INNER - (x - offsetX) * ZOOM).toFixed(1)}px ${(INNER - (y - offsetY) * ZOOM).toFixed(1)}px`;
      lens.dataset.on = "";
    };

    hero.addEventListener("pointermove", move, { passive: true });
    hero.addEventListener("pointerleave", hide);
    return () => {
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", hide);
    };
  }, []);

  return (
    <div ref={lensRef} className={styles.lens} aria-hidden="true">
      <div ref={imageRef} className={`${styles.lensImage} media`} />
      <svg className={styles.lensRing} viewBox="0 0 240 240" aria-hidden="true">
        <defs>
          <path id="loupe-ring" d="M120 120m-112 0a112 112 0 1 1 224 0a112 112 0 1 1 -224 0" />
        </defs>
        <circle cx="120" cy="120" r="118" />
        <circle cx="120" cy="120" r="107" />
        <text>
          <textPath href="#loupe-ring">{hero.ring}</textPath>
        </text>
      </svg>
      <span className={styles.cross} />
    </div>
  );
}
