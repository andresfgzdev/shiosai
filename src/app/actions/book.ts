"use server";

import { z } from "zod";
import { issuedCopy, issueSerial, messages, SEATINGS, validateBooking } from "@/core/booking";
import { listBookableDays } from "@/server/availability";

export type BookingState =
  | { status: "idle" }
  | { status: "error"; field: "email" | "seats"; message: string }
  | { status: "issued"; serial: string; guests: number; title: string; body: string; meta: string };

const schema = z.object({
  dayId: z.string().min(1).max(32),
  seating: z.enum(SEATINGS),
  guests: z.coerce.number().int(),
  email: z.string().max(254),
});

export async function book(_previous: BookingState, formData: FormData): Promise<BookingState> {
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { status: "error", field: "seats", message: messages.seatsTaken };
  const days = await listBookableDays();
  const check = validateBooking(days, parsed.data);
  if (!check.ok) return { status: "error", field: check.field, message: check.message };
  const copy = issuedCopy(check.day, check.request);
  return {
    status: "issued",
    serial: issueSerial(Math.random()),
    guests: check.request.guests,
    ...copy,
  };
}
