# @shadowbrand/ui — agent index

Progressive disclosure: scan the index, act on the entry itself when Detail is `—`,
and read the Detail source only when you need more. Costs are approximate tokens.

| ID  | T | Entry | Detail | Cost |
|-----|---|-------|--------|------|
| #U1 | 🔵 | Setup once at app entry, in order: `import '@shadowbrand/tokens/css'` then `import '@shadowbrand/ui/styles.css'` | — | 0 |
| #U2 | 🔵 | `Card` — request/summary tile, fixed layout title → status → body → CTA; props (all optional): `title`, `status`, `body`, `cta`, `onCtaClick` | dist/index.d.ts | ~130 |
| #U3 | 🔴 | `dst-*` class names are private API — never override them, never fork a component's markup; if it doesn't fit, compose from tokens or request a design-system change | — | 0 |
| #U4 | 🔴 | Never hard-code a token's current value to "match" a component — components restyle automatically when tokens update | — | 0 |
| #U5 | 🔵 | Colors, spacing, radius, type for your own elements: token index | ../tokens/AGENTS.md (`@shadowbrand/tokens`) | ~350 |
