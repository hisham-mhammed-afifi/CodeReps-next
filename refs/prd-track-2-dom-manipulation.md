# PRD: CodeReps Track 2 - DOM Manipulation

| Field | Value |
|---|---|
| Author | Product Team |
| Status | Draft |
| Version | v0.1 |
| Last Updated | 2026-03-22 |
| Change Log | v0.1 - Initial draft |

---

## 1. Overview & Problem Statement

Track 2: DOM Manipulation is the second track in the CodeReps platform. It unlocks after a user completes all 15 challenges in Track 1: Fundamentals.

Track 1 taught users how to think through logic problems with vanilla JavaScript. Track 2 bridges the gap to real frontend work by teaching users to interact with the page itself: selecting elements, creating new ones, manipulating classes and attributes, and building data-driven UIs from scratch.

The core problem Track 2 solves: beginners who can write JavaScript logic still don't know how to make it affect what users see on screen. They can write a loop to filter data, but they can't render the results into a list on the page. Track 2 teaches the mental model of "JavaScript talks to HTML through the DOM" and builds 15 reusable patterns for doing so.

What's new in Track 2 compared to Track 1:
- Every challenge includes **Starter HTML** that the user manipulates
- A **Live Preview Panel** shows the DOM result after each code run
- Tests verify both return values AND the visual DOM state
- Challenges build toward a capstone (Challenge 15) that combines all Track 2 patterns into a complete filter UI

---

## 2. Goals & Objectives

### Product Goals

- Extend the 5-step framework into DOM territory, proving the methodology works beyond pure logic
- Introduce the Live Preview Panel as a new workspace component that shows users the visual impact of their code in real time
- Deliver 15 challenges that progress from single-element manipulation to building a full data-driven filter UI
- Add 15 new patterns to the Pattern Library, bringing the cumulative total to 34

### Business Goals

- Retain Track 1 completers: target 60% of Track 1 graduates starting Track 2 within 14 days of completing Track 1
- Validate that the platform can scale content without rearchitecting: Track 2 reuses the same challenge engine, modes, and progress system
- Generate signal for Track 3 demand by measuring Track 2 completion-to-Track-3-interest conversion

### Non-Goals

- No event handling (click, submit, keypress). Events are Track 3's scope.
- No CSS authoring challenges. Users manipulate classes but don't write CSS.
- No framework-specific content (React, Vue, Angular). This is vanilla DOM only.
- No async operations (fetch, promises, timers)
- No admin or content management tooling for challenges
- No payment, subscription, or premium gating for Track 2

---

## 3. Scope

### In Scope

- 15 new challenges with the 5-step framework, 3 difficulty modes, and progressive difficulty
- 15 new unlockable patterns added to the existing Pattern Library
- Starter HTML per challenge (the DOM the user manipulates)
- Live Preview Panel rendering the DOM state after code execution
- DOM-aware test runner that validates both JS return values and element state (classes, text, structure)
- Challenge 15 as a capstone combining all Track 2 patterns
- "DOM Builder" badge awarded on Track 2 completion
- Track 3 unlock gate after completing all 15 challenges
- Updated progression rules (shifted mode defaults for DOM challenges)

### Out of Scope

- Event listeners or user interaction handling (Track 3)
- CSS editing or styling challenges
- Server-side rendering or framework-specific DOM concepts
- New gamification mechanics beyond the badge (streaks, XP already exist from Track 1 scope)
- Mobile-optimized code editing (same constraints as Track 1)
- Starter CSS files (CSS is provided but not editable by users)

### Scope Boundary

This PRD covers everything from a Track 1 graduate entering Track 2 through completing all 15 DOM challenges, unlocking all 15 patterns, earning the DOM Builder badge, and seeing the Track 3 unlock gate. Scope ends when the user attempts to enter Track 3.

---

## 4. Target Audience

