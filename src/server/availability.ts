import "server-only";
import type { Day } from "@/core/booking";

const days: readonly Day[] = [
  {
    id: "2026-10-25",
    dow: "Sun",
    day: "25",
    mon: "Oct",
    long: "Sunday 25 October",
    seats: { "17:30": 0, "20:00": 2 },
  },
  {
    id: "2026-10-28",
    dow: "Wed",
    day: "28",
    mon: "Oct",
    long: "Wednesday 28 October",
    seats: { "17:30": 8, "20:00": 5 },
  },
  {
    id: "2026-10-29",
    dow: "Thu",
    day: "29",
    mon: "Oct",
    long: "Thursday 29 October",
    seats: { "17:30": 11, "20:00": 9 },
    swell: true,
  },
  {
    id: "2026-10-30",
    dow: "Fri",
    day: "30",
    mon: "Oct",
    long: "Friday 30 October",
    seats: { "17:30": 0, "20:00": 0 },
  },
  {
    id: "2026-10-31",
    dow: "Sat",
    day: "31",
    mon: "Oct",
    long: "Saturday 31 October",
    seats: { "17:30": 3, "20:00": 1 },
  },
];

export async function listBookableDays() {
  return days;
}
