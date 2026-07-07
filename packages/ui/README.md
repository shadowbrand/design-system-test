# @shadowbrand/ui

React components for the design system, built on `@shadowbrand/tokens`. This is the
layer *above* tokens: tokens give you values, this gives you a shared, versioned
**component** with fixed structure and behavior.

## Install

```bash
npm install @shadowbrand/ui @shadowbrand/tokens react
```

## Use

```jsx
import '@shadowbrand/tokens/css';   // the token variables
import '@shadowbrand/ui/styles.css'; // the component styles
import { Card, Button } from '@shadowbrand/ui';

<Card
  title="Request card"
  body="Composed from tokens — nothing hard-codes a colour or a gap."
  cta="Review request"
  onCtaClick={() => {}}
/>

<Button onClick={() => {}}>Stand-alone action</Button>
```

Layout (title → body → CTA) is fixed by `Card`; its CTA is a `Button`, which also
stands alone. Every colour, space, and type style resolves to a token, so components
restyle automatically when the tokens change.

## Develop

```bash
npm run preview     # esbuild dev server with live reload → http://localhost:8000
npm run typecheck   # tsc --noEmit over src
npm run build       # esbuild bundles TSX → dist/{index.js, ui.css}; tsc emits the .d.ts
```

Components are authored in `.tsx`; `tsc` generates the per-component `.d.ts`, so the
types can't drift from the implementation. The preview renders the components from
source against the local tokens — no publish needed to try a change.

## For coding agents

The package ships an [`AGENTS.md`](./AGENTS.md) index (progressive disclosure: rules
inline, details by pointer). Point your agent at
`node_modules/@shadowbrand/ui/AGENTS.md`.
