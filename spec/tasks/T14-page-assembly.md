# T14 · Page assembly and layout

| Field              | Value                                            |
| ------------------ | ------------------------------------------------ |
| Status             | Done                                             |
| Depends on         | T04–T13                                          |
| Size               | S                                                |
| Recommended skills | `emil-design-eng`, `make-interfaces-feel-better` |

## Goal

`layout.tsx` and `page.tsx` compose every region in design order with the skip link and the UV pre-paint script.

## References

- `Shiosai.dc.html` lines 425–731

## Scope

- Root layout: fonts, metadata, viewport, theme color, JSON-LD slot
- Page reads availability on the server and passes it to the booking widget

## Files

- Create: `src/app/layout.tsx`, `src/app/page.tsx`

## Animations

- M32 (see `03-motion.md`)

## Accessibility

- Landmarks per `04`

## Acceptance criteria

- [x] `/` prerenders as static
- [x] Matches the reference at 1440, 820 and 390 widths, day and UV
- [x] Reduced motion leaves everything visible and still
- [x] All UI copy and docs are in English

## Verification

1. `pnpm verify`
2. Browser check at 1440, 820 and 390 wide, in UV mode, then with reduced motion emulated
3. E2E + axe for the region

## Log

| Date       | Evidence                                                                                 |
| ---------- | ---------------------------------------------------------------------------------------- |
| 2026-10-24 | `/` prerenders as static (○); landmarks verified by axe (0 serious/critical, day and UV) |
