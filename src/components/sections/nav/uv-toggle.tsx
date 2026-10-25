"use client";

import { useSyncExternalStore } from "react";
import { Icon } from "@/components/ui/icon";
import { getServerUv, getUv, setUv, subscribeUv } from "@/lib/uv-store";
import styles from "./nav.module.css";

export function UvToggle() {
  const on = useSyncExternalStore(subscribeUv, getUv, getServerUv);
  return (
    <button
      className={styles.uv}
      type="button"
      aria-pressed={on}
      aria-label="UV light"
      onClick={() => setUv(!on)}
    >
      <Icon name="bulb" small />
      <span className={styles.uvText} aria-hidden="true">
        UV light
      </span>
    </button>
  );
}
