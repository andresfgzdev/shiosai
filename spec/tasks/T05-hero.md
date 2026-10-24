# T05 · Hero: plate, denomination, panel and loupe

| Field              | Value                                            |
| ------------------ | ------------------------------------------------ |
| Status             | Done                                             |
| Depends on         | T01, T02                                         |
| Size               | L                                                |
| Recommended skills | `emil-design-eng`, `make-interfaces-feel-better` |

## Goal

The 900px full-bleed hero: engraved boat loop over its poster, the ¥16,500 denomination, the note panel with copper band and the headline, the loupe and its hint, and the UV-only marks.

## References

- `Shiosai.dc.html` lines 80–125, 456–483, 939–963
- Breakpoints 384–396

## Scope

- Poster through `next/image` with `priority` (LCP); video fades in over it on `canplay`, loaded after `window.load`
- Panel 640px max at left 56 / bottom 56; rosette watermark
- Loupe: 240px lens, 2.6× zoom of `hero-plate.webp` mapped to the cover-fit plate (focal point 60% 50%); hidden over panel and nav; only on `(pointer: fine)`; cursor hidden over the plate
- UV: fibers layer and the glowing 潮騒 mark
- ≤720: hero becomes a column, panel below with 400px of plate above

## Files

- Create: `src/components/sections/hero/*`

## Animations

- M02 (see `03-motion.md`)
- M03 (see `03-motion.md`)
- M04 (see `03-motion.md`)
- M05 (see `03-motion.md`)
- M06 (see `03-motion.md`)
- M07 (see `03-motion.md`)
- M11 (see `03-motion.md`)
- M28 (see `03-motion.md`)

## Accessibility

- Single `h1`
- Media, denomination, loupe and hint `aria-hidden`
- Proof line is plain text

## Acceptance criteria

- [x] LCP is the poster; CLS 0
- [x] The loupe never blocks clicks on the panel
- [x] Matches the reference at 1440, 820 and 390 widths, day and UV
- [x] Reduced motion leaves everything visible and still
- [x] All UI copy and docs are in English

## Verification

1. `pnpm verify`
2. Browser check at 1440, 820 and 390 wide, in UV mode, then with reduced motion emulated
3. E2E + axe for the region

## Log

| Date       | Evidence                                                                                                                                         |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| 2026-10-24 | Screenshots: hero day/UV/mobile, loupe magnifying the plate. Video gated to ≥721px + 4G + no Save-Data; poster preloaded with fetchPriority high |
