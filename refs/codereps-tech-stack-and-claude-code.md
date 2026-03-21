# CodeReps -- Tech Stack & Claude Code Strategy

---

## Part 1: Recommended Tech Stack

### Why This Stack

The stack is chosen for three reasons: beginner-friendly DX (you'll onboard contributors easily), strong ecosystem for the features CodeReps needs (code editor, sandboxing, real-time), and maximum compatibility with Claude Code for AI-assisted development.

---

### Frontend

| Layer | Choice | Why |
|---|---|---|
| **Framework** | Next.js 15 (App Router) | SSR for SEO (landing, blog), server components for performance, API routes built-in, huge community |
| **Language** | TypeScript | Catches bugs early, better autocomplete, Claude Code works significantly better with typed codebases |
| **Styling** | Tailwind CSS | Fast prototyping, consistent design system, works perfectly with the brand tokens |
| **Component Library** | shadcn/ui | Copy-paste components, fully customizable, no vendor lock-in, built on Radix (accessible by default) |
| **Code Editor** | Monaco Editor (via @monaco-editor/react) | Same engine as VS Code, syntax highlighting, autocomplete, familiar to developers |
| **State Management** | Zustand | Lightweight, simple API, no boilerplate, perfect for challenge state and user progress |
| **Animations** | Framer Motion | Smooth transitions between the 5 steps, micro-animations for success/unlock moments |

### Backend

| Layer | Choice | Why |
|---|---|---|
| **API** | Next.js API Routes + tRPC | Type-safe API calls end-to-end, no separate backend server needed for MVP |
| **Auth** | Clerk | Drop-in auth with social logins, user management dashboard, generous free tier, handles sessions/JWT |
| **Database** | PostgreSQL (via Supabase) | Relational data fits well (users, challenges, progress, patterns), Supabase gives you hosted Postgres + real-time + storage |
| **ORM** | Drizzle ORM | Type-safe queries, lightweight, works great with PostgreSQL, simpler than Prisma |
| **Code Execution Sandbox** | Sandpack (by CodeSandbox) | Runs user code safely in-browser, no server-side execution needed, supports live preview |

### Infrastructure

| Layer | Choice | Why |
|---|---|---|
| **Hosting** | Vercel | Native Next.js support, automatic previews per PR, edge functions, generous free tier |
| **CDN/Assets** | Vercel + Cloudflare (if needed) | Fast global delivery for static assets |
| **File Storage** | Supabase Storage | Challenge assets, user avatars, pattern card images |
| **Email** | Resend | Transactional emails (welcome, streak reminders, weekly recap), simple API, good DX |
| **Analytics** | PostHog | Open-source, self-hostable, tracks user flows through challenges, funnel analysis |
| **Error Tracking** | Sentry | Catch frontend/backend errors, especially important for the code execution sandbox |
| **Payments** (later) | Stripe | Standard for SaaS, Checkout for quick setup, subscriptions for Pro tier |

### Dev Tooling

| Tool | Purpose |
|---|---|
| **pnpm** | Fast, disk-efficient package manager |
| **ESLint + Prettier** | Code quality and formatting |
| **Vitest** | Unit testing (faster than Jest, native TypeScript) |
| **Playwright** | E2E testing for the challenge flow |
| **GitHub Actions** | CI/CD pipeline |
| **Turborepo** (optional) | If you split into monorepo later (marketing site, app, shared packages) |

---

### Architecture Overview

```
codereps/
  src/
    app/                    # Next.js App Router pages
      (marketing)/          # Landing page, pricing, blog
      (app)/                # Authenticated app
        dashboard/          # User dashboard, progress
        challenge/[id]/     # Challenge workspace
        patterns/           # Pattern library
    components/
      ui/                   # shadcn/ui base components
      challenge/            # Challenge-specific components
        StepUnderstand.tsx
        StepBreakdown.tsx
        StepMapToCode.tsx
        StepCodeEditor.tsx
        StepVerify.tsx
      patterns/             # Pattern card components
    lib/
      db/                   # Drizzle schema and queries
      auth/                 # Clerk helpers
      sandbox/              # Sandpack configuration
      challenges/           # Challenge definitions (JSON/TS)
    server/
      routers/              # tRPC routers
        challenge.ts
        progress.ts
        user.ts
    styles/
      globals.css           # Tailwind + brand tokens as CSS variables
```

---

### Database Schema (Core Tables)

```
users
  id, clerk_id, name, email, xp, current_streak, longest_streak, created_at

tracks
  id, slug, title, description, order, is_locked_by_default

challenges
  id, track_id, order, title, slug, difficulty, estimated_minutes,
  problem_statement, starter_code, solution_code, explanation,
  concepts (jsonb), hints (jsonb), test_cases (jsonb),
  breakdown_blocks (jsonb), concept_options (jsonb)

patterns
  id, name, plain_english, code_example, unlocked_by_challenge_id

user_progress
  id, user_id, challenge_id, status (not_started/in_progress/completed),
  mode (guided/semi_guided/independent), attempts, completed_at,
  user_solution, time_spent_seconds

user_patterns
  id, user_id, pattern_id, unlocked_at
```

---

### Key Technical Decisions Explained

**Why Sandpack instead of server-side execution?**
Running user code on the server is a security nightmare and expensive to scale. Sandpack runs everything in the browser using a service worker. For beginner JS challenges, this is more than enough. No Docker containers, no Lambda functions, no attack surface.

**Why PostgreSQL over MongoDB?**
The data is highly relational: users have progress on challenges, challenges belong to tracks, patterns are unlocked by challenges. Joins are natural here. PostgreSQL also gives you JSONB columns for flexible fields like hints and test cases.

**Why tRPC over REST or GraphQL?**
With TypeScript on both frontend and backend, tRPC gives you end-to-end type safety with zero code generation. Change an API response shape and TypeScript catches every broken call instantly. This is a huge productivity boost with Claude Code since it can see type errors immediately.

**Why Clerk over NextAuth?**
Clerk handles the entire auth UI (sign-in, sign-up, profile) out of the box. You skip building login forms, email verification, password reset, and OAuth flows. For an MVP, this saves 1-2 weeks of work.

---

### MVP vs. Full Platform

**MVP (launch with this):**

- Next.js + TypeScript + Tailwind + shadcn/ui
- Monaco Editor + Sandpack
- Clerk auth
- Supabase (Postgres + storage)
- Drizzle ORM
- Vercel hosting
- Track 1: 15 challenges with the 5-step framework
- Basic progress tracking and pattern library

**Add later:**

- tRPC (start with simple API routes, migrate when complexity grows)
- Stripe payments
- PostHog analytics
- Community features (discussions, shared solutions)
- More tracks
- Gamification (streaks, badges, leaderboard)
- Mobile app (React Native or just a responsive PWA)

---

## Part 2: Getting the Best Out of Claude Code

### The CLAUDE.md File: Your Project's Brain

This is the single most important file for Claude Code productivity. It goes in your project root and tells Claude everything it needs to know about your codebase. Here's a tailored CLAUDE.md for CodeReps:

```markdown
# CLAUDE.md

## Project: CodeReps
A platform teaching beginner JS developers problem-solving through guided challenges.

## Tech Stack
- Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- Supabase (PostgreSQL), Drizzle ORM, Clerk Auth
- Monaco Editor, Sandpack for code execution
- Deployed on Vercel

## Commands
- `pnpm dev` - Start dev server
- `pnpm build` - Production build
- `pnpm test` - Run Vitest unit tests
- `pnpm test:e2e` - Run Playwright E2E tests
- `pnpm lint` - ESLint check
- `pnpm db:push` - Push Drizzle schema to Supabase
- `pnpm db:studio` - Open Drizzle Studio

## Code Style
- Use functional components with hooks, no class components
- Use named exports, not default exports (except pages)
- Use Tailwind utility classes, no CSS modules or styled-components
- Use shadcn/ui components from @/components/ui/
- Always type props with interfaces, not inline types
- Use Zustand for client state, server components for server data
- Use "use client" directive only when needed
- Keep components under 150 lines, extract logic into hooks

## File Patterns
- Pages: src/app/(app)/[route]/page.tsx
- Components: src/components/[domain]/[ComponentName].tsx
- Server actions: src/app/(app)/[route]/actions.ts
- DB queries: src/lib/db/queries/[entity].ts
- Challenge data: src/lib/challenges/[track-slug]/[challenge-slug].ts

## Testing
- Unit tests: Vitest, colocated as [file].test.ts
- E2E tests: Playwright in tests/e2e/
- Test the challenge flow: load > understand > breakdown > map > code > verify
- Always run tests after changes: `pnpm test`

## Important Notes
- Challenge definitions are typed with the ChallengeDefinition interface in src/types/challenge.ts
- User code runs in Sandpack (browser), never on the server
- Auth is handled by Clerk, access user via useUser() hook or auth() server helper
- All DB queries go through Drizzle, never raw SQL
```

### The Workflow That Gets the Best Results

**1. Always start in Plan Mode**

Before coding anything complex, use Plan Mode (Shift+Tab twice in Claude Code). Tell Claude to research your codebase first, then propose an approach. Review the plan before letting it code.

Example:
```
[Plan Mode]
> Read src/components/challenge/ and understand how the 5-step
> framework is structured. I want to add a "hints" panel that
> shows progressive hints. Look at how StepBreakdown.tsx works
> for reference. Propose an approach before coding.
```

**2. One feature per session**

Each Claude Code session should focus on one feature or task. When you finish, use `/clear` to reset context. Don't let old conversation history eat tokens and confuse the model.

Good session scope:
- "Build the StepUnderstand component"
- "Add the progress tracking API route"
- "Create the pattern unlock animation"

Bad session scope:
- "Build the entire challenge page with all 5 steps, progress tracking, and animations"

**3. Reference files explicitly**

Don't say "update the challenge component." Instead:
```
> Update src/components/challenge/StepVerify.tsx to show
> a confetti animation when all test cases pass. Follow the
> same animation pattern used in src/components/challenge/PatternCard.tsx
```

Claude Code works best when you point it to exact files and reference existing patterns in your codebase.

**4. Give Claude a way to verify**

Always tell Claude how to check its own work:
```
> After making changes, run `pnpm test` and fix any failures.
> Then run `pnpm build` to make sure there are no type errors.
```

This turns Claude from "code generator" into "code generator that self-corrects."

**5. Use sub-agents for parallel work**

When building multiple independent components, spawn sub-agents. For example:
```
> Use subagents to build these three components in parallel:
> 1. StepUnderstand.tsx (text input for rephrasing)
> 2. StepBreakdown.tsx (draggable blocks)
> 3. StepMapToCode.tsx (concept tag picker)
> Each should follow the patterns in src/components/ui/ for styling.
```

**6. Commit early and often**

Tell Claude to commit after each meaningful step:
```
> After each component is working, commit with a descriptive
> message following conventional commits format (feat:, fix:, etc.)
```

This gives you rollback points if something goes wrong.

**7. Use custom slash commands for repeated workflows**

Create `.claude/commands/` for things you do often:

```markdown
# .claude/commands/new-challenge.md
Create a new challenge definition file:
1. Read src/types/challenge.ts for the ChallengeDefinition interface
2. Look at an existing challenge in src/lib/challenges/ for structure
3. Create the new file following the exact same pattern
4. Validate all required fields are present
5. Run pnpm test to verify
```

Then just type `/project:new-challenge` to run it.

---

### Monorepo Strategy (When You Scale)

When CodeReps grows beyond MVP, consider splitting into a monorepo with Turborepo:

```
codereps/
  apps/
    web/          # Next.js marketing site + app
    admin/        # Admin panel for challenge management
  packages/
    ui/           # Shared shadcn/ui components
    db/           # Drizzle schema and queries
    types/        # Shared TypeScript types
    challenge-engine/  # Challenge validation and test runner logic
```

Each package gets its own CLAUDE.md with specific context. Claude Code loads ancestor + descendant CLAUDE.md files in monorepos, so the root CLAUDE.md has project-wide rules and each package has specific ones.

---

### Claude Code Anti-Patterns to Avoid

| Anti-Pattern | What to Do Instead |
|---|---|
| Vague prompts ("make it better") | Be specific: "Reduce the re-renders in StepCodeEditor by memoizing the onChange handler" |
| Huge sessions with mixed tasks | One feature per session, `/clear` between tasks |
| No tests or verification step | Always include "run tests and fix failures" in your prompt |
| Stuffing 50+ rules in CLAUDE.md | Keep it under 150 instructions, focus on what's universally needed |
| Overloading MCP connections | Keep MCP token usage under 20k to leave room for actual work |
| Letting Claude rabbit-hole | Use Escape to interrupt, course-correct, and redirect |
| Skipping Plan Mode for complex features | If it touches 3+ files, plan first |

---

### Recommended Build Order with Claude Code

This is the order I'd build CodeReps in, optimized for Claude Code sessions:

**Phase 1: Foundation (Week 1)**

Session 1: Project scaffolding (Next.js, Tailwind, shadcn/ui, TypeScript config)
Session 2: Database schema with Drizzle + Supabase setup
Session 3: Clerk auth integration (sign-in, sign-up, protected routes)
Session 4: Basic layout (nav, sidebar, responsive shell)

**Phase 2: Challenge Engine (Week 2)**

Session 5: Challenge data types and first 3 challenge definitions
Session 6: StepUnderstand component (text input for rephrasing)
Session 7: StepBreakdown component (draggable block arrangement)
Session 8: StepMapToCode component (concept tag picker with feedback)
Session 9: StepCodeEditor component (Monaco + Sandpack integration)
Session 10: StepVerify component (test runner with pass/fail UI)

**Phase 3: Challenge Flow (Week 3)**

Session 11: Challenge page that connects all 5 steps with transitions
Session 12: Progress tracking (save state, mark complete, unlock next)
Session 13: Pattern library page (grid of unlocked pattern cards)
Session 14: Remaining 12 challenge definitions
Session 15: Guided/Semi-Guided/Independent mode switching

**Phase 4: Polish (Week 4)**

Session 16: Dashboard (progress overview, streak counter, XP)
Session 17: Landing page (marketing, brand identity applied)
Session 18: Success animations, toast notifications, micro-interactions
Session 19: E2E tests for the full challenge flow
Session 20: Deploy to Vercel, DNS, final QA

Each session is a focused, completable unit that Claude Code can handle well within context limits. Ship the MVP after Phase 4 and start collecting user feedback.
