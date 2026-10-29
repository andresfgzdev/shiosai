import { AutoVideo } from "@/components/motion/auto-video";
import { Reveal } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";
import { footer, site } from "@/content/site";
import styles from "./footer.module.css";

export function Footer() {
  return (
    <footer id="visit" className={styles.footer}>
      <div className={`wrap ${styles.top}`}>
        <Reveal className={styles.brandCol}>
          <a className={styles.brand} href="#top">
            <span className={`${styles.seal} jp`} aria-hidden="true">
              潮
            </span>
            Shiosai
          </a>
          <p>{footer.blurb}</p>
          <div className={styles.socials}>
            <a
              className={styles.social}
              href={site.maker.profile}
              aria-label={`${site.maker.name} on GitHub`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="github" />
            </a>
          </div>
        </Reveal>
        {footer.columns.map((column, index) => (
          <Reveal key={column.title} delay={(index + 1) * 80}>
            <h2 className={styles.colTitle}>{column.title}</h2>
            <ul className={styles.list}>
              {column.items.map((item) => (
                <li key={item.label} className={"mono" in item && item.mono ? "mono" : undefined}>
                  {"href" in item ? (
                    <a
                      href={item.href}
                      {...(item.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {item.label}
                    </a>
                  ) : (
                    item.label
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
      <div className={styles.sea}>
        <AutoVideo src="/media/harbour.mp4" poster="/media/harbour-poster.webp" sizes="100vw" />
        <p className={styles.word} aria-hidden="true">
          Shiosai<span className="jp">潮騒</span>
        </p>
        <div className="fibers uv-only" aria-hidden="true" />
        <p className={`${styles.uvLine} uv-only glow mono`} aria-hidden="true">
          {footer.uvLine}
        </p>
      </div>
      <div className={styles.bar}>
        <div className={`wrap ${styles.barWrap}`}>
          <p className={styles.disclaimer}>
            <span className={`${styles.badge} mono`}>Concept</span>
            {footer.disclaimer}
          </p>
          <div className={styles.row}>
            <span>{footer.copyright}</span>
            <nav aria-label="Legal">
              {footer.legal.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          <p className={styles.made}>
            {footer.madeWith}
            <span className={styles.heart} role="img" aria-label="love">
              <Icon name="heart" small />
            </span>
            by{" "}
            <a href={site.maker.profile} target="_blank" rel="noopener noreferrer">
              {site.maker.name}
            </a>
          </p>
          <p className={styles.credits}>{footer.credits}</p>
        </div>
      </div>
    </footer>
  );
}
