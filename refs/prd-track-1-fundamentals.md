# PRD: CodeReps Track 1 - Fundamentals

| Field | Value |
|---|---|
| Author | Product Team |
| Status | Draft |
| Version | v0.1 |
| Last Updated | 2026-03-21 |
| Change Log | v0.1 - Initial draft |

---

## 1. Overview & Problem Statement

CodeReps is a practice platform that teaches beginner JavaScript developers how to think through problems, not just memorize syntax. Track 1: Fundamentals is the platform's launch track and the first experience every user encounters.

The core problem: beginners finish tutorials and courses knowing JavaScript syntax, but freeze when faced with a blank editor. They lack a structured thinking process for translating a problem into code. CodeReps solves this with a 5-step problem-solving framework applied across 15 progressive challenges.

Track 1 covers foundational JS patterns (template literals, if/else, loops, array methods, objects) through real-world-flavored challenges. It is the MVP content that validates the platform's pedagogical model and establishes the guided-to-independent progression that defines the CodeReps experience.

---

## 2. Goals & Objectives

### Product Goals

- Deliver a complete, polished first track that proves the 5-step framework works for beginners
- Establish the challenge workspace UX (split-pane, step-by-step flow, 3 difficulty modes) as the platform's core interaction
- Build the Pattern Library as a tangible, growing artifact of user progress
- Create enough content (15 challenges, 19 patterns) to sustain 3-5 hours of focused practice

### Business Goals

- Validate product-market fit with the "tutorial graduate" audience before expanding to Tracks 2-3
- Generate early adoption signal: target 500 users completing at least 5 challenges within 60 days of launch
- Collect qualitative feedback on the framework to refine Tracks 2 and 3

### Non-Goals

- This PRD does not cover Tracks 2 (DOM Manipulation) or 3 (Events & Interactions)
- No payment or subscription features in this scope
- No community features (discussions, shared solutions, leaderboards)
- No mobile-native app (responsive web only)
- No AI-powered hint generation or code review (hints are hand-authored)
- No admin panel for challenge management (challenges ship as code/data)

---

## 3. Scope

### In Scope

- The 5-step challenge framework (Understand, Break Down, Map to Code, Write, Verify)
- 3 difficulty modes per challenge (Guided, Semi-Guided, Independent)
- 15 challenges with progressive difficulty
- 19 unlockable patterns forming the Pattern Library
- Challenge workspace UI (split-pane on desktop, stacked on mobile)
- User authentication and account creation
- Per-challenge progress tracking (status, mode, attempts, time spent, user solution)
- Pattern unlock and collection mechanics
- Track 2 unlock gate (complete all 15 challenges)
- Basic user dashboard showing progress through Track 1

### Out of Scope

- Gamification beyond pattern unlocks (streaks, XP, badges ship in a later phase)
- Social or collaborative features
- Instructor/mentor dashboards
- Content management system for challenges
- Offline mode or PWA capabilities
- Internationalization (English only for MVP)
- Email notifications (welcome, streak reminders)
- SEO-optimized marketing/landing page (separate scope)
- Blog or content marketing pages

### Scope Boundary

This PRD covers everything from a new user signing up through completing all 15 Track 1 challenges, unlocking all 19 patterns, and seeing the Track 2 unlock gate. Scope ends when the user attempts to enter Track 2.

---

## 4. Target Audience

### Primary Persona: The Tutorial Graduate

| Attribute | Detail |
|---|---|
| Age | 17-30 |
| Background | Completed at least one JS course, bootcamp, or tutorial series |
| Core frustration | "I understand the concepts but can't solve problems on my own" |
| Goal | Build confidence to tackle real projects or pass junior interviews |
| Behavior | Learns in short bursts (15-30 min), mostly on laptop, some mobile |
| Motivation | Career change, first dev job, university coursework |
| Tech comfort | Can open a browser, has seen a code editor, knows basic JS syntax |

### Key Insight

This persona does not need more syntax lessons. They need a repeatable mental process for turning a problem statement into working code. Track 1 provides that process through progressive repetition.

---

## 5. Use Cases

### UC-01: First-Time User Starts Track 1

A new user signs up, lands on the dashboard, and sees Track 1 as the only available track. They click into Challenge 01: The Greeting Machine. The workspace loads in Guided mode with Step 1 (Understand) active. The user works through all 5 steps, submits their solution, sees tests pass, and unlocks their first pattern ("Insert a value into text"). They return to the track view and see Challenge 02 is now available.

