"use client";

import { type FormEvent, useActionState, useRef, useState } from "react";
import { type BookingState, book } from "@/app/actions/book";
import { Icon } from "@/components/ui/icon";
import { booking } from "@/content/site";
import {
  type Day,
  dayStatus,
  guestHint,
  holdFor,
  isFull,
  maxGuests,
  messages,
  pickDay,
  pickSeating,
  SEATINGS,
  type Selection,
  seatLabel,
  seatsLeft,
  stepGuests,
  summaryFor,
  validateEmail,
} from "@/core/booking";
import styles from "./booking.module.css";
import { EmailField, GuestStepper, SubmitButton } from "./fields";
import { IssuedNote } from "./issued-note";

const MIN_PRINT_MS = 1600;

function initialSelection(days: readonly Day[]): Selection {
  const open =
    days.find((day) => !day.swell && SEATINGS.every((seating) => day.seats[seating] > 0)) ??
    days[0];
  return { dayId: open?.id ?? "", seating: "20:00", guests: 2 };
}

async function printNote(previous: BookingState, formData: FormData) {
  const [result] = await Promise.all([
    book(previous, formData),
    new Promise((resolve) => setTimeout(resolve, MIN_PRINT_MS)),
  ]);
  return result;
}

function clientError(day: Day, selection: Selection, email: string) {
  const emailError = validateEmail(email);
  if (emailError) return emailError;
  return seatsLeft(day, selection.seating) < selection.guests ? messages.seatsTaken : null;
}

function DatePicker({
  days,
  selection,
  onPick,
}: {
  days: readonly Day[];
  selection: Selection;
  onPick: (day: Day) => void;
}) {
  return (
    <div className={styles.dates}>
      {days.map((option) => (
        <button
          key={option.id}
          className={styles.pill}
          type="button"
          disabled={isFull(option)}
          aria-pressed={option.id === selection.dayId}
          onClick={() => onPick(option)}
        >
          <span className={`${styles.dow} mono`}>{option.dow}</span>
          <span className={styles.dd}>{option.day}</span>
          <span className="sr-only"> {option.long.split(" ").at(-1)},</span>
          <span className={styles.left}>{dayStatus(option)}</span>
        </button>
      ))}
    </div>
  );
}

export function BookingWidget({ days }: { days: readonly Day[] }) {
  const [selection, setSelection] = useState(() => initialSelection(days));
  const [email, setEmail] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [state, action, pending] = useActionState(printNote, { status: "idle" });
  const [silenced, setSilenced] = useState<BookingState | null>(null);
  const [dismissed, setDismissed] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const day = days.find((candidate) => candidate.id === selection.dayId) ?? days[0];
  const issued = state.status === "issued" && state.serial !== dismissed ? state : null;
  const serverError = state.status === "error" && state !== silenced ? state.message : null;
  const error = localError ?? serverError;

  if (!day) return null;

  const touch = () => {
    setLocalError(null);
    setSilenced(state);
  };

  const update = (next: Selection) => {
    setSelection(next);
    touch();
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const next = clientError(day, selection, email);
    setLocalError(next);
    if (next) event.preventDefault();
  };

  const reset = () => {
    if (state.status === "issued") setDismissed(state.serial);
    requestAnimationFrame(() =>
      formRef.current?.querySelector<HTMLButtonElement>("button:not(:disabled)")?.focus(),
    );
  };

  return (
    <div className={styles.bond}>
      <div className={styles.bondInner}>
        <div className={styles.bondTop}>
          <p className={`${styles.eyebrow} mono`}>{booking.noteLabel}</p>
          <p className={`${styles.serial} mono`}>
            {state.status === "issued" ? state.serial : "SS 2610 ····"}
          </p>
        </div>
        <div className={styles.perf} aria-hidden="true" />
        <div className={styles.bondBody}>
          {issued ? (
            <IssuedNote key="issued" issued={issued} onChange={reset} />
          ) : (
            <form
              key="form"
              ref={formRef}
              action={action}
              onSubmit={onSubmit}
              noValidate
              aria-describedby="booking-summary"
              className={styles.form}
            >
              <input type="hidden" name="dayId" value={selection.dayId} />
              <input type="hidden" name="seating" value={selection.seating} />
              <input type="hidden" name="guests" value={selection.guests} />
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Date</legend>
                <DatePicker
                  days={days}
                  selection={selection}
                  onPick={(option) => update(pickDay(selection, option))}
                />
                <div className={styles.swellWrap} data-open={day.swell || undefined}>
                  <div>
                    <p className={styles.swell} aria-hidden={!day.swell}>
                      <Icon name="swell" small />
                      {booking.swell}
                    </p>
                  </div>
                </div>
              </fieldset>
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Seating</legend>
                <div className={styles.seats}>
                  {SEATINGS.map((seating) => (
                    <button
                      key={seating}
                      className={`${styles.pill} ${styles.seat}`}
                      type="button"
                      disabled={seatsLeft(day, seating) === 0}
                      aria-pressed={seating === selection.seating}
                      onClick={() => update(pickSeating(selection, day, seating))}
                    >
                      <span className={`${styles.dd} mono`}>{seating}</span>
                      <span className={styles.left}>{seatLabel(seatsLeft(day, seating))}</span>
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Guests</legend>
                <GuestStepper
                  guests={selection.guests}
                  max={maxGuests(day, selection.seating)}
                  hint={guestHint(day, selection.seating)}
                  onStep={(delta) => update(stepGuests(selection, day, delta))}
                />
              </fieldset>
              <EmailField
                value={email}
                error={error}
                invalid={Boolean(error) && error !== messages.seatsTaken}
                onChange={(value) => {
                  setEmail(value);
                  touch();
                }}
              />
              <div className={styles.summary}>
                <p id="booking-summary" className="mono">
                  {summaryFor(day, selection)}
                </p>
                <b className="mono">{holdFor(selection.guests)} hold</b>
              </div>
              <SubmitButton pending={pending} />
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
