import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd());
const read = p => fs.readFileSync(path.join(root,p),'utf8');
const checks = [];
const check = (name, ok, detail='') => checks.push({name,ok,detail});

const css = read('src/styles/global.css');
const js = read('public/scripts/site-motion.js');
const home = read('src/pages/index.astro');
const pkg = JSON.parse(read('package.json'));
const files = [
  'src/pages/index.astro','src/pages/archive.astro','src/pages/writing.astro','src/pages/visual.astro',
  'src/pages/field-notes.astro','src/pages/about.astro','src/pages/404.astro','src/pages/work/[slug].astro',
  'src/content.config.ts','public/admin/config.yml','public/assets/og-default.png','public/favicon.svg'
];
check('Required routes and production files exist', files.every(f=>fs.existsSync(path.join(root,f))), `${files.length} files`);
check('Astro stack pinned', /^\^7\.3\.0$/.test(pkg.dependencies?.astro ?? ''), pkg.dependencies?.astro ?? 'missing');
check('Semantic content collection configured', /defineCollection/.test(read('src/content.config.ts')) && /glob\(/.test(read('src/content.config.ts')));
check('Still-frame section-shape diversity', ['cover','contents__grid','feature-ledger','screen-interlude','archive-preview'].every(s=>css.includes('.'+s)), 'cover / editorial grid / alternating spreads / screen scene / index');
check('Large editorial type-scale jump', css.includes('--text-h1:clamp(4.2rem') && css.includes('--text-base:1rem'));
check('Palette stays small and role-based', css.includes('--bg:var(--paper-1)') && css.includes('--accent:var(--verm-500)') && css.includes('--screen:#0b0b0a'));
check('Keyboard focus is visible', css.includes(':focus-visible'));
check('Reduced-motion fallback exists', css.includes('@media (prefers-reduced-motion:reduce)'));
check('Scroll listener is passive', /addEventListener\('scroll', requestUpdate, \{ passive: true \}\)/.test(js));
check('One shared rAF motion loop', /requestAnimationFrame\(update\)/.test(js) && !/gsap|framer-motion|three/i.test(js));
check('Verification probe surface exists', js.includes('window.__journalProbe') && js.includes('seekCover') && js.includes('seekInterlude'));
check('Archive filter has URL state + empty state', js.includes("searchParams.set('type'") && read('src/pages/archive.astro').includes('data-archive-empty'));
check('Mobile layout is distinct', css.includes('@media (max-width:800px)') && css.includes('.menu-toggle{display:flex}'));
check('No fabricated proof blocks', !/testimonial|client logo|award|followers|million|\b[0-9]+%\b/i.test(home), 'placeholder works only');
check('CMS schema present but backend visibly unconfigured', read('public/admin/config.yml').includes('REPLACE_ME/REPLACE_ME'));

let failed = 0;
for (const c of checks) {
  console.log(`${c.ok ? 'PASS' : 'FAIL'}  ${c.name}${c.detail ? ` — ${c.detail}` : ''}`);
  if (!c.ok) failed++;
}
console.log(`\n${checks.length-failed}/${checks.length} static checks passed.`);
process.exitCode = failed ? 1 : 0;