### UC-02: User Works Through a Guided Challenge

The user enters a challenge in Guided mode. Step 1 prompts them to rewrite the problem in their own words (free text input). Step 2 shows draggable blocks they arrange into the correct breakdown order. Step 3 shows concept tags they select to map the breakdown to JS concepts, with immediate feedback on correct/incorrect picks. Step 4 opens the code editor with starter code and step-by-step comments. Step 5 runs test cases with pass/fail indicators. On success, the Pattern Card is revealed and added to their library.

### UC-03: User Chooses Semi-Guided Mode

On Challenges 6-10, the user can choose Semi-Guided mode. The challenge loads directly into the code editor (Step 4) with Steps 1-3 available as collapsible hint panels on the left. The user can open any step for guidance or work without them. Tests still run in Step 5.

### UC-04: User Attempts Independent Mode

On Challenges 11-15, the user selects Independent mode. They see only the problem statement and the code editor. No breakdown blocks, no concept picker, no starter code comments. Just the problem and a blank function signature. They write, run tests, and either pass or choose to switch down to Guided/Semi-Guided.

### UC-05: User Fails Tests and Iterates

The user submits code that fails 2 of 5 test cases. The Verify step shows which tests passed (green) and which failed (red) with expected vs. actual output. The user edits their code and resubmits. The attempt counter increments. After 3 failed attempts in Guided mode, a contextual hint appears nudging them toward the relevant step comment.

### UC-06: User Reviews Their Pattern Library

After completing several challenges, the user navigates to the Pattern Library page. They see a grid of pattern cards, each showing the pattern name, plain-English description, and JS code snippet. Locked patterns (from incomplete challenges) appear as dimmed placeholders. The user clicks a card to see the full pattern with its source challenge linked.

### UC-07: User Completes Track 1

After passing Challenge 15, a completion screen shows total patterns unlocked (19), total time spent, and total attempts. A "Track 2: DOM Manipulation" card appears with an "Unlock" state. The user can revisit any Track 1 challenge in Independent mode for additional reps.

---

## 6. The 5-Step Framework - Functional Requirements

The 5-step problem-solving framework is the core product mechanic. Every challenge in Track 1 follows this structure.

### REQ-001: Step 1 - Understand

The system presents the problem statement and prompts the user to rewrite it in their own words. The input is a free-text field. In Guided mode, after the user submits their rephrasing, the system shows the expected understanding as a reference (not a graded comparison). The user confirms they understand and proceeds.

Acceptance criteria:
- Free-text input field with placeholder text: "Rewrite this problem in your own words"
- Minimum 10 characters required before the user can proceed
- "Expected understanding" is shown after submission as a collapsible reference block
- User clicks "Got it, next step" to advance

### REQ-002: Step 2 - Break Down

The system presents the problem as a set of smaller steps the user must arrange in the correct order. In Guided mode, this is a drag-and-drop interface where the user receives pre-written blocks and arranges them sequentially.

Acceptance criteria:
- Draggable blocks rendered from the challenge's `breakdown_blocks` data
- Blocks start in randomized order
- User drags blocks into a numbered sequence
- On submit, system checks order against the correct sequence
- Incorrect order: highlight misplaced blocks with a brief hint
- Correct order: blocks lock in place with a success indicator, user proceeds

### REQ-003: Step 3 - Map to Code

The system shows a set of JS concept tags. The user selects which concepts are needed to solve the problem. In Guided mode, the system gives immediate feedback on selections.

Acceptance criteria:
- Clickable concept tags rendered from the challenge's `concept_options` data
- Tags include both correct and distractor concepts
- User selects tags and submits
- Correct selections: tagged green with a brief explanation of why they're needed
- Incorrect selections: tagged red with a brief explanation of why they're not relevant
- After correct selection, system shows the "system hint" linking concepts to the breakdown
- User proceeds to coding step

### REQ-004: Step 4 - Write (Code Editor)

The system presents a code editor (Monaco) pre-loaded with starter code. The starter code includes function signatures and step-by-step comments guiding the user.

Acceptance criteria:
- Monaco editor instance with syntax highlighting for JavaScript
- Starter code loaded from the challenge's `starter_code` field
- Editor supports standard features: undo/redo, auto-indent, bracket matching
- Dark theme matching the CodeReps brand (Deep Navy background)
- Font: JetBrains Mono
- Minimum editor height: 300px on desktop, 200px on mobile
- User can reset to starter code at any time

