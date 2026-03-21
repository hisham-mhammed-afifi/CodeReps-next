# Implement Story

You are implementing a user story for CodeReps, a practice platform teaching beginner JS developers problem-solving through guided challenges.

## Input

The user will provide a story number or filename. Find the matching file in `user-stories/codereps-track1-user-stories/`.

## Step 0: Read Before You Touch Anything

Read ALL of these files before planning or writing any code:

1. The story file the user specified
2. `00-story-outline-index.md` (for dependency context and where this story fits)
3. `refs/codereps-tech-stack-and-claude-code.md` (stack decisions and architecture)
4. `refs/codereps-brand-identity.md` (design tokens, colors, typography, voice)
5. `refs/prd-track-1-fundamentals.md` (full requirements and data model)
6. `refs/track-1-fundamentals-challenges.md` (challenge content and structure)
7. `CLAUDE.md` (project conventions, if it exists and has content beyond this command)

If this story has dependencies (check the Dependencies field), also read those dependency story files to understand what should already exist.

## Step 1: Check Project State

Before planning, determine what exists:

```
Is there a package.json in the project root?
Is there a src/ or app/ directory?
Is there a node_modules/ directory?
```

**If NO project exists yet (first run):**

- Your plan MUST start with project scaffolding (Next.js 15, TypeScript, Tailwind, shadcn/ui)
- List every global install and setup step you need and ASK the user for approval before running any of them
- Example: "I need to run the following setup commands. Approve before I proceed:
  - `npx create-next-app@latest` (project scaffold)
  - `npx shadcn@latest init` (component library)
  - `pnpm add <packages>` (project dependencies)
  - Any global installs needed? [list them]"
- Do NOT run `npm install -g`, `pnpm add -g`, or any global install without explicit user approval
- Do NOT run `npx create-next-app` or any scaffold command without explicit user approval

**If project exists:**

- Check if the story's dependencies (other stories) appear to be implemented by scanning the codebase for their expected components/routes
- If a dependency is missing, STOP and tell the user: "Story X depends on Story Y, but I can't find [specific component/route]. Should I implement Story Y first, or proceed assuming it exists?"

## Step 2: Plan (Do NOT Skip)

Present a structured plan to the user. Do NOT write any code until the plan is approved.

### Plan Format

```
## Implementation Plan: Story [N] - [Title]

### Prerequisites
- [x] or [ ] Project scaffolded
- [x] or [ ] Dependency stories implemented: [list]
- [ ] Packages to install: [list with reasons]
- [ ] Global installs needed: [list, or "None"]

### New Files
| File | Purpose |
|---|---|
| src/path/to/file.tsx | [what it does] |

### Modified Files
| File | Changes |
|---|---|
| src/path/to/file.tsx | [what changes and why] |

### Implementation Order
1. [First thing to build, and why it's first]
2. [Second thing]
3. [...]

### Acceptance Criteria Mapping
| Scenario | How It's Satisfied |
|---|---|
| Scenario 1: [name] | [which files/components deliver this] |
| Scenario 2: [name] | [which files/components deliver this] |

### Open Questions (if any)
- [Anything ambiguous in the story that needs a decision]

Approve this plan? I'll implement in the order above.
```

**Planning rules:**

- Every scenario and additional requirement from the story must map to at least one file
- If a scenario can't be mapped, flag it as an open question
- Keep component files under 150 lines. If a component will be larger, split it in the plan
- Follow the file patterns from `refs/codereps-tech-stack-and-claude-code.md`
- Use the exact design tokens (colors, fonts, spacing) from the brand identity doc
- Never introduce a package that isn't in the tech stack doc without asking first

## Step 3: Implement

After the user approves the plan, implement in the planned order. Follow these rules:

### Code Style (from CLAUDE.md / tech stack doc)

- Functional components with hooks, no class components
- Named exports (except page.tsx files which use default export)
- Tailwind utility classes, no CSS modules or styled-components
- shadcn/ui components from @/components/ui/
- Type props with interfaces, not inline types
- "use client" directive only when needed
- Components under 150 lines, extract logic into hooks

### Implementation Rules

- Build one file at a time in the planned order
- After creating each file, verify it has no TypeScript errors: `pnpm tsc --noEmit` (or equivalent)
- After each logical group of files (e.g., a complete component with its hook), run `pnpm build` to catch issues early
- If a build fails, fix it before moving to the next file
- Wire up real data from challenge definitions in `refs/track-1-fundamentals-challenges.md`, not placeholder/mock data
- Use the exact brand colors, fonts, and spacing from the brand identity doc as Tailwind config values or CSS variables

### What NOT To Do

- Do NOT commit. The user handles git.
- Do NOT install global packages without asking first.
- Do NOT scaffold the project without asking first.
- Do NOT add packages outside the tech stack without asking first.
- Do NOT create mock/placeholder data when real challenge data exists in the refs.
- Do NOT skip accessibility requirements from the story's Additional Requirements section.
- Do NOT leave TODO comments. Implement fully or flag as an open question in the plan.

## Step 4: Verify

After implementation is complete:

1. Run `pnpm build` and fix any errors
2. Run `pnpm lint` and fix any warnings
3. Run `pnpm test` if tests exist
4. Walk through each acceptance criteria scenario from the story and confirm:
   - Which files satisfy it
   - Whether it's fully implemented or partially implemented
5. Present a summary:

```
## Implementation Summary: Story [N]

### Scenarios
| Scenario | Status | Notes |
|---|---|---|
| Scenario 1: [name] | Done | [files involved] |
| Scenario 2: [name] | Done | [files involved] |

### Additional Requirements
| Requirement | Status |
|---|---|
| [requirement] | Done / Partial / Blocked |

### Files Created/Modified
- [list of files touched]

### What To Test Manually
- [specific things to check in the browser]

### Known Gaps (if any)
- [anything not fully delivered and why]
```

## Important: Always Ask First

Any time you need to:

- Install a package globally
- Run a project scaffolding command (create-next-app, etc.)
- Add a dependency not in the tech stack doc
- Make an architectural decision not covered by the refs

STOP and ask the user. Do not assume approval.
