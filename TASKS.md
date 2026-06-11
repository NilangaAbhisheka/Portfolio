# Portfolio — Phased Task Checklist

**Project:** Nilanga Abhisheka Muthukumarana — Mission Control Dashboard Portfolio  
**Last updated:** June 11, 2026  
**Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · shadcn v4 · Framer Motion

### Reference Documents

- [portfolio-implementation-roadmap.md](portfolio-implementation-roadmap.md) — authoritative build guide
- [Portfolio Website Project Report.txt](Portfolio%20Website%20Project%20Report.txt) — vision, design language, structure
- [portfolio.txt](portfolio.txt) — personal profile, projects, skills source of truth

### Design Decision: Section 02

The roadmap originally specified a 6-card SkillCard grid. **TechGalaxy** (interactive force-graph) is the chosen approach instead. SkillCard tasks are omitted; TechGalaxy polish tasks are listed under Phase 2.2.

---

## Progress Summary

| Phase | Description | Status | Progress |
|-------|-------------|--------|----------|
| 0 | Project Setup & Design Tokens | Complete | 7 / 7 |
| 1 | Foundation (Layout + Navigation) | Complete | 8 / 8 |
| 2 | Core Homepage Sections | In progress | 21 / 30 |
| 3 | Hidden Admin Panel | Not started | 0 / 10 |
| 4 | Advanced Features | Not started | 0 / 4 |
| 5 | SEO, Performance & Deployment | Partial | 2 / 13 |
| — | MVP Launch Checklist | Not passed | 0 / 11 |

**Overall MVP estimate:** ~82% complete

### Known Bugs (resolved)

- [x] Navbar links to `#skills` — fixed via `id="skills"` on TechGalaxy section
- [x] [SnapshotSection.tsx](src/sections/SnapshotSection.tsx) — fixed with proper wrapper + dynamic import
- [x] `cursor-blink` CSS class — added to [globals.css](src/app/globals.css)
- [x] [skills.ts](src/data/skills.ts) — wired via [galaxyUtils.ts](src/lib/galaxyUtils.ts) project enrichment

---

## Phase 0 — Project Setup & Design Tokens `[MVP]`

**Done when:** `npm run dev` shows dark `#0A0A0A` background; `npm run build` passes with no TypeScript errors.

- [x] **0.1** Scaffold Next.js + TypeScript + ESLint + App Router
- [x] **0.1** Install core deps: Framer Motion, Lucide, shadcn, clsx, tailwind-merge
- [x] **0.2** Design tokens in [src/app/globals.css](src/app/globals.css) (Mission Control palette)
- [x] **0.2** Load Inter + Geist Mono in [src/app/layout.tsx](src/app/layout.tsx)
- [x] **0.3** Folder structure: `app/`, `sections/`, `components/`, `data/`, `types/`, `lib/`
- [x] **0.4** TypeScript interfaces in [src/types/index.ts](src/types/index.ts)
- [x] **0.2** Add missing `cursor-blink` keyframe animation to [globals.css](src/app/globals.css)

---

## Phase 1 — Foundation (Layout + Navigation) `[MVP]`

**Done when:** Navbar on all pages; smooth scroll works; project data is TypeScript-valid.

- [x] **1.1** Root layout with dark body, fonts, base metadata — [layout.tsx](src/app/layout.tsx)
- [x] **1.2** Navbar — sticky, blur on scroll, mobile drawer, resume link — [Navbar.tsx](src/components/shared/Navbar.tsx)
- [x] **1.2** Nav items: Projects, Architecture, Tech Stack, Timeline, Contact
- [x] **1.3** [public/data/projects.json](public/data/projects.json) — all 10 projects
- [x] **1.3** [public/data/personal.json](public/data/personal.json) — hero/contact data
- [x] **1.3** Typed loaders: [projects.ts](src/data/projects.ts), [personal.ts](src/data/personal.ts)
- [x] **1.2** Fix `#skills` anchor — add `id="skills"` to Tech Stack section

---

## Phase 2 — Core Homepage Sections `[MVP]`

**Done when:** All 6 sections render real content; project modals work; no lorem ipsum anywhere.

### 2.1 Hero Section

- [x] Two-column layout (identity + Engineering Dashboard widget) — [HeroSection.tsx](src/sections/HeroSection.tsx)
- [x] Count-up stats on viewport entry
- [x] Live clock / system status styling
- [x] CTAs: View Projects + Download Resume
- [ ] Replace placeholder personal copy with finalized text from [portfolio.txt](portfolio.txt)

