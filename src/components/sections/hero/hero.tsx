import Image from "next/image";
import { Engraving } from "@/components/ui/engraving";
import { Icon } from "@/components/ui/icon";
import { ArrowLink, Numeral } from "@/components/ui/primitives";
import { hero } from "@/content/site";
import styles from "./hero.module.css";
import { HeroVideo } from "./hero-video";
import { Loupe } from "./loupe";

export function Hero() {
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.plate} aria-hidden="true">
        <Image
          className={`${styles.poster} media`}
          src="/media/hero-poster.webp"
          alt=""
          fill
          preload
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          quality={80}
        />
        <HeroVideo />
      </div>
      <div className="fibers uv-only" aria-hidden="true" />
      <div className={`${styles.uvMark} uv-only jp glow`} aria-hidden="true">
        <span>潮騒</span>
        <p className="mono">{hero.uvMark}</p>
      </div>
      <div className={styles.denom} aria-hidden="true">
        <Numeral className={styles.price} moving>
          <span className={styles.yen}>¥</span>
          {hero.price}
        </Numeral>
        <p className={`${styles.priceNote} mono`}>
          {hero.priceNote} · <b>{hero.priceAccent}</b>
        </p>
      </div>
      <div className={styles.panel} data-loupe-ignore="">
        <div className={styles.band} aria-hidden="true" />
        <div className={styles.panelInner}>
          <Engraving name="rosette" className={`${styles.panelRosette} spin`} eager />
          <div className={styles.row}>
            <p className={`${styles.eyebrow} mono`}>{hero.eyebrow}</p>
            <p className={`${styles.serial} mono`}>{hero.serial}</p>
          </div>
          <h1 id="hero-title" className={styles.title}>
            {hero.lines.map((line) => (
              <span key={line} className={styles.line}>
                {line}{" "}
              </span>
            ))}
          </h1>
          <p className={styles.sub}>{hero.sub}</p>
          <div className={styles.ctaRow}>
            <ArrowLink href="#book">{hero.cta}</ArrowLink>
            <p className={styles.proof}>
              <Icon name="boat" small />
              {hero.proof}
            </p>
          </div>
        </div>
      </div>
      <p className={`${styles.hint} mono`} aria-hidden="true">
        <Icon name="loupe" small />
        {hero.hint}
      </p>
      <Loupe />
    </section>
  );
}
