# @shadowbrand/tokens — agent index

Progressive disclosure: scan the index, act on the entry itself when Detail is `—`,
and read the Detail source only when you need more. Costs are approximate tokens.

| ID  | T | Entry | Detail | Cost |
|-----|---|-------|--------|------|
| #T1 | 🔴 | Never hard-code a value a token provides; no fitting token = design-system request, not a local literal | — | 0 |
| #T2 | 🔴 | Every file in this package is generated from Figma — never edit them | — | 0 |
| #T3 | 🔵 | Full token list: every variable, its value, and a `/* what it's for */` comment — pick by the comment, not the current value | tokens.css | ~700 |
| #T4 | 🔵 | Import: CSS `@import "@shadowbrand/tokens/css";` · JS `import { tokens } from "@shadowbrand/tokens"` · other platforms `@shadowbrand/tokens/json` | — | 0 |
| #T5 | 🔵 | One naming scheme: token path kebab-cased in CSS, verbatim in JS — `colors.neutral.muted` → `var(--colors-neutral-muted)` / `tokens.colors.neutral.muted` | — | 0 |
| #T6 | 🔴 | Text: use the `.text-display` / `.text-heading` / `.text-body` classes; never rebuild type from font/size primitive tokens | — | 0 |
| #T7 | 🟠 | Why this package exists: Figma → tokens.json → built artifacts; consumers version-bump, designers restyle | README.md | ~500 |
