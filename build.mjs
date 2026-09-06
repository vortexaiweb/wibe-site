import { cp, mkdir, readdir } from 'node:fs/promises';
import { generate } from './i18n.mjs';

/* мастера i18n не копируются в корень: en-US уезжает в /en-us/, ru-страницы — в /ru/… */
const MASTERS = ['index.html', 'portfolio.html', 'case-ecom.html', 'case-logistics.html', 'case-media.html'];

const files = (await readdir('.', { withFileTypes: true }))
  .filter(d => d.isFile())
  .map(d => d.name)
  .filter(n => /\.(?:html|css|svg|xml|png|txt)$/i.test(n) && !MASTERS.includes(n));

await mkdir('public', { recursive: true });
for (const f of files) await cp(f, 'public/' + f);

await generate('public');

console.log('Copied ' + files.length + ' files to public/');