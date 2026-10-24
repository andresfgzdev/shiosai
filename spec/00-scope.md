# 00 · Scope

## In

- One-page landing at `/` with every region of `Shiosai.dc.html`: viewfinder frame, floating nav with UV toggle and mobile overlay, full-bleed hero (video, denomination, panel, loupe), tide strip, kitchen rule, The voyage carousel, Tide menu with hover preview, Storm clause with watermark, Countersigned quotes, Book a table, Questions, footer with the sea loop.
- **UV light mode**: a page-wide theme that inverts the engravings to a night palette and reveals hidden security marks (fibers, glowing kanji, hidden lines).
- **Loupe**: a magnifier that follows the pointer over the hero plate (fine pointers only).
- A working booking widget: dates, swell watch, seating, guests (1–6), email, a Server Action that re-checks availability, a loading state and the printed table note with a serial.
- `404` page reusing the retired-note layout in Shiosai's palette.
- SEO: metadata, Open Graph and Twitter cards, `Restaurant` + `FAQPage` JSON-LD, `robots.txt`, `sitemap.xml`, manifest, icon.
- Accessibility: WCAG 2.2 AA, keyboard-complete, screen-reader labels, reduced motion.
- Motion on every visible element (enter, hover, press, focus, state change), per `03-motion.md`.

## Out

- Real payments, a booking backend and email delivery. The Server Action validates against an in-memory availability repository and returns the table note; the hold is a display value.
- Live harbour data: the tide strip is static copy for Sat 24 Oct.
- CMS, i18n. The design's `uvOnLoad` lever is dropped (UV starts off; the choice persists for the session).
- `/privacy`, `/terms`, `/cookies`: linked from the footer, they render the 404 until written.

## Product facts (copy must match exactly)

- 22 seats on pier 2, Manazuru Port, Kanagawa 259 0201. Boat _Shiosai Maru_, captain Kenta Hamada.
- Nine-course tide menu ¥16,500 per guest; sake pairing ¥7,800 for six pours; tax and service included.
- Seatings 17:30 (sunset side) and 20:00 (harbour lights), Wednesday to Sunday. Tables open 30 days ahead at 10:00 Japan time.
- ¥5,000 hold per guest, taken from the bill. Free cancellation up to 72 hours before; storm closures always refunded, called by 09:00.
- Online booking takes 1 to 6 guests.
- table@shiosai.jp · +81 465 68 2914 (after 13:00).
