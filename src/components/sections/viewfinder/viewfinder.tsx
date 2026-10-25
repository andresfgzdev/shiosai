"use client";

import { useEffect, useRef } from "react";
import { plates } from "@/content/site";
import { subscribeScroll } from "@/lib/scroll-loop";
import styles from "./viewfinder.module.css";

type Target = { label: string; element: HTMLElement | null };

function currentPlate(targets: Target[], line: number) {
  let label: string = plates[0].label;
  for (const target of targets) {
    const top = target.element?.getBoundingClientRect().top;
    if (top !== undefined && top < line) label = target.label;
  }
  return label;
}

function writeText(element: HTMLElement | null, text: string) {
  if (element && element.textContent !== text) element.textContent = text;
}

export function Viewfinder() {
  const plateRef = useRef<HTMLParagraphElement>(null);
  const serialRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const targets = plates.map((plate) => ({
      label: plate.label,
      element: document.getElementById(plate.id),
    }));
    return subscribeScroll(({ y, vh }) => {
      writeText(
        serialRef.current,
        `SS 2610 ${String(Math.floor(Math.max(0, y))).padStart(6, "0")}`,
      );
      writeText(plateRef.current, currentPlate(targets, vh * 0.5));
    });
  }, []);

  return (
    <div className={styles.frame} aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
      <p className={`${styles.side} mono`}>Shiosai tide series · printed in Manazuru · 潮騒</p>
      <p ref={plateRef} className={`${styles.plate} mono`}>
        {plates[0].label}
      </p>
      <p ref={serialRef} className={`${styles.serial} mono`}>
        SS 2610 000000
      </p>
    </div>
  );
}
