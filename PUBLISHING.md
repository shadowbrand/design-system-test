# Publishing

Both packages publish to the **public npm registry** via **trusted publishing** (no stored
npm token). The one difference is the version bump: **tokens** auto-patch-bumps (Figma value
changes are non-breaking), while **ui** takes a bump *you* choose, because code changes can be
breaking. `@shadowbrand/tokens` is covered first; `@shadowbrand/ui` follows.

## `@shadowbrand/tokens` — one-time setup

1. **npm account + 2FA** — sign in on [npmjs.com](https://www.npmjs.com) and enable 2FA
   (required to publish).

2. **Scope** — the package is `@shadowbrand/tokens`, which matches your `shadowbrand` npm
   scope, so there's nothing to create. (Public scoped publishing is free.)

3. **First publish — do it manually once** so the package exists on the registry:

   ```bash
   npm run build                 # from repo root, regenerates packages/tokens/*
   cd packages/tokens
   npm login                     # browser + 2FA
   npm publish                   # public because of publishConfig.access
   ```

4. **Register the trusted publisher** — on npmjs.com → your package → **Settings → Trusted
   Publisher → GitHub Actions**, and enter:
   - Organization / user: `shadowbrand`
   - Repository: `design-system-test`
   - Workflow filename: `publish.yml`
   - Environment: *(leave blank)*

## Ongoing: publish on release

Once the trusted publisher is registered, you never touch a token again:

1. Bump the version in `packages/tokens/package.json`.
2. Commit, then create a **GitHub Release** (or run the **Publish tokens** workflow manually).
3. `.github/workflows/publish.yml` builds from `tokens.json` and runs `npm publish` — npm
   verifies the OIDC identity and publishes with a **provenance** attestation automatically.

## Then switch the consumer to the real dependency

In `design-system-test-consumer/package.json`, replace the local link:

```diff
- "@shadowbrand/tokens": "file:../design-tokens-workbench/packages/tokens"
+ "@shadowbrand/tokens": "^0.1.0"
```

Run `npm install`. The import code doesn't change — it's now a versioned registry dependency.

## `@shadowbrand/ui`

Same trusted-publishing setup, but **you choose the version bump** — ui is code, and its
changes can be breaking (a removed prop, a renamed `ds-*` class), which consumers' `^` ranges
must be told about. Auto-patch (as tokens uses) would be wrong here.

**One-time setup**

1. First publish manually so the package exists on the registry:

   ```bash
   cd packages/ui
   npm ci && npm run build
   npm login                     # browser + 2FA
   npm publish                   # public via publishConfig.access
   ```

2. Register the trusted publisher on npmjs.com → `@shadowbrand/ui` → **Settings → Trusted
   Publisher → GitHub Actions**:
   - Organization / user: `shadowbrand`
   - Repository: `design-system-test`
   - Workflow filename: `publish-ui.yml`
   - Environment: *(leave blank)*

**Ongoing**

Run the **Publish ui** workflow (Actions → Publish ui → Run workflow) and pick the bump:
`patch` (fix), `minor` (added component/prop), `major` (removed / renamed / behavior change —
breaking). CI typechecks, builds, runs `npm version <bump>`, commits the bump plus a
`ui-v<version>` tag back to main, and publishes with a provenance attestation.

## Notes

- Provenance is generated automatically under trusted publishing **for public repos**; a private
  source repo skips provenance but still publishes.
- Requires npm ≥ 11.5.1 / Node ≥ 22.14 — the workflow updates npm on the runner to be safe.
- License is set to `MIT` for a public demo package — change it if you want something else.