### REQ-005: Step 5 - Verify (Test Runner)

The system executes the user's code against predefined test cases in a browser sandbox (Sandpack). Results display as a pass/fail list.

Acceptance criteria:
- User code executes in a Sandpack sandbox (never server-side)
- Each test case displays: function call, expected output, actual output, pass/fail status
- Pass: green check icon + "Passed"
- Fail: red X icon + expected vs. actual comparison
- All tests pass: trigger the success flow (explanation + pattern unlock)
- Partial pass: show which tests failed, user can edit and resubmit
- Execution timeout: 5 seconds max, then show "Your code took too long" error
- Runtime errors: display the error message in plain language with the line number

### REQ-006: Pattern Unlock

When a user passes all test cases for a challenge, the associated pattern(s) are unlocked and added to their Pattern Library.

Acceptance criteria:
- Pattern card animates into view after all tests pass (fade + scale, not modal popup)
- Card shows: pattern name, plain-English description, JS code snippet
- Pattern is persisted to the user's `user_patterns` record
- If a challenge unlocks multiple patterns, show them sequentially
- Pattern card links back to the source challenge

### REQ-007: Challenge Explanation

After passing all tests, the system shows the challenge's explanation text, reinforcing the pattern and connecting it to real-world usage.

Acceptance criteria:
- Explanation text renders below the test results
- Explanation highlights the pattern name in bold
- Includes at least one real-world analogy or application
- User clicks "Continue" to return to the track view or proceed to the next challenge

---

## 7. Difficulty Modes - Functional Requirements

### REQ-008: Guided Mode

All 5 steps are active and interactive. Steps progress linearly (Step 1 must complete before Step 2 is accessible). This is the default mode for Challenges 1-5 and available on all challenges.

Acceptance criteria:
- Steps displayed as a horizontal stepper (desktop) or vertical stepper (mobile)
- Completed steps show a green check
- Current step is highlighted with the primary brand color (Electric Indigo)
- Future steps are dimmed and non-clickable
- User cannot skip steps

### REQ-009: Semi-Guided Mode

The user starts directly in the code editor (Step 4). Steps 1-3 are available as collapsible hint panels (not mandatory). Step 5 (Verify) still runs after code submission.

Acceptance criteria:
- Available on Challenges 6-15
- Challenges 6-10 default to offering the user a choice between Guided and Semi-Guided
- Steps 1-3 render as collapsible accordion panels on the left (desktop) or above the editor (mobile)
- Panels are collapsed by default
- Expanding a panel counts as a "hint used" for analytics
- Code editor has no starter code comments (just the function signature)

### REQ-010: Independent Mode

The user sees only the problem statement and the code editor. No steps, no hints, no starter code comments. Just the function signature and a blank body.

Acceptance criteria:
- Available on Challenges 11-15 during first pass, all challenges after Track 1 completion
- Problem statement displayed above the editor
- Code editor loads with function signature only (no comments)
- No hint panels visible
- Test runner still available (Step 5)
- User can switch to Guided or Semi-Guided mode at any time via a mode selector

### REQ-011: Mode Progression Rules

The system enforces mode availability based on challenge position and track completion.

| Challenge Range | Available Modes |
|---|---|
| 1-5 | Guided only (first attempt), all modes on revisit |
| 6-10 | Guided or Semi-Guided (user chooses) |
| 11-15 | All three modes (user chooses, Independent encouraged) |
| After Track 1 complete | All modes on all challenges |

---

## 8. Challenge Content Requirements

### REQ-012: 15 Challenges with Progressive Difficulty

Track 1 includes 15 challenges ordered by increasing complexity. Each challenge maps to specific JS concepts and unlocks specific patterns.

