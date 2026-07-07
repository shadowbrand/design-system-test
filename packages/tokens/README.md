# @shadowbrand/tokens

The consumable build of the design tokens. Apps depend on **this package**, not on Figma
and not on the raw source.

## Where these come from

```
Figma (Tokens Studio)  ──push──►  /tokens.json  ──npm run build──►  @shadowbrand/tokens
      design authors               git = source of truth             what apps install
```

Designers change tokens in Figma and push `tokens.json` to the repo. A build (`build-dist.mjs`)
resolves references and composite typography and emits the three files below. In production this
build runs in CI and publishes a versioned package; consumers just bump the version.

## Consume

**CSS** — import once, then reference variables:

```css
@import "@shadowbrand/tokens/css";

.card {
  background: var(--colors-neutral-default);
  color: var(--colors-neutral-on-default);
  padding: var(--spacing-md);
}
.card__cta { background: var(--colors-neutral-accent); }
```

Composite type styles ship as utility classes too:

```html
<h2 class="text-display">…</h2>
<p class="text-body">…</p>
```

**JS / TS** — import resolved values:

```js
import { tokens } from "@shadowbrand/tokens";
tokens.colors.neutral.accent; // "#0059ff"
tokens.typography.Display.fontSize; // "84px"
```

**Anything else** — read `tokens.json` (fully resolved, no references, no tool-specific fields).

## Files

- `tokens.css` — CSS custom properties + typography utility classes. Alias chain preserved via `var()`.
- `tokens.js` — ES module: `{ tokens }` (named) and default export. Values fully resolved.
- `tokens.json` — resolved token tree for any platform.

Do not edit these by hand — they are generated. Change tokens in Figma, push, and run
`npm run build`.

## For coding agents

The package ships an [`AGENTS.md`](./AGENTS.md) index (progressive disclosure: rules
inline, details by pointer). Point your agent at
`node_modules/@shadowbrand/tokens/AGENTS.md`.
