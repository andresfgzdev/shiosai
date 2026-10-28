"use client";

import { useState } from "react";
import { Engraving } from "@/components/ui/engraving";
import { Icon } from "@/components/ui/icon";
import styles from "./storm.module.css";

export function Watermark({ hold, release }: { hold: string; release: string }) {
  const [lit, setLit] = useState(false);
  return (
    <div className={styles.watermark} data-lit={lit || undefined}>
      <span className={styles.oval} aria-hidden="true" />
      <Engraving name="watermark" className={`${styles.wmRosette} spin`} />
      <span className={`${styles.wmKanji} jp`} aria-hidden="true">
        潮
      </span>
      <button className={styles.hold} type="button" aria-pressed={lit} onClick={() => setLit(!lit)}>
        <Icon name="sun" small />
        {lit ? release : hold}
      </button>
    </div>
  );
}
