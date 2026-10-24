import type { ComponentProps, CSSProperties, ReactNode } from "react";
import { Icon } from "./icon";
import styles from "./ui.module.css";

export function Eyebrow({
  children,
  centered = false,
  className,
}: {
  children: ReactNode;
  centered?: boolean;
  className?: string;
}) {
  const classes = [styles.eyebrow, centered ? styles.eyebrowCentered : "", "mono", className ?? ""];
  return <p className={classes.join(" ").trim()}>{children}</p>;
}

export function ArrowLink({ children, ...props }: ComponentProps<"a">) {
  return (
    <a {...props} className={styles.button}>
      {children}
      <span className={styles.arrow} aria-hidden="true">
        <Icon name="arrow" />
      </span>
    </a>
  );
}

export function Chip({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <p className={`${styles.chip} mono`} style={style}>
      {children}
    </p>
  );
}

export function Numeral({
  children,
  className,
  moving = false,
}: {
  children: ReactNode;
  className?: string;
  moving?: boolean;
}) {
  const classes = [styles.numeral, moving ? styles.numeralMoving : "", "mono", className ?? ""];
  return (
    <p className={classes.join(" ").trim()} aria-hidden="true">
      {children}
    </p>
  );
}
