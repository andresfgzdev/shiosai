# T03 · Content and booking domain

| Field              | Value                                            |
| ------------------ | ------------------------------------------------ |
| Status             | Done                                             |
| Depends on         | T00                                              |
| Size               | M                                                |
| Recommended skills | `emil-design-eng`, `make-interfaces-feel-better` |

## Goal

All copy typed in `src/content/site.ts`, and the booking rules as pure, tested functions fed by a server-only availability repository.

## References

- `Shiosai.dc.html` lines 734–771 (data), 965–993 (rules), 995–1087 (derived copy)

## Scope

- `content/site.ts`: nav, plates, tide strip, kitchen rule (with copper words), voyage notes, courses, storm stats, quotes, booking steps, FAQs, footer, credits
- `core/booking.ts`: `seatsLeft`, `totalLeft`, `maxGuests` (min of 6 and seats left), `clampGuests`, `pickDay` (moves to an open seating when the current one is full), `pickSeating`, `holdFor` (¥5,000 × guests, `en-US` grouping), `summaryFor`, `seatLabel`, `dayStatus` (Full / Swell watch / n left), `dayAria`, `guestHint`, `validateEmail`, `validateBooking`, `issueSerial`
- `server/availability.ts`: Sun 25, Wed 28, Thu 29 (swell), Fri 30, Sat 31 October

## Files

- Create: `src/content/site.ts`, `src/core/booking.ts`, `src/core/booking.test.ts`, `src/server/availability.ts`

## Animations

- None

## Accessibility

- None

## Acceptance criteria

- [x] Unit tests cover every rule and every error message
- [x] Error copy matches the design exactly
- [x] Matches the reference at 1440, 820 and 390 widths, day and UV
- [x] Reduced motion leaves everything visible and still
- [x] All UI copy and docs are in English

## Verification

1. `pnpm verify`
2. Browser check at 1440, 820 and 390 wide, in UV mode, then with reduced motion emulated
3. E2E + axe for the region

## Log

| Date       | Evidence                                                                                                                                                             |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-10-24 | `pnpm verify` green (lint, typecheck, 17 unit tests, static build); `src/core/booking.test.ts` covers every rule and message; `kanji.test.ts` guards the font subset |
