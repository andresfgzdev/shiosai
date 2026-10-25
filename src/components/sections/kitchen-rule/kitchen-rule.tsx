import { Engraving } from "@/components/ui/engraving";
import { Eyebrow } from "@/components/ui/primitives";
import { kitchenRule } from "@/content/site";
import styles from "./kitchen-rule.module.css";
import { LitWords } from "./lit-words";

export function KitchenRule() {
  return (
    <section className={styles.rule} aria-labelledby="rule-title">
      <Engraving name="rosette" className={`${styles.rosette} media spin`} />
      <div className="wrap">
        <Eyebrow centered>
          <span id="rule-title">{kitchenRule.eyebrow}</span>
        </Eyebrow>
        <LitWords words={kitchenRule.words} copper={kitchenRule.copper} />
      </div>
    </section>
  );
}
