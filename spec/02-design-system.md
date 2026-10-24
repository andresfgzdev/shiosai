# 02 · Design system

Reference: `Shiosai.dc.html` lines 15–422.

## Tokens (`src/app/tokens.css`)

| Token          | Day                         | UV (`:root[data-uv]`)     | Use                               |
| -------------- | --------------------------- | ------------------------- | --------------------------------- |
| `--paper`      | `#F2EEE3`                   | `#0B0820`                 | ground                            |
| `--paper-2`    | `#E9E3D3`                   | `#151033`                 | wells, pills, inputs              |
| `--cobalt`     | `#244C9A`                   | `#9DB4FF`                 | engraving ink, primary button     |
| `--deep`       | `#13265C`                   | `#ECE8FF`                 | text                              |
| `--mute`       | `#3B4F7E`                   | `#B9B2E6`                 | secondary text                    |
| `--copper`     | `#C0532F`                   | `#FF8A5C`                 | accent fills, large text          |
| `--copper-ink` | `#A9441F`                   | `#FF8A5C`                 | copper **small text**, focus ring |
| `--sky`        | `#E8C4B8`                   | same                      | highlights on deep                |
| `--line`       | `rgb(36 76 154 / 0.22)`     | `rgb(157 180 255 / 0.28)` | hairlines                         |
| `--neon`       | `#7CFFB2`                   | same                      | UV glow                           |
| `--ease`       | `cubic-bezier(.32,.72,0,1)` |                           | every transition                  |

Accessibility deviations from the canvas, all forced by WCAG AA:
- Unlit kitchen-rule words sit at 52% opacity instead of 24% (24% measures 1.6:1; 52% is the lowest value that passes 3:1 for 60px bold text).
- Viewfinder chips use `--chip-paper` (95% paper) instead of 82% glass, so copper text holds 4.5:1 over the dark plate.
- `--copper-ink`: `#C0532F` on paper is 4.0:1, under AA for the 12–14px eyebrows, serials and errors, so small copper text uses `#A9441F` (5.1:1). Large numerals and fills keep `#C0532F`.

Radii: 2 (chips), 4 (buttons, pills, frames, cards), 9999 (nav, round buttons). Shadows are rings, `0 0 0 1px rgb(36 76 154 / .45)`, plus a long soft drop, `0 40px 80px -48px rgb(19 38 92 / .6)`.

## UV theme

- The `--*` tokens swap; background and text transition over 0.9s.
- Every engraving image or video carries the global `media` class. In UV it gets `invert(1) hue-rotate(180deg) saturate(1.5) brightness(.9) contrast(1.05)` over 1.1s.
- `uv-only` elements fade from 0 to 1 (1.2s): hero fibers + glowing `潮騒 · Genuine · tide series`, the menu line "No substitutions · the sea decides", footer fibers + "Printed by hand on the pier · every note is genuine".
- `glow` text: neon with a two-layer text shadow.

## Type

- Manrope 400/500/600/700 (UI and display), Geist Mono 400/500 (eyebrows, serials, times, prices; `tabular-nums`), Noto Serif JP 700 (kanji only). Manrope and Geist Mono come from `next/font/google`; Noto Serif JP is a self-hosted **subset** (`src/app/fonts/noto-serif-jp-subset.woff2`, 10 KB, 26 glyphs) loaded with `next/font/local`, because the full family emits 124 `@font-face` blocks (33 KB of CSS). `src/core/kanji.test.ts` fails when copy introduces a character missing from the subset; regenerate it from `https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@700&text=<chars>`.
- Scale: 12/16 eyebrow (0.18em, uppercase), 14/20, 16/24, 18/28 lead, 20/28, 24/32, 36/40, 48/48 section title (36/40 at ≤720), 60/60 hero and kitchen rule (36/40 at ≤720), 72 and 96 intaglio numerals, 128 footer word.
- `text-wrap: balance` on headings, `pretty` on paragraphs.

## Engraving surfaces and assets

| File                                  | Blob        | Size      | Use                                     |
| ------------------------------------- | ----------- | --------- | --------------------------------------- |
| `engraving/band-cobalt.svg`           | `1a413335…` | 192×40    | note, preview card and bond frames      |
| `engraving/band-copper.svg`           | `2b1a0e36…` | 192×40    | panel band, plate frame, ticket         |
| `engraving/hatch.svg`                 | `85fcbe32…` | 240×240   | intaglio numeral fill (moving mesh)     |
| `engraving/rosette.svg`               | `ff3de528…` | 512×512   | cobalt watermarks, avatars              |
| `engraving/seal-ring.svg`             | `52849eaa…` | 512×512   | copper rosette                          |
| `engraving/watermark.svg`             | `c05d9437…` | 512×512   | paper rosette in the storm watermark    |
| `engraving/fibers.svg`                | `bb4aa7ed…` | 900×900   | UV security fibers                      |
| `media/hero.mp4` + `hero-poster.webp` | `28cc1bb6…` | 1280×834  | hero loop (the poster is the LCP image) |
| `media/hero-plate.webp`               | `a60aec88…` | 1920×1252 | loupe source, ticket image              |
| `media/voyage-departure.mp4` + poster | `38a78ef2…` | 1280×720  | Note I                                  |
| `media/voyage-nets.webp`              | `bc67ca78…` | 1600×1000 | Note II                                 |
| `media/harbour.mp4` + poster          | `7199e8db…` | 1280×800  | Note III and the footer sea             |
| `media/voyage-table.mp4` + poster     | `173184ce…` | 1280×720  | Note IV                                 |
| `media/plate-kuroto.webp`             | `b460d253…` | 1000×1420 | Tide menu plate                         |
| `media/storm.webp`                    | `90f4b88f…` | 1920×1080 | Storm clause ground                     |
| `media/course-*.webp`                 | various     | 720×540   | hover previews                          |

## Primitives (`src/components/ui`)

- `Icon`: inline stroke SVG set, 1.5 stroke, always `aria-hidden`.
- `Eyebrow`: mono 12/16 uppercase with a leading (optionally trailing) 24px rule, copper ink.
- `ArrowLink` / `ArrowButton`: cobalt CTA with a double inner ring and the arrow tile.
- `Chip`: mono plate label on deep 88%.
- `Numeral`: outlined text clipped to the hatch mesh, optional moving mesh.

## Breakpoints

1100 (two-column grids stack, the plate un-sticks, quotes go 2-up), 860 (links become a burger, the UV label hides, notes stack, viewfinder side text and loupe hint hide), 720 (16px gutters; the hero becomes a column with the panel under the plate; single column everywhere).
