# Portfolio Website Implementation Roadmap
## Nilanga Abhisheka Muthukumarana — Mission Control Dashboard

---

## How to Use This Roadmap

This document is structured in five phases: **Setup → Foundation → Core Sections → Advanced Features → Launch**. Each phase has a clear "done when" criterion. Don't move to the next phase until you hit that criterion — the sequence is intentional, not arbitrary.

Two types of work exist throughout:
- **Blocking work** — must be done before dependent steps can begin
- **Parallel work** — can be done alongside other steps once their prerequisites are met

MVP launch gates are marked `[MVP]` — these are the minimum to deploy. Everything marked `[POST-LAUNCH]` ships in iteration.

---

## Phase 0 — Project Setup & Design Tokens
**Duration: 1–2 days**
**Done when:** You can run `npm run dev` and see a blank page with the correct background color, correct font, and no TypeScript errors.

This phase is pure infrastructure. Nothing visual ships, but every decision made here propagates through every component you'll ever write. Mistakes here are expensive to fix later.

---

### Step 0.1 — Scaffold the Project `[MVP]`

**What to build:** A clean Next.js 15 project with all core dependencies installed and configured.

```bash
npx create-next-app@latest portfolio --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd portfolio
```

**Install dependencies in one shot:**
```bash
# UI and components
npx shadcn@latest init
npm install framer-motion lucide-react

# Content (MDX for project pages)
npm install @next/mdx @mdx-js/loader @mdx-js/react
npm install rehype-highlight rehype-pretty-code shiki

# Utilities
npm install clsx tailwind-merge class-variance-authority
```

**Why this order matters:** shadcn/ui's `init` command rewrites your `tailwind.config.ts` and `globals.css`. Run it before you customize either of those files, or your changes get overwritten.

---

### Step 0.2 — Establish Design Tokens `[MVP]`

**What to build:** A single source of truth for every color, font, and spacing value your portfolio uses. This lives in two places: `tailwind.config.ts` and `src/styles/globals.css`.

**In `tailwind.config.ts`, extend the theme:**
```typescript
theme: {
  extend: {
    colors: {
      background: '#0A0A0A',
      surface: '#111111',
      border: '#262626',
      'text-primary': '#FFFFFF',
      'text-muted': '#A1A1AA',
      accent: {
        blue: '#3B82F6',
        cyan: '#06B6D4',
      },
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
    },
  },
}
```

**In `globals.css`, set CSS variables for shadcn/ui compatibility:**
```css
:root {
  --background: 0 0% 4%;       /* #0A0A0A */
  --foreground: 0 0% 100%;     /* #FFFFFF */
  --card: 0 0% 7%;             /* #111111 */
  --border: 0 0% 15%;          /* #262626 */
  --muted-foreground: 240 4% 65%; /* #A1A1AA */
  --accent: 217 91% 60%;       /* #3B82F6 */
}
```

**Why this matters:** Every component you build references these tokens by name, not by hardcoded hex. When you want to tweak a color — and you will — you change it in one place.

**Font loading** — add to your root `layout.tsx`:
```typescript
import { Inter } from 'next/font/google';
// JetBrains Mono isn't in Google Fonts — self-host or use Geist Mono as fallback
import { Geist_Mono } from 'next/font/google';
```

---

### Step 0.3 — Folder Structure `[MVP]`

**Create this structure before writing any components:**

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with fonts, metadata
│   ├── page.tsx            # Homepage (/)
│   └── admin/
│       └── page.tsx        # Hidden admin panel — no link from anywhere public
├── components/
│   ├── ui/                 # shadcn/ui components (auto-generated)
│   └── shared/             # Your reusable components (Navbar, Footer)
│       ├── ProjectCard.tsx     # Card with cover image + click handler
│       └── ProjectModal.tsx    # Expanded detail drawer/modal
├── sections/               # Homepage sections (Hero, Projects, etc.)
│   ├── HeroSection.tsx
│   ├── SnapshotSection.tsx
│   ├── ProjectsSection.tsx
│   ├── ArchitectureSection.tsx
│   ├── TechRadarSection.tsx
│   ├── TimelineSection.tsx
│   └── ContactSection.tsx
├── data/
│   └── projects.ts         # Your project data (single source of truth)
├── types/
│   └── index.ts            # TypeScript interfaces
├── lib/
│   └── utils.ts            # cn() utility and helpers
└── public/
    └── images/
        └── projects/       # Cover images — required for every project
            ├── spendwise.png
            ├── traceiq.png
            └── ...
```

**Why this structure:** Sections are separated from components because sections are page-specific (they appear once, they know their context), while components are reusable. This distinction prevents your `Hero` from accidentally being imported on a project detail page with wrong context.

---

### Step 0.4 — TypeScript Interfaces `[MVP]`

Define your core types before writing any data. This is the contract everything else references.

**In `src/types/index.ts`:**
```typescript
export type ProjectCategory = 'AI/ML' | 'Backend' | 'Frontend' | 'Mobile' | 'Enterprise' | 'Academic';

