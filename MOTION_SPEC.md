# MOTION SPEC — UNTITLED / 無題 · v0.1

## 1. Goal
A long-lived personal publication: portfolio first, archive second, personal brand emerges from the editorial system rather than a name-first hero.

## 2. Choreography
Dominant arc: editorial. Signature mechanic: **Registration Lock** — the cover begins visibly out of print registration; scrolling brings the vermilion ghost plate into register with the key plate. The interaction translates the physical act of print registration into “entering” the issue.

Tension peak: Selected Works → Screen Mode. Release: Archive index and quiet footer.

## 3. Motion Tokens
- hover: 180ms ease-out-expo
- layout emphasis: 300ms ease-out-expo
- scroll linkage: one rAF loop, linear driver
- no CSS transition on JS-driven transforms

## 4. Interaction Map
- Scroll cover: registration + restrained paper scale/rotation
- Work rows: scan-line hover and directional arrow
- Archive: URL-state filters
- Mobile menu: explicit open/close, Escape, scroll lock

## 5. Scroll Timeline
0–20% cover: misregistration → registration
20–45% contents: mostly still / reading
45–72% selected works: large alternating editorial spreads
72–87% screen interlude: paper → black screen / image-window expansion
87–100% archive: motion pause and index

## 6. Media
No invented portfolio imagery. Missing media is rendered as a deliberate printer-proof placeholder with registration marks.

## 7. Baseline UI
Paper/ink base, one vermilion accent, system CJK serif + Georgia, sans metadata. Editorial scale jump > 7× desktop.

## 8. Accessibility & Performance
Semantic HTML, visible focus, skip link, 44px controls, reduced-motion static states, one passive scroll listener + one shared rAF loop.

## 9. Stack
Page stack: Astro 7 static + content collections. Motion stack: CSS + native sticky + vanilla rAF (rung 2); no GSAP required for v0.1.

## 10. Acceptance Criteria
- The page remains designed with all motion disabled.
- Hero content is readable without JS.
- Reduced-motion never hides content.
- Mobile has a distinct layout and menu.
- Archive filters expose an empty state and preserve state in URL.
- No false projects, clients, metrics, testimonials, or invented biographical claims.
