// Compiles the component library: JSX -> ESM, plus the CSS and type declarations.
// react is kept external (a peer dependency); tokens arrive via the consumer's CSS.
import { build } from 'esbuild';
import { cpSync, mkdirSync } from 'node:fs';

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
cpSync('src/index.d.ts', 'dist/index.d.ts');

console.log('✓ @shadowbrand/ui built → dist/{index.js, ui.css, index.d.ts}');
