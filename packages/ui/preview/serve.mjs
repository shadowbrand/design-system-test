// Dev-only preview. Bundles preview/main.jsx (React + the local component source
// + the freshly built local tokens) with the esbuild we already depend on, and
// serves it with live reload. Not published — see package.json "files".
//
//     npm run preview   →   http://localhost:8000
import * as esbuild from 'esbuild';

const ctx = await esbuild.context({
  entryPoints: ['preview/main.jsx'],
  bundle: true,
  format: 'esm',
  jsx: 'automatic',
  outfile: 'preview/app.js',
  loader: { '.css': 'css' },
});

await ctx.watch();
const { host, port } = await ctx.serve({ servedir: 'preview', port: 8000 });
const shown = !host || host === '0.0.0.0' ? 'localhost' : host;
console.log(`✓ preview → http://${shown}:${port}  (edits reload live)`);
