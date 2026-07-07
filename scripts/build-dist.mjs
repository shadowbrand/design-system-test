/**
 * build-dist.mjs — the distribution step.
 *
 * Takes the tokens.json that Tokens Studio pushes from Figma and compiles it into
 * artifacts a consumer actually installs:
 *
 *     tokens.json (Figma → git)  ──►  build-dist.mjs  ──►  packages/tokens/tokens.css   (import in CSS)
 *                                                     ├──►  packages/tokens/tokens.js    (import in JS/TS)
 *                                                     └──►  packages/tokens/tokens.json  (resolved, any platform)
 *
 * Figma is the source; this produces the consumable package. In production this build
 * would run in CI and publish a versioned npm package — the flow is identical, this just
 * skips the registry.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = JSON.parse(readFileSync(resolve(root, 'tokens.json'), 'utf8'));

// ---- helpers ---------------------------------------------------------------

const isToken = (n) => n && typeof n === 'object' && '$value' in n;
const isRef = (v) => typeof v === 'string' && /^\{[^}]+\}$/.test(v);
const refPath = (v) => v.slice(1, -1);
const kebab = (s) =>
  String(s).replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/[\s_]+/g, '-').toLowerCase();
const cssVar = (path) => '--' + path.split('.').map(kebab).join('-');

const WEIGHTS = {
  thin: 100, extralight: 200, light: 300, regular: 400, normal: 400,
  medium: 500, semibold: 600, bold: 700, extrabold: 800, black: 900,
};

// A node is a composite typography token if it bundles font sub-properties.
const isTypography = (n) =>
  n && typeof n === 'object' && !isToken(n) &&
  (isToken(n.fontSize) || isToken(n.fontFamily) || isToken(n.lineHeight));

// Tokens Studio typography tokens are composite: { $type:'typography', $value:{...} }.
// Expand each into the per-property token form the rest of this build understands,
// so one file serves both Figma (real type styles) and code (these sub-property vars).
const TYPO_MAP = {
  fontFamily: 'fontFamilies', fontWeight: 'fontWeights', fontSize: 'fontSizes',
  lineHeight: 'lineHeights', letterSpacing: 'letterSpacing',
  paragraphSpacing: 'paragraphSpacing', paragraphIndent: 'dimension',
  textCase: 'textCase', textDecoration: 'textDecoration',
};
function normalizeTypography(node) {
  if (!node || typeof node !== 'object') return node;
  if (node.$type === 'typography' && node.$value && typeof node.$value === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(node.$value)) out[k] = { $type: TYPO_MAP[k] || 'other', $value: v };
    return out;
  }
  if ('$value' in node) return node;                 // regular token leaf
  const out = {};
  for (const [k, v] of Object.entries(node)) out[k] = k.startsWith('$') ? v : normalizeTypography(v);
  return out;
}
const tree = normalizeTypography(mergeSets(source));

// ---- flatten every leaf token to a path -> {value, type} map ---------------

const flat = {};
(function collect(node, path = '') {
  if (isToken(node)) { flat[path] = { value: node.$value, type: node.$type }; return; }
  if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) {
      if (k.startsWith('$')) continue;
      collect(v, path ? `${path}.${k}` : k);
    }
  }
})(tree);

// Merge all top-level token sets into a single tree (supports future brand sets).
function mergeSets(doc) {
  const tree = {};
  for (const [key, val] of Object.entries(doc)) {
    if (key.startsWith('$')) continue;          // skip $themes / $metadata
    deepMerge(tree, val);
  }
  return tree;
}
function deepMerge(target, src) {
  for (const [k, v] of Object.entries(src)) {
    if (v && typeof v === 'object' && !Array.isArray(v) && !isToken(v)) {
      target[k] = deepMerge(target[k] || {}, v);
    } else target[k] = v;
  }
  return target;
}

// ---- value formatting ------------------------------------------------------

function formatLiteral(value, type) {
  if (value === 'AUTO') return 'normal';
  switch (type) {
    case 'color': return String(value);
    case 'fontFamilies': return /\s/.test(value) ? `"${value}"` : String(value);
    case 'fontWeights': return String(WEIGHTS[kebab(value).replace(/-/g, '')] ?? value);
    case 'letterSpacing':
      return /%$/.test(String(value)) ? `${parseFloat(value) / 100}em` : withPx(value);
    case 'text': case 'textCase': case 'textDecoration': return String(value);
    default: return withPx(value);
  }
}
function withPx(value) {
  if (typeof value === 'number') return `${value}px`;
  if (/^-?\d*\.?\d+$/.test(value)) return `${value}px`;   // bare number -> px
  return String(value);                                    // already has a unit
}

// boxShadow tokens are composite: { x, y, blur, spread, color, type } (or an array
// of them). Flatten into a CSS box-shadow string. `css` keeps a colour reference as
// var(); otherwise it's resolved to a literal.
function formatShadow(value, css) {
  const list = Array.isArray(value) ? value : [value];
  return list
    .map((s) => {
      const inset = s.type === 'innerShadow' || s.inset ? 'inset ' : '';
      const dims = ['x', 'y', 'blur', 'spread'].map((k) => withPx(s[k] ?? 0)).join(' ');
      let color = s.color;
      if (isRef(color)) color = css ? `var(${cssVar(refPath(color))})` : resolveLiteral({ value: color, type: 'color' });
      return `${inset}${dims} ${color}`;
    })
    .join(', ');
}

// Follow references to the base token, then format the literal.
function resolveLiteral(token, seen = new Set()) {
  if (token.type === 'boxShadow') return formatShadow(token.value, false);
  let t = token;
  while (isRef(t.value)) {
    const p = refPath(t.value);
    if (seen.has(p) || !flat[p]) return String(t.value);   // guard cycles / danglers
    seen.add(p);
    t = flat[p];
  }
  return formatLiteral(t.value, t.type);
}
// CSS keeps references as var() so the alias chain stays visible.
function cssValue(token) {
  if (token.type === 'boxShadow') return formatShadow(token.value, true);
  return isRef(token.value) ? `var(${cssVar(refPath(token.value))})` : formatLiteral(token.value, token.type);
}

// ---- build CSS -------------------------------------------------------------

const compositeRoots = Object.keys(tree).filter((k) => isTypography(tree[k]));
const inComposite = (path) => compositeRoots.some((r) => path === r || path.startsWith(`${r}.`));
const varNameFor = (path) => {
  if (!inComposite(path)) return cssVar(path);
  const [rootKey, sub] = [path.split('.')[0], path.split('.').slice(1).join('-')];
  return `--typography-${kebab(rootKey)}-${kebab(sub)}`;
};

const varLines = [];
const classBlocks = [];
for (const [path, token] of Object.entries(flat)) {
  if (token.type === 'text') continue;                     // skip content copy
  varLines.push(`  ${varNameFor(path)}: ${cssValue(token)};`);
}
for (const rootKey of compositeRoots) {
  const props = Object.entries(flat)
    .filter(([p]) => p.startsWith(`${rootKey}.`))
    .map(([p]) => p.split('.').slice(1).join('-'));
  const decls = props.map((prop) => {
    const cssProp = kebab(prop);                            // fontSize -> font-size
    return `  ${cssProp}: var(--typography-${kebab(rootKey)}-${kebab(prop)});`;
  });
  classBlocks.push(`.text-${kebab(rootKey)} {\n${decls.join('\n')}\n}`);
}

const css =
  `/* AUTOGENERATED from tokens.json (Figma via Tokens Studio). Do not edit by hand. */\n` +
  `/* Regenerate: npm run tokens:dist */\n\n` +
  `:root {\n${varLines.join('\n')}\n}\n\n` +
  `/* Typography utilities */\n${classBlocks.join('\n\n')}\n`;

// ---- build resolved JSON + JS ---------------------------------------------

function cleanTree(node) {
  if (isToken(node)) return resolveLiteral({ value: node.$value, type: node.$type });
  const out = {};
  for (const [k, v] of Object.entries(node)) {
    if (k.startsWith('$')) continue;
    if (isToken(v) && v.$type === 'text') continue;         // drop content copy
    const child = cleanTree(v);
    if (child && typeof child === 'object' && Object.keys(child).length === 0) continue; // prune empties
    out[k] = child;
  }
  return out;
}
const resolved = cleanTree(tree);

// Group composite type styles under `typography` so consumers get tokens.typography.Display.
if (compositeRoots.length) {
  resolved.typography = {};
  for (const rootKey of compositeRoots) {
    if (rootKey in resolved) {
      resolved.typography[rootKey] = resolved[rootKey];
      delete resolved[rootKey];
    }
  }
}

const outDir = resolve(root, 'packages/tokens');
mkdirSync(outDir, { recursive: true });
writeFileSync(resolve(outDir, 'tokens.css'), css, 'utf8');
writeFileSync(resolve(outDir, 'tokens.json'), JSON.stringify(resolved, null, 2) + '\n', 'utf8');
writeFileSync(
  resolve(outDir, 'tokens.js'),
  `// AUTOGENERATED from tokens.json. Regenerate: npm run tokens:dist\n` +
    `export const tokens = ${JSON.stringify(resolved, null, 2)};\n\nexport default tokens;\n`,
  'utf8'
);

// ---- integrity report ------------------------------------------------------

const dangling = Object.entries(flat)
  .filter(([, t]) => isRef(t.value) && !flat[refPath(t.value)])
  .map(([p, t]) => `${p} -> ${t.value}`);
if (dangling.length) {
  console.error(`✗ unresolved references:\n  ${dangling.join('\n  ')}`);
  process.exit(1);
}
const cssCount = varLines.length;
console.log(
  `✓ dist built → packages/tokens/{tokens.css, tokens.json, tokens.js}\n` +
  `  ${cssCount} CSS variables, ${compositeRoots.length} typography utilities (${compositeRoots.join(', ')}), all references resolve`
);