| # | Challenge Title | Difficulty | Est. Minutes | Key Concepts | Patterns Unlocked |
|---|---|---|---|---|---|
| 1 | The Greeting Machine | Easy | 5 | function, parameter, template literal, return | Template literal |
| 2 | Even or Odd | Easy | 5 | if/else, modulo, comparison | If/else, Modulo check |
| 3 | Find the Longest Word | Easy | 10 | for loop, .length, if, variable | Tracker |
| 4 | Double the Numbers | Easy | 8 | .map(), for loop, .push(), array | Map |
| 5 | Count the Vowels | Easy | 10 | for loop, .includes(), .toLowerCase(), counter | Counter |
| 6 | Reverse a String | Medium | 10 | backward loop, string concatenation, .length | Accumulator, Backward loop |
| 7 | Remove Duplicates | Medium | 10 | .includes(), .push(), Set | Filter-and-collect, Set dedup |
| 8 | FizzBuzz | Medium | 12 | if/else if/else, modulo, .push() | Priority chain |
| 9 | Sum of Positives | Medium | 8 | for loop, if, addition, comparison | Conditional accumulation |
| 10 | Capitalize First Letter | Medium | 8 | string[0], .toUpperCase(), .slice() | Split-transform-join |
| 11 | Find the Index | Medium | 10 | for loop, if, comparison, early return | Linear search, Early return |
| 12 | Group by Property | Hard | 15 | object, property access, .push(), if | Grouping |
| 13 | Flatten an Array | Hard | 12 | nested loops, .push(), .concat() | Nested loops |
| 14 | Create a Lookup Object | Hard | 12 | object, bracket notation, loop | Object building, Bracket notation |
| 15 | Chain of Transformations | Hard | 12 | .filter(), .reduce(), object property access | Filter-then-compute |

### REQ-013: Challenge Data Structure

Every challenge is defined as a typed data object conforming to the `ChallengeDefinition` interface. Each challenge includes: id, track, order, title, slug, difficulty, estimatedMinutes, problemStatement, examples, starterCode, solutionCode (one or more approaches), explanation, concepts, hints, testCases, breakdownBlocks, conceptOptions (with correct/incorrect flags), and patternsUnlocked.

### REQ-014: Multi-Approach Solutions

Challenges 4, 7, 9, and 15 support two valid solution approaches. The Verify step accepts any approach that passes all test cases. The explanation text covers both approaches when applicable.

### REQ-015: 19 Patterns in the Pattern Library

The Pattern Library contains all patterns from Track 1, each with: name, plain-English description ("When you need to..."), code snippet, and link to the source challenge. See the Appendix in the Track 1 Challenge Design Document for the full pattern list.

---

## 9. Challenge Workspace - UI Requirements

### REQ-016: Split-Pane Layout

On desktop (viewport >= 1024px), the workspace renders as a split pane: guidance/instructions on the left (40% width), code editor on the right (60% width). A draggable divider allows resizing. On viewports below 1024px, panes stack vertically (guidance above, editor below).

### REQ-017: Step Transitions

Transitions between the 5 steps use a horizontal slide animation (300ms, ease-in-out). Content fades in after the slide completes (200ms). No instant content swaps.

### REQ-018: Success Animation

When all tests pass, a subtle confetti burst plays for 2 seconds (particles fall from top, not overwhelming). Confetti uses brand accent colors (Emerald Green, Amber, Electric Indigo). The animation is dismissable and respects `prefers-reduced-motion`.

### REQ-019: Toast Notifications

Pattern unlocks, challenge completions, and mode switches trigger toast notifications (bottom-right on desktop, bottom-center on mobile). Toasts auto-dismiss after 4 seconds. No modal popups for in-challenge events.

### REQ-020: Skeleton Loaders

The challenge workspace, pattern library, and dashboard pages display skeleton loaders during data fetch. No spinners.

---

## 10. Data Model

### Core Entities

**users**

| Field | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| clerk_id | string | Clerk auth provider ID |
| name | string | Display name |
| email | string | Unique |
| created_at | timestamp | Account creation |

**tracks**

| Field | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| slug | string | URL-safe identifier (e.g., "fundamentals") |
| title | string | Display name |
| description | text | Track overview |
| order | integer | Display/unlock order |
| is_locked_by_default | boolean | Requires previous track completion |

**challenges**

| Field | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| track_id | uuid | FK to tracks |
| order | integer | Position within track |
| title | string | Challenge name |
| slug | string | URL-safe identifier |
| difficulty | enum | easy, medium, hard |
| estimated_minutes | integer | Expected completion time |
| problem_statement | text | The problem description shown to user |
| starter_code | text | Pre-loaded editor content |
| solution_code | jsonb | One or more valid solutions |
| explanation | text | Post-completion explanation |
| concepts | jsonb | Array of concept tags |
| hints | jsonb | Progressive hint texts |
| test_cases | jsonb | Array of { input, expected, label } |
| breakdown_blocks | jsonb | Ordered blocks for Step 2 |
| concept_options | jsonb | Tags for Step 3 with correct/incorrect flags |

