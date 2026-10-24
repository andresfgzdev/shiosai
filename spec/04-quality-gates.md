# 04 · Quality gates

## Budgets (production build, Lighthouse mobile)

| Metric                        | Budget                                                                                 |
| ----------------------------- | -------------------------------------------------------------------------------------- |
| Performance / A11y / BP / SEO | desktop ≥ 95, mobile ≥ 90 / 100 / 100 / 100                                            |
| LCP (hero poster)             | ≤ 2.0s                                                                                 |
| CLS                           | ≤ 0.02                                                                                 |
| INP                           | ≤ 150ms                                                                                |
| First-load JS for `/`         | framework baseline + ≤ 30 KB gzip of app code (Next 16 + React 19 alone ship ≈ 170 KB) |

How:
- The hero poster is the only eagerly loaded image (`preload`, `fetchPriority="high"`; Next 16 deprecated `priority`). The hero video has no `src` until `load` plus idle time, and only on screens ≥ 721px with a 4G connection and no Save-Data. On phones the poster stays.
- Video posters are rendered through `next/image` (lazy, resized), never through the `poster` attribute, which downloads the full file eagerly even with `preload="none"`.
- All other images are lazy with `sizes`. The 1.1 MB loupe plate is fetched only on the first pointer move over the hero.
- Every other video: `preload="none"`, poster, plays only in view.
- Fonts are self-hosted by `next/font`; Noto Serif JP is a 10 KB subset.
- Client code is limited to the islands listed in `01`.

## Accessibility

- Landmarks: `header`, `nav[aria-label=Primary]`, `main#main`, `footer`; sections labelled by their headings; one `h1`.
- Skip link first in tab order. Visible focus: 2px copper outline, 3px offset.
- Decorative engravings, kanji, numerals, viewfinder, the duplicated tide strip, loupe and preview card are `aria-hidden`. The first tide strip copy is readable (`aria-label="Harbour conditions this morning"`).
- UV toggle: `button[aria-pressed]`, visible label at ≥860px, accessible name always "UV light".
- Carousel: the track is a focusable, labelled region; arrow keys move between notes; prev/next and dots are labelled buttons; "Note II of IV" is `aria-live=polite`.
- Watermark toggle: `aria-pressed`, label swaps.
- Booking: `fieldset`/`legend`; pills are `button[aria-pressed]` with a full `aria-label`; guest count is an `output[aria-live]`; email has `aria-invalid` + `aria-describedby` → `role=alert`; the issued note is `role=status` and gets focus.
- Mobile menu: `aria-expanded`/`aria-controls`, focus into the overlay, `Escape` closes and restores focus, scroll lock, `inert` on main.
- Text contrast ≥ 4.5:1 in both palettes (see `--copper-ink`).
- Touch targets ≥ 44px.

## SEO

Title "Shiosai · Tonight's dinner left the harbour at five", the design's description, canonical, Open Graph and Twitter image (1200×630, generated), `Restaurant` JSON-LD (address, servesCuisine, priceRange, opening hours Wed–Sun, acceptsReservations, telephone, email) and `FAQPage`, `robots.ts`, `sitemap.ts`, `manifest.ts`, `lang="en"`, theme color.

## Measured (2026-10-24, production build, Lighthouse 12.8.2)

| Run                        | Perf  | A11y | BP  | SEO | LCP       | TBT      | CLS |
| -------------------------- | ----- | ---- | --- | --- | --------- | -------- | --- |
| Desktop                    | 99    | 100  | 100 | 100 | 1.0 s     | 0 ms     | 0   |
| Mobile (simulated, 3 runs) | 85–86 | 100  | 100 | 100 | 4.2–4.3 s | 20–30 ms | 0   |

Observed mobile LCP in the same runs is about 0.3 s; the simulated figure charges main-thread script time to the decorative panel rosette, which the simulation picks as the LCP image. First-load JS: 201 KB gzip (≈ 170 KB framework); CSS: 11 KB gzip. **Open:** the mobile Performance budget (≥ 90) is not met.

## Definition of Done (per task)

1. Matches the reference lines at 1440, 820 and 390 widths, in day and UV mode.
2. Every motion item the task owns is implemented and switched off under reduced motion.
3. `pnpm verify` is green.
4. The section's e2e assertions and axe pass (no serious or critical violations).
5. Evidence recorded in the task's "Log".
