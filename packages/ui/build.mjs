// Compiles the component library. esbuild bundles the TSX to ESM and copies the
// CSS; tsc emits the .d.ts (one per component) — run via the `build` script after
// this. react is kept external (a peer dependency); tokens arrive via the
// consumer's CSS.
import { build } from 'esbuild';
import { cpSync, mkdirSync } from 'node:fs';

mkdirSync('dist', { recursive: true });

await build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  format: 'esm',
  jsx: 'automatic',
  external: ['react', 'react/jsx-runtime'],
  outfile: 'dist/index.js',
});

cpSync('src/ui.css', 'dist/ui.css');

console.log('✓ @shadowbrand/ui bundled → dist/{index.js, ui.css}  (types emitted by tsc)');
