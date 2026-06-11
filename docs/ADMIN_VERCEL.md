# Admin Panel on Vercel

Yes — you can host the portfolio **with** an admin panel on Vercel. The site itself deploys normally. Only the **data persistence layer** needs a different approach in production.

## What works out of the box on Vercel

- Next.js App Router (`/admin` route)
- Server Actions for authentication (httpOnly cookie + `ADMIN_PASSPHRASE` env var)
- Static JSON reads from `public/data/*.json` at build time / request time

## What does NOT work on Vercel

- `fs.writeFile()` to `public/data/projects.json` — Vercel's filesystem is **read-only** in production

## Recommended persistence options

| Option | Effort | Best for |
|--------|--------|----------|
| **Vercel KV** | Low | Simple key-value JSON blobs; free tier sufficient |
| **Supabase** | Medium | Postgres table if you want structured queries later |
| **GitHub API** | Medium | Commit JSON changes to repo (triggers redeploy) |
| **Local-only admin** | None | Edit `public/data/*.json` in IDE; redeploy manually |

The admin UI stays the same — only `saveProjects()` / `savePersonal()` swap their storage backend.

## Environment variables (Vercel dashboard)

```bash
ADMIN_PASSPHRASE=your-long-random-passphrase
# If using Vercel KV:
KV_REST_API_URL=...
KV_REST_API_TOKEN=...
```

## Security checklist

- No link to `/admin` on the public site
- `robots.txt`: `Disallow: /admin`
- Admin page metadata: `robots: { index: false }`
- Never commit `.env.local`

## Launch without admin

You can deploy **now** without the admin panel and edit content by updating:

- `public/data/projects.json`
- `public/data/personal.json`

Then push to GitHub — Vercel redeploys automatically.
