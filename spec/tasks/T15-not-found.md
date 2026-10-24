# T15 · 404 · retired note

| Field              | Value                                            |
| ------------------ | ------------------------------------------------ |
| Status             | Done                                             |
| Depends on         | T01                                              |
| Size               | S                                                |
| Recommended skills | `emil-design-eng`, `make-interfaces-feel-better` |

## Goal

`not-found.tsx` renders the retired note in Shiosai's palette: serial, outlined 404, headline, copy, back CTA, mail link and the 廃 void stamp.

## References

- `NotFound.dc.html` lines 11–80 (layout, motion)
- Shiosai tokens and copy

## Scope

- Copy: eyebrow "Shiosai · Error note", serial "SS 0404 000 X", h1 "This note went out with the tide.", body about the page being withdrawn, CTA "Back to tonight's table", mail link to table@shiosai.jp
- Back arrow nudges left on hover

## Files

- Create: `src/app/not-found.tsx`, `src/app/not-found.module.css`

## Animations

- M33 (see `03-motion.md`)
- M19 (see `03-motion.md`)

## Accessibility

- One `h1`
- Numeral and stamp `aria-hidden`

## Acceptance criteria

- [x] Unknown routes return 404 with this page
- [x] Matches the reference at 1440, 820 and 390 widths, day and UV
- [x] Reduced motion leaves everything visible and still
- [x] All UI copy and docs are in English

## Verification

1. `pnpm verify`
2. Browser check at 1440, 820 and 390 wide, in UV mode, then with reduced motion emulated
3. E2E + axe for the region

## Log

| Date       | Evidence                                                                                        |
| ---------- | ----------------------------------------------------------------------------------------------- |
| 2026-10-24 | e2e: /nope returns 404 with the retired note and the back link returns home. Screenshot desktop |
