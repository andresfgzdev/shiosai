"use client";

import { useEffect, useRef, useState } from "react";
import { nav } from "@/content/site";
import { subscribeScroll } from "@/lib/scroll-loop";
import styles from "./nav.module.css";
import { UvToggle } from "./uv-toggle";

const overlayLinks = [
  ...nav.map((item) => ({ href: `#${item.id}`, label: item.label })),
  { href: "#book", label: "Book a table" },
];

function setPageInert(inert: boolean) {
  for (const id of ["main", "visit"]) {
    const element = document.getElementById(id);
    if (element) element.inert = inert;
  }
  if (inert) document.body.dataset.locked = "";
  else delete document.body.dataset.locked;
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const burgerRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = nav.map((item) => ({
      id: item.id,
      element: document.getElementById(item.id),
    }));
    return subscribeScroll(({ vh }) => {
      let current = "";
      for (const section of sections) {
        const rect = section.element?.getBoundingClientRect();
        if (rect && rect.top < vh * 0.45 && rect.bottom > vh * 0.45) current = section.id;
      }
      setActive(current);
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    setPageInert(true);
    overlayRef.current?.querySelector("a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      burgerRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      setPageInert(false);
    };
  }, [open]);

  return (
    <header>
      <nav className={styles.nav} aria-label="Primary">
        <a className={styles.brand} href="#top">
          <span className={`${styles.seal} jp`} aria-hidden="true">
            潮
          </span>
          <span>Shiosai</span>
        </a>
        <div className={styles.links}>
          {nav.map((item) => (
            <a
              key={item.id}
              className={styles.link}
              href={`#${item.id}`}
              aria-current={active === item.id ? "true" : undefined}
            >
              {item.label}
            </a>
          ))}
        </div>
        <UvToggle />
        <a className={styles.book} href="#book">
          Book a table
        </a>
        <button
          ref={burgerRef}
          className={styles.burger}
          type="button"
          data-open={open || undefined}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
      </nav>
      <div
        id="mobile-menu"
        ref={overlayRef}
        className={styles.overlay}
        data-open={open || undefined}
        inert={!open}
      >
        {overlayLinks.map((link, index) => (
          <a
            key={link.href}
            className={
              index === overlayLinks.length - 1
                ? `${styles.overlayLink} ${styles.overlayCta}`
                : styles.overlayLink
            }
            href={link.href}
            onClick={() => setOpen(false)}
          >
            {link.label}
          </a>
        ))}
      </div>
    </header>
  );
}
