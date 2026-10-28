import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/primitives";
import { storm } from "@/content/site";
import styles from "./storm.module.css";
import { Watermark } from "./watermark";

export function Storm() {
  return (
    <section id="storm" className={styles.storm} aria-labelledby="storm-title">
      <Image
        className={`${styles.image} media`}
        src="/media/storm.webp"
        alt={storm.imageAlt}
        fill
        sizes="100vw"
      />
      <div className={`wrap ${styles.inner}`}>
        <Reveal className={styles.card}>
          <Eyebrow className={styles.eyebrow}>{storm.eyebrow}</Eyebrow>
          <h2 id="storm-title" className={styles.title}>
            {storm.title}
          </h2>
          <p className={styles.lead}>{storm.lead}</p>
          <dl className={styles.stats}>
            {storm.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="mono">{stat.value}</dd>
                <dd aria-hidden="true">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <Watermark hold={storm.hold} release={storm.release} />
      </div>
    </section>
  );
}
