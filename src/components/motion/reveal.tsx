"use client";

import { type CSSProperties, type ReactNode, useEffect, useRef } from "react";
import { observe } from "./observer";

type Tag = "div" | "article" | "figure" | "ol" | "ul" | "li" | "p" | "section";

type RevealProps = {
  as?: Tag;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
} & Record<`aria-${string}`, string | undefined>;

export function Reveal({
  as = "div",
  delay = 0,
  className,
  style,
  children,
  ...aria
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const stop = observe(
      element,
      (entry) => {
        if (!entry.isIntersecting) return;
        element.dataset.in = "";
        stop();
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    return stop;
  }, []);

  const Element = as;
  const merged = { ...style, "--delay": `${delay}ms` } as CSSProperties;
  return (
    <Element
      ref={ref as never}
      className={className ? `reveal ${className}` : "reveal"}
      style={merged}
      {...aria}
    >
      {children}
    </Element>
  );
}
