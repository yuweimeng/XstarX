# QA REPORT — v0.1

## Verified

- Page stack: Astro 7.3 static site, content collections, multiple routes.
- Motion rung: CSS + native sticky + one vanilla rAF loop; no animation library added unnecessarily.
- Semantic baseline: one main content region per page, heading structure, real links/buttons, skip link.
- Interaction states: keyboard focus, mobile navigation open/close, Escape, scroll lock, Archive filtering, empty state.
- Accessibility: reduced-motion fallback; content remains visible when motion is disabled.
- Production layer: favicon, default OG image, 404 route, robots.txt, CMS admin schema.
- Content integrity: portfolio facts/images are not invented; missing material is explicitly marked as placeholder.
- Probe surface: `window.__journalProbe.read()`, `seekCover(p)`, `seekInterlude(p)`.

## Design gate

The still-frame system was checked against the supplied motion-web gates at source level:

- More than three section shapes: cover/proof sheet, editorial contents grid, alternating full-page feature spreads, black Screen Mode, dense archive index.
- No three-equal-card row; no generic centred hero + two CTA pattern.
- Display/body scale has a structural jump; typography uses CJK serif + Latin serif with sans metadata.
- Palette is deliberately small: paper / ink / vermilion, with black Screen Mode as a state rather than an unrelated theme.
- Mobile is separately recomposed instead of uniformly scaled down.

## Environment limitation

This container could not complete a Chromium screenshot pass: the installed Chromium process hangs on the environment's DBus/runtime setup, and local navigation is blocked for the Playwright wrapper. The static verifier therefore passed, but pixel-level browser rendering has **not** been claimed as verified here.

Also, the container cannot reach npm to install Astro dependencies, so `astro build` could not be executed in this environment. The project targets Astro 7.3 syntax and follows the current official content-collection API, but the first real deploy should run `npm install && npm run build` as a mandatory final compilation gate.

## CMS limitation

The Decap schema is implemented, but authentication cannot be completed until a Git repository/backend is chosen. `public/admin/config.yml` deliberately contains `REPLACE_ME/REPLACE_ME` rather than silently assuming a repository.
