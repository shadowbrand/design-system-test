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
import { Card } from '@shadowbrand/ui';

<Card
  title="Request card"
  status="In review"
  body="Composed from tokens — nothing hard-codes a colour or a gap."
  cta="Review request"
  onCtaClick={() => {}}
/>
```

Layout (title → status → body → CTA) is fixed by the component; every colour, space,
and type style resolves to a token, so it restyles automatically when the tokens change.

## Build

```bash
npm run build   # esbuild: src -> dist/{index.js, ui.css, index.d.ts}
```
