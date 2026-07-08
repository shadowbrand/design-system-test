# Agent guide — maintainers

Figma (Tokens Studio) pushes `tokens.json` → `npm run build` (root, `scripts/build-dist.mjs`,
zero deps) generates `packages/tokens/` → `packages/ui/` is a React layer on top. Each
package ships its own consumer-facing `AGENTS.md` index; this file is for maintaining the repo.

## Rules

- **Never hand-edit generated files** — all of `packages/tokens/` except `package.json` /
  `README.md` / `AGENTS.md`, and all of `packages/ui/dist/`.
- **Rebuild + commit together** — after changing `tokens.json` or a build, run `npm run build`
  and commit the regenerated output with the source.
- **Don't bump `packages/tokens` version** — CI does it on publish.

## Keeping the agent indices correct

- **tokens** — self-updating: the build re-stamps costs and flows Figma `$description` into
  `tokens.css`. A Tokens Studio push needs no index edit.
- **ui** — hand-maintained by convention (not CI-gated): update a component's row when its
  props/behavior change. Rows carry when-to-use only; exact types live in the generated
  per-component `dist/<Component>.d.ts` the row points to.

## packages/ui build

`.tsx` source → esbuild bundles `dist/index.js` + copies `ui.css`, then `tsc` emits one
`.d.ts` per component (`index.d.ts` is a barrel). `npm run typecheck` (a CI job) checks src;
`npm run preview` serves a dev-only page from source.
