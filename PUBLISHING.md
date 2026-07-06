# Publishing `@design-system-test/tokens`

The package is set up to publish to the **public npm registry** via **trusted publishing**
(no stored npm token). Here's the one-time setup and the ongoing flow.

## One-time setup

1. **npm account + 2FA** — create an account on [npmjs.com](https://www.npmjs.com) and enable
   2FA (required to publish).

2. **Own the scope** — the package is `@design-system-test/tokens`, so you need an npm **org**
   named `design-system-test` (free npm orgs allow unlimited *public* packages). Create it at
   npmjs.com → *Add organization*. (Alternatively, rename the scope in `packages/tokens/package.json`
   to your npm username.)

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
- "@design-system-test/tokens": "file:../design-tokens-workbench/packages/tokens"
+ "@design-system-test/tokens": "^0.1.0"
```

Run `npm install`. The import code doesn't change — it's now a versioned registry dependency.

## Notes

- Provenance is generated automatically under trusted publishing **for public repos**; a private
  source repo skips provenance but still publishes.
- Requires npm ≥ 11.5.1 / Node ≥ 22.14 — the workflow updates npm on the runner to be safe.
- License is set to `MIT` for a public demo package — change it if you want something else.
