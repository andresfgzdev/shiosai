# T04 · Viewfinder, nav, UV toggle and mobile overlay

| Field              | Value                                            |
| ------------------ | ------------------------------------------------ |
| Status             | Done                                             |
| Depends on         | T01, T02                                         |
| Size               | M                                                |
| Recommended skills | `emil-design-eng`, `make-interfaces-feel-better` |

## Goal

The fixed viewfinder (corners, side legend, live plate label, scroll serial) and the glass nav with active link, UV light toggle, Book a table and the burger overlay.

## References

- `Shiosai.dc.html` lines 37–78, 425–453, 882–919, 1004–1013

## Scope

- Viewfinder: four 24px corners at 16px inset (8px ≤720), side legend and plate label hidden ≤860
- Plate label follows the section past 50% of the viewport
- Serial `SS 2610 000000` counts scrolled px (rAF, textContent only)
- Nav: brand 潮, four links, `UV light` toggle (label hidden ≤860), `Book a table`, burger ≤860
- Overlay: five large links, staggered rise, closes on link and `Escape`

## Files

- Create: `src/components/sections/viewfinder/*`, `src/components/sections/nav/*`

## Animations

- M01 (see `03-motion.md`)
- M08 (see `03-motion.md`)
- M28 (see `03-motion.md`)
- M29 (see `03-motion.md`)
- M30 (see `03-motion.md`)

## Accessibility

- `aria-current` on the active link
- Toggle `aria-pressed`
- Overlay: `aria-expanded`, `aria-controls`, focus management, `inert` on main

## Acceptance criteria

- [x] Active link and plate label update on scroll and hash jumps
- [x] UV choice survives reload within the session, no flash
- [x] Matches the reference at 1440, 820 and 390 widths, day and UV
- [x] Reduced motion leaves everything visible and still
- [x] All UI copy and docs are in English

## Verification

1. `pnpm verify`
2. Browser check at 1440, 820 and 390 wide, in UV mode, then with reduced motion emulated
3. E2E + axe for the region

## Log

| Date       | Evidence                                                                                                                                            |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-10-24 | e2e: UV toggle persists for the session; mobile overlay focus, inert and Escape; overlay navigation. Active link and plate label verified on scroll |