export interface Project {
  slug: string;               // URL path: 'spendwise', 'traceiq'
  title: string;
  tagline: string;            // One sentence
  description: string;        // 2-3 sentences
  longDescription: string;    // Full detail for expanded card modal
  category: ProjectCategory[];
  featured: boolean;          // Show on homepage
  technologies: string[];
  highlights: string[];       // Bullet points on card + modal
  architecture?: string;      // Architecture description for showcase
  challenges?: string[];      // Technical challenges — shown in modal only
  lessonsLearned?: string[];  // Lessons — shown in modal only
  githubUrl?: string;
  liveUrl?: string;
  coverImage: string;         // REQUIRED: /images/projects/spendwise.png — no placeholder accepted
  year: number;
}

export interface SkillCategory {
  name: string;
  skills: string[];
  icon?: string;
}

// Used by the admin panel only — never imported into public-facing pages
export interface AdminCredentials {
  passphrase: string;         // Stored in env var ADMIN_PASSPHRASE — never hardcoded
}
```

**Done when Phase 0 is complete:** `npm run dev` shows a dark `#0A0A0A` background. `npm run build` compiles without errors. The folder structure matches the diagram above.

---

## Phase 1 — Foundation (Layout + Navigation)
**Duration: 1–2 days**
**Done when:** Every page shares the same Navbar and Footer. Navigating between routes works. The global layout feels like a Mission Control product, not a default Next.js app.

---

### Step 1.1 — Root Layout `[MVP]`

**What to build:** `src/app/layout.tsx` — the shell that wraps every page.

**Key decisions:**
- Set `background-color: #0A0A0A` on `<body>` here, not in a component
- Add `<html lang="en" className="dark">` — hardcode dark mode initially, add toggle post-launch
- Include your font variables here so every component inherits them
- Set your base metadata (name, description, OG image placeholder)

```typescript
export const metadata: Metadata = {
  title: 'Nilanga Muthukumarana — Software Engineer',
  description: 'Full-Stack Developer, AI/ML Enthusiast. Building scalable software and intelligent systems.',
  keywords: ['Software Engineer', 'Full Stack Developer', 'FastAPI', 'React', 'AI Engineer', 'Sri Lanka'],
};
```

---

### Step 1.2 — Navbar `[MVP]`

**What to build:** A sticky top navigation that feels like a product dashboard header, not a website menu.

**Design:** Left side shows your name/logo. Right side shows navigation links. On mobile, collapses to a hamburger. On scroll, adds a subtle backdrop blur.

**Navigation items to link:**
```
Projects | Architecture | Tech Stack | Timeline | Contact
```

**Key technical decision:** Use `useScrollPosition` hook to add `backdrop-blur` and a border-bottom on scroll. This gives the "floating panel" effect without full opacity change.

**Implementation note:** Create this as `src/components/shared/Navbar.tsx`, not inside a section. It's imported once in `layout.tsx`.

**Framer Motion use here:** A single `initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}` on mount. That's all the animation the navbar needs.

---

### Step 1.3 — Project Data File `[MVP]`

**What to build:** `src/data/projects.ts` with all 10 projects defined using your TypeScript interface.

**This is blocking** — the Projects section, Project Filter, and search all depend on this data existing. Write it before any of those sections.

Start with your 5 featured projects in full detail. Add the remaining 5 with minimal data. You'll flesh them out post-launch.

**For each featured project, write:**
- A `tagline` that's exactly one sentence and says what the system *does*, not what it *uses*
  - Bad: "A FastAPI and PostgreSQL application"
  - Good: "Predicts personal spending patterns using machine learning and flags anomalies in real time"
- `highlights` as outcome-focused bullets, not feature lists
  - Bad: "Authentication system"
  - Good: "JWT-based auth with role-level access control"

**Done when Phase 1 is complete:** The Navbar renders on every page. Clicking nav links scrolls smoothly to sections. The project data file is written and TypeScript-valid.

---

## Phase 2 — Core Homepage Sections
**Duration: 4–6 days**
**Done when:** All six homepage sections render with real content. The page is scrollable, scannable, and communicates your positioning without any advanced animations.

Build sections in this exact order — each one teaches you a pattern you'll reuse in the next.

---

### Step 2.1 — Hero Section `[MVP]`

**What to build:** The above-the-fold moment. A two-column layout: left has your identity and CTA, right has the Engineering Dashboard widget.

**This is the most important section.** A recruiter who doesn't scroll will only see this. Design it last, write the copy first.

**Copy structure (left column):**
```
NILANGA ABHISHEKA MUTHUKUMARANA
                                     ← Small label above name, e.g. "Computer Science Undergraduate"
Building scalable software,
intelligent systems,
and modern digital experiences.
                                     ← Two CTAs: "View Projects" (primary) + "Download Resume" (ghost)
```

**The Engineering Dashboard widget (right column):**
This is your signature element — the thing that makes your portfolio memorable and immediately communicates "this person thinks in systems."

