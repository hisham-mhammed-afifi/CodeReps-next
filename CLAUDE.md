# Project: CodeReps

A platform teaching beginner JS developers problem-solving through guided challenges using a 5-step framework: Understand, Break Down, Map to Code, Write, Verify.

## References

See @refs/codereps-tech-stack-and-claude-code.md for architecture decisions and full stack rationale.
See @refs/codereps-brand-identity.md for design tokens, colors, typography, and voice guidelines.

## Tech Stack

- Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- Supabase (PostgreSQL), Drizzle ORM, Clerk Auth
- Monaco Editor, Sandpack for code execution
- Zustand for client state, Framer Motion for animations
- Deployed on Vercel

## Commands

- `pnpm dev` - Start dev server
- `pnpm build` - Production build
- `pnpm test` - Run Vitest unit tests
- `pnpm test:e2e` - Run Playwright E2E tests
- `pnpm lint` - ESLint check
- `pnpm db:push` - Push Drizzle schema to Supabase
- `pnpm db:studio` - Open Drizzle Studio

## Verification Workflow

After any code change, run in this order:

1. `pnpm lint` - fix warnings before proceeding
2. `pnpm build` - catch type errors and build failures
3. `pnpm test` - run unit tests, fix failures before moving on

Do not consider a task complete until all three pass.

## Architecture

```
src/app/(marketing)/     # Landing page, pricing, blog (public, SSR for SEO)
src/app/(app)/           # Authenticated app (dashboard, challenges, patterns)
  dashboard/             # User progress overview
  challenge/[slug]/      # Challenge workspace (5-step flow)
  patterns/              # Pattern Library page
src/components/
  ui/                    # shadcn/ui base components
  challenge/             # Challenge workspace components (one per step)
  patterns/              # Pattern card and library components
src/lib/
  db/                    # Drizzle schema, queries, and migrations
  challenges/            # Challenge definitions as typed TS files
  sandbox/               # Sandpack configuration
src/stores/              # Zustand stores (challenge state, user progress)
src/types/               # Shared TypeScript interfaces
```

Route groups: `(marketing)` is public-facing with SSR. `(app)` requires Clerk auth.

## Code Style

- Functional components with hooks, no class components
- Named exports, not default exports (except page.tsx files)
- Tailwind utility classes only. No CSS modules, no styled-components, no inline styles
- shadcn/ui components from @/components/ui/
- Type props with interfaces, not inline types
- Zustand for client state, server components for server data
- `"use client"` directive only when the component uses hooks, browser APIs, or event handlers
- Keep components under 150 lines. Extract logic into custom hooks in the same directory.

## File Patterns

- Pages: `src/app/(app)/[route]/page.tsx`
- Components: `src/components/[domain]/[ComponentName].tsx`
- Server actions: `src/app/(app)/[route]/actions.ts`
- DB queries: `src/lib/db/queries/[entity].ts`
- Challenge data: `src/lib/challenges/[track-slug]/[challenge-slug].ts`
- Zustand stores: `src/stores/[storeName].ts`
- Types: `src/types/[domain].ts`

## Testing

- Unit tests: Vitest, colocated as `[file].test.ts`
- E2E tests: Playwright in `tests/e2e/`
- Challenge flow to test: load > understand > breakdown > map > code > verify
- Run `pnpm test` after every change. Fix failures before moving on.

## Critical Rules

- IMPORTANT: User code runs in Sandpack (browser sandbox), NEVER on the server. No exceptions.
- IMPORTANT: All DB queries go through Drizzle ORM. Never write raw SQL.
- IMPORTANT: Auth is handled by Clerk. Access user via `useUser()` hook (client) or `auth()` helper (server). Never build custom auth.
- Challenge definitions must conform to the `ChallengeDefinition` interface in `src/types/challenge.ts`.
- Use brand design tokens from Tailwind config (not hardcoded hex values) for all colors.
- JetBrains Mono for code, Inter for UI text. Never substitute fonts.

## Common Mistakes (avoid these)

- Don't use `styled-components`, CSS modules, or any CSS-in-JS. Tailwind only.
- Don't create placeholder/mock challenge data. Real challenge content lives in `refs/track-1-fundamentals-challenges.md`.
- Don't use `default export` except for Next.js page.tsx files.
- Don't put `"use client"` on components that don't need it. Server components are the default.
- Don't use spinners. Use skeleton loaders for all loading states.
- Don't use modal popups for in-challenge events. Use toast notifications.
