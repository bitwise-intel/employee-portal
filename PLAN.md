# Bitwise Employee Portal — Build Plan

Angular 21 + Tailwind v4 employee portal for Bitwise, hosted at `portal.bitwise.tech` on Render. Google Workspace auth via GIS SDK. Dark glassmorphic design.

## Phases

| # | Phase | Status |
|---|-------|--------|
| 1 | Scaffold Angular 21 app + Tailwind v4 setup | ✅ Complete |
| 2 | Global styles, environments, core models + auth | ✅ Complete |
| 3 | App bootstrap (app.config, routes, app component) | ✅ Complete |
| 4 | Login page with GIS button | ✅ Complete |
| 5 | Shell layout + nav rail + sub-components | ✅ Complete |
| 6 | Home feature + sub-components | ✅ Complete |
| 7 | Render deployment config + PLAN.md | ✅ Complete |

---

## Architecture

```
src/
├── app/
│   ├── core/
│   │   ├── auth/          — auth.service.ts, auth.guard.ts
│   │   └── models/        — user.model.ts
│   ├── features/
│   │   └── home/          — home + welcome-header + status-card
│   ├── layout/
│   │   ├── shell/         — shell with nav margin transition
│   │   └── nav-rail/      — nav rail + nav-item + user-badge
│   └── pages/
│       └── login/         — GIS button + glassmorphic card
├── environments/          — environment.ts / environment.prod.ts
└── styles.scss            — Tailwind @theme tokens + base styles
```

**Key decisions:**
- `provideZonelessChangeDetection()` — no Zone.js
- `ChangeDetectionStrategy.OnPush` on every component
- Signal inputs/outputs (`input()`, `output()`) throughout
- GIS SDK directly (no third-party auth wrapper)
- `withViewTransitions()` + `withComponentInputBinding()` on router
- `@defer (on viewport)` for home page cards
- `@let` template syntax in user-badge and welcome-header
- `NgOptimizedImage` for user avatar

---

## Setup Required Before First Use

### 1. Google Cloud OAuth Client ID

1. Go to [console.cloud.google.com](https://console.cloud.google.com) and select/create a project under your Google Workspace org.
2. **APIs & Services → OAuth consent screen** → choose **Internal** → fill in app name ("Bitwise Portal"), scopes: `email profile openid`.
3. **Credentials → Create Credentials → OAuth 2.0 Client ID** → Web application
   - Authorized JavaScript origins:
     - `http://localhost:4200`
     - `https://portal.bitwise.tech`
   - Redirect URIs: leave empty
4. Copy the Client ID (format: `xxxxx.apps.googleusercontent.com`)
5. Replace `YOUR_CLIENT_ID.apps.googleusercontent.com` in:
   - `src/environments/environment.ts`
   - `src/environments/environment.prod.ts`

### 2. Render Deployment

Create a **Static Site** on Render with these settings:

| Setting | Value |
|---------|-------|
| Build command | `npm ci && ng build --configuration=production` |
| Publish directory | `dist/employee-portal/browser` |
| Environment variable | `NODE_VERSION=20` |

### 3. DNS (Squarespace → Render)

1. In Render: **Settings → Custom Domains → Add** `portal.bitwise.tech` — copy the CNAME target (e.g. `employee-portal.onrender.com`)
2. In Squarespace: **Domains → bitwise.tech → DNS Settings → Add Record**
   - Type: `CNAME`
   - Host: `portal`
   - Points to: `<your-render-cname-target>`
3. Render auto-provisions HTTPS via Let's Encrypt once DNS resolves (~5–30 min)

---

## Local Development

```bash
npm start              # ng serve at http://localhost:4200
ng build               # production build → dist/employee-portal/browser
```