### 2.2 Engineering Snapshot → TechGalaxy

> Replaces roadmap Step 2.2 (SkillCard grid) per design decision.

- [x] [techGraph.ts](src/data/techGraph.ts) — nodes and cross-domain links
- [x] [TechGalaxy.tsx](src/components/tech/TechGalaxy.tsx) — interactive Skills Galaxy with search, filters, panel
- [x] [TechGalaxyPanel.tsx](src/components/tech/TechGalaxyPanel.tsx) — click-to-open detail side panel
- [x] Fix [SnapshotSection.tsx](src/sections/SnapshotSection.tsx) — proper wrapper, dynamic import, loading skeleton
- [x] Match Mission Control styling (`bg-[#0a0a0a]`; section label "02 / Engineering Snapshot")
- [x] Wire [skills.ts](src/data/skills.ts) into graph via [galaxyUtils.ts](src/lib/galaxyUtils.ts) project enrichment
- [x] Add `useInView` entrance animation for section header
- [x] Mobile: responsive graph height (`400px` → `650px`), tap-to-open panel
- [x] Performance: lazy-load ForceGraph2D via `dynamic()` in SnapshotSection (`ssr: false`)

### 2.3 Featured Projects

- [x] [ProjectCard.tsx](src/components/shared/ProjectCard.tsx) with hover states
- [x] [ProjectModal.tsx](src/components/shared/ProjectModal.tsx) — overview, architecture, challenges, lessons, tech stack
- [x] Filter bar (6 categories) + search with `useMemo` — [ProjectsSection.tsx](src/sections/ProjectsSection.tsx)
- [x] AnimatePresence layout animations on filter
- [ ] Create `public/images/projects/` and add cover images for all 10 projects
- [ ] Prioritize screenshots for 5 featured: SpendWise, TraceIQ, Warehouse, EduManager, StoryMancer
- [ ] Verify Next.js `<Image>` sizing and `priority` on above-fold cards
- [ ] Flesh out modal content for non-featured projects (minimum overview + tech stack)

### 2.4 Architecture Showcase

- [x] ASCII diagrams for 5 featured projects — [ArchitectureSection.tsx](src/sections/ArchitectureSection.tsx)
- [x] Insight sentence under each diagram
- [ ] Verify diagrams match actual project architectures (audit against repos)

### 2.5 Career Timeline

- [x] Vertical timeline 2022–2026 — [TimelineSection.tsx](src/sections/TimelineSection.tsx)
- [ ] Optional: externalize timeline data to `src/data/timeline.ts` for admin editing later

### 2.6 Contact Section

- [x] GitHub, LinkedIn, Email, Resume links (no form) — [ContactSection.tsx](src/sections/ContactSection.tsx)
- [x] Inline footer
- [ ] Replace placeholder URLs in [personal.json](public/data/personal.json) with real GitHub/LinkedIn/email
- [ ] Add [public/resume.pdf](public/resume.pdf)

---

## Phase 3 — Hidden Admin Panel `[MVP]`

**Done when:** Navigate to `/admin`, authenticate with passphrase, manage projects and personal details without touching code.

> **Note:** File-based JSON writes (`fs.writeFile`) work locally but fail on Vercel production (read-only filesystem). Decide persistence strategy in 3.2 before relying on admin in prod — options: Vercel KV, Supabase, or GitHub API.

- [ ] **3.1** Create `src/app/admin/page.tsx` with server-side auth gate
- [ ] **3.1** Create `src/app/admin/actions.ts` — `authenticate()`, cookie session
- [ ] **3.1** Add `ADMIN_PASSPHRASE` to `.env.local` (never commit)
- [ ] **3.2** Server Actions: `saveProjects()`, `savePersonal()` with `requireAdmin()`
- [ ] **3.2** Decide production persistence: file write (local) vs Vercel KV / Supabase (deploy)
- [ ] **3.3** Project list UI — add, edit (inline form), delete with confirmation
- [ ] **3.4** Personal details editor form (name, stats, focus, links, bio)
- [ ] **3.5** Save toast feedback + unsaved-changes warning
- [ ] **3.5** Admin metadata: `robots: { index: false }`
- [ ] **3.5** Create [public/robots.txt](public/robots.txt) with `Disallow: /admin`

---

## Phase 4 — Advanced Features `[POST-LAUNCH]`

**Done when:** Optional enhancements ship after MVP deploy. None of these block launch.

