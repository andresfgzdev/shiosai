"use client";

import { useEffect, useRef, useState } from "react";
import { observe } from "@/components/motion/observer";
import { prefersReducedMotion } from "@/components/motion/use-reduced-motion";
import { subscribeScroll } from "@/lib/scroll-loop";
import styles from "./kitchen-rule.module.css";

function countLit(paragraph: HTMLElement, spans: HTMLElement[], trigger: number) {
  const box = paragraph.getBoundingClientRect();
  let count = 0;
  for (const span of spans) {
    const rect = span.getBoundingClientRect();
    const sweep = box.width ? ((rect.left - box.left) / box.width) * rect.height : 0;
    if (rect.top + sweep < trigger) count += 1;
  }
  return count;
}

export function LitWords({
  words,
  copper,
}: {
  words: readonly string[];
  copper: readonly string[];
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [lit, setLit] = useState(-1);

  useEffect(() => {
    const paragraph = ref.current;
    if (!paragraph) return;
    if (prefersReducedMotion()) {
      setLit(words.length);
      return;
    }
    setLit(0);
    const spans = Array.from(paragraph.querySelectorAll<HTMLSpanElement>("[data-w]"));
    let best = 0;
    let unsubscribe = () => {};
    const stopObserving = observe(paragraph, (entry) => {
      unsubscribe();
      if (!entry.isIntersecting) return;
      unsubscribe = subscribeScroll(({ vh }) => {
        const count = countLit(paragraph, spans, vh * 0.62);
        if (count > best) {
          best = count;
          setLit(count);
        }
        if (best >= spans.length) unsubscribe();
      });
    });
    return () => {
      stopObserving();
      unsubscribe();
    };
  }, [words.length]);

  return (
    <p ref={ref} className={styles.words}>
      {words.map((word, index) => {
        const classes = [styles.word];
        if (copper.includes(word)) classes.push(styles.copper);
        if (lit < 0 || index < lit) classes.push(styles.on);
        return (
          <span key={`${word}-${index.toString()}`} className={classes.join(" ")} data-w="">
            {word}{" "}
          </span>
        );
      })}
    </p>
  );
}
