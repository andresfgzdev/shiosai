# T17 · Quality pass

| Field              | Value                                            |
| ------------------ | ------------------------------------------------ |
| Status             | Review                                           |
| Depends on         | T16                                              |
| Size               | M                                                |
| Recommended skills | `emil-design-eng`, `make-interfaces-feel-better` |

## Goal

Prove the budgets in `04-quality-gates.md`: e2e journeys, axe, UV mode, reduced motion, Lighthouse.

## References

- `spec/04-quality-gates.md`

## Scope

- E2E: nav, overlay, UV toggle, carousel, watermark, FAQ, booking happy path and every error, 404
- axe on `/` (day and UV) and the 404 at desktop and mobile
- Reduced-motion run
- Lighthouse mobile on the production build

## Files

- Create: `tests/e2e/*.spec.ts`

## Animations

- None

## Accessibility

- None

## Acceptance criteria

- [ ] All budgets met or the gap recorded as Blocked with the reason
- [ ] Matches the reference at 1440, 820 and 390 widths, day and UV
- [ ] Reduced motion leaves everything visible and still
- [ ] All UI copy and docs are in English

## Verification

1. `pnpm verify`
2. Browser check at 1440, 820 and 390 wide, in UV mode, then with reduced motion emulated
3. E2E + axe for the region

## Log

| Date       | Evidence                                                                                                                                                                                                                         |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-10-24 | 28/28 e2e (desktop + mobile, axe day and UV). Lighthouse desktop 99/100/100/100; mobile 85–86/100/100/100 (simulated LCP 4.2 s, observed 0.3 s). Open: mobile Performance ≥ 90 not met; carousel flake under heavy parallel load |
