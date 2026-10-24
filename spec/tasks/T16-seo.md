# T16 · SEO and metadata

| Field              | Value                                            |
| ------------------ | ------------------------------------------------ |
| Status             | Done                                             |
| Depends on         | T14                                              |
| Size               | M                                                |
| Recommended skills | `emil-design-eng`, `make-interfaces-feel-better` |

## Goal

Complete metadata, social cards, structured data and crawl files.

## References

- `Shiosai.dc.html` lines 5–6
- `spec/04-quality-gates.md § SEO`

## Scope

- `metadata` + `viewport`
- `opengraph-image.tsx` 1200×630
- `Restaurant` + `FAQPage` JSON-LD with `schema-dts`
- `robots.ts`, `sitemap.ts`, `manifest.ts`, `icon.svg`

## Files

- Create: `src/app/robots.ts`, `sitemap.ts`, `manifest.ts`, `icon.svg`, `opengraph-image.tsx`, `src/components/seo/json-ld.tsx`

## Animations

- None

## Accessibility

- None

## Acceptance criteria

- [x] Both JSON-LD blocks parse
- [x] Lighthouse SEO 100
- [x] Matches the reference at 1440, 820 and 390 widths, day and UV
- [x] Reduced motion leaves everything visible and still
- [x] All UI copy and docs are in English

## Verification

1. `pnpm verify`
2. Browser check at 1440, 820 and 390 wide, in UV mode, then with reduced motion emulated
3. E2E + axe for the region

## Log

| Date       | Evidence                                                                                                            |
| ---------- | ------------------------------------------------------------------------------------------------------------------- |
| 2026-10-24 | e2e: Restaurant + FAQPage JSON-LD parse; robots, sitemap and OG image served. Lighthouse SEO 100 desktop and mobile |
