// Copies the static site in ./site to ./dist (the folder Cloudflare Pages publishes).
import { rmSync, cpSync } from 'node:fs';
rmSync('dist', { recursive: true, force: true });
cpSync('site', 'dist', { recursive: true, filter: (src) => !src.endsWith('.DS_Store') });
console.log('Built ./dist from ./site');
