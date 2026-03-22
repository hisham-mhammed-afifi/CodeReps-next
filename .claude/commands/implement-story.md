# Implement Story (Track 2: DOM Manipulation)

You are implementing a Track 2 user story for CodeReps. Track 1 is already fully implemented. You are extending the existing codebase with DOM manipulation features.

## Input

The user will provide a story number or filename. Find the matching file in `user-stories/codereps-track2-user-stories/`.

## Step 0: Read Before You Touch Anything

Read ALL of these files before planning or writing any code:

1. The story file the user specified
2. `user-stories/codereps-track2-user-stories/00-story-outline-index.md` (dependency context)
3. `refs/prd-track-2-dom-manipulation.md` (full Track 2 requirements, data model changes, NFRs)
4. `refs/track-2-dom-manipulation-challenges.md` (all 15 challenge definitions with starter HTML, tests, solutions)
5. `refs/prd-track-1-fundamentals.md` (base data model and requirements that Track 2 extends)
6. `refs/codereps-tech-stack-and-claude-code.md` (stack decisions and architecture)
7. `refs/codereps-brand-identity.md` (design tokens, colors, typography, voice)
8. `CLAUDE.md` (project conventions)

If this story has dependencies (check the Dependencies field), also read those dependency story files.

## Step 1: Check Project State

Track 1 is implemented. Verify it exists and is healthy before planning:

1. Confirm the project builds: `pnpm build`
2. Confirm Track 1 infrastructure exists by scanning for:
   - Challenge workspace page (`src/app/(app)/challenge/`)
   - Step components (`src/components/challenge/Step*.tsx`)
   - Challenge definitions (`src/lib/challenges/`)
   - Progress tracking (`src/lib/db/queries/`)
   - Pattern library page (`src/app/(app)/patterns/`)
   - Zustand challenge store (`src/stores/`)
   - ChallengeDefinition type (`src/types/challenge.ts`)

If any of these are missing, STOP and tell the user what's missing. Do not proceed.

3. Check if this story's dependencies (other Track 2 stories) are implemented by scanning for their expected components:
   - Story 1 (Live Preview Panel): look for a preview component in `src/components/challenge/`
   - Story 2 (HTML Toggle): look for a toggle in the preview component
   - Story 3 (Three-Panel Layout): look for the layout handling `requiresPreview`
   - Story 4 (DOM Test Runner): look for DOM assertion logic in the test runner
   - Story 5 (Challenge Content): look for files in `src/lib/challenges/dom-manipulation/`
   - Story 8 (Badge System): look for badges table in the Drizzle schema

If a dependency is missing, STOP and tell the user: "Story X depends on Story Y, but I can't find [specific component]. Should I implement Story Y first, or proceed assuming it exists?"

## Step 2: Plan (Do NOT Skip)

Present a structured plan. Do NOT write any code until the plan is approved.

### Plan Format

