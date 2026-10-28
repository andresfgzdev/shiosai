"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { booking } from "@/content/site";
import styles from "./booking.module.css";

export type Issued = { serial: string; guests: number; title: string; body: string; meta: string };

export function IssuedNote({ issued, onChange }: { issued: Issued; onChange: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div ref={ref} className={styles.issued} role="status" tabIndex={-1}>
      <h3>{issued.title}</h3>
      <p className={styles.issuedBody}>{issued.body}</p>
      <div className={styles.ticket}>
        <div className={styles.ticketInner}>
          <div className={styles.ticketMedia}>
            <Image
              className="media"
              src="/media/hero-plate.webp"
              alt=""
              fill
              sizes="(max-width: 720px) 90vw, 280px"
            />
          </div>
          <div className={styles.ticketBody}>
            <span className={`${styles.ticketStamp} jp`} aria-hidden="true">
              発
            </span>
            <p className={`${styles.admit} mono`}>Admit</p>
            <p className={`${styles.admitCount} mono`}>{issued.guests}</p>
            <p className={`${styles.ticketMeta} mono`}>{issued.meta}</p>
            <p className={`${styles.serial} mono`}>{issued.serial}</p>
          </div>
        </div>
      </div>
      <button className={styles.change} type="button" onClick={onChange}>
        {booking.change}
      </button>
    </div>
  );
}
