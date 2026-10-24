# Task tracker

Statuses: `Todo` · `In progress` · `Blocked` · `Review` · `Done`. A task only moves to `Done` with evidence in its "Log" (see `../04-quality-gates.md`).

| ID  | Task                                                                         | Phase          | Depends on | Status |
| --- | ---------------------------------------------------------------------------- | -------------- | ---------- | ------ |
| T00 | [Project bootstrap](./T00-bootstrap.md)                                      | 0 · Foundation | —          | Done   |
| T01 | [Tokens, UV theme, fonts and primitives](./T01-design-system.md)             | 0 · Foundation | T00        | Done   |
| T02 | [Motion foundation](./T02-motion-foundation.md)                              | 0 · Foundation | T01        | Done   |
| T03 | [Content and booking domain](./T03-content-and-domain.md)                    | 0 · Foundation | T00        | Done   |
| T04 | [Viewfinder, nav, UV toggle and mobile overlay](./T04-viewfinder-and-nav.md) | 1 · Regions    | T01, T02   | Done   |
| T05 | [Hero: plate, denomination, panel and loupe](./T05-hero.md)                  | 1 · Regions    | T01, T02   | Done   |
| T06 | [Tide strip and kitchen rule](./T06-tide-and-rule.md)                        | 1 · Regions    | T02, T03   | Done   |
| T07 | [The voyage carousel](./T07-voyage.md)                                       | 1 · Regions    | T02, T03   | Done   |
| T08 | [Tide menu](./T08-tide-menu.md)                                              | 1 · Regions    | T02, T03   | Done   |
| T09 | [Storm clause and watermark](./T09-storm.md)                                 | 1 · Regions    | T02, T03   | Done   |
| T10 | [Countersigned quotes](./T10-countersigned.md)                               | 1 · Regions    | T02, T03   | Done   |
| T11 | [Book a table](./T11-booking.md)                                             | 1 · Regions    | T02, T03   | Done   |
| T12 | [Questions](./T12-questions.md)                                              | 1 · Regions    | T02, T03   | Done   |
| T13 | [Footer and the sea](./T13-footer.md)                                        | 1 · Regions    | T02, T03   | Done   |
| T14 | [Page assembly and layout](./T14-page-assembly.md)                           | 2 · Pages      | T04–T13    | Done   |
| T15 | [404 · retired note](./T15-not-found.md)                                     | 2 · Pages      | T01        | Done   |
| T16 | [SEO and metadata](./T16-seo.md)                                             | 3 · Quality    | T14        | Done   |
| T17 | [Quality pass](./T17-quality-pass.md)                                        | 3 · Quality    | T16        | Review |

## Critical path

```
T00 ─► T01 ─► T02 ─► T04..T13 (regions, parallel) ─► T14 ─► T16 ─► T17
T00 ─► T03 ──────────┘                      T01 ─► T15 ──┘
```
