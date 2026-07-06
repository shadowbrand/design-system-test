# Design system test

A small experiment in a design-token pipeline: tokens authored in Figma (Tokens Studio)
build into an artifact apps can consume. Its only job is to turn the source tokens into a
consumable package.

```
Figma (Tokens Studio)  ──push──►  tokens.json  ──npm run build──►  packages/tokens  (@design-system-test/tokens)
      design authors               source of truth (git)            what apps install
```

## Build

```bash
npm run build      # node scripts/build-dist.mjs — no dependencies
```

Reads `tokens.json`, resolves references and composite typography, and writes the
consumable package to `packages/tokens/` (`tokens.css`, `tokens.js`, `tokens.json`).

## Layout

- `tokens.json` — the source of truth, pushed from Figma via Tokens Studio.
- `scripts/build-dist.mjs` — the build (Node, no dependencies).
- `packages/tokens/` — the consumable package. See its [README](./packages/tokens/README.md) for how apps import it.

Do not hand-edit anything in `packages/tokens/` — it is generated. Change tokens in
Figma, push `tokens.json`, and run `npm run build`.
