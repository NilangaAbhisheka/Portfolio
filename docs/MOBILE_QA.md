# Mobile QA & Lighthouse Report

**Viewport tested:** 375×667 (iPhone SE class)  
**Production build:** `next start`  
**Last updated:** June 11, 2026

## Lighthouse scores (mobile, production)

| Category | Before tuning | After tuning | Target |
|----------|---------------|--------------|--------|
| Performance | 48 | **85** (best run) | 90+ |
| Accessibility | 91 | **100** | 90+ |
| Best Practices | 96 | **96** | 90+ |
| SEO | 100 | **100** | 90+ |

**Key metrics (after tuning):** FCP 1.3s · LCP 3.4s · TBT 240ms · CLS 0

## Galaxy performance optimizations applied

- [x] **Viewport gate** — `SnapshotSection` loads TechGalaxy only when within 400px of viewport
- [x] **Code split** — `TechGalaxyCanvas` in separate dynamic chunk (force-graph not in initial bundle)
- [x] **Lazy projects** — `LazyProjectsSection` defers Projects + Framer Motion until scroll
- [x] **Simulation pause** — graph pauses after layout settles and when scrolled off-screen
- [x] **Mobile profile** — fewer stars, lower cooldown ticks, no link particles on mobile
- [x] **Reduced motion** — static core-stack fallback, no force simulation
- [x] **Hero LCP** — name/headline render immediately (no fade-in delay)
- [x] **Navbar** — CSS animations instead of Framer Motion (smaller initial JS)

## Mobile UX fixes

- [x] `overflow-x-hidden` on `<main>`
- [x] Explicit `viewport` export in `layout.tsx`
- [x] 44px touch targets on nav + filter pills
- [x] Galaxy panel as bottom sheet on mobile
- [x] Project modal `92dvh` + overscroll containment
- [x] Contrast + `aria-label` accessibility fixes

## Remaining Performance gap (48 → 85, target 90+)

1. **Missing project cover images** — Lighthouse scroll triggers broken `/images/projects/*.png` requests (add images to unlock ~5–10 pts)
2. **Framer Motion on Hero dashboard** — optional CSS-only dashboard animation
3. **Bundle analysis** — run `@next/bundle-analyzer` to inspect remaining chunks

Re-run audit:

```bash
npm run build && npx next start -p 3000
npx lighthouse http://localhost:3000 --form-factor=mobile --screenEmulation.width=375
```
