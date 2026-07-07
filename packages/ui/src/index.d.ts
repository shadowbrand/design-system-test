// Barrel: each component's types live in its own <Component>.d.ts so a consumer
// (or its agent) reads only the one it needs. `.js` specifiers resolve to the
// sibling .d.ts — types are erased at runtime, where dist/index.js has everything.
export * from './Card.js';
export * from './Button.js';
