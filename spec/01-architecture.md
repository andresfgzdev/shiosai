# 01 · Architecture

## Stack

| Layer      | Choice                                                                                                                                                                          |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework  | Next.js 16.4 App Router, React 19.3, React Compiler                                                                                                                             |
| Styling    | CSS Modules per section + global tokens in `src/app/tokens.css`                                                                                                                 |
| Motion     | CSS transitions and keyframes only. The `motion` library was tried for the booking widget and removed: it cost 58 KB gzip for effects CSS keyframes on keyed elements reproduce |
| Validation | `zod` at the Server Action boundary                                                                                                                                             |
| Tests      | Vitest (domain + components), Playwright + axe (e2e)                                                                                                                            |
| Lint       | Biome 2.6                                                                                                                                                                       |

Why CSS Modules and not Tailwind: the design is bespoke (guilloché fills, text-stroke numerals clipped to a moving mesh, ring shadows, `::details-content`, a page-wide UV theme). Section-scoped modules keep each region readable next to its reference lines and ship zero runtime.

## Folders

```
src/
  app/
    layout.tsx  page.tsx  not-found.tsx
    actions/book.ts                     Server Action
    tokens.css  globals.css  fonts.ts
    robots.ts  sitemap.ts  manifest.ts  icon.svg  opengraph-image.tsx
  content/site.ts                       typed copy
  core/booking.ts (+ test)              pure rules
  server/availability.ts                in-memory repository (server-only)
  lib/scroll-loop.ts                    one rAF loop shared by every scroll effect
  lib/uv-store.ts                       UV theme external store
  components/
    motion/                             Reveal, AutoVideo, use-reduced-motion
    ui/                                 Icon, Eyebrow, Button, Chip, Numeral
    seo/json-ld.tsx
    sections/<region>/                  one folder per region
```

## Rendering

- `/` is fully static. Availability is read on the server at build time and passed to the widget; the Server Action re-reads it on submit.
- Client islands (only these): `Viewfinder` (plate label + scroll serial), `Nav` (active link, overlay), `UvToggle`, `Loupe`, `HeroVideo`, `Tagline`, `Voyage`, `Courses` (hover preview), `Watermark`, `BookingWidget`, plus the generic `Reveal` and `AutoVideo`.
- Every island renders full HTML on the server; JS only enhances.
- **UV mode** lives on `<html data-uv>`; CSS reacts globally. `uv-store.ts` exposes `subscribe/get/toggle` for `useSyncExternalStore` and persists to `sessionStorage`. A tiny inline script in `<head>` restores it before paint (no flash).
- **Scroll work** goes through `scroll-loop.ts`: one passive `scroll`/`resize` listener, one `requestAnimationFrame` per frame, subscribers write to the DOM directly.

## Data flow (booking)

```
server/availability.ts ─► page.tsx ─► <BookingWidget days>   client: date, seating, guests, email
                                           │ form action (useActionState, min 1.6s)
                                           ▼
                              app/actions/book.ts ─► zod ─► core/booking.validateBooking ─► table note
```
