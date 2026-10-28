"use client";

import { Icon } from "@/components/ui/icon";
import { booking } from "@/content/site";
import styles from "./booking.module.css";

export function GuestStepper({
  guests,
  max,
  hint,
  onStep,
}: {
  guests: number;
  max: number;
  hint: string;
  onStep: (delta: number) => void;
}) {
  return (
    <div className={styles.guests}>
      <div className={styles.stepper}>
        <button
          type="button"
          aria-label="Remove a guest"
          disabled={guests <= 1}
          onClick={() => onStep(-1)}
        >
          <Icon name="minus" />
        </button>
        <output className="mono" aria-live="polite" aria-label={`${guests} guests`}>
          <span key={guests} className={styles.tick}>
            {guests}
          </span>
        </output>
        <button
          type="button"
          aria-label="Add a guest"
          disabled={guests >= max}
          onClick={() => onStep(1)}
        >
          <Icon name="plus" />
        </button>
      </div>
      <p className={styles.hint}>{hint}</p>
    </div>
  );
}

export function EmailField({
  value,
  error,
  invalid,
  onChange,
}: {
  value: string;
  error: string | null;
  invalid: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <div className={`${styles.fieldset} ${styles.field}`}>
      <label className={styles.legend} htmlFor="booking-email">
        {booking.emailLabel}
      </label>
      <input
        id="booking-email"
        className={styles.input}
        data-error={invalid || undefined}
        name="email"
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="name@domain.com"
        value={value}
        aria-invalid={invalid}
        aria-describedby="booking-error"
        onChange={(event) => onChange(event.target.value)}
      />
      <div id="booking-error">
        {error ? (
          <p key={error} className={styles.error} role="alert">
            <Icon name="alert" small />
            {error}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <button className={styles.submit} type="submit" disabled={pending}>
      {pending ? (
        <span className={styles.loading}>
          <span>{booking.loading}</span>
          <span className={styles.bar}>
            <i />
          </span>
        </span>
      ) : (
        <>
          {booking.submit}
          <span className={styles.arrow} aria-hidden="true">
            <Icon name="arrow" />
          </span>
        </>
      )}
    </button>
  );
}
