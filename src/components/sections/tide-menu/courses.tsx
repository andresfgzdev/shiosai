"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { Engraving } from "@/components/ui/engraving";
import type { Course } from "@/content/site";
import styles from "./tide-menu.module.css";

export function Courses({ courses }: { courses: Course[] }) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(-1);
  const current = courses[Math.max(0, hover)];

  useEffect(() => {
    if (hover < 0) return;
    const move = (event: PointerEvent) => {
      const preview = previewRef.current;
      if (preview)
        preview.style.transform = `translate3d(${event.clientX + 32}px, ${event.clientY - 120}px, 0)`;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [hover]);

  return (
    <>
      <Reveal as="ol" delay={120} className={styles.courses}>
        {courses.map((course, index) => (
          <li
            key={course.no}
            className={styles.course}
            onPointerEnter={(event) => {
              if (event.pointerType !== "mouse") return;
              const preview = previewRef.current;
              if (preview)
                preview.style.transform = `translate3d(${event.clientX + 32}px, ${event.clientY - 120}px, 0)`;
              setHover(index);
            }}
            onPointerLeave={() => setHover(-1)}
          >
            <span className={`${styles.no} mono`}>{course.no}</span>
            <div>
              <h3>
                {course.name}
                <span className="jp" lang="ja">
                  {course.kanji}
                </span>
              </h3>
              <p>{course.body}</p>
            </div>
            <span className={`${styles.when} mono`}>{course.when}</span>
          </li>
        ))}
      </Reveal>
      <div
        ref={previewRef}
        className={styles.preview}
        data-on={hover >= 0 || undefined}
        aria-hidden="true"
      >
        <div className={styles.previewInner}>
          <div className={styles.previewCard}>
            {current?.image ? (
              <Image className="media" src={current.image} alt="" fill sizes="264px" />
            ) : (
              <>
                <Engraving name="seal-ring" className={`${styles.previewRosette} media`} />
                <span className="jp">{current?.kanji}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
