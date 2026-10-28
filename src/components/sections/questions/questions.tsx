import { Reveal } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";
import { Eyebrow } from "@/components/ui/primitives";
import { faq } from "@/content/site";
import styles from "./questions.module.css";

export function Questions() {
  return (
    <section id="faq" className={styles.section} aria-labelledby="faq-title">
      <div className={`wrap ${styles.grid}`}>
        <Reveal>
          <Eyebrow>{faq.eyebrow}</Eyebrow>
          <h2 id="faq-title" className={styles.title}>
            {faq.title}
          </h2>
          <p className={styles.lead}>{faq.lead}</p>
        </Reveal>
        <Reveal delay={120} className={styles.list}>
          {faq.items.map((item, index) => (
            <details key={item.q} className={styles.item} open={index === 0}>
              <summary>
                {item.q}
                <span className={styles.plus} aria-hidden="true">
                  <Icon name="plus-wide" small />
                </span>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
