export const SEATINGS = ["17:30", "20:00"] as const;
export type Seating = (typeof SEATINGS)[number];

export const MAX_ONLINE_GUESTS = 6;
export const HOLD_PER_GUEST = 5000;

export type Day = {
  id: string;
  dow: string;
  day: string;
  mon: string;
  long: string;
  seats: Record<Seating, number>;
  swell?: boolean;
};

export type Selection = { dayId: string; seating: Seating; guests: number };

export const messages = {
  emailMissing: "Enter an email so we can send your table note.",
  emailInvalid: "That email looks incomplete. Try name@domain.com.",
  seatsTaken: "Those seats were just taken. Pick another seating.",
} as const;

export function seatsLeft(day: Day, seating: Seating) {
  return day.seats[seating];
}

export function totalLeft(day: Day) {
  return SEATINGS.reduce((sum, seating) => sum + day.seats[seating], 0);
}

export function isFull(day: Day) {
  return totalLeft(day) === 0;
}

export function maxGuests(day: Day, seating: Seating) {
  return Math.min(MAX_ONLINE_GUESTS, seatsLeft(day, seating));
}

export function clampGuests(guests: number, day: Day, seating: Seating) {
  const left = seatsLeft(day, seating) || 1;
  return Math.max(1, Math.min(guests, left, MAX_ONLINE_GUESTS));
}

export function pickDay(selection: Selection, day: Day): Selection {
  const open = SEATINGS.find((seating) => day.seats[seating] > 0);
  const seating = day.seats[selection.seating] === 0 && open ? open : selection.seating;
  return { dayId: day.id, seating, guests: clampGuests(selection.guests, day, seating) };
}

export function pickSeating(selection: Selection, day: Day, seating: Seating): Selection {
  return { ...selection, seating, guests: clampGuests(selection.guests, day, seating) };
}

export function stepGuests(selection: Selection, day: Day, delta: number): Selection {
  const max = maxGuests(day, selection.seating);
  return { ...selection, guests: Math.max(1, Math.min(max, selection.guests + delta)) };
}

export function formatYen(amount: number) {
  return `¥${amount.toLocaleString("en-US")}`;
}

export function holdFor(guests: number) {
  return formatYen(guests * HOLD_PER_GUEST);
}

export function guestWord(guests: number) {
  return guests === 1 ? "guest" : "guests";
}

export function summaryFor(day: Day, selection: Selection) {
  return `${selection.guests} ${guestWord(selection.guests)} · ${day.dow} ${day.day} ${day.mon} · ${selection.seating}`;
}

export function seatLabel(left: number) {
  if (left === 0) return "Full";
  if (left === 1) return "1 seat left";
  return `${left} seats left`;
}

export function dayStatus(day: Day) {
  if (isFull(day)) return "Full";
  if (day.swell) return "Swell watch";
  return `${totalLeft(day)} left`;
}

export function guestHint(day: Day, seating: Seating) {
  const left = seatsLeft(day, seating);
  if (maxGuests(day, seating) < MAX_ONLINE_GUESTS) {
    return `Only ${left} ${left === 1 ? "seat" : "seats"} left at ${seating}.`;
  }
  return "Up to six online. For more, write to us.";
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateEmail(value: string) {
  const email = value.trim();
  if (!email) return messages.emailMissing;
  if (!EMAIL.test(email)) return messages.emailInvalid;
  return null;
}

export type BookingRequest = Selection & { email: string };

export type BookingCheck =
  | { ok: true; day: Day; request: BookingRequest }
  | { ok: false; field: "email" | "seats"; message: string };

export function validateBooking(days: readonly Day[], request: BookingRequest): BookingCheck {
  const emailError = validateEmail(request.email);
  if (emailError) return { ok: false, field: "email", message: emailError };
  const day = days.find((candidate) => candidate.id === request.dayId);
  if (!day || request.guests < 1 || request.guests > MAX_ONLINE_GUESTS) {
    return { ok: false, field: "seats", message: messages.seatsTaken };
  }
  if (seatsLeft(day, request.seating) < request.guests) {
    return { ok: false, field: "seats", message: messages.seatsTaken };
  }
  return { ok: true, day, request: { ...request, email: request.email.trim() } };
}

export function issueSerial(random: number) {
  return `SS 2610 ${4000 + Math.floor(random * 5999)}`;
}

export function issuedCopy(day: Day, request: BookingRequest) {
  const hold = holdFor(request.guests);
  return {
    title: `Your table note is issued for ${day.long} at ${request.seating}.`,
    body: `We sent it to ${request.email}. If the boat stays in that morning, the ${hold} hold comes back by 09:00.`,
    meta: `${day.dow} ${day.day} ${day.mon} · ${request.seating} · Pier 2`,
  };
}