```
┌─────────────────────────────────────┐
│  ⚡ SYSTEM STATUS          ONLINE   │
├─────────────────────────────────────┤
│  Projects Built     10+             │
│  Technologies       25+             │
│  Languages          7               │
│  Years Coding       3+              │
├─────────────────────────────────────┤
│  CURRENT FOCUS                      │
│  ▶ Backend Engineering              │
│  ▶ AI Systems                       │
│  ▶ Full-Stack Development           │
├─────────────────────────────────────┤
│  STATUS                             │
│  ● Available for opportunities      │
└─────────────────────────────────────┘
```

**Implementation:** This is a styled `<div>` that looks like a terminal/dashboard panel. Use `border border-[#262626]`, `bg-[#111111]`, `font-mono` for the values, and `text-[#06B6D4]` for the green-ish "ONLINE" indicator. Add a subtle blinking cursor with a CSS animation on "Available for opportunities."

**Framer Motion here:** Animate the widget stats counting up from 0 to their final value when they enter the viewport (`useInView`). This one animation will get comments from every recruiter who sees it.

---

### Step 2.2 — Engineering Snapshot `[MVP]`

**What to build:** A skill card grid. Not a list, not a table — cards that group technologies by domain.

**Why this placement:** After the hero communicates *who you are*, this section immediately answers *what you know*. It must appear before projects.

**Card structure (6 cards):**
```
Backend     Frontend    Databases
Mobile      AI/ML       DevOps
```

Each card: an icon (Lucide), a category name, and a comma-separated list of technologies in `font-mono text-[#A1A1AA]`.

**Design discipline:** Don't use progress bars or skill percentages. These are subjective, they invite skepticism, and they look amateur. Just list the technologies clearly. The projects section will prove competence.

**Technical pattern introduced here:** Create a `SkillCard` component in `src/components/shared/SkillCard.tsx`. It takes `{ name, icon, skills[] }` as props. You'll reuse this pattern for the Tech Radar section.

---

### Step 2.3 — Featured Projects Section `[MVP]`

**What to build:** A filterable grid of project cards — each with a cover image — that expand in-place into a full detail view when clicked. No navigation to another page.

---

#### 2.3a — Cover Images

Every project card requires a real cover image. No placeholders, no SVG colour fills in production.

**Where to put them:** `/public/images/projects/<slug>.png` (e.g. `spendwise.png`). Reference via `project.coverImage` from your data file. The `coverImage` field is now **required** in your TypeScript interface — a missing image is a TypeScript error, not a runtime surprise.

**What makes a good cover image:**
- A screenshot of your actual UI (preferred — shows the real product)
- A screen-capture still from a demo walkthrough
- A composed mockup using your app's real screens

If you don't have screenshots yet: record a 30-second local dev walkthrough, export 3 stills, pick the most readable one. That beats any placeholder.

**Technical:** Use Next.js `<Image>` with `fill` inside a `relative` container, and `object-cover` so images crop uniformly across cards regardless of aspect ratio. Add `sizes="(max-width: 768px) 100vw, 33vw"` to avoid over-fetching on mobile.

---

#### 2.3b — Project Card Anatomy

```
┌────────────────────────────────┐
│                                │  ← Cover image (aspect-ratio: 16/9)
│     [project cover image]      │     Next.js <Image fill object-cover>
│                                │
├────────────────────────────────┤
│  SpendWise                     │
│  AI/ML  ·  Mobile  ·  Backend  │  ← Coloured category tags
│                                │
│  Predicts personal spending    │
│  patterns using machine        │
│  learning...                   │
│                                │
│  FastAPI · PostgreSQL · Redis  │  ← Tech stack in mono font
│                                │
│  [View Details]  [GitHub ↗]   │  ← "View Details" opens the modal
└────────────────────────────────┘
```

**Key behaviour:** The entire card is clickable (opens the modal). The GitHub link is a standalone `<a>` inside the card with `e.stopPropagation()` so it doesn't trigger the modal.

**Hover state:** On hover, the cover image scales to 105% (`transition-transform duration-300`). The card border transitions from `border-[#262626]` to `border-[#3B82F6]/40`. These two effects together communicate "this is interactive" without being loud.

---

#### 2.3c — In-Place Project Detail Modal `[MVP]`

**What to build:** A `ProjectModal` component that slides up from the bottom (mobile) or expands from centre (desktop) when a card is clicked. The URL does not change. There are no separate project pages.

**Why a modal instead of a page:**

Keeping everything on one page preserves scroll position, feels faster (no navigation), and lets visitors browse multiple projects without losing their place. The tradeoff — you can't link directly to a project — is acceptable for a portfolio where the goal is to keep people engaged on the page.

**Modal structure (top to bottom):**

```
┌──────────────────────────────────────────────┐
│  [← Back to Projects]              [✕ Close] │
├──────────────────────────────────────────────┤
│                                              │
│  [Cover image — full width, 40vh max height] │
│                                              │
├──────────────────────────────────────────────┤
│  SpendWise                                   │  ← Title
│  AI/ML  ·  Mobile  ·  Backend     2025       │  ← Tags + year
│  [GitHub ↗]  [Live Demo ↗]                  │
│                                              │
│  ──────────────────────────────────────────  │
│                                              │
│  OVERVIEW                                    │
│  [longDescription — 2-3 paragraph prose]     │
│                                              │
│  ARCHITECTURE                                │
│  [ASCII diagram — same as architecture       │
│   section but with more context]             │
│                                              │
│  KEY FEATURES                                │
│  ● JWT auth with role-level access           │
│  ● ML anomaly detection at < 200ms           │
│                                              │
│  CHALLENGES                                  │
│  [challenges[] from project data]            │
│                                              │
│  LESSONS LEARNED                             │
│  [lessonsLearned[] from project data]        │
│                                              │
│  TECH STACK                                  │
│  FastAPI  PostgreSQL  Redis  TensorFlow      │  ← Tag chips
└──────────────────────────────────────────────┘
```

