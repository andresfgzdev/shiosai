import { Reveal } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";
import { Eyebrow } from "@/components/ui/primitives";
import { booking } from "@/content/site";
import type { Day } from "@/core/booking";
import styles from "./booking.module.css";
import { BookingWidget } from "./booking-widget";

export function Booking({ days }: { days: readonly Day[] }) {
  return (
    <section id="book" className={styles.section} aria-labelledby="book-title">
      <div className={`wrap ${styles.grid}`}>
        <Reveal>
          <Eyebrow>{booking.eyebrow}</Eyebrow>
          <h2 id="book-title" className={styles.title}>
            {booking.title}
          </h2>
          <p className={styles.lead}>{booking.lead}</p>
          <ol className={styles.steps}>
            {booking.steps.map((step) => (
              <li key={step.n}>
                <span className={`${styles.stepNo} mono`} aria-hidden="true">
                  {step.n}
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className={styles.assure}>
            <Icon name="shield" />
            <span>
              <b>{booking.assureStrong}</b> {booking.assure}
            </span>
          </p>
        </Reveal>
        <Reveal delay={120}>
          <BookingWidget days={days} />
        </Reveal>
      </div>
    </section>
  );
}
