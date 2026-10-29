import type { Metadata } from "next";
import Link from "next/link";
import { Engraving } from "@/components/ui/engraving";
import { Icon } from "@/components/ui/icon";
import { site } from "@/content/site";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: { absolute: "Shiosai · This note went out with the tide" },
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main id="main" className={styles.page}>
      <div className={styles.note}>
        <div className={styles.inner}>
          <Engraving name="rosette" className={`${styles.rosette} spin`} />
          <div className={styles.row}>
            <p className={`${styles.eyebrow} mono`}>Shiosai · Error note</p>
            <p className={`${styles.serial} mono`}>SS 0404 000 X</p>
          </div>
          <p className={`${styles.number} mono`} aria-hidden="true">
            404
          </p>
          <h1 className={styles.title}>This note went out with the tide.</h1>
          <p className={styles.text}>
            The page you followed has been withdrawn from circulation, the same way yesterday&apos;s
            tide menu was. Tonight&apos;s table is still on the pier.
          </p>
          <div className={styles.actions}>
            <Link className={styles.back} href="/">
              <span className={styles.arrow} aria-hidden="true">
                <Icon name="arrow-left" />
              </span>
              Back to tonight&apos;s table
            </Link>
            <a className={styles.mail} href={site.maker.profile}>
              Meet the maker
            </a>
          </div>
          <span className={`${styles.void} jp`} aria-hidden="true">
            廃
          </span>
        </div>
      </div>
    </main>
  );
}
