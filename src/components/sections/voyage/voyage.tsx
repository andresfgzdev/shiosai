import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/primitives";
import { voyage } from "@/content/site";
import styles from "./voyage.module.css";
import { VoyageTrack } from "./voyage-track";

export function Voyage() {
  return (
    <section id="voyage" className={styles.section} aria-labelledby="voyage-title">
      <VoyageTrack notes={voyage.notes}>
        <Reveal>
          <Eyebrow>{voyage.eyebrow}</Eyebrow>
          <h2 id="voyage-title" className={styles.title}>
            {voyage.title}
          </h2>
          <p className={styles.lead}>{voyage.lead}</p>
        </Reveal>
      </VoyageTrack>
    </section>
  );
}
