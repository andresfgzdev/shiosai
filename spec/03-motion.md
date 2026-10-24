# 03 · Motion

One curve everywhere: `--ease: cubic-bezier(.32,.72,0,1)`. 500–600ms for hover and press, 700–900ms for state changes, 1–1.4s for entrances, long linear loops for ambient motion.

## Catalog

| ID  | Element            | Trigger        | Animation                                                                                                                                    | Ref (Shiosai.dc.html) |
| --- | ------------------ | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| M01 | Nav pill           | load           | `navIn` from y −32 and blur 8, 1.1s                                                                                                          | 49–51                 |
| M02 | Hero media         | load           | paper overlay scales away top to bottom (`scaleY` 1 → 0, origin bottom), 2s; replaces the canvas clip-path so the poster paints at full size | 83, 360               |
| M03 | Hero panel         | load           | `rise` (y 64, blur 12), 1.4s at 0.3s                                                                                                         | 90, 357               |
| M04 | Hero headline      | load           | `rise` per line at 0.5 / 0.6 / 0.7s; sub at 0.8s; CTA row at 0.9s                                                                            | 99–102                |
| M05 | Denomination       | load + ambient | `rise` at 0.5s; hatch mesh drifts 96×48px every 24s                                                                                          | 84–86, 361            |
| M06 | Loupe              | pointer        | follows the pointer (transform only), fades and scales 0.6 → 1; ring text spins 30s; hidden over the panel and nav                           | 111–121, 939–963      |
| M07 | Loupe hint         | load           | `rise` at 1.2s                                                                                                                               | 122                   |
| M08 | Viewfinder         | scroll         | plate label swaps at 50% viewport; serial counts scrolled pixels                                                                             | 37–47, 882–893        |
| M09 | Tide strip         | ambient        | marquee −50% in 80s, paused on hover                                                                                                         | 127–131               |
| M10 | Kitchen rule words | scroll         | words light 52% → 100% along a diagonal sweep at 62% viewport; copper words stay copper                                                      | 141–148, 894–910      |
| M11 | Watermarks         | ambient        | rotate 360° in 120–220s                                                                                                                      | 93, 142, 170, 223     |
| M12 | Reveal             | enter viewport | y 64 + blur 12 → rest, 1–1.1s, stagger via `--delay`                                                                                         | 138–139               |
| M13 | Voyage notes       | carousel       | inactive notes dim to 0.55 and scale 0.96 (1s); smooth scroll-snap; drag with grab cursor; active dot thickens                               | 157–180, 921–937      |
| M14 | Round buttons      | hover / press  | scale 1.06 / 0.94; disabled 0.35                                                                                                             | 153–156               |
| M15 | Course rows        | hover          | row indents 12px; copper underline draws left → right, 0.9s                                                                                  | 192–196               |
| M16 | Course preview     | hover          | card follows the pointer, fades in 0.45s, tilted −3°                                                                                         | 203–209, 850–852      |
| M17 | Watermark          | toggle         | oval brightens and glows, rosette 0.18 → 0.5, kanji shifts to ink, 1.2s                                                                      | 221–230               |
| M18 | Quotes             | hover          | lift −4px                                                                                                                                    | 233–234               |
| M19 | Buttons            | hover / press  | lift −2px, brightness 1.08, arrow tile x +4; press scale 0.98                                                                                | 103–108               |
| M20 | Pills, stepper     | hover / press  | lift −2px / scale 1.06; press 0.97 / 0.94; selection colors 0.6s                                                                             | 264–287               |
| M21 | Inputs             | focus / error  | 1.5px cobalt ring + 4px halo; copper ring on error; error text slides in                                                                     | 290–295               |
| M22 | Swell watch        | date change    | warning line expands in                                                                                                                      | 280, 643              |
| M23 | Guest count        | change         | the new number rises in from 16px below, 0.4s (keyed span, CSS)                                                                              | new                   |
| M24 | Booking submit     | loading        | label swaps to "Printing your table note" with a 1.6s fill bar                                                                               | 300–302               |
| M25 | Table note issued  | success        | ticket `print` (clip-path top → bottom + y −16, 1.4s); 発 `stamp` at 0.6s; text rises                                                        | 303–314, 362–363      |
| M26 | FAQ                | toggle         | `::details-content` block-size 0 → auto, 0.7s; the plus rotates 45°                                                                          | 318–329               |
| M27 | Footer word        | ambient        | hatch mesh drifts every 30s                                                                                                                  | 344                   |
| M28 | UV mode            | toggle         | palette crossfades 0.9s, media invert 1.1s, hidden marks fade in 1.2s; the toggle glows neon                                                 | 18–34, 59–62          |
| M29 | Mobile overlay     | open / close   | backdrop fade 0.7s, links rise 48px with a 50ms stagger, burger bars cross                                                                   | 67–78                 |
| M30 | Nav active link    | scroll         | tint fades onto the link of the section crossing 45%                                                                                         | 58, 911–917           |
| M31 | Videos             | enter / leave  | play at ≥10% visibility, pause when out; the hero video fades over its poster when ready                                                     | 801–816               |
| M32 | Skip link          | focus          | slides from −80 to 24                                                                                                                        | 26–27                 |
| M33 | 404 note           | load           | `rise` 1.2s, rosette spin 160s, 廃 stamp at 0.7s                                                                                             | NotFound 21–36        |

## Rules

- CSS Modules rename `@keyframes` names. Global keyframes live in `globals.css` and are referenced from modules through tokens (`animation: var(--kf-rise) …`); keyframes defined inside a module are referenced by name.
- Entrance keyframes start at `opacity: 0.01`, not 0: Chrome never reports an element that first paints at opacity 0 as LCP. The difference is invisible.

- Animate only `transform`, `opacity`, `filter`, `clip-path`, `background-position`, colors and the FAQ `block-size`. Never animate layout on scroll.
- Scroll effects subscribe to `lib/scroll-loop.ts` (one listener, one rAF) and write to the DOM; React state changes only when a discrete value changes (lit count, active link).
- Pointer effects (loupe, preview) write `transform` in the event handler; no state per move.
- `will-change` only on the loupe and the preview card.
- `prefers-reduced-motion: reduce`: every animation and transition off, reveals visible, all words lit, videos stay on their posters, the carousel scrolls instantly. The loupe still works (it is a tool, not decoration) but without fade or spin.
