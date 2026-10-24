# Shiosai · Agent Guide

Landing page for Shiosai, a twenty-two seat seafood house on the pier at Manazuru (Next.js 16 + React 19.3 + CSS Modules + Motion). Portfolio project: production-grade quality in performance, accessibility, SEO and motion.

## Before writing code

1. Read `spec/README.md` and the documents `spec/00`–`spec/05` in order.
2. Open `spec/tasks/TRACKER.md`, take **one** task (or a group indicated), and read only its file and its references.
3. For UI, load the `emil-design-eng` and `make-interfaces-feel-better` skills.
4. For any Next.js API, read the corresponding guide in `node_modules/next/dist/docs/`.

## Rules

- Everything is in English: code identifiers, UI copy, metadata, docs, spec files and commit messages.
- Visual source of truth: `spec/reference/design/Shiosai.dc.html`. Copy source of truth: `src/content/`.
- No comments in code. No `any`, no non-null `!`, no loose hex outside `src/app/tokens.css`.
- Server Components by default; `"use client"` only on interactive leaves. React Compiler active: no manual `useMemo`/`useCallback`.
- Business rules only in `src/core` (pure, with tests). Data only through `src/server`.
- Everything visible is animated per `spec/03-motion.md` and respects `prefers-reduced-motion`.
- Exact versions (`pnpm add -E`). Do not bump dependencies without a task.
- A task is not finished without the verification from `spec/04-quality-gates.md` and its evidence in "Log".
- Git: Conventional Commits; **never** a `Co-Authored-By` from Claude/Anthropic; no commit or push unless explicitly asked.

## Commands

```
pnpm dev            development server
pnpm verify         lint + typecheck + unit tests + build
pnpm lint:fix       Biome with autofix
pnpm test           Vitest
pnpm test:e2e       Playwright (requires pnpm test:e2e:install once)
```

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