```
## Implementation Plan: Track 2 Story [N] - [Title]

### Prerequisites
- [x] or [ ] Track 1 builds successfully
- [x] or [ ] Dependency stories implemented: [list]
- [ ] Packages to install: [list with reasons]
- [ ] Global installs needed: [list, or "None"]

### New Files
| File | Purpose |
|---|---|
| src/path/to/file.tsx | [what it does] |

### Modified Files (existing Track 1 files being extended)
| File | Changes |
|---|---|
| src/path/to/file.tsx | [what changes and why] |

### Schema Changes (if any)
| Table | Change | Notes |
|---|---|---|
| [table name] | [new table / new field] | [purpose] |

### Implementation Order
1. [First thing to build, and why it's first]
2. [Second thing]
3. [...]

### Acceptance Criteria Mapping
| Scenario | How It's Satisfied |
|---|---|
| Scenario 1: [name] | [which files/components deliver this] |
| Scenario 2: [name] | [which files/components deliver this] |

### Backward Compatibility Check
- [ ] Track 1 challenges still use two-panel layout (no preview)
- [ ] Track 1 test runner unchanged for non-DOM challenges
- [ ] Existing ChallengeDefinition type extended, not replaced
- [ ] Pattern Library shows Track 1 patterns unchanged

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
- IMPORTANT: When modifying existing Track 1 files, the plan must list exactly what changes and confirm it does not break Track 1 behavior

### Track 2 Planning Guidance

Consider these for every Track 2 story:

- **Starter HTML and CSS**: Track 2 challenges include starter HTML that renders in a Live Preview Panel. Plan where starterHTML/starterCSS data is stored in the challenge definition and how it flows to the Sandpack iframe.
- **DOM test cases**: Track 2 tests assert on DOM state (element existence, textContent, classList, child counts) inside the preview iframe. Plan how the test runner queries the iframe's document.
- **Three-panel layout**: Track 2 adds a Live Preview Panel below the code editor. The workspace checks `requiresPreview` to choose two-panel (Track 1) or three-panel (Track 2) layout.
- **Badge system**: Stories involving badges need the badges/user_badges tables and server-side award logic triggered on track completion.
- **Backward compatibility**: Every plan must confirm Track 1 challenges are unaffected. The `requiresPreview` field on the challenge definition is the switch.

## Step 3: Implement

After the user approves the plan, implement in the planned order.

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
- After each logical group of files, run `pnpm build` to catch issues early
- If a build fails, fix it before moving to the next file
- Wire up real data from `refs/track-2-dom-manipulation-challenges.md`, not placeholder/mock data
- Use the exact brand colors, fonts, and spacing from the brand identity doc as Tailwind config values or CSS variables

### Track 2 Specific Rules

- Starter HTML per challenge is stored in the challenge definition's `starterHTML` field and loaded into the Sandpack preview iframe
- Starter CSS per challenge is stored in `starterCSS` and injected into the preview alongside the HTML
- DOM test cases query elements inside the Sandpack iframe's rendered document, never the parent app's DOM
- The Live Preview Panel is sandboxed: user code cannot access the parent app's DOM, cookies, or localStorage
- The workspace layout checks `requiresPreview` to decide between two-panel (Track 1) and three-panel (Track 2)
- Badge award logic is idempotent: re-completing a track does not create duplicate badges
- The ChallengeDefinition interface is extended (new optional fields), not replaced. All existing Track 1 fields remain.
- DOM test failure messages must be human-readable ("Expected 3 list items, found 0"), not raw selector strings

### What NOT To Do

- Do NOT commit. The user handles git.
- Do NOT install global packages without asking first.
- Do NOT add packages outside the tech stack without asking first.
- Do NOT create mock/placeholder data when real challenge data exists in the refs.
- Do NOT skip accessibility requirements from the story's Additional Requirements section.
- Do NOT leave TODO comments. Implement fully or flag as an open question in the plan.
- Do NOT break Track 1 functionality. After every change to a shared file, verify Track 1 still builds and renders correctly.
- Do NOT replace Track 1 types, components, or logic. Extend them.

## Step 4: Verify

After implementation is complete:

1. Run `pnpm build` and fix any errors
2. Run `pnpm lint` and fix any warnings
3. Run `pnpm test` if tests exist
4. **Backward compatibility regression:**
   - Load a Track 1 challenge and confirm: two-panel layout, no preview panel, tests run normally
   - Confirm Pattern Library still shows Track 1 patterns correctly
5. **Track 2 verification:**
   - Starter HTML renders in the Live Preview before code runs
   - Preview updates after code execution
   - DOM test assertions show human-readable pass/fail messages
   - Preview is sandboxed (user code cannot affect parent app)
6. Walk through each acceptance criteria scenario and confirm status
7. Present a summary:

```
## Implementation Summary: Track 2 Story [N]

### Scenarios
| Scenario | Status | Notes |
|---|---|---|
| Scenario 1: [name] | Done | [files involved] |
| Scenario 2: [name] | Done | [files involved] |

### Additional Requirements
| Requirement | Status |
|---|---|
| [requirement] | Done / Partial / Blocked |

### Schema Changes Applied
| Table | Change | Status |
|---|---|---|
| [table] | [change] | Done / Pending migration |

### Files Created/Modified
- [list of files touched]

### Backward Compatibility
- [ ] Track 1 challenge loads with two-panel layout: PASS / FAIL
- [ ] Track 1 tests run normally: PASS / FAIL
- [ ] Pattern Library shows Track 1 patterns: PASS / FAIL

### What To Test Manually
- [specific things to check in the browser]

### Known Gaps (if any)
- [anything not fully delivered and why]
```

## Important: Always Ask First

Any time you need to:

- Install a package globally
- Add a dependency not in the tech stack doc
- Make an architectural decision not covered by the refs
- Modify a core Track 1 file in a way that changes its behavior

STOP and ask the user. Do not assume approval.
