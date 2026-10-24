# T09 · Storm clause and watermark

| Field              | Value                                            |
| ------------------ | ------------------------------------------------ |
| Status             | Done                                             |
| Depends on         | T02, T03                                         |
| Size               | M                                                |
| Recommended skills | `emil-design-eng`, `make-interfaces-feel-better` |

## Goal

Plate III over the night storm engraving: the clause card with three stats, and the watermark you can hold to the light.

## References

- `Shiosai.dc.html` lines 211–230, 569–589, 1032–1035

## Scope

- Storm image lazy, cover, 92%
- Card blurred deep glass
- Watermark 400px (320 ≤1100) with oval, rosette and 潮; toggle button below

## Files

- Create: `src/components/sections/storm/*`

## Animations

- M11 (see `03-motion.md`)
- M12 (see `03-motion.md`)
- M17 (see `03-motion.md`)

## Accessibility

- Toggle `aria-pressed` and label swap

## Acceptance criteria

- [x] Text contrast on the card meets AA
- [x] Matches the reference at 1440, 820 and 390 widths, day and UV
- [x] Reduced motion leaves everything visible and still
- [x] All UI copy and docs are in English

## Verification

1. `pnpm verify`
2. Browser check at 1440, 820 and 390 wide, in UV mode, then with reduced motion emulated
3. E2E + axe for the region

## Log

| Date       | Evidence                                                                        |
| ---------- | ------------------------------------------------------------------------------- |
| 2026-10-24 | e2e: watermark toggle aria-pressed + label swap; storm card contrast passes axe |