Same primary persona as Track 1: the Tutorial Graduate (17-30, completed JS fundamentals, knows syntax but can't build things). Track 2 specifically targets users who have internalized the thinking process from Track 1 and are ready to apply it to the browser DOM.

### Key Behavioral Shift

Track 1 users thought in terms of inputs and outputs (function takes data, returns data). Track 2 users must learn to think in terms of **selecting, creating, and modifying visible elements**. The mental model shifts from "data in, data out" to "data in, page changes."

---

## 5. Use Cases

### UC-01: Track 1 Graduate Starts Track 2

A user who completed all 15 Track 1 challenges sees Track 2: DOM Manipulation unlocked on their dashboard. They click into it and see 15 new challenges. Challenge 01: Change the Headline loads in Guided mode. The workspace now shows a new panel: the Live Preview, displaying the Starter HTML.

### UC-02: User Works a DOM Challenge in Guided Mode

The user enters Challenge 02 in Guided mode. Step 1 prompts rephrasing. Step 2 shows breakdown blocks (same drag-and-drop as Track 1). Step 3 shows DOM-specific concept tags (createElement, appendChild, classList.add). Step 4 opens the editor with starter JS code and the starter HTML visible in the preview panel. Step 5 runs tests that check both the function's behavior and the DOM state in the preview, then unlocks the "Create and Append" pattern.

### UC-03: User Sees Live Preview Update

The user writes code in Challenge 03 (Render a List). They run their code. The Live Preview Panel updates to show the `<ul>` with `<li>` items rendered inside `#container`. The user can visually confirm their code works before checking test results. If tests fail, the preview helps them debug by seeing what actually rendered.

### UC-04: User Tackles the Capstone Challenge

The user reaches Challenge 15 (Dynamic Filter UI) in Independent mode. They see a complex problem requiring renderProducts, renderFilters, and filterByCategory functions. They must combine patterns from the entire track: clear and rebuild, render from data, attribute routing, batch update, and toggle state. On completion, they unlock the combined UI pattern and earn the "DOM Builder" badge.

### UC-05: User Earns the DOM Builder Badge

After passing Challenge 15, the user sees the DOM Builder badge animation on the completion screen. The badge appears in their profile/dashboard. The Track 3: Events & Interactions card appears in an unlocked state.

### UC-06: User Reviews DOM Patterns in the Pattern Library

The user navigates to the Pattern Library. They now see 34 total patterns: 19 from Track 1 and 15 from Track 2. Track 2 patterns are visually grouped under a "DOM Manipulation" section. Each pattern card shows the DOM methods involved (e.g., querySelector, createElement, classList.toggle).

---

## 6. Live Preview Panel - Functional Requirements

The Live Preview Panel is the major new workspace component introduced in Track 2.

### REQ-001: Starter HTML Rendering

Each Track 2 challenge includes Starter HTML that renders in the Live Preview Panel when the challenge loads. This HTML represents the initial page state the user will manipulate.

Acceptance criteria:
- Starter HTML loads and renders visibly in the preview panel before the user writes any code
- The preview panel sits below the code editor on all viewports (not side-by-side with the editor, to preserve the guidance/editor split-pane)
- Starter HTML is read-only. Users cannot edit it directly.
- Starter HTML includes associated CSS for visual presentation (pre-authored, not editable)

### REQ-002: Live Preview Updates

After the user runs their code (Step 5 or manual "Run"), the Live Preview Panel updates to reflect the current DOM state.

Acceptance criteria:
- Preview updates after every code execution (not on keystroke, only on explicit run)
- The preview shows the result of the user's code applied to the Starter HTML
- DOM changes are visible: new elements appear, text changes reflect, classes affect styling
- If the user's code throws an error, the preview reverts to the Starter HTML state (no broken partial renders)
- Preview renders inside a sandboxed iframe (Sandpack) to prevent user code from affecting the main app

### REQ-003: Preview and Test Runner Coordination

The test runner (Step 5) verifies both JavaScript return values and DOM state. Tests query the preview's DOM to check structure, text content, classes, and attributes.

Acceptance criteria:
- Tests can assert on DOM elements inside the preview (e.g., `document.querySelector("#title").textContent === "Hello"`)
- Tests that check DOM state run after the user's code has executed and the preview has updated
- Pass/fail indicators still show expected vs. actual for DOM assertions
- DOM assertion failures show what was expected in the DOM vs. what was found (e.g., "Expected 3 `<li>` elements, found 0")

---

## 7. Challenge Framework - Functional Requirements

Track 2 reuses the 5-step framework from Track 1 with DOM-specific adaptations.

### REQ-004: Step 1 - Understand (Same as Track 1)

Identical to Track 1 REQ-001. Free-text rephrasing with expected understanding reference.

### REQ-005: Step 2 - Break Down (Same as Track 1)

Identical to Track 1 REQ-002. Drag-and-drop blocks in correct sequence.

### REQ-006: Step 3 - Map to Code (DOM Concepts)

Same interaction as Track 1 REQ-003, but concept tags now include DOM-specific methods: `document.querySelector()`, `document.querySelectorAll()`, `document.createElement()`, `.appendChild()`, `.textContent`, `.innerHTML`, `.classList.add()`, `.classList.toggle()`, `.classList.contains()`, `.remove()`, `.cloneNode()`, `.dataset`, `.insertBefore()`, `.parentElement`, `.nextSibling`, `document.createDocumentFragment()`, `document.createTextNode()`, `Array.from()`.

### REQ-007: Step 4 - Write (Editor with HTML Context)

Same Monaco editor as Track 1 REQ-004, plus:
- Starter HTML is visible in the Live Preview Panel (REQ-001) while the user codes
- Starter code includes function signatures and step comments referencing DOM methods
- Users write JavaScript only. They do not edit HTML or CSS.

### REQ-008: Step 5 - Verify (DOM-Aware Tests)

Extends Track 1 REQ-005 with DOM assertions (REQ-003). Test cases check:
- Function return values (where applicable)
- DOM element existence, text content, class lists, attributes, and child counts
- Preview panel shows the final DOM state alongside test results

### REQ-009: Pattern Unlock (Same as Track 1)

Identical behavior to Track 1 REQ-006. Pattern card animates in, persists to user_patterns, links to source challenge.

### REQ-010: Challenge Explanation (Same as Track 1)

Identical behavior to Track 1 REQ-007. Explanation highlights DOM patterns and connects to real frontend use cases.

---

## 8. Difficulty Modes - Functional Requirements

### REQ-011: Mode Progression Rules (Track 2 Specific)

Track 2 uses slightly different mode defaults than Track 1, reflecting that users have already practiced the framework.

| Challenge Range | Default Mode | Available Modes |
|---|---|---|
| 1-5 | Guided (Semi-Guided available) | Guided, Semi-Guided |
| 6-10 | Semi-Guided (all available) | Guided, Semi-Guided, Independent |
| 11-14 | Independent (all available) | Guided, Semi-Guided, Independent |
| 15 (Capstone) | Independent encouraged | All modes, bonus badge note if completed without hints |

### REQ-012: Capstone Challenge Bonus

Challenge 15 tracks whether the user completed it without expanding any hint panels (in Independent mode). If so, the DOM Builder badge includes a "No Hints" distinction. This is cosmetic, not a gate.

Acceptance criteria:
- Track whether any hint_panel_opened event fired during Challenge 15
- If no hints were used and mode was Independent, badge shows "Completed without hints" label
- This is informational only. The badge is awarded regardless.

---

## 9. Challenge Content Requirements

### REQ-013: 15 Challenges with Progressive Difficulty

| # | Challenge Title | Difficulty | Est. Min | Key Concepts | Patterns Unlocked |
|---|---|---|---|---|---|
| 1 | Change the Headline | Easy | 5 | querySelector, textContent | Select and modify |
| 2 | Build a Profile Card | Easy | 10 | createElement, classList.add, appendChild | Create and append |
| 3 | Render a List | Easy | 10 | createElement, loop, appendChild | Render from data |
| 4 | Toggle Dark Mode | Easy | 8 | classList.toggle, classList.contains | Toggle state |
| 5 | Highlight All Links | Easy | 8 | querySelectorAll, forEach, classList.add | Batch update |
| 6 | Clear and Rebuild a Todo List | Medium | 12 | innerHTML, createElement, classList, loop | Clear and rebuild |
| 7 | Build a Product Table | Medium | 15 | createElement (table/tr/th/td), nested append | Nested create-and-append |
| 8 | Swap Two Elements | Medium | 15 | parentElement, nextSibling, insertBefore | Parent-child navigation |
| 9 | Clone a Template Card | Medium | 10 | template.content, cloneNode(true), querySelector on clone | Template stamping |
| 10 | Read Data Attributes | Medium | 10 | dataset, getAttribute, attribute selectors, Array.from, filter | Attribute routing |
| 11 | Remove Completed Items | Hard | 10 | querySelectorAll with compound selector, .remove() | DOM removal |
| 12 | Sort a List Alphabetically | Hard | 12 | Array.from, .map(), .sort(), innerHTML clear, re-render | Read-process-write |
| 13 | Build a Breadcrumb Trail | Hard | 12 | createTextNode, length-1 check, classList.add | Between-items separator |
| 14 | Build a Star Rating Display | Hard | 12 | DocumentFragment, loop with conditional class | Fragment batching |
| 15 | Dynamic Filter UI (Capstone) | Hard | 20 | All Track 2 patterns combined | Combined UI pattern |

### REQ-014: Challenge Data Structure Extension

Track 2 challenges extend the ChallengeDefinition interface with:
- `starterHTML: string` - the HTML that renders in the Live Preview
- `starterCSS: string` - optional CSS for visual presentation of the starter HTML
- `requiresPreview: boolean` - always true for Track 2 challenges
- `domTestCases: DomTestCase[]` - test cases that assert on DOM state (element existence, text, classes, attributes, child count)

### REQ-015: Multi-Approach Solutions

Challenges 10 and 15 support multiple valid approaches. Challenge 10 allows filtering via JS or via CSS attribute selectors. Challenge 15 allows various DOM construction approaches. The test runner accepts any approach that passes all assertions.

### REQ-016: 15 Patterns in the Pattern Library

Track 2 adds 15 new patterns to the library. After completing both Track 1 and Track 2, users have 34 total patterns. Track 2 patterns are grouped under a "DOM Manipulation" label in the Pattern Library.

| # | Pattern Name | Plain English | Key Methods |
|---|---|---|---|
| 1 | Select and modify | Grab and change an element | querySelector, textContent |
| 2 | Create and append | Build new elements from scratch | createElement, appendChild |
| 3 | Render from data | Turn arrays into visible UI | Loop + createElement per item |
| 4 | Toggle state | Switch appearance with classes | classList.toggle, classList.contains |
| 5 | Batch update | Change many elements at once | querySelectorAll + loop |
| 6 | Clear and rebuild | Wipe and re-render from fresh data | innerHTML = "" + re-render |
| 7 | Nested create-and-append | Build multi-level structures | Outer container + inner elements |
| 8 | Parent-child navigation | Walk and rearrange the DOM tree | parentElement, nextSibling, insertBefore |
| 9 | Template stamping | Clone reusable structures | template.content.cloneNode(true) |
| 10 | Attribute routing | Read metadata from HTML attributes | dataset, getAttribute, [data-*] selectors |
| 11 | DOM removal | Remove elements that match a condition | querySelectorAll + .remove() |
| 12 | Read-process-write | Extract data from DOM, transform, put back | Read text, process, clear, re-render |
| 13 | Between-items separator | Add dividers between (not after) items | if (i < length - 1) + createTextNode |
| 14 | Fragment batching | Build off-screen, insert once | DocumentFragment |
| 15 | Combined UI pattern | Full data-driven filter UI | Render + rebuild + routing + batch update |

---

## 10. Challenge Workspace - UI Requirements

### REQ-017: Three-Panel Layout (Desktop)

On desktop (>= 1024px), the Track 2 workspace has three visual zones:
- Left pane (40%): Guidance/steps (same as Track 1)
- Right pane (60%): Vertically split into code editor (top, ~60% of right pane height) and Live Preview (bottom, ~40% of right pane height)
- A draggable horizontal divider between editor and preview allows resizing

On viewports below 1024px, all three zones stack vertically: guidance, then editor, then preview.

### REQ-018: Preview Panel Styling

The Live Preview Panel renders inside a bordered container with:
- A header label: "Preview" with a refresh icon button to re-run
- White background (#FAFAFA) to simulate a real page context
- A subtle border (Slate 400) separating it from the editor
- Minimum height: 200px on desktop, 150px on mobile
- The preview iframe is sandboxed (same Sandpack isolation as the code execution)

### REQ-019: Starter HTML Display

Users can view the Starter HTML source by clicking a "View HTML" toggle on the preview panel header. This shows the raw HTML in a read-only code block (Monaco, read-only mode) overlaying the preview. Toggling back shows the rendered preview.

Acceptance criteria:
- Toggle between rendered preview and HTML source
- HTML source view uses JetBrains Mono font, same syntax highlighting as the code editor
- HTML source is read-only (no editing)
- Default state: rendered preview (not source)

---

## 11. Data Model Changes

Track 2 requires minimal schema changes. The existing tables handle new challenges and patterns. The following are additions:

### New Fields on challenges Table

| Field | Type | Notes |
|---|---|---|
| starter_html | text | Nullable. HTML that renders in the Live Preview. Null for Track 1 challenges. |
| starter_css | text | Nullable. CSS for visual presentation of the starter HTML. |
| requires_preview | boolean | Default false. True for all Track 2+ challenges. |
| dom_test_cases | jsonb | Nullable. DOM-specific test assertions (element checks, class checks, attribute checks). |

### New Table: badges

| Field | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| slug | string | URL-safe identifier (e.g., "dom-builder") |
| name | string | Display name ("DOM Builder") |
| description | text | What the badge represents |
| icon | string | Icon identifier or asset path |
| track_id | uuid | Nullable FK to tracks. Null for cross-track badges. |

### New Table: user_badges

| Field | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| user_id | uuid | FK to users |
| badge_id | uuid | FK to badges |
| earned_at | timestamp | When the badge was awarded |
| metadata | jsonb | Nullable. Extra data (e.g., {"no_hints": true} for capstone distinction) |

---

## 12. Non-Functional Requirements

### NFR-001: Performance

- Live Preview Panel initial render: under 500ms after Starter HTML loads
- Preview update after code execution: under 1 second (including Sandpack re-run)
- All Track 1 NFRs still apply (workspace load under 3s on 4G, API responses under 500ms p95)

### NFR-002: Preview Isolation

- The Live Preview iframe must be fully sandboxed. User code in the preview cannot access the parent app's DOM, cookies, localStorage, or network.
- If user code creates an infinite DOM manipulation loop (e.g., endless appendChild), the sandbox must terminate execution within 5 seconds (same timeout as Track 1).

### NFR-003: Accessibility

- All Track 1 accessibility requirements carry forward (WCAG 2.1 AA, keyboard navigation, screen reader support, 16px minimum text, 4.5:1 contrast)
- The Live Preview Panel must be labeled for screen readers ("Live preview of your code output")
- The "View HTML" toggle must be keyboard-accessible
- DOM test result assertions must be screen-reader friendly (e.g., "Expected 3 list items, found 0" read aloud, not just color-coded)

### NFR-004: Browser Support

Same as Track 1: Chrome 90+, Firefox 90+, Safari 15+, Edge 90+, iOS Safari 15+, Chrome Android 90+.

---

## 13. Dependencies & Prerequisites

| Dependency | Owner | Status | Notes |
|---|---|---|---|
| Track 1 fully implemented and deployed | Engineering | Required | Track 2 builds on the same challenge engine, workspace, and progress system |
| Challenge engine supports Starter HTML | Engineering | Not started | Extend Sandpack config to load HTML + CSS into the preview iframe |
| Live Preview Panel component | Engineering | Not started | New workspace component. Sandpack already supports HTML preview. Needs integration. |
| DOM-aware test runner | Engineering | Not started | Extend existing test runner to query DOM elements in the Sandpack iframe |
| badges and user_badges tables | Engineering | Not started | New schema tables for Track 2+ badges |
| 15 challenge definition files | Product + Content | In progress | Challenge Design Document complete. Needs translation to typed data files. |
| Starter CSS per challenge | Design | Not started | Visual styling for Starter HTML so previews look presentable |

---

## 14. Implementation Phases

### Phase 1: Workspace Extensions (Week 1)

| Session | Deliverable |
|---|---|
| 1 | Extend ChallengeDefinition type with starterHTML, starterCSS, requiresPreview, domTestCases |
| 2 | Live Preview Panel component (Sandpack HTML preview, sandboxed iframe, refresh button) |
| 3 | "View HTML" toggle (rendered preview vs. read-only source view) |
| 4 | DOM-aware test runner extension (query elements in preview iframe, assert on DOM state) |

### Phase 2: Challenge Engine Integration (Week 2)

| Session | Deliverable |
|---|---|
| 5 | Three-panel layout (guidance / editor / preview) with draggable dividers |
| 6 | Preview update flow (run code > Sandpack executes > preview updates > tests run) |
| 7 | badges and user_badges tables, badge award logic on Track 2 completion |
| 8 | Capstone no-hints tracking for Challenge 15 |

### Phase 3: Content (Week 3)

| Session | Deliverable |
|---|---|
| 9 | Challenge definitions 1-5 (Easy: Change Headline through Highlight Links) |
| 10 | Challenge definitions 6-10 (Medium: Todo List through Data Attributes) |
| 11 | Challenge definitions 11-15 (Hard: Remove Done through Dynamic Filter UI) |
| 12 | Starter CSS for all 15 challenges |

### Phase 4: Polish & Ship (Week 4)

| Session | Deliverable |
|---|---|
| 13 | Track 2 mode progression rules (shifted defaults per REQ-011) |
| 14 | Pattern Library update: Track 2 group label, 15 new pattern cards |
| 15 | Track 2 completion screen, DOM Builder badge, Track 3 unlock gate |
| 16 | E2E tests for the full Track 2 challenge flow (including preview panel) |
| 17 | Deploy, QA, soft launch to Track 1 completers |

---

## 15. Success Metrics & Tracking

### North Star Metric

**Track 2 challenge completion rate**: percentage of users who start a Track 2 challenge and complete it.

- Baseline: Track 1 completion rate (established post-Track 1 launch)
- Target: 65% (slightly lower than Track 1's 70% target due to increased complexity)
- Timeframe: 60 days post-launch

### Input Metrics

| Metric | Baseline | Target | Timeframe |
|---|---|---|---|
| Track 2 start rate: % of Track 1 completers who open Challenge 1 within 14 days | N/A | 60% | 30 days |
| Live Preview engagement: % of code runs where user views preview before checking tests | N/A | 70% | 60 days |
| Capstone completion rate: % of users who start C15 and finish it | N/A | 50% | 60 days |
| Mode upgrade rate: % of users attempting Independent by Challenge 10 | N/A | 50% | 60 days |

### Guardrail Metrics

| Metric | Threshold |
|---|---|
| Bounce rate on Challenge 1 (open workspace then leave within 60 seconds) | Must stay below 25% |
| Average attempts before first success on Challenges 1-5 | Must stay below 5 |
| Preview panel load failures | Must stay below 1% of page loads |

### Tracking Specification

All Track 1 events carry forward. New or extended events for Track 2:

| Event Name | Trigger | Key Properties | Source |
|---|---|---|---|
| preview_rendered | Live Preview updates after code execution | user_id, challenge_id, render_time_ms: number, had_error: boolean | client |
| preview_html_toggled | User toggles between rendered view and HTML source | user_id, challenge_id, new_view: enum [preview, source] | client |
| dom_test_failed | A DOM-specific test assertion fails | user_id, challenge_id, test_name: string, expected: string, actual: string | client |
| badge_earned | User earns a badge | user_id, badge_slug: string, track_slug: string, metadata: jsonb | server |
| capstone_completed | User completes Challenge 15 | user_id, mode: string, hints_used: number, attempts: number, total_time_seconds: number | server |

**New Funnel:**

- Track transition funnel: track_completed (Track 1) > challenge_started (Track 2 C1) > challenge_completed (Track 2 C1) > challenge_completed (Track 2 C15) > badge_earned (dom-builder)

---

## 16. Risk Assessment

| Risk | Impact | Likelihood | Mitigation |
|---|---|---|---|
| Sandpack HTML preview adds noticeable latency to the workspace | High | Medium | Pre-load the Sandpack iframe on challenge page mount (before user writes code). Measure render_time_ms and optimize if p95 exceeds 1s. |
| DOM test assertions are brittle (break on minor whitespace or structure differences) | High | High | Normalize DOM queries in the test runner (trim whitespace, ignore attribute order). Write tests that check semantic state, not exact HTML strings. |
| Three-panel layout feels cramped on smaller desktops (1024-1280px) | Medium | Medium | Make the editor/preview split draggable. Default to 60/40 but allow full-screen editor with collapsed preview. |
| Users confused by the distinction between Starter HTML (read-only) and their JS code | Medium | Medium | Add a clear label on the preview: "This is the page you'll modify with JavaScript." Include a first-time tooltip on Challenge 1. |
| Challenge 8 (Swap Elements) has high difficulty spike due to sibling navigation | Medium | High | Monitor completion rate drop between C7 and C8. The guided breakdown blocks already scaffold the approach. If needed, add an extra hint specifically for the bookmark/nextSibling concept. |
| Challenge 15 (Capstone) is too complex for users who rushed through earlier challenges | Medium | Medium | Track whether capstone starters have completed at least 12 of 14 prior challenges. If not, show a recommendation to revisit uncompleted challenges first. |

---

## 17. Glossary

| Term | Definition |
|---|---|
| DOM | Document Object Model. The browser's representation of the HTML page as a tree of objects that JavaScript can read and modify. |
| Starter HTML | Pre-authored HTML that loads in the Live Preview for each Track 2 challenge. Read-only. |
| Live Preview Panel | New workspace component that renders the Sandpack iframe showing the current DOM state after code execution. |
| DOM Test | A test assertion that checks the state of elements in the Live Preview (existence, text, classes, attributes, child count). |
| Capstone | Challenge 15, the final challenge in a track that combines all patterns from that track into a single complex problem. |
| DOM Builder Badge | Achievement badge awarded on completing all 15 Track 2 challenges. |
| Pattern Library | The user's collection of unlocked problem-solving patterns, now spanning Track 1 (19) and Track 2 (15). |

---

## Appendix A: All Track 2 Patterns

| # | Pattern Name | Plain English | Key Methods |
|---|---|---|---|
| 1 | Select and modify | Grab and change an element | querySelector, textContent |
| 2 | Create and append | Build new elements from scratch | createElement, appendChild |
| 3 | Render from data | Turn arrays into visible UI | Loop + createElement per item |
| 4 | Toggle state | Switch appearance with classes | classList.toggle, classList.contains |
| 5 | Batch update | Change many elements at once | querySelectorAll + loop |
| 6 | Clear and rebuild | Wipe and re-render from fresh data | innerHTML = "" + re-render |
| 7 | Nested create-and-append | Build multi-level structures | Outer container + inner elements |
| 8 | Parent-child navigation | Walk and rearrange the DOM tree | parentElement, nextSibling, insertBefore |
| 9 | Template stamping | Clone reusable structures | template.content.cloneNode(true) |
| 10 | Attribute routing | Read metadata from HTML attributes | dataset, getAttribute, [data-*] selectors |
| 11 | DOM removal | Remove elements that match a condition | querySelectorAll + .remove() |
| 12 | Read-process-write | Extract data from DOM, transform, put back | Read text, process, clear, re-render |
| 13 | Between-items separator | Add dividers between (not after) items | if (i < length - 1) + createTextNode |
| 14 | Fragment batching | Build off-screen, insert once | DocumentFragment |
| 15 | Combined UI pattern | Full data-driven filter UI | Render + rebuild + routing + batch update |

## Appendix B: Cumulative Pattern Count

| Track | Patterns | Running Total |
|---|---|---|
| Track 1: Fundamentals | 19 | 19 |
| Track 2: DOM Manipulation | 15 | 34 |
