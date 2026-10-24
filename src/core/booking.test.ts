import {
  type Day,
  dayStatus,
  guestHint,
  holdFor,
  issuedCopy,
  issueSerial,
  maxGuests,
  messages,
  pickDay,
  pickSeating,
  type Selection,
  seatLabel,
  stepGuests,
  summaryFor,
  validateBooking,
  validateEmail,
} from "./booking";

const sun: Day = {
  id: "sun",
  dow: "Sun",
  day: "25",
  mon: "Oct",
  long: "Sunday 25 October",
  seats: { "17:30": 0, "20:00": 2 },
};
const wed: Day = {
  id: "wed",
  dow: "Wed",
  day: "28",
  mon: "Oct",
  long: "Wednesday 28 October",
  seats: { "17:30": 8, "20:00": 5 },
};
const thu: Day = {
  id: "thu",
  dow: "Thu",
  day: "29",
  mon: "Oct",
  long: "Thursday 29 October",
  seats: { "17:30": 11, "20:00": 9 },
  swell: true,
};
const fri: Day = {
  id: "fri",
  dow: "Fri",
  day: "30",
  mon: "Oct",
  long: "Friday 30 October",
  seats: { "17:30": 0, "20:00": 0 },
};
const sat: Day = {
  id: "sat",
  dow: "Sat",
  day: "31",
  mon: "Oct",
  long: "Saturday 31 October",
  seats: { "17:30": 3, "20:00": 1 },
};
const days = [sun, wed, thu, fri, sat];

const base: Selection = { dayId: "wed", seating: "20:00", guests: 2 };

describe("day status", () => {
  it("labels full, swell and open days", () => {
    expect(dayStatus(fri)).toBe("Full");
    expect(dayStatus(thu)).toBe("Swell watch");
    expect(dayStatus(wed)).toBe("13 left");
  });

  it("labels seats per seating", () => {
    expect(seatLabel(0)).toBe("Full");
    expect(seatLabel(1)).toBe("1 seat left");
    expect(seatLabel(5)).toBe("5 seats left");
  });
});

describe("selection rules", () => {
  it("moves to the open seating when the current one is full", () => {
    expect(pickDay({ ...base, seating: "17:30" }, sun)).toEqual({
      dayId: "sun",
      seating: "20:00",
      guests: 2,
    });
  });

  it("keeps the seating when it still has seats", () => {
    expect(pickDay(base, thu)).toEqual({ dayId: "thu", seating: "20:00", guests: 2 });
  });

  it("clamps guests to the seats left", () => {
    expect(pickDay({ ...base, guests: 4 }, sat)).toEqual({
      dayId: "sat",
      seating: "20:00",
      guests: 1,
    });
    expect(pickSeating({ dayId: "sat", seating: "17:30", guests: 3 }, sat, "20:00").guests).toBe(1);
  });

  it("steps guests between one and the maximum", () => {
    expect(stepGuests({ ...base, guests: 1 }, wed, -1).guests).toBe(1);
    expect(stepGuests({ ...base, guests: 5 }, wed, 1).guests).toBe(5);
    expect(stepGuests({ dayId: "thu", seating: "17:30", guests: 6 }, thu, 1).guests).toBe(6);
  });

  it("caps online bookings at six", () => {
    expect(maxGuests(thu, "17:30")).toBe(6);
    expect(maxGuests(sat, "17:30")).toBe(3);
  });
});

describe("copy", () => {
  it("formats the hold in yen", () => {
    expect(holdFor(2)).toBe("¥10,000");
    expect(holdFor(1)).toBe("¥5,000");
  });

  it("builds the summary line", () => {
    expect(summaryFor(wed, base)).toBe("2 guests · Wed 28 Oct · 20:00");
    expect(summaryFor(sat, { dayId: "sat", seating: "20:00", guests: 1 })).toBe(
      "1 guest · Sat 31 Oct · 20:00",
    );
  });

  it("explains the guest limit", () => {
    expect(guestHint(sat, "20:00")).toBe("Only 1 seat left at 20:00.");
    expect(guestHint(wed, "20:00")).toBe("Only 5 seats left at 20:00.");
    expect(guestHint(thu, "17:30")).toBe("Up to six online. For more, write to us.");
  });

  it("writes the issued note", () => {
    const copy = issuedCopy(wed, { ...base, email: "a@b.jp" });
    expect(copy.title).toBe("Your table note is issued for Wednesday 28 October at 20:00.");
    expect(copy.body).toBe(
      "We sent it to a@b.jp. If the boat stays in that morning, the ¥10,000 hold comes back by 09:00.",
    );
    expect(copy.meta).toBe("Wed 28 Oct · 20:00 · Pier 2");
  });

  it("issues serials in range", () => {
    expect(issueSerial(0)).toBe("SS 2610 4000");
    expect(issueSerial(0.9999)).toBe("SS 2610 9998");
  });
});

describe("validation", () => {
  it("validates email", () => {
    expect(validateEmail("  ")).toBe(messages.emailMissing);
    expect(validateEmail("name@domain")).toBe(messages.emailInvalid);
    expect(validateEmail("name@domain.c")).toBe(messages.emailInvalid);
    expect(validateEmail(" name@domain.com ")).toBeNull();
  });

  it("accepts a valid booking and trims the email", () => {
    const result = validateBooking(days, { ...base, email: " yuki@example.jp " });
    expect(result).toMatchObject({ ok: true, request: { email: "yuki@example.jp" } });
  });

  it("rejects taken, unknown or out-of-range seats", () => {
    const email = "yuki@example.jp";
    expect(validateBooking(days, { dayId: "fri", seating: "20:00", guests: 1, email })).toEqual({
      ok: false,
      field: "seats",
      message: messages.seatsTaken,
    });
    expect(validateBooking(days, { dayId: "nope", seating: "20:00", guests: 1, email }).ok).toBe(
      false,
    );
    expect(validateBooking(days, { dayId: "thu", seating: "17:30", guests: 7, email }).ok).toBe(
      false,
    );
    expect(validateBooking(days, { dayId: "sat", seating: "20:00", guests: 2, email }).ok).toBe(
      false,
    );
  });

  it("checks the email before the seats", () => {
    expect(
      validateBooking(days, { dayId: "fri", seating: "20:00", guests: 1, email: "" }),
    ).toMatchObject({
      field: "email",
      message: messages.emailMissing,
    });
  });
});