**Implementation — `src/components/shared/ProjectModal.tsx`:**

```typescript
// State lives in ProjectsSection — not in each card
const [selectedProject, setSelectedProject] = useState<Project | null>(null);

// Pass down to each card
<ProjectCard
  project={project}
  onSelect={() => setSelectedProject(project)}
/>

// Modal rendered once, conditionally
<AnimatePresence>
  {selectedProject && (
    <ProjectModal
      project={selectedProject}
      onClose={() => setSelectedProject(null)}
    />
  )}
</AnimatePresence>
```

**Framer Motion for the modal:**

```typescript
// Desktop: scale in from centre
const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.15 } },
};

// The backdrop
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};
```

**Scroll and focus management:**
- When modal opens: `document.body.style.overflow = 'hidden'` (prevents background scroll)
- When modal closes: restore overflow
- Use `useEffect` with cleanup to handle browser back button / escape key

**Escape key + backdrop click to close:**
```typescript
useEffect(() => {
  const handleKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };
  window.addEventListener('keydown', handleKey);
  return () => window.removeEventListener('keydown', handleKey);
}, [onClose]);
```

**Mobile:** On viewports under 768px, the modal renders as a bottom sheet (anchored to the bottom, slides up). On desktop it's a centred overlay with max-width of `900px` and max-height of `90vh` with internal scroll.

---

#### 2.3d — Filter Bar

```
[ All ] [ AI/ML ] [ Backend ] [ Frontend ] [ Mobile ] [ Enterprise ]
```

Implement as client-side state (`useState`). When a filter is active, non-matching cards animate out using Framer Motion `AnimatePresence` with the `layout` prop. This is the most visually impressive interaction on the page — 3 lines of code, looks like days of work:

```typescript
<motion.div layout animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
  <ProjectCard project={project} onSelect={...} />
</motion.div>
```

Add a search input above the filter bar. Filter against `title`, `description`, and `technologies` using `useMemo` to avoid recalculating every render.

**Done when Phase 2 is complete:** Scroll through the homepage. Every section renders with real content. Each project card shows its cover image. Clicking a card opens the detail modal. The modal has full content for SpendWise and TraceIQ, and at minimum an overview + tech stack for the others. The filter and search work. No lorem ipsum anywhere.

---

### Step 2.4 — Architecture Showcase `[MVP]`

**What to build:** ASCII-style architecture diagrams for your 3 most complex projects. This is the section that separates you from every other student portfolio.

**Implementation approach:** Don't use a diagram library for this. Use styled `<pre>` blocks with `font-mono` and your accent colors to highlight different layers. This looks intentionally terminal-native, which matches your aesthetic.

For SpendWise:
```
React Native App
      │  REST
      ▼
FastAPI Backend ─── Redis Cache
      │
  PostgreSQL
      │
ML Prediction Engine
(TensorFlow + Prophet + Scikit-learn)
```

Color the *layer names* in `#06B6D4`. Color the *arrows and connectors* in `#262626`. Color the *technology names* in `#A1A1AA`.

**Add one sentence of insight under each diagram** — not just what the architecture is, but why it's designed that way:
> "Redis caches prediction results to avoid re-running the ML model on identical expense patterns, keeping response times under 200ms."

That sentence proves you understand the architecture, not just that you drew it.

---

### Step 2.5 — Career Timeline `[MVP]`

**What to build:** A vertical timeline from 2022 to present.

**Keep it lean.** Each entry needs: year, one headline, one sentence of context. Resist the urge to list everything — pick the signal event from each year.

```
2022 — Started CS degree. First programs, first frustrations with bugs that became puzzles.
2023 — Built first web applications. React clicked. Started seeing how systems connect.
2024 — Full-stack systems. Warehouse Management System. Learned what "production-ready" means.
2025 — Enterprise software. EduManager and TraceIQ. Domain-Driven Design changed how I think.
2026 — AI-powered systems. SpendWise and StoryMancer. ML stopped feeling like magic.
```

**Framer Motion:** Reveal each entry as it enters the viewport (`whileInView`). Stagger them 0.1s apart.

---

### Step 2.6 — Contact Section `[MVP]`

**What to build:** Four links. No form.

GitHub · LinkedIn · Email · Resume PDF

Center-aligned. Large icons from Lucide. Your email shown in `font-mono`. A short line of copy: "Open to internships, graduate roles, and interesting problems."

**Why no form:** Forms introduce friction, spam, and broken email deliverability. A direct `mailto:` link opens in their email client with one click. Your email address being visible is a feature — it communicates confidence.

