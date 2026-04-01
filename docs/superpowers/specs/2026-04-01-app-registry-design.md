# App Registry Architecture Design

**Date:** 2026-04-01  
**Status:** Approved

## Overview

Restructure the employee portal to support multiple "apps" (top-level feature areas) in a consistent, extensible way. Each app gets its own route, nav item, and folder. A central registry drives both the nav rail and routing so adding a new app requires touching as few files as possible.

## Directory Structure

`features/` is renamed to `apps/`. Each app lives in its own folder with a routes file. `home` is treated as a special dashboard (always present, not in the registry).

```
src/app/
├── core/
│   ├── auth/
│   ├── models/
│   └── app.registry.ts          ← single source of truth for apps
├── apps/
│   ├── home/                    ← unchanged, not in registry
│   └── timekeeping/             ← first app, placeholder
│       ├── timekeeping.ts
│       ├── timekeeping.routes.ts
│       └── (components/ added when real work begins)
├── layout/
└── pages/
```

## App Registry (`core/app.registry.ts`)

Defines the `AppDefinition` interface and the `APP_REGISTRY` array. Every app that appears as a nav tab is registered here.

```typescript
export interface AppDefinition {
  id: string;
  label: string;
  route: string;
  icon: string;
}

export const APP_REGISTRY: AppDefinition[] = [
  { id: 'time', label: 'Time', route: '/time', icon: '⏱' },
];
```

`home` is not in the registry — it is wired directly in `app.routes.ts` and hardcoded as the first item in the nav rail.

## Routing (`app.routes.ts`)

Each registered app gets a lazy-loaded `loadChildren` entry pointing to its own `*.routes.ts`. Adding a future app means one new entry here and one new entry in `APP_REGISTRY`.

```typescript
children: [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./apps/home/home').then(m => m.Home) },
  { path: 'time', loadChildren: () => import('./apps/timekeeping/timekeeping.routes').then(m => m.TIMEKEEPING_ROUTES) },
]
```

Each app's routes file:

```typescript
// apps/timekeeping/timekeeping.routes.ts
export const TIMEKEEPING_ROUTES: Routes = [
  { path: '', component: Timekeeping },
];
```

This gives each app room to add sub-routes later without touching `app.routes.ts`.

## Nav Rail

`nav-rail.ts` replaces its hardcoded `navItems` array by prepending the fixed Home entry and spreading `APP_REGISTRY`:

```typescript
readonly navItems: NavItem[] = [
  { label: 'Home', route: '/home', icon: '⌂' },
  ...APP_REGISTRY,
];
```

`AppDefinition` is a superset of `NavItem` (same fields plus `id`), so no mapping is needed.

## Timekeeping Placeholder

A minimal component occupies the route with no real functionality. The folder structure is in place for future development.

```typescript
@Component({
  selector: 'app-timekeeping',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="p-8 text-white/60">Timekeeping — coming soon</div>`,
})
export class Timekeeping {}
```

## Server-Side Placeholder

A matching Express router is registered so the backend structure mirrors the frontend from the start.

```typescript
// server/src/routes/timekeeping.ts
router.get('/', (_req, res) => res.json({ app: 'timekeeping', status: 'coming soon' }));
```

Registered in `server/src/routes/index.ts`:
```typescript
router.use('/timekeeping', timekeepingRouter);
```

## Adding a New App (Future Workflow)

1. Create `src/app/apps/<name>/` with `<name>.ts`, `<name>.routes.ts`
2. Add one entry to `APP_REGISTRY` in `core/app.registry.ts`
3. Add one `loadChildren` entry in `app.routes.ts`
4. Add one router in `server/src/routes/<name>.ts` and register it in `server/src/routes/index.ts`
