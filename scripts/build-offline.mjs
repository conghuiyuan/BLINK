import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// Vite inlines local images; the statically bundled Three.js scene needs no assets.
// Include CSS, JS, media credits and the Three.js license in a portable classroom file.
const root = resolve(import.meta.dirname, '..');
let html = await readFile(resolve(root, 'dist/index.html'), 'utf8');
const script = html.match(/<script\b[^>]*src="([^"]+)"[^>]*><\/script>/);
const stylesheet = html.match(/<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/);
if (!script || !stylesheet) throw new Error('Expected one Vite entry script and stylesheet.');
const js = await readFile(resolve(root, 'dist', script[1].replace(/^\//, '')), 'utf8');
const css = await readFile(resolve(root, 'dist', stylesheet[1].replace(/^\//, '')), 'utf8');
html = html.replace(script[0], () => `<script type="module">${js.replace(/<\/script/gi, '<\\/script')}</script>`);
html = html.replace(stylesheet[0], () => `<style>${css.replace(/<\/style/gi, '<\\/style')}</style>`);
const license = await readFile(resolve(root, 'node_modules/three/LICENSE'), 'utf8');
const credits = await readFile(resolve(root, 'src/assets/SOURCES.md'), 'utf8');
html += `\n<!--\nThree.js license:\n${license.replaceAll('--', '—')}\nMedia credits:\n${credits.replaceAll('--', '—')}\n-->\n`;
await writeFile(resolve(root, 'dist/zaojing-classroom.html'), html);
console.log('Offline classroom: dist/zaojing-classroom.html');