**Done when Phase 2 is complete:** Scroll through the homepage end-to-end. Every section renders with your actual content. The project filter works. The architecture diagrams display correctly. No lorem ipsum anywhere.

---

## Phase 3 — Hidden Admin Panel
**Duration: 2–3 days**
**Done when:** You can navigate to `/admin`, authenticate with a passphrase, and manage all portfolio content — add/remove/edit projects and edit personal details — without touching code.

This replaces the previous Phase 3 (MDX project detail pages). All project detail content now lives in the modal (Step 2.3c) and in your data file. The admin panel is how you update that data file's values at runtime.

---

### Step 3.1 — Admin Route Setup `[MVP]`

**What to build:** `src/app/admin/page.tsx` — a server-rendered page that requires authentication before showing any UI.

**Security model:** The admin panel is security-through-obscurity plus a passphrase. There is no link to `/admin` anywhere on the public site — no footer link, no navbar item. The URL is your first layer of protection. The passphrase is your second. This is sufficient for a personal portfolio; it is not sufficient for a multi-user application.

**Environment variable — add to `.env.local`:**
```bash
ADMIN_PASSPHRASE=your-long-random-passphrase-here
# Never commit this. Add .env.local to .gitignore immediately.
```

**Authentication flow:**
1. User navigates to `/admin`
2. Server checks for a `admin_auth` cookie
3. Cookie absent or invalid → show passphrase input, nothing else
4. Cookie valid → show full admin UI

**Cookie-based session — `src/app/admin/actions.ts` (Server Action):**
```typescript
'use server';
import { cookies } from 'next/headers';

export async function authenticate(passphrase: string) {
  if (passphrase === process.env.ADMIN_PASSPHRASE) {
    cookies().set('admin_auth', process.env.ADMIN_PASSPHRASE!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 8, // 8 hours
      sameSite: 'strict',
    });
    return { success: true };
  }
  return { success: false };
}
```

**Important:** The `ADMIN_PASSPHRASE` env var is never sent to the client. The cookie is `httpOnly`. The admin page validates the cookie server-side before returning any JSX. An unauthenticated request to `/admin` sees only a plain input form — no project data, no UI chrome.

---

### Step 3.2 — Admin Data Layer `[MVP]`

**What to build:** The mechanism by which admin panel changes persist.

**Implementation choice — file-based JSON storage:**

Store your project data as `/public/data/projects.json` instead of hardcoded in `projects.ts`. The admin panel reads from and writes to this file via Server Actions. Your `projects.ts` becomes a typed loader that reads the JSON:

```typescript
// src/data/projects.ts
import projectsData from '../../public/data/projects.json';
import type { Project } from '@/types';

export const projects: Project[] = projectsData as Project[];
```

**Why JSON over a database:** A portfolio doesn't need a database. JSON in `/public/data/` is trivial to back up, version-controlled (if you commit it), readable, and editable directly if you ever need to. Adding a database introduces auth, migrations, and hosting cost for data that changes a few times per year.

**Server Action for saving:**
```typescript
'use server';
import fs from 'fs/promises';
import path from 'path';
import { cookies } from 'next/headers';
import type { Project } from '@/types';

async function requireAdmin() {
  const cookie = cookies().get('admin_auth');
  if (cookie?.value !== process.env.ADMIN_PASSPHRASE) {
    throw new Error('Unauthorized');
  }
}

export async function saveProjects(projects: Project[]) {
  await requireAdmin(); // Always check auth before writing
  const filePath = path.join(process.cwd(), 'public/data/projects.json');
  await fs.writeFile(filePath, JSON.stringify(projects, null, 2), 'utf-8');
}
```

**Note:** On Vercel, the filesystem is read-only in production. If you deploy to Vercel, move to a lightweight alternative — Vercel KV (key-value store), a Supabase table, or a JSON file committed to a private GitHub repo and updated via the GitHub API. The admin panel's Server Action interface stays the same; only the persistence layer changes.

---

### Step 3.3 — Admin UI: Project Management `[MVP]`

**What to build:** A protected UI for adding, editing, and removing projects.

