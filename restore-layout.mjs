import { mkdir, copyFile, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';

const mappings = {
  'BaseLayout.astro': 'src/layouts/BaseLayout.astro',
  'SiteFooter.astro': 'src/components/SiteFooter.astro',
  'SiteHeader.astro': 'src/components/SiteHeader.astro',
  'WorkMedia.astro': 'src/components/WorkMedia.astro',
  'WorkRow.astro': 'src/components/WorkRow.astro',
  'content.config.ts': 'src/content.config.ts',
  'site.ts': 'src/data/site.ts',
  '001-writing.md': 'src/data/works/001-writing.md',
  '002-visual.md': 'src/data/works/002-visual.md',
  '003-field-note.md': 'src/data/works/003-field-note.md',
  '004-note.md': 'src/data/works/004-note.md',
  '404.astro': 'src/pages/404.astro',
  'about.astro': 'src/pages/about.astro',
  'archive.astro': 'src/pages/archive.astro',
  'field-notes.astro': 'src/pages/field-notes.astro',
  'index.astro': 'src/pages/index.astro',
  'visual.astro': 'src/pages/visual.astro',
  'writing.astro': 'src/pages/writing.astro',
  '[slug].astro': 'src/pages/work/[slug].astro',
  'global.css': 'src/styles/global.css',
  'favicon.svg': 'public/favicon.svg',
  'robots.txt': 'public/robots.txt',
  'site-motion.js': 'public/scripts/site-motion.js',
  'og-default.png': 'public/assets/og-default.png',
  'paper-noise.png': 'public/assets/paper-noise.png'
};

let copied = 0;
for (const [source, destination] of Object.entries(mappings)) {
  try {
    await access(source, constants.R_OK);
  } catch {
    console.warn(`[restore-layout] missing source: ${source}`);
    continue;
  }
  await mkdir(path.dirname(destination), { recursive: true });
  await copyFile(source, destination);
  copied++;
}

console.log(`[restore-layout] restored ${copied} project files into Astro folders.`);
