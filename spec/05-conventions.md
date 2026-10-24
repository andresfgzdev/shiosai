# 05 · Conventions

- File names kebab-case (Biome enforces). Components export PascalCase; one region per folder.
- No comments in implementation code. No `any`, no `!` non-null.
- Colors only through tokens in `tokens.css`; CSS Modules reference `var(--…)`.
- Copy lives in `src/content/site.ts`, typed; components never hardcode long copy.
- Pure rules in `src/core` with a sibling `*.test.ts`.
- Exact dependency versions; `pnpm add -E`.
- Conventional Commits (`feat(booking): …`). Never add a Claude/Anthropic co-author or session trailer; `lefthook` rejects it. No commit or push unless asked.
