# @shadowbrand/ui — agent index

Progressive disclosure: scan the index, act on the entry itself when Detail is `—`,
and read the Detail source only when you need more. Each component's exact types are
its own `dist/<Component>.d.ts`. Costs are approximate tokens.

| ID  | T | Entry | Detail | Cost |
|-----|---|-------|--------|------|
| #U1 | 🔵 | Setup once at app entry, in order: `import '@shadowbrand/tokens/css'` then `import '@shadowbrand/ui/styles.css'` | — | 0 |
| #U2 | 🔵 | `Card` — titled tile with body + CTA, for request/summary content (not a generic container) | dist/Card.d.ts | ~100 |
| #U6 | 🔵 | `Button` — the action button; Card's CTA, also standalone | dist/Button.d.ts | ~100 |
| #U3 | 🔴 | `dst-*` class names are private API — never override them, never fork a component's markup; if it doesn't fit, compose from tokens or request a design-system change | — | 0 |
| #U4 | 🔴 | Never hard-code a token's current value to "match" a component — components restyle automatically when tokens update | — | 0 |
| #U5 | 🔵 | Colors, spacing, radius, type for your own elements: token index | ../tokens/AGENTS.md (`@shadowbrand/tokens`) | ~350 |