- [ ] **4.1** Command palette (`cmdk`) — Ctrl+K search projects, navigate sections, download resume
- [ ] **4.2** Tech Radar tiered list (Core / Production / Learning / Explored) — complement TechGalaxy
- [ ] **4.3** GitHub contribution calendar + language stats (server-side fetch + revalidate)
- [ ] **4.4** Dark/light toggle via `next-themes` (dark remains default)

---

## Phase 5 — SEO, Performance & Deployment `[MVP]`

**Done when:** Site is live on custom domain; Lighthouse 90+; build passes cleanly.

### 5.1 Metadata & SEO

- [x] Root metadata with OG/Twitter tags — [layout.tsx](src/app/layout.tsx)
- [ ] Generate [public/og-image.png](public/og-image.png) (1200×630) or use `next/og` ImageResponse
- [ ] Add `sitemap.xml` (optional)
- [ ] Finalize keywords from [Portfolio Website Project Report.txt](Portfolio%20Website%20Project%20Report.txt)

### 5.2 Performance

- [x] Run `npm run build` — zero TS errors and warnings
- [x] Lazy-load heavy client libs (ForceGraph2D via dynamic import in SnapshotSection)
- [ ] Bundle analysis with `@next/bundle-analyzer`
- [ ] Lighthouse audit: Performance, Accessibility, SEO, Best Practices 90+

### 5.3 Deployment

- [ ] Push to GitHub repository
- [ ] Connect to Vercel; set env vars (`ADMIN_PASSPHRASE`, persistence keys if using KV)
- [ ] Configure custom domain (`nilanga.dev` or equivalent)
- [ ] Post-deploy smoke test: nav anchors, modals, mobile 375px, no console errors
- [ ] 10-second recruiter test with someone unfamiliar

---

## MVP Launch Checklist (Final Gate)

All items must pass before deploy. Consolidated from [portfolio-implementation-roadmap.md](portfolio-implementation-roadmap.md).

### Content

- [ ] Hero copy finalized — no placeholder text
- [ ] 5 featured projects: real descriptions, cover images, full modal content (longDescription, challenges, lessonsLearned)
- [ ] Architecture diagrams accurate for SpendWise, TraceIQ, and Warehouse system
- [ ] Real contact links + resume PDF at `/resume.pdf`

### Technical

- [ ] `npm run build` completes with zero errors and zero TypeScript warnings
- [x] All internal navigation links resolve correctly (`#skills` fixed)
- [ ] Project filter works for all categories; search works
- [ ] Each project card shows cover image on mobile and desktop
- [ ] Clicking a project card opens detail modal (not a new page)
- [ ] Modal closes on Escape key, backdrop click, and close button; scroll lock works
- [ ] `/admin` shows only passphrase prompt when unauthenticated (or admin explicitly deferred — document JSON-only workflow)
- [ ] Site readable on iPhone-sized screen (375px wide)
- [ ] No console errors in production build

### Positioning Check (10-Second Test)

Ask someone to open the homepage without scrolling. They should answer:

1. Who is this person?
2. What kind of work do they do?
3. What should I click to learn more?

- [ ] 10-second test passed

---

## Post-Launch Backlog (Prioritized)

Ordered by recruiter impact. From [portfolio-implementation-roadmap.md](portfolio-implementation-roadmap.md).

1. [ ] Real screenshots/demo GIFs for every featured project
2. [ ] Command palette with "Open [Project]" modal shortcuts
3. [ ] Blog section (2–3 short posts on architecture decisions)
4. [ ] StoryMancer + VillageConnect full modal content (challenges, lessons learned)
5. [ ] Admin: image upload field for cover images
6. [ ] GitHub integration widget (contribution graph, languages)
7. [ ] Light mode toggle
8. [ ] Tech Radar tiered visualization

---

## Implementation Notes

1. **No MDX project pages** — in-page modals are the correct approach (roadmap Phase 3 supersedes the original report's per-project pages).
2. **SnapshotSection is blocking** — fix [SnapshotSection.tsx](src/sections/SnapshotSection.tsx) before further TechGalaxy polish.
3. **Assets are the biggest MVP gap** — `public/images/projects/`, `resume.pdf`, and `og-image.png` are content tasks that block launch.
4. **Tailwind v4** — project uses CSS-first config in `globals.css`; roadmap references v3 `tailwind.config.ts` which does not apply.

---

*Tick items by changing `[ ]` to `[x]` as you complete them. Update the Progress Summary counts when a phase milestone is reached.*
