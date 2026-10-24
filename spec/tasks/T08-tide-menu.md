# T08 · Tide menu

| Field              | Value                                            |
| ------------------ | ------------------------------------------------ |
| Status             | Done                                             |
| Depends on         | T02, T03                                         |
| Size               | M                                                |
| Recommended skills | `emil-design-eng`, `make-interfaces-feel-better` |

## Goal

Plate II: the sticky Kuroto bay plate with price, and the nine-course list with catch times and a pointer-following preview card.

## References

- `Shiosai.dc.html` lines 182–209, 538–567, 850–853, 1029–1031

## Scope

- Sticky plate at top 112 (static ≤1100, max 440px)
- Rows: number, name + kanji, description, catch time; hover indent and copper underline
- Preview card 280px follows the pointer (+32, −120), shows the course photo or the kanji over the copper rosette
- UV-only line "No substitutions · the sea decides"

## Files

- Create: `src/components/sections/tide-menu/*`

## Animations

- M12 (see `03-motion.md`)
- M15 (see `03-motion.md`)
- M16 (see `03-motion.md`)
- M28 (see `03-motion.md`)

## Accessibility

- Courses are an ordered list
- Preview `aria-hidden`

## Acceptance criteria

- [x] Preview never appears on touch devices
- [x] No layout shift on hover
- [x] Matches the reference at 1440, 820 and 390 widths, day and UV
- [x] Reduced motion leaves everything visible and still
- [x] All UI copy and docs are in English

## Verification

1. `pnpm verify`
2. Browser check at 1440, 820 and 390 wide, in UV mode, then with reduced motion emulated
3. E2E + axe for the region

## Log

| Date       | Evidence                                                                                   |
| ---------- | ------------------------------------------------------------------------------------------ |
| 2026-10-24 | Screenshot: preview card follows the pointer over Kuruma ebi; hidden on hover:none devices |