**Layout:**
```
┌─────────────────────────────────────────────────────┐
│  ⚙  PORTFOLIO ADMIN              [Lock / Sign out]  │
├─────────────────────────────────────────────────────┤
│                                                     │
│  PROJECTS  (10)              [+ Add New Project]    │
│  ─────────────────────────────────────────────────  │
│                                                     │
│  SpendWise                  2025    AI/ML           │
│  [Edit]  [Delete]                                   │
│                                                     │
│  TraceIQ                    2025    Enterprise      │
│  [Edit]  [Delete]                                   │
│  ...                                                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Edit/Add form (inline expansion, not a separate page):**

When "Edit" or "+ Add New Project" is clicked, a form expands below the project row (or at the top of the list). The form maps 1:1 to the `Project` interface.

**Fields in the form:**
```
Title *            [text input]
Slug *             [text input — auto-generated from title, editable]
Tagline *          [text input — one sentence]
Description *      [textarea — 2-3 sentences shown on card]
Long Description * [textarea — full detail shown in modal]
Category *         [multi-select checkboxes]
Year *             [number input]
Featured           [toggle]
Technologies *     [tag input — type + Enter to add, click × to remove]
Highlights *       [tag input — bullet points]
Architecture       [textarea — ASCII diagram]
Challenges         [tag input — each item is a challenge]
Lessons Learned    [tag input — each item is a lesson]
GitHub URL         [url input]
Live URL           [url input]
Cover Image Path * [text input — /images/projects/slug.png]
```

Fields marked `*` are required. The form validates client-side before calling the Server Action. A missing required field shows an inline error, not an alert.

**Delete confirmation:** Clicking "Delete" shows an inline confirmation (`"Delete SpendWise? This cannot be undone. [Cancel] [Delete]"`) — not a browser `confirm()` dialog. The confirmation is scoped to that row only.

---

### Step 3.4 — Admin UI: Personal Details Editor `[MVP]`

**What to build:** A form to edit the personal information used across the site — hero copy, availability status, social links, and personal bio.

**Store personal details in `/public/data/personal.json`:**
```json
{
  "name": "Nilanga Abhisheka Muthukumarana",
  "title": "Software Engineer",
  "tagline": "Building scalable software, intelligent systems, and modern digital experiences.",
  "availability": "Available for opportunities",
  "availabilityStatus": "open",
  "currentFocus": ["Backend Engineering", "AI Systems", "Full-Stack Development"],
  "stats": {
    "projectsBuilt": "10+",
    "technologies": "25+",
    "languages": "7",
    "yearsCoding": "3+"
  },
  "links": {
    "github": "https://github.com/...",
    "linkedin": "https://linkedin.com/in/...",
    "email": "nilanga@example.com",
    "resume": "/resume.pdf"
  },
  "bio": "Computer Science undergraduate..."
}
```

**Admin form for personal details:**
```
NAME              [text input]
TITLE             [text input]
TAGLINE           [textarea]
AVAILABILITY      [select: Open / Passively Looking / Not Available]
CURRENT FOCUS     [tag input — shown in hero dashboard widget]
HERO STATS        [four number inputs: Projects / Technologies / Languages / Years]
LINKS             [four url inputs: GitHub / LinkedIn / Email / Resume]
BIO               [textarea]

                                    [Cancel]  [Save Changes]
```

**Loading data in components:** Your `HeroSection.tsx`, `ContactSection.tsx`, and other sections import from `src/data/personal.ts` — a typed loader like `projects.ts`. When the admin saves, the JSON updates, and the next page load reflects the changes.

---

### Step 3.5 — Admin UX Polish `[MVP]`

**Keep the admin panel deliberately minimal.** It's a tool, not a product. These details matter:

**Unsaved changes warning:** If there are unsaved edits and the user tries to navigate away, warn them. Use `beforeunload` event on the client.

**Save feedback:** After saving, show a brief success toast — `"Projects saved"` — for 2 seconds. Errors show inline in red. Never silently fail.

**Image upload shortcut:** The cover image field is a plain text path. Add a small note next to it: `"Add image to /public/images/projects/ first, then enter the path here."` A file upload UI is nice but unnecessary for one person.

**Admin page is excluded from sitemap and `robots.txt`:**
```
# robots.txt
Disallow: /admin
```

And in your Next.js metadata for the admin page:
```typescript
export const metadata = {
  robots: { index: false, follow: false },
};
```

**Done when Phase 3 is complete:** Navigate to `/admin`. See only a passphrase prompt. Enter the passphrase, gain access. Add a new project — it appears on the homepage without redeploying. Edit SpendWise's tagline — the change reflects on the next page load. Delete a project — it disappears from the grid. Edit personal details — the hero dashboard widget updates. Sign out — `/admin` shows the prompt again.

---

## Phase 4 — Advanced Features
**Duration: 2–3 days**
**Done when:** Command palette works with `Ctrl+K`. Tech Radar visualization renders. These are `[POST-LAUNCH]` unless you have time before initial deploy.

---

### Step 4.1 — Command Palette `[POST-LAUNCH]`

**What to build:** A `Ctrl+K` modal that lets visitors search projects, navigate sections, and download your resume.

**Why this earns its complexity:** It's the feature that signals "this person thinks about user experience." It's unexpected on a portfolio, and unexpected in the right way.

**Library:** Use `cmdk` — it's the same primitive that powers shadcn/ui's Command component.

```bash
npm install cmdk
```

**Commands to include:**
```
Search Projects...
  → Filters as you type, shows matching project cards

Navigate
  → Projects | Architecture | Tech Stack | Timeline | Contact

Actions
  → Download Resume
  → View GitHub Profile
  → Send Email
