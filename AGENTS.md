# Agent guide — repo maintainers

Design-token pipeline: Figma (Tokens Studio) pushes `tokens.json`; `npm run build`
(`scripts/build-dist.mjs`, zero deps) compiles it into `packages/tokens/`;
`packages/ui/` is a React layer on top. Consumer-facing agent docs live in each
package's `AGENTS.md` index — this file is about keeping those correct.

## Agent index maintenance

- `packages/tokens/AGENTS.md` — rows are hand-written; the build re-stamps the Cost
  column from real file sizes, and token descriptions flow from Figma
  (`$description`) into `tokens.css` comments automatically. A Tokens Studio push
  therefore needs no index edit. Touch this file only when a rule changes or a new
  detail source appears.
- `packages/ui/AGENTS.md` — fully hand-maintained. Any change to a component's
  props, behavior, or the component list in `packages/ui/src/` must update its
  index row in the same commit. Keep rows to when-to-use plus prop names — types
  and details stay in `dist/index.d.ts`.

## Rules

- Never hand-edit generated files: everything in `packages/tokens/` except
  `package.json`, `README.md`, `AGENTS.md`.
- After changing `tokens.json` or the build, run `npm run build` and commit the
  regenerated artifacts (including the re-stamped index) with the source change.
- Don't bump `packages/tokens/package.json` version — CI does it on publish.