**patterns**

| Field | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| name | string | Pattern name (e.g., "Tracker") |
| plain_english | text | When to use, in plain language |
| code_example | text | JS code snippet |
| unlocked_by_challenge_id | uuid | FK to challenges |

**user_progress**

| Field | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| user_id | uuid | FK to users |
| challenge_id | uuid | FK to challenges |
| status | enum | not_started, in_progress, completed |
| mode | enum | guided, semi_guided, independent |
| attempts | integer | Total submission attempts |
| completed_at | timestamp | Nullable, set on first completion |
| user_solution | text | Last submitted code |
| time_spent_seconds | integer | Cumulative time in challenge |

**user_patterns**

| Field | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| user_id | uuid | FK to users |
| pattern_id | uuid | FK to patterns |
| unlocked_at | timestamp | When the pattern was earned |

---

## 11. Non-Functional Requirements

### NFR-001: Performance

- Challenge workspace initial load: under 3 seconds on 4G connection
- Code execution (Sandpack): under 2 seconds for all Track 1 challenges
- Step transitions: under 300ms (animation included)
- API responses (progress save, pattern unlock): under 500ms p95

### NFR-002: Accessibility

- WCAG 2.1 AA compliance minimum
- All interactive elements keyboard-navigable (including drag-and-drop blocks with keyboard alternative)
- Screen reader support for challenge steps, test results, and pattern cards
- Color never used as the sole indicator (pair with icons and text)
- Minimum 16px body text
- Minimum 4.5:1 contrast ratio for all text
- Respect `prefers-reduced-motion` for all animations

### NFR-003: Browser Support

- Chrome 90+, Firefox 90+, Safari 15+, Edge 90+
- Mobile: iOS Safari 15+, Chrome Android 90+
- Monaco Editor has limited mobile support: ensure the editor is usable but not optimized for mobile-first coding

### NFR-004: Responsive Design

- Desktop: split-pane layout (>= 1024px)
- Tablet: stacked layout with collapsible panels (768px-1023px)
- Mobile: fully stacked, editor fills viewport width (< 768px)

### NFR-005: Security

- User code executes exclusively in Sandpack (browser sandbox), never on the server
- All user input sanitized before persistence
- Authentication and session management via Clerk (no custom auth implementation)
- HTTPS enforced on all routes

---

## 12. Architecture & System Design

### High-Level Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui |
| Code Editor | Monaco Editor (@monaco-editor/react) |
| Code Execution | Sandpack (browser sandbox) |
| Auth | Clerk |
| Database | PostgreSQL via Supabase |
| ORM | Drizzle |
| State Management | Zustand (challenge workspace state) |
| Animations | Framer Motion |
| Hosting | Vercel |

### Challenge Workspace Architecture

The challenge workspace (`/challenge/[id]`) is a client-side rendered page that manages the 5-step flow through a Zustand store. The store holds: current step index, user inputs for each step (rephrasing text, block order, selected concepts, code), test results, completion status, and mode.

Steps 1-3 are presentational components reading from the challenge definition. Step 4 integrates Monaco Editor. Step 5 integrates Sandpack for in-browser execution. On completion, a server action persists progress and unlocked patterns to Supabase.

### Data Flow

1. User navigates to `/challenge/[slug]`
2. Server component fetches challenge definition and user progress
3. Client-side Zustand store initializes with challenge data and prior progress (if any)
4. User works through steps, state updates locally
5. On test submission, Sandpack runs code in an iframe sandbox
6. On all-pass, client calls server action to persist: user_progress (status, mode, attempts, time, solution) and user_patterns (new unlocks)
7. Server action returns updated progress, client shows success animation and pattern card

---

## 13. Implementation Phases

### Phase 1: Foundation (Week 1)

| Session | Deliverable |
|---|---|
| 1 | Project scaffold: Next.js 15, TypeScript, Tailwind, shadcn/ui, folder structure |
| 2 | Database schema: Drizzle schema for all 6 tables, Supabase setup, seed data for Track 1 |
| 3 | Auth: Clerk integration, sign-up/sign-in pages, protected routes |
| 4 | Layout shell: nav bar, sidebar (desktop), responsive shell, dark mode defaults |

### Phase 2: Challenge Engine (Week 2)

