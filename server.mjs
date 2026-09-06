import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, join, extname, normalize } from 'node:path';

const root = resolve('public');
const PORT = process.env.PORT || 10000;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8'
};

/* красивый URL для пути, который заканчивается на index или <file>.html */
function prettyOf(p) {
  let s = p;
  if (s.endsWith('/')) s = s.slice(0, -1);
  const seg = s.split('/').filter(Boolean);
  if (seg.length === 0) return '/en-us/';
  if (seg[seg.length - 1] === 'index') {
    const base = seg.slice(0, -1);
    return (base.length ? '/' + base.join('/') + '/' : '/en-us/');
  }
  if (seg.length === 1) {
    const x = seg[0];
    if (x === 'portfolio' || x.startsWith('case-')) return '/en-us/' + x;
    return '/' + x;
  }
  return '/' + seg.join('/');
}

http.createServer(async (req, res) => {
  try {
    const u = new URL(req.url, 'http://localhost');
    let path = decodeURIComponent(u.pathname);

    /* 1. корень → en-US (локаль всегда видна в адресе) */
    if (path === '/' || path === '') {
      res.writeHead(301, { 'Location': '/en-us/' });
      return res.end();
    }

    /* 2. старые /<file>.html адреса → 301 на красивый URL */
    if (path.endsWith('.html')) {
      const loc = prettyOf(path.slice(0, -5)) + (u.search || '');
      res.writeHead(301, { 'Location': loc });
      return res.end();
    }

    /* 3. отдаём файл: каталог → index.html, страница → +.html */
    const rel = normalize(path).replace(/^[\\/]*/, '');
    let file = null;
    try {
      const s = await stat(join(root, rel));
      file = s.isDirectory() ? join(root, rel, 'index.html') : join(root, rel);
    } catch (_) {
      try {
        await stat(join(root, rel + '.html'));
        file = join(root, rel + '.html');
      } catch (_) { /* 404 ниже */ }
    }
    if (!file) throw new Error('nf');
    const data = await readFile(file);
    res.writeHead(200, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream' });
    res.end(data);
  } catch (_) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found');
  }
}).listen(PORT, () => console.log('WIBE running on port ' + PORT));