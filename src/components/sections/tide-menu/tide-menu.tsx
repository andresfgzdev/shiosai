import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/primitives";
import { menu } from "@/content/site";
import { Courses } from "./courses";
import styles from "./tide-menu.module.css";

export function TideMenu() {
  return (
    <section id="menu" className={styles.section} aria-labelledby="menu-title">
      <div className={`wrap ${styles.grid}`}>
        <Reveal className={styles.plate}>
          <figure>
            <div className={styles.frame}>
              <div className={styles.frameInner}>
                <Image
                  className="media"
                  src="/media/plate-kuroto.webp"
                  alt={menu.plateAlt}
                  fill
                  sizes="(max-width: 1100px) 440px, 460px"
                />
              </div>
            </div>
            <figcaption className="mono">{menu.plateCaption}</figcaption>
          </figure>
          <div className={styles.price}>
            <b className="mono">{menu.price}</b>
            <span>
              {menu.priceNote[0]}
              <br />
              {menu.priceNote[1]}
            </span>
          </div>
        </Reveal>
        <div>
          <Reveal>
            <Eyebrow>{menu.eyebrow}</Eyebrow>
            <h2 id="menu-title" className={styles.title}>
              {menu.title}
            </h2>
            <p className={styles.lead}>{menu.lead}</p>
          </Reveal>
          <Courses courses={menu.courses} />
          <p className={`${styles.uvLine} uv-only glow mono`} aria-hidden="true">
            {menu.uvLine}
          </p>
        </div>
      </div>
    </section>
  );
}
