// Compiles the component library: JSX -> ESM, plus the CSS and type declarations.
// react is kept external (a peer dependency); tokens arrive via the consumer's CSS.
import { build } from 'esbuild';
import { cpSync, mkdirSync, readdirSync } from 'node:fs';

mkdirSync('dist', { recursive: true });

await build({
  entryPoints: ['src/index.jsx'],
  bundle: true,
  format: 'esm',
  jsx: 'automatic',
  external: ['react', 'react/jsx-runtime'],
  outfile: 'dist/index.js',
});

cpSync('src/ui.css', 'dist/ui.css');
// Copy every type file (barrel + one per component) so adding a component needs
// no build edit — drop a <Component>.d.ts in src/ and it ships.
const types = readdirSync('src').filter((f) => f.endsWith('.d.ts'));
for (const f of types) cpSync(`src/${f}`, `dist/${f}`);

console.log(`✓ @shadowbrand/ui built → dist/{index.js, ui.css, ${types.join(', ')}}`);
