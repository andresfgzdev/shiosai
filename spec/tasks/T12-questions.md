# T12 · Questions

| Field              | Value                                            |
| ------------------ | ------------------------------------------------ |
| Status             | Done                                             |
| Depends on         | T02, T03                                         |
| Size               | S                                                |
| Recommended skills | `emil-design-eng`, `make-interfaces-feel-better` |

## Goal

Plate VI: heading with contact line and six native accordions with animated height.

## References

- `Shiosai.dc.html` lines 318–329, 684–700

## Scope

- `details`/`summary`, first open, `::details-content` transition
- FAQ data reused by the `FAQPage` JSON-LD

## Files

- Create: `src/components/sections/questions/*`

## Animations

- M12 (see `03-motion.md`)
- M26 (see `03-motion.md`)

## Accessibility

- Summary focus ring visible

## Acceptance criteria

- [x] Works without JS
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
| 2026-10-24 | e2e: first item open, toggling reveals the price answer; works without JS (native details) |
