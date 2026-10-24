# T02 · Motion foundation

| Field              | Value                                            |
| ------------------ | ------------------------------------------------ |
| Status             | Done                                             |
| Depends on         | T01                                              |
| Size               | S                                                |
| Recommended skills | `emil-design-eng`, `make-interfaces-feel-better` |

## Goal

Reusable motion plumbing: the shared scroll loop, scroll reveal, in-view autoplay video and the reduced-motion hook.

## References

- `Shiosai.dc.html` lines 138–139, 780–862
- `spec/03-motion.md § Rules`

## Scope

- `scroll-loop.ts`: one passive listener on scroll and resize, one rAF, `subscribe(fn)` returning an unsubscribe
- `Reveal`: polymorphic wrapper, sets `data-in` at 12% visibility with −8% bottom margin, then unobserves; `delay` → `--delay`; content visible without JS
- `AutoVideo`: muted, looped, `playsInline`, `preload="none"`, plays at 10% visibility and pauses when out; no autoplay under reduced motion
- `usePrefersReducedMotion` via `useSyncExternalStore`

## Files

- Create: `src/lib/scroll-loop.ts`, `src/components/motion/*`

## Animations

- M12 (see `03-motion.md`)
- M31 (see `03-motion.md`)

## Accessibility

- Videos keep their design `aria-label`s

## Acceptance criteria

- [x] Without JS every section is visible
- [x] Videos never download before they approach the viewport
- [x] Matches the reference at 1440, 820 and 390 widths, day and UV
- [x] Reduced motion leaves everything visible and still
- [x] All UI copy and docs are in English

## Verification

1. `pnpm verify`
2. Browser check at 1440, 820 and 390 wide, in UV mode, then with reduced motion emulated
3. E2E + axe for the region

## Log

| Date       | Evidence                                                                                                                                                                           |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-10-24 | `pnpm verify` green (lint, typecheck, 17 unit tests, static build); e2e "reduced motion › shows everything still and lit" passes; posters via next/image, videos play in view only |
