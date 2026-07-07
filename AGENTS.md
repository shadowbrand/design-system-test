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
- `packages/ui/AGENTS.md` — hand-maintained. When a component's props, behavior, or
  the component list in `packages/ui/src/` change, update its index row in the same
  commit. This is a convention, not CI-gated on purpose: a gate that's satisfied by
  re-saving the file verifies nothing, and the rows mostly restate the generated
  types. Keep rows to when-to-use plus prop names — exact types live in each
  component's own generated `dist/<Component>.d.ts`. (If drift becomes a real problem,
  generate the prop-name rows from the `.d.ts`, the way the tokens index is built.)

## packages/ui build

Components are authored in `.tsx`. `npm run build` runs esbuild (bundle → `dist/index.js`,
copy `ui.css`) then `tsc` (emit one `.d.ts` per component; `index.d.ts` is a barrel).
Never hand-edit `dist/` — the `.d.ts` are generated, so types can't drift from the code.
`npm run typecheck` (also a CI job) checks src; `npm run preview` serves a dev-only
esbuild page (`packages/ui/preview/`, not published) that renders components from source.

## Rules

- Never hand-edit generated files: everything in `packages/tokens/` except
  `package.json`, `README.md`, `AGENTS.md`.
- After changing `tokens.json` or the build, run `npm run build` and commit the
  regenerated artifacts (including the re-stamped index) with the source change.
- Don't bump `packages/tokens/package.json` version — CI does it on publish.
