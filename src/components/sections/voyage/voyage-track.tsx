"use client";

import Image from "next/image";
import { type KeyboardEvent, type ReactNode, useEffect, useRef, useState } from "react";
import { AutoVideo } from "@/components/motion/auto-video";
import { Reveal } from "@/components/motion/reveal";
import { prefersReducedMotion } from "@/components/motion/use-reduced-motion";
import { Engraving } from "@/components/ui/engraving";
import { Icon } from "@/components/ui/icon";
import { Chip, Numeral } from "@/components/ui/primitives";
import type { VoyageNote } from "@/content/site";
import styles from "./voyage.module.css";

const ROMAN = ["I", "II", "III", "IV"];
const GAP = 32;

type Drag = { x: number; left: number };

function Media({ note }: { note: VoyageNote }) {
  const tint = note.tint ? styles[note.tint] : "";
  if (note.media.kind === "video") {
    return (
      <AutoVideo
        sizes="(max-width: 860px) 88vw, 620px"
        src={note.media.src}
        poster={note.media.poster}
        label={note.media.label}
        className={tint}
      />
    );
  }
  return (
    <Image
      className={`media ${tint}`}
      src={note.media.src}
      alt={note.media.alt}
      fill
      sizes="(max-width: 860px) 88vw, 620px"
    />
  );
}

export function VoyageTrack({ notes, children }: { notes: VoyageNote[]; children: ReactNode }) {
  const trackRef = useRef<HTMLElement>(null);
  const dragRef = useRef<Drag | null>(null);
  const targetRef = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const last = notes.length - 1;

  const noteWidth = () => {
    const first = trackRef.current?.querySelector("article");
    return first ? first.getBoundingClientRect().width + GAP : 1;
  };

  const go = (target: number) => {
    const track = trackRef.current;
    if (!track) return;
    const next = Math.max(0, Math.min(last, target));
    targetRef.current = next;
    track.scrollTo({
      left: next * noteWidth(),
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
    setIndex(next);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      if (dragRef.current) return;
      const current = Math.max(0, Math.min(last, Math.round(track.scrollLeft / noteWidth())));
      if (targetRef.current !== null && targetRef.current !== current) return;
      targetRef.current = null;
      setIndex(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    const release = () => {
      targetRef.current = null;
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    track.addEventListener("scrollend", release);
    track.addEventListener("wheel", release, { passive: true });
    track.addEventListener("touchstart", release, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("scrollend", release);
      track.removeEventListener("wheel", release);
      track.removeEventListener("touchstart", release);
      if (frame) cancelAnimationFrame(frame);
    };
  });

  useEffect(() => {
    if (!dragging) return;
    const track = trackRef.current;
    const onMove = (event: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag || !track) return;
      track.scrollLeft = drag.left - (event.clientX - drag.x);
    };
    const onUp = () => {
      dragRef.current = null;
      setDragging(false);
      if (track) go(Math.round(track.scrollLeft / noteWidth()));
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp, { once: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  });

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(index - 1);
    }
  };

  return (
    <>
      <div className={`wrap ${styles.head}`}>
        {children}
        <Reveal className={styles.controls}>
          <p className="mono" aria-live="polite">
            Note {ROMAN[index]} of IV
          </p>
          <button
            className={styles.round}
            type="button"
            aria-label="Previous note"
            onClick={() => go(index - 1)}
            disabled={index <= 0}
          >
            <Icon name="arrow-left" />
          </button>
          <button
            className={styles.round}
            type="button"
            aria-label="Next note"
            onClick={() => go(index + 1)}
            disabled={index >= last}
          >
            <Icon name="arrow" />
          </button>
        </Reveal>
      </div>
      <section
        ref={trackRef}
        className={styles.track}
        data-drag={dragging || undefined}
        // biome-ignore lint/a11y/noNoninteractiveTabindex: a scrollable region must be focusable so keyboard users can scroll and use the arrow keys
        tabIndex={0}
        aria-label="The voyage, four notes"
        aria-roledescription="carousel"
        onKeyDown={onKeyDown}
        onPointerDown={(event) => {
          const track = trackRef.current;
          if (event.pointerType !== "mouse" || event.button !== 0 || !track) return;
          dragRef.current = { x: event.clientX, left: track.scrollLeft };
          setDragging(true);
        }}
      >
        {notes.map((note, i) => (
          <article
            key={note.time}
            className={styles.note}
            data-dim={i === index ? undefined : ""}
            aria-roledescription="slide"
            aria-label={`Note ${ROMAN[i]} of IV, ${note.time}`}
          >
            <div className={styles.noteInner}>
              <div className={styles.media}>
                <Media note={note} />
                <Chip style={{ left: 16, top: 16 }}>{note.chip}</Chip>
              </div>
              <div className={styles.body}>
                <Engraving
                  name={note.seal ? "seal-ring" : "rosette"}
                  className={`${styles.rosette} spin`}
                />
                <div className={styles.copy}>
                  <Numeral className={styles.time}>{note.time}</Numeral>
                  <h3>{note.title}</h3>
                  <p>{note.body}</p>
                </div>
                <div className={styles.foot}>
                  <p className={`${styles.footLabel} mono`}>{note.foot}</p>
                  <p className={`${styles.kanji} jp`} aria-hidden="true">
                    {note.kanji}
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
      <div className={styles.dots}>
        {notes.map((note, i) => (
          <button
            key={note.time}
            className={styles.dot}
            data-on={i === index || undefined}
            type="button"
            aria-label={`Go to note ${ROMAN[i]}`}
            aria-current={i === index ? "true" : undefined}
            onClick={() => go(i)}
          >
            <span />
          </button>
        ))}
      </div>
    </>
  );
}
