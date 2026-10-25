import { tideStrip } from "@/content/site";
import styles from "./tide-strip.module.css";

function Items({ hidden }: { hidden?: boolean }) {
  return (
    <ul className={styles.items} aria-hidden={hidden || undefined}>
      {tideStrip.map((item) => (
        <li key={item.label}>
          {item.label} <b>{item.value}</b>
        </li>
      ))}
    </ul>
  );
}

export function TideStrip() {
  return (
    <section className={styles.strip} aria-label="Harbour conditions this morning">
      <div className={`${styles.track} mono`}>
        <Items />
        <Items hidden />
      </div>
    </section>
  );
}
