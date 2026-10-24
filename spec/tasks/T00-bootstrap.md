# T00 · Project bootstrap

| Field              | Value                                            |
| ------------------ | ------------------------------------------------ |
| Status             | Done                                             |
| Depends on         | —                                                |
| Size               | S                                                |
| Recommended skills | `emil-design-eng`, `make-interfaces-feel-better` |

## Goal

A Next.js 16 project that builds, lints, typechecks and tests green, with the design assets in `public/` and the commit guard installed.

## References

- `spec/01-architecture.md`
- `spec/05-conventions.md`

## Scope

- `package.json` with exact versions and `pnpm verify`
- Biome, strict TypeScript, Vitest, Playwright configs
- `lefthook` with the no-AI-co-author `commit-msg` hook
- Every canvas asset copied to `public/media` and `public/engraving` with meaningful names
- Security headers and immutable caching for `/media` and `/engraving`

## Files

- Create: `package.json`, `biome.json`, `tsconfig.json`, `next.config.ts`, `vitest.config.ts`, `playwright.config.ts`, `lefthook.yml`, `scripts/check-commit-msg.mjs`

## Animations

- None

## Accessibility

- None

## Acceptance criteria

- [x] `pnpm verify` passes
- [x] No dependency uses a range
- [x] Matches the reference at 1440, 820 and 390 widths, day and UV
- [x] Reduced motion leaves everything visible and still
- [x] All UI copy and docs are in English

## Verification

1. `pnpm verify`
2. Browser check at 1440, 820 and 390 wide, in UV mode, then with reduced motion emulated
3. E2E + axe for the region

## Log

| Date       | Evidence                                                                                                                                                  |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-10-24 | `pnpm verify` green (lint, typecheck, 17 unit tests, static build); exact versions; lefthook commit-msg guard copied from DueDeck; 33 assets in `public/` |
