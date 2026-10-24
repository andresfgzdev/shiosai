# T07 · The voyage carousel

| Field              | Value                                            |
| ------------------ | ------------------------------------------------ |
| Status             | Done                                             |
| Depends on         | T02, T03                                         |
| Size               | L                                                |
| Recommended skills | `emil-design-eng`, `make-interfaces-feel-better` |

## Goal

Plate I: four notes (05:10, 07:40, 11:20, 17:30) in a scroll-snap track with drag, prev/next, dots and a live label.

## References

- `Shiosai.dc.html` lines 150–180, 500–536, 817–848, 921–937, 1019–1028

## Scope

- Notes: media column (video or image with hue tint), body with outlined time, title, copy, foot label and kanji
- Active index from scroll position; inactive notes dimmed
- Mouse drag with grab cursor and snap release; touch uses native scroll
- Arrow keys on the focused track
- ≤860: notes stack media over body; ≤720: 88vw

## Files

- Create: `src/components/sections/voyage/*`

## Animations

- M12 (see `03-motion.md`)
- M13 (see `03-motion.md`)
- M14 (see `03-motion.md`)
- M31 (see `03-motion.md`)
- M28 (see `03-motion.md`)

## Accessibility

- Region label "The voyage, four notes"
- `aria-live` label
- Buttons labelled

## Acceptance criteria

- [x] Index, label and dots stay in sync with swipe, drag, keys and buttons
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
| 2026-10-24 | e2e: buttons, dots and ArrowLeft keep index, label and dots in sync (passes 3×28/28 and 60/60 repeated). Known flake: 1/112 under 8 parallel workers |