| Session | Deliverable |
|---|---|
| 5 | ChallengeDefinition type + first 3 challenge data files |
| 6 | StepUnderstand component (text input, expected understanding reveal) |
| 7 | StepBreakdown component (drag-and-drop block arrangement) |
| 8 | StepMapToCode component (concept tag picker with feedback) |
| 9 | StepCodeEditor component (Monaco + Sandpack integration) |
| 10 | StepVerify component (test runner with pass/fail UI) |

### Phase 3: Challenge Flow (Week 3)

| Session | Deliverable |
|---|---|
| 11 | Challenge page connecting all 5 steps with transitions and Zustand store |
| 12 | Progress tracking: save state, mark complete, unlock next challenge |
| 13 | Pattern Library page (grid of unlocked pattern cards, locked placeholders) |
| 14 | Remaining 12 challenge definitions (Challenges 4-15) |
| 15 | Mode switching (Guided, Semi-Guided, Independent) with progression rules |

### Phase 4: Polish & Ship (Week 4)

| Session | Deliverable |
|---|---|
| 16 | Dashboard: track progress overview, challenges completed, patterns unlocked |
| 17 | Success animations, confetti, toast notifications, micro-interactions |
| 18 | Track 1 completion screen and Track 2 unlock gate |
| 19 | E2E tests (Playwright) for the full challenge flow |
| 20 | Deploy to Vercel, final QA, soft launch |

---

## 14. Success Metrics & Tracking

### North Star Metric

**Challenge completion rate**: percentage of users who start a challenge (open the workspace) and complete it (pass all tests).

- Baseline: N/A (new product)
- Target: 70% completion rate across all Track 1 challenges
- Timeframe: 60 days post-launch

This metric captures the core value CodeReps delivers: users actually solving problems, not just reading instructions.

### Input Metrics

| Metric | Baseline | Target | Timeframe |
|---|---|---|---|
| Track 1 start rate: % of registered users who open Challenge 1 | N/A | 80% | 30 days |
| Average challenges completed per active user per week | N/A | 3 | 60 days |
| Mode upgrade rate: % of users attempting Semi-Guided or Independent by Challenge 10 | N/A | 40% | 60 days |
| Pattern Library visit rate: % of users who visit the Pattern Library after unlocking 3+ patterns | N/A | 50% | 60 days |

### Guardrail Metrics

| Metric | Threshold |
|---|---|
| Bounce rate on Challenge 1 (open workspace then leave within 60 seconds) | Must stay below 30% |
| Average attempts before first success on Challenges 1-5 | Must stay below 5 |

### Tracking Specification

| Event Name | Trigger | Key Properties | Source |
|---|---|---|---|
| challenge_started | User opens challenge workspace | user_id, challenge_id, challenge_order: number, track_slug: string, mode: enum [guided, semi_guided, independent] | client |
| step_completed | User finishes a framework step | user_id, challenge_id, step: enum [understand, breakdown, map_to_code, write, verify], duration_seconds: number | client |
| hint_panel_opened | User expands a hint panel in Semi-Guided mode | user_id, challenge_id, step: enum [understand, breakdown, map_to_code] | client |
| code_submitted | User runs tests | user_id, challenge_id, attempt_number: number, tests_passed: number, tests_total: number, mode: string | client |
| challenge_completed | All tests pass | user_id, challenge_id, mode: string, attempts: number, total_time_seconds: number, track_slug: string | server |
| pattern_unlocked | Pattern added to user library | user_id, pattern_id, pattern_name: string, challenge_id | server |
| mode_selected | User picks a difficulty mode | user_id, challenge_id, selected_mode: enum [guided, semi_guided, independent] | client |
| mode_switched | User changes mode mid-challenge | user_id, challenge_id, from_mode: string, to_mode: string | client |
| pattern_library_viewed | User visits Pattern Library page | user_id, patterns_unlocked_count: number | client |
| track_completed | User finishes all 15 challenges | user_id, track_slug: string, total_time_seconds: number, total_attempts: number | server |

**Funnels:**

- Activation funnel: signup -> challenge_started (Challenge 1) -> challenge_completed (Challenge 1) -> challenge_started (Challenge 2)
- Track completion funnel: challenge_completed (C1) -> challenge_completed (C5) -> challenge_completed (C10) -> challenge_completed (C15) -> track_completed
- Mode progression funnel: mode_selected (guided) -> mode_selected (semi_guided) -> mode_selected (independent)

---

## 15. Dependencies & Prerequisites

