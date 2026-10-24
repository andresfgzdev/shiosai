# T11 · Book a table

| Field              | Value                                            |
| ------------------ | ------------------------------------------------ |
| Status             | Done                                             |
| Depends on         | T02, T03                                         |
| Size               | L                                                |
| Recommended skills | `emil-design-eng`, `make-interfaces-feel-better` |

## Goal

Plate V: steps and assurance, and the perforated table-note widget with dates, swell watch, seating, guests, email, Server Action, loading and the printed ticket.

## References

- `Shiosai.dc.html` lines 244–316, 605–682, 965–993, 1036–1087

## Scope

- Left: three numbered steps with outlined numerals, assurance line
- Bond: serial header, perforation with punched ends, body
- Five date pills (full days disabled, Thu shows Swell watch + the warning line)
- Two seating pills, stepper up to min(6, seats left), email, summary and hold
- Client validation for instant errors; Server Action re-validates (zod + core) and issues the serial
- Loading ≥1.6s with the fill bar; issued: title, body, printed ticket (plate image, Admit n, meta, serial, 発 stamp), Change details

## Files

- Create: `src/components/sections/booking/*`, `src/app/actions/book.ts`

## Animations

- M12 (see `03-motion.md`)
- M20 (see `03-motion.md`)
- M21 (see `03-motion.md`)
- M22 (see `03-motion.md`)
- M23 (see `03-motion.md`)
- M24 (see `03-motion.md`)
- M25 (see `03-motion.md`)

## Accessibility

- `fieldset`/`legend`
- Pills `aria-pressed` + full label
- Error `role=alert` linked by `aria-describedby`
- Focus moves to the issued note and back to the form on Change details

## Acceptance criteria

- [x] A full seating can't be picked; switching to a day with the current seating full jumps to the open one
- [x] Guests clamp when seats drop
- [x] Tampered payloads are rejected with the design's messages
- [x] Matches the reference at 1440, 820 and 390 widths, day and UV
- [x] Reduced motion leaves everything visible and still
- [x] All UI copy and docs are in English

## Verification

1. `pnpm verify`
2. Browser check at 1440, 820 and 390 wide, in UV mode, then with reduced motion emulated
3. E2E + axe for the region

## Log

| Date       | Evidence                                                                                                                                             |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-10-24 | e2e: default Wed 20:00, availability rules, swell warning, email errors, printed note with serial, focus on the note, Change details keeps the email |
