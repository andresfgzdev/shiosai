# T01 · Tokens, UV theme, fonts and primitives

| Field              | Value                                            |
| ------------------ | ------------------------------------------------ |
| Status             | Done                                             |
| Depends on         | T00                                              |
| Size               | M                                                |
| Recommended skills | `emil-design-eng`, `make-interfaces-feel-better` |

## Goal

Tokens for day and UV, the three font families, global utilities (`media`, `uv-only`, `glow`, `mono`, `jp`) and the shared primitives.

## References

- `Shiosai.dc.html` lines 15–35, 94–110, 133–139, 176, 357–422
- `spec/02-design-system.md`

## Scope

- `tokens.css` with both palettes and `--copper-ink`
- `globals.css`: reset, keyframes (`rise`, `spin`, `marquee`, `press`, `mesh`, `stamp`, `print`, `fill`, `navIn`), focus ring, skip link, reduced-motion kill switch
- `next/font/google`: Manrope, Geist Mono, Noto Serif JP (no preload)
- `uv-store.ts` + pre-paint restore script
- Primitives: `Icon`, `Eyebrow`, `ArrowLink`/`ArrowButton`, `Chip`, `Numeral`

## Files

- Create: `src/app/tokens.css`, `src/app/globals.css`, `src/app/fonts.ts`, `src/lib/uv-store.ts`, `src/components/ui/*`

## Animations

- M19 (see `03-motion.md`)
- M28 (see `03-motion.md`)
- M32 (see `03-motion.md`)

## Accessibility

- Icons `aria-hidden`
- Contrast ≥ 4.5:1 in both palettes

## Acceptance criteria

- [x] No hex outside `tokens.css`
- [x] Toggling `data-uv` on `<html>` re-themes the whole page with no layout shift
- [x] Matches the reference at 1440, 820 and 390 widths, day and UV
- [x] Reduced motion leaves everything visible and still
- [x] All UI copy and docs are in English

## Verification

1. `pnpm verify`
2. Browser check at 1440, 820 and 390 wide, in UV mode, then with reduced motion emulated
3. E2E + axe for the region

## Log

| Date       | Evidence                                                                                                                                                                                                 |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-10-24 | `pnpm verify` green (lint, typecheck, 17 unit tests, static build); screenshots at 1440/820/390 in day and UV match the canvas; keyframes referenced via `--kf-*` after finding CSS Modules renamed them |