| Dependency | Owner | Status | Notes |
|---|---|---|---|
| Clerk account setup | Engineering | Not started | Free tier sufficient for MVP |
| Supabase project provisioned | Engineering | Not started | Free tier, upgrade if needed |
| Vercel project and domain | Engineering | Not started | codereps.dev or similar |
| Brand design tokens (CSS variables, Tailwind config) | Design | Not started | Defined in Brand Identity doc, needs implementation |
| Custom Monaco editor theme | Design + Engineering | Not started | Must match Deep Navy + brand palette |
| Challenge content (all 15 definitions) | Product + Content | In progress | Challenge Design Document complete, needs translation to typed data files |
| JetBrains Mono and Inter font setup | Engineering | Not started | Google Fonts or self-hosted |

---

## 16. Risk Assessment

| Risk | Impact | Likelihood | Mitigation |
|---|---|---|---|
| Sandpack performance on low-end devices | High | Medium | Test on budget Android devices early. Set execution timeout. Provide fallback error messages. |
| Monaco Editor poor mobile experience | Medium | High | Accept limited mobile editing. Focus on desktop for code writing. Mobile experience prioritizes reading/reviewing. |
| Drag-and-drop not accessible for keyboard/screen reader users | High | High | Implement keyboard alternative from day one (arrow keys to reorder, Enter to confirm). Test with screen reader. |
| Challenge difficulty curve too steep at Challenge 6 (first Medium) | Medium | Medium | Monitor completion rate drop-off between C5 and C6. Prepare a bridge challenge if needed. |
| Users skip Steps 1-3 and jump to coding | Medium | High | This is expected behavior for stronger users. Track hint_panel_opened rate. If too low, consider prompting engagement in Guided mode. |
| Content quality issues in challenge definitions | High | Low | All 15 challenges are pre-authored with solutions and test cases. Review each before implementation. |
| Supabase free tier limits hit during growth | Low | Low | Monitor usage. Upgrade is straightforward with no migration needed. |

---

## 17. Glossary

| Term | Definition |
|---|---|
| Track | A themed sequence of challenges (e.g., Fundamentals, DOM Manipulation) |
| Challenge | A single coding problem with the 5-step framework and test cases |
| Rep | A single practice session on a challenge |
| Pattern | A reusable problem-solving template unlocked by completing a challenge |
| Pattern Library | The user's collection of unlocked patterns |
| Guided Mode | All 5 framework steps are shown and interactive |
| Semi-Guided Mode | User codes directly with Steps 1-3 available as optional hints |
| Independent Mode | User sees only the problem and the editor |
| Workspace | The challenge page UI where the user works through the 5 steps |
| Sandpack | Browser-based code execution sandbox (by CodeSandbox) |

---

## Appendix: All Track 1 Patterns

| # | Pattern Name | Plain English | JS Code |
|---|---|---|---|
| 1 | Template literal | Insert a value into text | `` `text ${variable}` `` |
| 2 | If/else | Choose between two options | `if (condition) {} else {}` |
| 3 | Modulo check | Check divisibility | `n % d === 0` |
| 4 | Tracker | Find the best/biggest/smallest | Save first, loop and compare, update |
| 5 | Map | Transform each item | `.map(item => newValue)` |
| 6 | Counter | Count matches | `let count = 0; if (match) count++` |
| 7 | Accumulator | Build up a result piece by piece | Start empty, add in loop |
| 8 | Backward loop | Process in reverse | `for (i = len-1; i >= 0; i--)` |
| 9 | Filter-and-collect | Keep items matching a condition | Empty array, loop, push if true |
| 10 | Set dedup | Quick duplicate removal | `[...new Set(arr)]` |
| 11 | Priority chain | Handle overlapping conditions | `if/else if/else`, specific first |
| 12 | Conditional accumulation | Sum values matching a condition | `if (cond) sum += value` |
| 13 | Split-transform-join | Change part of a string | Extract, modify, recombine |
| 14 | Linear search | Find something in a list | Loop, return when found, -1 after |
| 15 | Early return | Stop as soon as you find it | Return inside a loop |
| 16 | Grouping | Organize into categories | Object with arrays as values |
| 17 | Nested loops | Process items inside items | Outer loop + inner loop |
| 18 | Object building | Create object from data | `obj[key] = value` in a loop |
| 19 | Filter-then-compute | Process subset and calculate | Filter, then accumulate |