```

**Implementation:** A global `useEffect` that listens for `Ctrl+K`, opens a `Dialog` component containing the `Command` panel. Store command definitions in `src/data/commands.ts`.

---

### Step 4.2 — Tech Radar / Technology Visualization `[POST-LAUNCH]`

**What to build:** An interactive technology visualization using Recharts or a custom SVG.

**Recommendation:** Build a simple tiered list visualization rather than an actual radar chart. Actual radar charts require careful math and look cluttered with 25+ technologies. A tiered list with hover states and category grouping is cleaner and more readable.

Structure:
```
CORE STACK           → TypeScript, Python, React, Node.js, FastAPI
PRODUCTION READY     → PostgreSQL, MongoDB, Docker, Spring Boot
ACTIVELY LEARNING    → LangChain, Flutter, Next.js 15
EXPLORED             → ASP.NET Core, TensorFlow, ChromaDB
```

Hover on any technology to see which of your projects used it.

---

### Step 4.3 — GitHub Integration `[POST-LAUNCH]`

**What to build:** Display your GitHub contribution calendar and most-used languages.

**Use GitHub's public API** — no authentication needed for public profile data:
```
https://api.github.com/users/YOUR_USERNAME/repos
```

For the contribution graph, use `react-github-calendar`:
```bash
npm install react-github-calendar
```

**Important:** Fetch this data with `next/server` `fetch` and `revalidate`, not client-side. GitHub's API has rate limits; fetching from the server means one request per revalidation interval, not one per visitor.

---

### Step 4.4 — Dark/Light Toggle `[POST-LAUNCH]`

**What to build:** A theme toggle using `next-themes`.

```bash
npm install next-themes
```

Wrap your root layout in `ThemeProvider`. Add a toggle button to the Navbar. Keep `dark` as the default — your entire color system is designed for dark mode, and light mode should be a bonus, not the baseline.

**Note:** Don't build this until all other sections are complete. Adding theme support after the fact is straightforward; designing two themes from the start is expensive.

---

## Phase 5 — SEO, Performance & Deployment
**Duration: 1 day**
**Done when:** The site is live on a custom domain, scores 90+ on Lighthouse, and your name returns your portfolio as the first result.

---

### Step 5.1 — Metadata & SEO `[MVP]`

**What to build:** Complete the metadata in `layout.tsx` and add per-page metadata for project detail pages.

**Root metadata:**
```typescript
export const metadata: Metadata = {
  title: {
    default: 'Nilanga Muthukumarana — Software Engineer',
    template: '%s | Nilanga Muthukumarana',
  },
  description: 'Full-Stack Developer and AI/ML Enthusiast building scalable systems and intelligent applications.',
  keywords: [
    'Software Engineer', 'Full Stack Developer', 'React Developer',
    'FastAPI Developer', 'Machine Learning Engineer', 'Sri Lanka',
    'Computer Science', 'AI Engineer', 'Python Developer',
  ],
  openGraph: {
    type: 'website',
    url: 'https://nilanga.dev',
    title: 'Nilanga Muthukumarana — Software Engineer',
    description: '...',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};
```

**Generate an OG image** using Next.js's built-in `ImageResponse` from `next/og`. This is the image that appears when someone shares your portfolio link on LinkedIn — make it count.

---

### Step 5.2 — Performance Optimization `[MVP]`

**Before deploying, do these specifically:**

**Images:** Use Next.js `<Image>` component for every image. Add `priority` prop to your hero section images.

**Fonts:** You're already using `next/font/google` from Step 0.2. Confirm `display: 'swap'` is set.

**Code splitting:** Next.js handles this automatically with the App Router, but verify: large libraries like Framer Motion and Recharts should not be imported at the root level. Import them inside client components only.

**Bundle analysis:**
```bash
npm install @next/bundle-analyzer
ANALYZE=true npm run build
```
Run this before deploying. If any route exceeds 200kb parsed, investigate why.

---

### Step 5.3 — Deployment `[MVP]`

**Deploy to Vercel.** It's the correct choice for Next.js — zero configuration, automatic HTTPS, preview deployments for every branch, and built-in analytics.

**Steps:**
1. Push your code to a GitHub repository
2. Connect the repository to Vercel at `vercel.com/new`
3. Vercel auto-detects Next.js and configures the build
4. Set environment variables if you add any (GitHub token, etc.)
5. Deploy

**Custom domain:** Buy `nilanga.dev` or `nilangamuthukumarana.com`. Vercel makes domain configuration a 3-minute task. A custom domain signals professional intent.

**Verify post-deployment:**
- Run Lighthouse audit in Chrome DevTools
- Test on mobile (recruiters often check portfolios on their phones)
- Share the URL with someone who doesn't know you and ask what they understand about you in 10 seconds

---

## Dependency Map

```
Phase 0 (Setup)
│
├── 0.1 Project scaffold
│     └── 0.2 Design tokens ──────────────────────────────────────────────────── ALL UI work
│
├── 0.3 Folder structure
│     └── 0.4 TypeScript interfaces
│           └── 1.3 Project data file ──────────────────── 2.3 Projects section (cards + modal)
│                                                      └── 2.4 Architecture section
│
Phase 1 (Foundation)
├── 1.1 Root layout ──────────────────── ALL page work
│
└── 1.2 Navbar ── parallel with data work
│
Phase 2 (Sections) — all depend on Phase 1, some parallel with each other
├── 2.1 Hero ── first (sets the tone, others reference its style)
├── 2.2 Snapshot ── parallel with Hero
├── 2.3 Projects ── depends on 1.3 data file; includes cover images + modal
├── 2.4 Architecture ── depends on 1.3 data file
├── 2.5 Timeline ── parallel, no dependencies
└── 2.6 Contact ── last (simplest, acts as a reset/close)
│
Phase 3 (Admin Panel) — depends on Phase 2; can be done in parallel with Phase 4
├── 3.1 Admin route + auth ── blocking for rest of Phase 3
├── 3.2 Data layer (JSON files) ── depends on 3.1
├── 3.3 Project management UI ── depends on 3.2
├── 3.4 Personal details editor ── depends on 3.2; parallel with 3.3
└── 3.5 UX polish ── depends on 3.3 and 3.4

Phase 4 (Advanced) — entirely parallel with each other, none blocking
└── 4.1, 4.2, 4.3, 4.4 — all post-launch

Phase 5 (Launch) — depends on Phase 3 being complete
└── 5.1, 5.2, 5.3 — sequential within phase
```

---

## MVP Launch Checklist

Before you push the deploy button, verify every item:

**Content**
- [ ] Hero copy finalized — no placeholder text
- [ ] All 5 featured projects have real descriptions (no lorem ipsum)
- [ ] All 5 featured projects have real cover images in `/public/images/projects/`
- [ ] All 5 featured project modals have full content: longDescription, challenges, lessonsLearned
- [ ] Architecture diagrams for SpendWise, TraceIQ, and Warehouse system are accurate
- [ ] Contact links are live — GitHub, LinkedIn, email, resume PDF
- [ ] Resume PDF is current and accessible at `/resume.pdf` (put in `/public`)

**Technical**
- [ ] `npm run build` completes with zero errors and zero TypeScript warnings
- [ ] All internal navigation links resolve correctly
- [ ] Project filter works for all 5 categories
- [ ] Each project card shows its cover image correctly on mobile and desktop
- [ ] Clicking a project card opens the detail modal (not a new page)
- [ ] Modal closes on Escape key, backdrop click, and close button
- [ ] Modal scroll works independently of page scroll
- [ ] SpendWise and TraceIQ modals show full challenges + lessons learned content
- [ ] `/admin` shows only a passphrase prompt when unauthenticated
- [ ] Admin panel: adding a project appears on homepage without redeploying
- [ ] Admin panel: editing personal details updates the hero widget
- [ ] `ADMIN_PASSPHRASE` is in `.env.local` and `.env.local` is in `.gitignore`
- [ ] `/admin` is in `robots.txt` Disallow and has `noindex` metadata
- [ ] Site is readable on iPhone-sized screen (375px wide)
- [ ] No console errors in production build

**Positioning check (the 10-second test)**
Ask someone to open your homepage and tell you, without scrolling:
- Who is this person?
- What kind of work do they do?
- What should I click to learn more?

If they can answer all three, you're ready to launch.

---

## What to Build Post-Launch (Prioritized)

In order of impact on recruiter perception:

1. **Real screenshots/demo GIFs** for each featured project — cover images on cards and in the modal are the single highest-impact addition you can make
2. **Command palette (Ctrl+K)** — signals UX thinking; can include "Open SpendWise" to open the modal directly
3. **Blog section** — even 2-3 short posts on architecture decisions positions you as someone who reflects on their work
4. **StoryMancer and VillageConnect modal content** — flesh out challenges and lessons learned
5. **Admin: image upload** — add a file upload field to the admin panel so you can replace cover images without FTP/manual file placement
6. **GitHub integration** — visual proof of activity
7. **Light mode** — accessibility, not vanity
8. **Tech Radar visualization** — nice to have, low recruiter impact

---

## Common Blockers & How to Handle Them

**"I don't have screenshots of my projects"**
Record a screen capture walkthrough of each project (even if it's just the local dev server running). Export 3-5 still frames. These are better than nothing and honest about what you built.

**"My code isn't clean enough to link"**
Add a `README.md` to each repo before linking. A well-written README signals professionalism regardless of code quality. Describe the problem, the architecture, and setup instructions.

**"I can't finish all sections before I want to launch"**
Launch with Hero + Engineering Snapshot + Projects + Contact. These four sections tell the complete story. Add Timeline, Architecture, and project detail pages in the week after launch. A live site with 80% of sections beats a perfect site that ships in 6 weeks.

**"The animations look janky"**
Remove them. A portfolio with no animations and great content is infinitely better than one with broken animations. Add Framer Motion back section by section, testing each one before moving on.

**"Vercel won't let me write files from the admin panel"**
Vercel's filesystem is read-only in production. Swap the `fs.writeFile` in your Server Action for one of these: (a) Vercel KV — a key-value store, free tier is sufficient, minimal code change; (b) Supabase — free Postgres instance, add a single `projects` table; (c) GitHub API — commit the JSON file update directly to your repo, triggering a redeploy. Option (a) is the least work. The admin UI doesn't change — only the persistence layer in `saveProjects()` does.

**"I don't have a passphrase stored securely"**
Generate one with `openssl rand -base64 32` in your terminal. Store it only in `.env.local` (local) and as a Vercel environment variable (production). Never put it in code or commit it.
