import { Reveal } from "@/components/motion/reveal";
import { Engraving } from "@/components/ui/engraving";
import { Eyebrow } from "@/components/ui/primitives";
import { guests } from "@/content/site";
import styles from "./countersigned.module.css";

export function Countersigned() {
  return (
    <section id="guests" className={styles.section} aria-labelledby="guests-title">
      <div className="wrap">
        <Reveal>
          <Eyebrow>{guests.eyebrow}</Eyebrow>
          <h2 id="guests-title" className={styles.title}>
            {guests.title}
          </h2>
        </Reveal>
        <div className={styles.quotes}>
          {guests.quotes.map((quote, index) => (
            <Reveal key={quote.no} delay={index * 100} className={styles.cell}>
              <figure className={styles.quote}>
                <p className={`${styles.no} mono`} aria-hidden="true">
                  {quote.no}
                </p>
                <blockquote>{quote.body}</blockquote>
                <figcaption className={styles.who}>
                  <span className={styles.avatar} aria-hidden="true">
                    <Engraving
                      name={quote.rosette}
                      className="media"
                      style={{ transform: `rotate(${quote.turn}deg)` }}
                    />
                    <b>{quote.initials}</b>
                  </span>
                  <p>
                    {quote.name}
                    <span className="mono">{quote.meta}</span>
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
