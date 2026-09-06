import { cp, mkdir, readdir } from 'node:fs/promises';
import { generate } from './i18n.mjs';

const files = (await readdir('.', { withFileTypes: true }))
  .filter(d => d.isFile())
  .map(d => d.name)
  .filter(n => /\.(?:html|css|svg|xml|png|txt)$/i.test(n));

await mkdir('public', { recursive: true });
for (const f of files) await cp(f, 'public/' + f);

await generate('public');

console.log('Copied ' + files.length + ' files to public/');