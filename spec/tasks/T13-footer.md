# T13 · Footer and the sea

| Field              | Value                                            |
| ------------------ | ------------------------------------------------ |
| Status             | Done                                             |
| Depends on         | T02, T03                                         |
| Size               | M                                                |
| Recommended skills | `emil-design-eng`, `make-interfaces-feel-better` |

## Goal

Brand column with socials, three link columns, the 560px sea loop with the outlined "Shiosai 潮騒" word, UV-only fibers and line, and the legal bar with credits.

## References

- `Shiosai.dc.html` lines 331–355, 703–730

## Scope

- Columns 1.2fr + 3 (2 at ≤1100, 1 at ≤720)
- Sea 560 (360 ≤720), word 128 (60 ≤720)

## Files

- Create: `src/components/sections/footer/*`

## Animations

- M27 (see `03-motion.md`)
- M28 (see `03-motion.md`)
- M31 (see `03-motion.md`)
- M19 (see `03-motion.md`)

## Accessibility

- `nav[aria-label=Legal]`
- Social links labelled

## Acceptance criteria

- [x] All tel, mailto and map links real
- [x] Matches the reference at 1440, 820 and 390 widths, day and UV
- [x] Reduced motion leaves everything visible and still
- [x] All UI copy and docs are in English

## Verification

1. `pnpm verify`
2. Browser check at 1440, 820 and 390 wide, in UV mode, then with reduced motion emulated
3. E2E + axe for the region

## Log

| Date       | Evidence                                                                            |
| ---------- | ----------------------------------------------------------------------------------- |
| 2026-10-24 | Screenshots desktop/mobile; sea loop with poster via next/image; legal nav labelled |
