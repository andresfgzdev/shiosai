# T06 · Tide strip and kitchen rule

| Field              | Value                                            |
| ------------------ | ------------------------------------------------ |
| Status             | Done                                             |
| Depends on         | T02, T03                                         |
| Size               | S                                                |
| Recommended skills | `emil-design-eng`, `make-interfaces-feel-better` |

## Goal

The deep harbour-conditions marquee and the centered 60px kitchen rule whose words light up with scroll.

## References

- `Shiosai.dc.html` lines 127–148, 485–498, 894–910, 1018

## Scope

- Strip duplicated once for a seamless −50% loop, pauses on hover
- Rule: lit count only grows; diagonal sweep; `five.`, `noon`, `tonight,` in copper
- Server HTML renders the full sentence

## Files

- Create: `src/components/sections/tide-strip/*`, `src/components/sections/kitchen-rule/*`

## Animations

- M09 (see `03-motion.md`)
- M10 (see `03-motion.md`)
- M11 (see `03-motion.md`)

## Accessibility

- Duplicate strip `aria-hidden`
- Sentence reads as one paragraph

## Acceptance criteria

- [x] One state update per change of lit count
- [x] Matches the reference at 1440, 820 and 390 widths, day and UV
- [x] Reduced motion leaves everything visible and still
- [x] All UI copy and docs are in English

## Verification

1. `pnpm verify`
2. Browser check at 1440, 820 and 390 wide, in UV mode, then with reduced motion emulated
3. E2E + axe for the region

## Log

| Date       | Evidence                                                                                                          |
| ---------- | ----------------------------------------------------------------------------------------------------------------- |
| 2026-10-24 | Screenshots desktop/mobile; marquee seamless; kitchen rule lights on scroll, fully lit under reduced motion (e2e) |
