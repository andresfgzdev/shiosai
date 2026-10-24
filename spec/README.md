# Shiosai · Implementation spec

This folder is the **source of truth** for implementing the Shiosai landing. Any model or person can pick up a task, implement it without prior context, and prove that it works.

## Reading order

1. [`00-scope.md`](./00-scope.md): what is in and out, and the product facts.
2. [`01-architecture.md`](./01-architecture.md): stack, folders, rendering, client islands, data flow.
3. [`02-design-system.md`](./02-design-system.md): tokens, UV theme, type, engraving surfaces, assets, primitives.
4. [`03-motion.md`](./03-motion.md): the motion catalog and its performance rules.
5. [`04-quality-gates.md`](./04-quality-gates.md): budgets, accessibility, SEO, Definition of Done.
6. [`05-conventions.md`](./05-conventions.md): code style, naming, git.
7. [`tasks/TRACKER.md`](./tasks/TRACKER.md): status of every task.

Then read **only** the file of the task you are executing (`tasks/Txx-*.md`) and what it cites.

## Visual reference

| File               | What it is                                                                                                                                            |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Shiosai.dc.html`  | The landing (1440 wide, fluid). **The design to implement.**                                                                                          |
| `NotFound.dc.html` | The canvas 404 ("retired note"), drawn for the sister brand. Its layout and motion are reused for the Shiosai 404 with Shiosai tokens and copy (T15). |

The files are HTML with a `<style>` block and a `Component` class holding the mockup logic. They are **translated**, not copied: React components, CSS Modules, tokens and typed domain logic. Tasks cite line ranges. Values (px, colors, durations, curves, copy) are the specification. Assets referenced as `/_blob/<id>` are already in `public/` under meaningful names (`02-design-system.md § Assets`).

Online design: https://claude.ai/artifact/MR6unKz1vzmizwFrSdGCks (artboard "Shiosai · sea and boat edition").

## Work loop per task

```
1. Read the task + cited references
2. Mark the task "In progress" in tasks/TRACKER.md
3. Implement (domain tests first when there is logic)
4. pnpm verify            → lint + typecheck + unit tests + build
5. Browser check at 1440, 820 and 390 wide, in UV mode, and with reduced motion
6. Section e2e test + axe
7. Record evidence in the task "Log" and move it to "Done" in TRACKER
```

If something in a task could not be done, it stays "Blocked" with the reason, never "Done".
