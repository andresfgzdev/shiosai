# T10 · Countersigned quotes

| Field              | Value                                            |
| ------------------ | ------------------------------------------------ |
| Status             | Done                                             |
| Depends on         | T02, T03                                         |
| Size               | S                                                |
| Recommended skills | `emil-design-eng`, `make-interfaces-feel-better` |

## Goal

Plate IV: three guest quotes with note numbers and rosette avatars.

## References

- `Shiosai.dc.html` lines 232–242, 591–603

## Scope

- Grid 3 / 2 (≤1100) / 1 (≤720)
- Avatar rosettes rotated per guest

## Files

- Create: `src/components/sections/countersigned/*`

## Animations

- M12 (see `03-motion.md`)
- M18 (see `03-motion.md`)

## Accessibility

- `figure`/`blockquote`/`figcaption`

## Acceptance criteria

- [x] Hover is transform only
- [x] Matches the reference at 1440, 820 and 390 widths, day and UV
- [x] Reduced motion leaves everything visible and still
- [x] All UI copy and docs are in English

## Verification

1. `pnpm verify`
2. Browser check at 1440, 820 and 390 wide, in UV mode, then with reduced motion emulated
3. E2E + axe for the region

## Log

| Date       | Evidence                                                           |
| ---------- | ------------------------------------------------------------------ |
| 2026-10-24 | Screenshot desktop; quote serial no longer overlaps the first line |
