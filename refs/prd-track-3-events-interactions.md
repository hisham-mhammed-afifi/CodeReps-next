# PRD: CodeReps Track 3 - Events & Interactions

| Field | Value |
|---|---|
| Author | Product Team |
| Status | Draft |
| Version | v0.1 |
| Last Updated | 2026-03-24 |
| Change Log | v0.1 - Initial draft |

---

## 1. Overview & Problem Statement

Track 3: Events & Interactions is the third and final track in CodeReps' initial launch content. It unlocks after a user completes all 15 challenges in Track 2: DOM Manipulation.

Track 1 taught users to think through logic problems. Track 2 taught them to select, create, and manipulate DOM elements. Track 3 completes the trilogy by teaching users to make pages respond to user actions: clicks, typing, hovering, key presses, and form submissions.

The core problem Track 3 solves: users who can build DOM structures from data still can't make them interactive. They can render a list of items but can't make them clickable. They can build a form but can't handle its submission without a page reload. Track 3 teaches the mental model of event-driven programming: code that runs in response to things happening, not just top to bottom.

What's new in Track 3 compared to Track 2:
- Every challenge responds to **user actions** (clicks, typing, hovering, key presses, form submissions)
- The workspace includes an **Interaction Log** panel showing events firing in real time as the user interacts with the preview
- Tests **simulate user behavior** programmatically (dispatching click, input, keydown, submit, mouseover events)
- Challenges introduce timing concepts: debouncing (Challenge 9) and one-time execution (Challenge 10)
- The capstone (Challenge 15) builds a complete interactive quiz app combining patterns from all three tracks

---

## 2. Goals & Objectives

### Product Goals

- Complete the foundational trilogy: logic (T1) > DOM (T2) > events (T3), giving users the full skillset to build interactive vanilla JS applications
- Introduce the Interaction Log as a debugging tool that demystifies how events work
- Deliver 15 challenges progressing from simple click handlers to a full interactive quiz app
- Add 10 new patterns to the Pattern Library, bringing the cumulative total to 44
- Award the "Event Wrangler" badge on track completion

### Business Goals

- Retain Track 2 completers: target 55% of Track 2 graduates starting Track 3 within 14 days
- Validate that 3-track content is sufficient for a meaningful paid tier: users completing all 3 tracks have 44 patterns and can build real interactive UIs
- Generate demand signal for future tracks (Async JS, CSS + JS, Mini Components) by measuring Track 3 completion-to-waitlist conversion

### Non-Goals

- No async operations (fetch, promises, timers beyond setTimeout for debounce). Async is Track 4's scope.
- No framework-specific event handling (React's onClick, Vue's @click). This is vanilla JS only.
- No CSS animations or transitions as the focus (CSS + JS is Track 5's scope)
- No custom events or event creation (beyond dispatchEvent for testing)
- No WebSocket or real-time communication
- No payment, subscription, or premium gating for Track 3

---

## 3. Scope

### In Scope

- 15 new challenges with the 5-step framework, 3 difficulty modes, and progressive difficulty
- 10 new unlockable patterns added to the Pattern Library (44 cumulative)
- Interaction Log panel showing events firing in real time inside the preview
- Event simulation in the test runner (programmatic clicks, key presses, input events, form submissions, mouse events)
- Challenge 15 as a capstone combining patterns from all three tracks into a complete quiz app
- "Event Wrangler" badge awarded on Track 3 completion (with no-hints capstone distinction)
- Updated mode progression rules for Track 3
- Track 4 placeholder/waitlist gate after completing all 15 challenges
- Starter HTML and Live Preview (carried forward from Track 2)

### Out of Scope

- Async operations (fetch, promises, async/await)
- CSS animation authoring or transition manipulation
- Touch events or mobile-specific gesture handling
- Custom event creation (CustomEvent constructor)
- Accessibility testing automation (ARIA live regions, focus management beyond keyboard nav in Challenge 11)
- Admin tooling for challenge management
- Mobile-native app features

### Scope Boundary

This PRD covers everything from a Track 2 graduate entering Track 3 through completing all 15 event challenges, unlocking all 10 patterns, earning the Event Wrangler badge, and seeing the Track 4 waitlist gate. Scope ends when the user reaches the Track 4 placeholder.

---

## 4. Target Audience

Same primary persona as Tracks 1 and 2: the Tutorial Graduate (17-30, knows JS syntax, completed the thinking framework and DOM manipulation tracks).

### Key Behavioral Shift

Track 2 users thought in terms of "select an element, change it." Track 3 users must learn to think in terms of **"when X happens, do Y."** The mental model shifts from imperative ("change this now") to reactive ("set up a response for later"). This is the bridge to understanding how frameworks like React work under the hood.

---

## 5. Use Cases

### UC-01: Track 2 Graduate Starts Track 3

A user who completed all 15 Track 2 challenges and earned the DOM Builder badge sees Track 3: Events & Interactions unlocked on their dashboard. They click into it and see 15 new challenges. Challenge 01: Click Counter loads in Guided mode. The workspace now includes a new panel: the Interaction Log, which is empty until they interact with the preview.

### UC-02: User Works an Event Challenge in Guided Mode

The user enters Challenge 03 (Live Character Counter) in Guided mode. Steps 1-3 guide them through understanding input events, the event object, and .value. Step 4 opens the editor. Step 5 runs tests that simulate typing into the textarea by dispatching input events and checking both the character count display and the over-limit class. The Interaction Log shows each input event firing as the tests run.

### UC-03: User Sees Events in the Interaction Log

The user is working on Challenge 05 (Event Delegation). After writing their code, they interact with the preview by clicking list items. The Interaction Log shows each click event with: event type ("click"), target element ("LI"), target text ("Home"), and timestamp. This helps them understand event bubbling and confirms their delegation is working.

### UC-04: User Works with Simulated Events in Tests

The user submits code for Challenge 04 (Todo with Enter Key). The test runner simulates keyboard events by dispatching KeyboardEvent with key: "Enter" and key: "a". The user sees tests pass for Enter-triggered additions and tests confirming that non-Enter keys don't trigger the handler. The Interaction Log shows each simulated event.

### UC-05: User Tackles the Capstone Quiz App

The user reaches Challenge 15 (Interactive Quiz App) in Independent mode. They must build a complete quiz from a questions array: render questions, handle option clicks, show correct/wrong feedback, manage a Next button, track score, and show results. On completion, they unlock the combined interactive app pattern and earn the "Event Wrangler" badge.

### UC-06: User Earns the Event Wrangler Badge

After passing Challenge 15, the user sees the Event Wrangler badge with optional "Completed without hints" distinction. The completion screen shows cumulative stats across all three tracks: 45 challenges completed, 44 patterns unlocked, 2 badges earned.

### UC-07: User Reviews the Full Pattern Library

The user navigates to the Pattern Library. They now see 44 total patterns grouped under three sections: "Fundamentals" (19), "DOM Manipulation" (15), and "Events & Interactions" (10). Each Track 3 pattern card shows the event types involved.

---

## 6. Interaction Log - Functional Requirements

The Interaction Log is the major new workspace component introduced in Track 3.

### REQ-001: Real-Time Event Logging

When the user interacts with the Live Preview (clicking, typing, hovering, pressing keys), the Interaction Log displays each event as it fires.

Acceptance criteria:
- The log shows each event with: event type (e.g., "click", "input", "keydown"), target element tag and identifier (e.g., "BUTTON#increment-btn"), and timestamp (HH:MM:SS.ms)
- Events appear in chronological order, newest at the bottom, with auto-scroll
- The log updates in real time as events fire (no delay)
- The log only captures events that fire within the preview iframe (not the parent app)

### REQ-002: Event Filtering

The Interaction Log includes a filter dropdown to show only specific event types.

Acceptance criteria:
- Filter options include: All, Click, Input, Keydown, Submit, Mouseover/Mouseout, Custom
- Default filter: All
- Changing the filter immediately filters the visible log entries (does not clear history)
- Active filter is visually indicated

### REQ-003: Log Clearing

The Interaction Log includes a "Clear" button to reset the log.

Acceptance criteria:
- Clicking "Clear" removes all log entries
- The button is always visible in the log panel header
- Cleared entries are not recoverable (simple reset, not undo)

### REQ-004: Simulated Event Visibility

When the test runner dispatches simulated events (programmatic clicks, key presses, input changes), those events also appear in the Interaction Log with a "simulated" badge.

Acceptance criteria:
- Simulated events show the same information as real events (type, target, timestamp)
- Simulated events have a distinct visual badge or label ("Simulated" or a robot icon) so users can distinguish them from their own interactions
- This helps users understand what the tests are doing and why

---

## 7. Event Simulation in Tests - Functional Requirements

### REQ-005: Test Runner Dispatches User Events

Track 3 tests simulate user behavior by programmatically dispatching events inside the preview iframe.

Acceptance criteria:
- Tests can dispatch: click events on elements, input events on form fields (with value pre-set), keydown/keyup events with specific keys, submit events on forms (with cancelable: true), mouseover/mouseout events on elements
- Dispatched events trigger the user's addEventListener handlers exactly as real user interactions would
- Tests wait for event handlers to complete before asserting on DOM state

### REQ-006: Timing-Aware Tests

Challenges involving setTimeout/debounce (Challenge 9) require tests that account for timing.

Acceptance criteria:
- Tests can wait a specified duration (e.g., 350ms for a 300ms debounce) before asserting
- Timing-based tests use a tolerance window (test waits debounce + 50ms buffer)
- Test results clearly indicate when a timing-based assertion is pending vs. complete
- If a timed assertion does not resolve within 5 seconds, it fails with a timeout message

### REQ-007: DOM and Event Test Coexistence

Track 3 tests combine return-value assertions (Track 1), DOM state assertions (Track 2), and event-triggered assertions (Track 3).

Acceptance criteria:
- All three assertion types appear in a single unified results list
- Each test is labeled by what it checks: "Function output", "Page state", or "After interaction"
- Tests run in defined order: setup > simulate events > wait (if timed) > assert DOM state
- All tests must pass for the challenge to be marked complete

---

## 8. Challenge Framework - Functional Requirements

Track 3 reuses the 5-step framework from Tracks 1 and 2 with event-specific adaptations.

### REQ-008: Steps 1-3 (Same as Track 2 with Event Concepts)

Same interaction patterns as Track 2 (REQ-004 through REQ-006 in Track 2 PRD). Concept tags now include event-specific terms: addEventListener, removeEventListener, event.target, event.key, event.preventDefault(), event.stopPropagation(), "click", "input", "keydown", "submit", "mouseover", "mouseout", "dragstart", "dragover", "dragend", setTimeout, clearTimeout, dispatchEvent, .disabled, .value, callback/handler, event delegation, debounce.

### REQ-009: Step 4 - Write (Editor with Preview and Interaction Log)

Same Monaco editor as Track 2, plus:
- The Interaction Log panel is visible alongside the Live Preview
- Starter code is JavaScript only (no HTML editing), same as Track 2
- Starter code comments reference event patterns and handler structure

### REQ-010: Step 5 - Verify (Event-Simulating Tests)

Extends Track 2's DOM-aware test runner (REQ-008 in Track 2 PRD) with event simulation (REQ-005 through REQ-007 above). Tests programmatically interact with the preview and then assert on the resulting DOM state.

### REQ-011: Pattern Unlock and Explanation (Same as Track 1/2)

Identical behavior to previous tracks. Pattern card animates in, persists to user_patterns, links to source challenge.

---

## 9. Difficulty Modes - Functional Requirements

### REQ-012: Mode Progression Rules (Track 3 Specific)

| Challenge Range | Default Mode | Available Modes |
|---|---|---|
| 1-5 | Guided | Guided, Semi-Guided |
| 6-10 | Semi-Guided | Guided, Semi-Guided, Independent |
| 11-14 | Independent | All modes |
| 15 (Capstone) | Independent encouraged | All modes, bonus badge note if completed without hints |

Same progression pattern as Track 2. After Track 3 completion, all modes are available on all Track 3 challenges.

### REQ-013: Capstone Bonus (Same as Track 2)

Challenge 15 tracks whether the user completed it without expanding any hint panels in Independent mode. If so, the Event Wrangler badge includes a "Completed without hints" distinction. Cosmetic only, not a gate.

---

## 10. Challenge Content Requirements

### REQ-014: 15 Challenges with Progressive Difficulty

| # | Challenge Title | Difficulty | Est. Min | Key Concepts | Patterns Unlocked |
|---|---|---|---|---|---|
| 1 | Click Counter | Easy | 5 | addEventListener("click"), let variable, textContent | Click handler |
| 2 | Who Got Clicked? | Easy | 8 | event.target, dataset, querySelectorAll, forEach | Event object reading |
| 3 | Live Character Counter | Easy | 10 | addEventListener("input"), .value, .length, classList | Input sync |
| 4 | Todo with Enter Key | Easy | 10 | addEventListener("keydown"), event.key, trim(), createElement | Enter key detection |
| 5 | Event Delegation: Clickable List | Medium | 12 | event bubbling, event.target.tagName, single listener on parent | Event delegation |
| 6 | Form Submission Handler | Medium | 12 | addEventListener("submit"), preventDefault(), form.reset(), .value | Form prevention |
| 7 | Hover Preview | Medium | 12 | mouseover/mouseout, dataset, innerHTML clear, createElement | Hover effect |
| 8 | Accordion Toggle | Medium | 15 | click + classList.toggle, nextElementSibling, batch classList.remove | Toggle on click |
| 9 | Live Search Filter | Hard | 15 | input event, setTimeout, clearTimeout, debounce pattern, style.display | Debounce |
| 10 | Remove Listener After First Click | Hard | 10 | named functions, removeEventListener, .disabled | Event cleanup |
| 11 | Keyboard Navigation | Hard | 15 | document keydown, ArrowUp/ArrowDown, modulo wrapping, preventDefault | Keyboard navigation |
| 12 | Drag-and-Drop Reorder | Hard | 20 | dragstart/dragover/dragend, getBoundingClientRect, insertBefore | Drag reorder |
| 13 | Multi-Step Form Wizard | Hard | 20 | step state management, show/hide, Next/Back, populateReview | Multi-step UI |
| 14 | Custom Tooltip System | Hard | 15 | mouseover/mouseout, getBoundingClientRect, absolute positioning, shared element | Floating positioning |
| 15 | Interactive Quiz App (Capstone) | Hard | 25 | All Track 3 patterns + Track 1/2 patterns combined | Complete interactive app |

### REQ-015: Challenge Data Structure Extension

Track 3 challenges extend the ChallengeDefinition interface with:
- `requiresInteractionLog: boolean` - true for all Track 3 challenges
- `eventTestCases: EventTestCase[]` - test cases that dispatch events and assert on resulting DOM state. Each entry specifies: target selector, event type, event properties (key, cancelable, etc.), optional wait duration (for debounce tests), and then standard DOM assertions.

All Track 2 fields carry forward: starterHTML, starterCSS, requiresPreview (true for all Track 3), domTestCases.

### REQ-016: 10 Patterns in the Pattern Library

Track 3 adds 10 new patterns. After completing all three tracks, users have 44 total patterns.

| # | Pattern Name | Plain English | Key Code |
|---|---|---|---|
| 1 | Click handler | React to user clicks | addEventListener("click", fn) |
| 2 | Event object reading | Inspect what triggered the event | event.target, event.key |
| 3 | Input sync | Live-update display from input | "input" event + .value |
| 4 | Enter key detection | Trigger on Enter press | event.key === "Enter" |
| 5 | Event delegation | One parent listener for all children | Listen on parent, check event.target |
| 6 | Form prevention | Stop default form reload | event.preventDefault() |
| 7 | Hover effect | React to mouse enter/leave | "mouseover" + "mouseout" pair |
| 8 | Toggle on click | Switch state per click | Click + classList.toggle + batch update |
| 9 | Debounce | Wait until user stops acting | clearTimeout + setTimeout |
| 10 | Event cleanup | Remove listener when done | removeEventListener(type, namedFn) |

Note: Challenges 11-14 teach important skills (keyboard nav, drag-and-drop, multi-step UI, tooltip positioning) but these unlock more complex composite patterns rather than single-concept cards. Challenge 15 unlocks the "Complete interactive app" meta-pattern.

---

## 11. Workspace UI Requirements

### REQ-017: Interaction Log Panel Placement

On desktop (>= 1024px), the Interaction Log sits alongside the Live Preview in the bottom portion of the right pane. The bottom zone splits horizontally: Live Preview (left, 60%) and Interaction Log (right, 40%). A draggable vertical divider allows resizing.

On viewports below 1024px, the Interaction Log renders as a collapsible panel below the Live Preview, collapsed by default with a "Show Event Log" toggle.

### REQ-018: Interaction Log Styling

- Header label: "Event Log" with a filter dropdown and Clear button
- Dark background matching the code editor (Deep Navy, #0F172A)
- Monospace font (JetBrains Mono) for log entries
- Event type badges: color-coded (click: Electric Indigo, input: Cyan, keydown: Amber, submit: Emerald Green, mouse events: Slate 400)
- Simulated event badge: dashed border or robot icon to distinguish from real interactions
- Maximum visible entries: 100. Older entries are removed as new ones arrive.
- Minimum height: 150px on desktop

### REQ-019: Track 1 and Track 2 Backward Compatibility

- Track 1 challenges: two-panel layout (guidance / editor), no preview, no interaction log
- Track 2 challenges: three-zone layout (guidance / editor / preview), no interaction log
- Track 3 challenges: four-zone layout (guidance / editor / preview + interaction log)
- The layout decision is driven by challenge fields: `requiresPreview` and `requiresInteractionLog`

---

## 12. Data Model Changes

### New Fields on challenges Table

| Field | Type | Notes |
|---|---|---|
| requires_interaction_log | boolean | Default false. True for all Track 3 challenges. |
| event_test_cases | jsonb | Nullable. Event-based test definitions (dispatch event, wait, assert DOM state). |

### Track 3 Badge

Add a new row to the badges table:

| slug | name | description | track_id |
|---|---|---|---|
| event-wrangler | Event Wrangler | Awarded for completing all 15 Track 3: Events & Interactions challenges | FK to Track 3 |

### New Track Record

Add a new row to the tracks table:

| slug | title | description | order | is_locked_by_default |
|---|---|---|---|---|
| events-interactions | Events & Interactions | Make pages respond to clicks, typing, hovering, and key presses | 3 | true |

---

## 13. Non-Functional Requirements

### NFR-001: Performance

- Interaction Log rendering: under 16ms per entry (60fps, no jank while events stream in)
- Event simulation in tests: dispatched events should trigger handlers within 50ms
- Debounce test timing: tolerance of +/- 50ms on timing assertions
- All Track 1 and Track 2 NFRs carry forward

### NFR-002: Preview and Log Isolation

- The Interaction Log hooks into the preview iframe's event system via a message channel or MutationObserver, never by injecting listeners into user code
- The logging mechanism must not interfere with the user's event handlers or change timing behavior
- The Interaction Log is a passive observer, not an active participant in the event flow

### NFR-003: Accessibility

- All Track 1 and Track 2 accessibility requirements carry forward
- The Interaction Log must be labeled for screen readers: "Event log showing interactions with the preview"
- Log entries must be readable by screen readers (event type, target, time)
- The filter dropdown and Clear button must be keyboard-accessible
- Challenges involving keyboard events (11) must not conflict with the workspace's own keyboard shortcuts

### NFR-004: Browser Support

Same as Tracks 1 and 2: Chrome 90+, Firefox 90+, Safari 15+, Edge 90+, iOS Safari 15+, Chrome Android 90+.

---

## 14. Dependencies & Prerequisites

| Dependency | Owner | Status | Notes |
|---|---|---|---|
| Track 2 fully implemented and deployed | Engineering | Required | Track 3 builds on the Live Preview, DOM test runner, and badge system |
| Live Preview Panel (Track 2 Story 1) | Engineering | Required | Track 3 challenges use the same preview with event interaction |
| DOM-Aware Test Runner (Track 2 Story 4) | Engineering | Required | Track 3 extends it with event dispatch and timing |
| Badge system (Track 2 Story 8) | Engineering | Required | Track 3 adds the Event Wrangler badge using the same tables |
| Interaction Log component | Engineering | Not started | New component that listens to events inside the preview iframe |
| Event simulation in test runner | Engineering | Not started | Extend test runner to dispatch events and handle timing |
| 15 challenge definition files | Product + Content | In progress | Challenge Design Document complete |
| Starter CSS per challenge | Design | Not started | Visual styling for preview interactions (hover states, selected states, etc.) |

---

## 15. Implementation Phases

### Phase 1: Workspace Extensions (Week 1)

| Session | Deliverable |
|---|---|
| 1 | Extend ChallengeDefinition type with requiresInteractionLog and eventTestCases |
| 2 | Interaction Log component (event capture from iframe, real-time display, filter, clear) |
| 3 | Four-zone workspace layout (guidance / editor / preview + interaction log) with backward compatibility |
| 4 | Event simulation in test runner (dispatch click, input, keydown, submit, mouseover/mouseout) |

### Phase 2: Test Runner Timing (Week 2)

| Session | Deliverable |
|---|---|
| 5 | Timing-aware test assertions (wait for debounce, tolerance window, timeout handling) |
| 6 | Simulated event visibility in Interaction Log (badge/label for programmatic events) |
| 7 | Unified test results: "Function output", "Page state", "After interaction" labels |

### Phase 3: Content (Week 3)

| Session | Deliverable |
|---|---|
| 8 | Challenge definitions 1-5 (Easy: Click Counter through Event Delegation) |
| 9 | Challenge definitions 6-10 (Medium/Hard: Form Handler through Remove Listener) |
| 10 | Challenge definitions 11-15 (Hard: Keyboard Nav through Quiz App capstone) |
| 11 | Starter CSS for all 15 challenges (hover states, selected states, dragging states, accordion open/closed) |

### Phase 4: Polish & Ship (Week 4)

| Session | Deliverable |
|---|---|
| 12 | Track 3 mode progression rules |
| 13 | Pattern Library update: "Events & Interactions" group, 10 new pattern cards |
| 14 | Track 3 completion screen, Event Wrangler badge, Track 4 waitlist gate |
| 15 | E2E tests for the full Track 3 challenge flow (including event simulation and timing tests) |
| 16 | Backward compatibility regression (Track 1 and Track 2 challenges unaffected) |
| 17 | Deploy, QA, soft launch to Track 2 completers |

---

## 16. Success Metrics & Tracking

### North Star Metric

**Track 3 challenge completion rate**: percentage of users who start a Track 3 challenge and complete it.

- Baseline: Track 2 completion rate (established post-Track 2 launch)
- Target: 60% (slightly lower than Track 2's 65% target due to higher conceptual complexity of event-driven programming)
- Timeframe: 60 days post-launch

### Input Metrics

| Metric | Baseline | Target | Timeframe |
|---|---|---|---|
| Track 3 start rate: % of Track 2 completers who open C1 within 14 days | N/A | 55% | 30 days |
| Interaction Log engagement: % of users who interact with the preview (triggering 5+ log entries) before running tests | N/A | 60% | 60 days |
| Capstone completion rate: % of users who start C15 and finish it | N/A | 45% | 60 days |
| Three-track graduation rate: % of registered users who complete all 45 challenges | N/A | 15% | 90 days |

### Guardrail Metrics

| Metric | Threshold |
|---|---|
| Bounce rate on Challenge 1 | Must stay below 25% |
| Average attempts before first success on Challenges 1-5 | Must stay below 5 |
| Interaction Log rendering jank (frames dropped) | Must stay below 1% of sessions |
| Debounce test false failures (timing-related) | Must stay below 2% of test runs |

### Tracking Specification

All Track 1 and Track 2 events carry forward. New or extended events for Track 3:

| Event Name | Trigger | Key Properties | Source |
|---|---|---|---|
| interaction_log_entry | Event captured from preview iframe | user_id, challenge_id, event_type: string, target_tag: string, is_simulated: boolean | client |
| interaction_log_filtered | User changes the event type filter | user_id, challenge_id, filter_value: string | client |
| interaction_log_cleared | User clears the log | user_id, challenge_id, entries_cleared: number | client |
| event_test_dispatched | Test runner dispatches a simulated event | user_id, challenge_id, event_type: string, target_selector: string | client |
| timed_test_completed | A timing-based test assertion resolves | user_id, challenge_id, test_name: string, wait_ms: number, passed: boolean | client |
| three_track_graduated | User completes all 45 challenges across Tracks 1-3 | user_id, total_time_seconds: number, total_attempts: number, badges_earned: number | server |

**New Funnels:**

- Track 3 transition: track_completed (Track 2) > challenge_started (Track 3 C1) > challenge_completed (Track 3 C1) > challenge_completed (Track 3 C15) > badge_earned (event-wrangler)
- Full graduation: track_completed (Track 1) > track_completed (Track 2) > track_completed (Track 3) > three_track_graduated

---

## 17. Risk Assessment

| Risk | Impact | Likelihood | Mitigation |
|---|---|---|---|
| Event simulation timing is unreliable across browsers | High | Medium | Use generous tolerance windows (+50ms). Test on Chrome, Firefox, Safari. Provide clear timeout messages. Fall back to non-timed assertions when possible. |
| Interaction Log introduces performance jank during rapid events (e.g., mouseover on a list) | Medium | Medium | Throttle log rendering to 60fps. Cap visible entries at 100. Use virtualized list if entry count grows. |
| Interaction Log's event capture interferes with user's event handlers | High | Low | Use a passive message channel from the iframe, not injected listeners. Test isolation thoroughly. |
| Challenge 12 (Drag-and-Drop) is significantly harder than surrounding challenges | High | High | Monitor completion rate drop between C11 and C12. The guided breakdown already scaffolds the approach. Consider adding a visual guide showing the getBoundingClientRect midpoint concept. |
| Challenge 9 (Debounce) timing tests produce false failures | Medium | Medium | Use clearTimeout/setTimeout in tests with a 50ms buffer beyond the debounce delay. Monitor timed_test_completed events for pass rate. If false failure rate exceeds 2%, increase buffer. |
| Four-zone layout feels cramped on 1024px-1280px viewports | Medium | Medium | Make the preview/log split draggable. Default 60/40. Allow collapsing the Interaction Log entirely (button in header). |
| Track 3 is conceptually harder than Tracks 1-2, causing higher churn | Medium | High | Expected. Target 60% completion (vs. 65% Track 2, 70% Track 1). Monitor early challenge bounce rates. If C1 bounce exceeds 25%, simplify the starter code or add a 30-second intro animation explaining event-driven programming. |
| Backward compatibility regression: Track 3 changes break Track 1 or Track 2 | High | Low | Mandatory regression test in deployment: load one Track 1 and one Track 2 challenge, verify layouts and tests work. requiresInteractionLog field is the switch. |

---

## 18. Glossary

| Term | Definition |
|---|---|
| Event | A signal that something happened in the browser: a click, keypress, form submission, mouse movement, etc. |
| Event Listener | A function registered to run when a specific event fires on a specific element. |
| Event Handler / Callback | The function that runs in response to an event. |
| Event Object | The object the browser passes to your handler, containing details about what happened (target, key, type, etc.). |
| Event Delegation | Attaching one listener to a parent element to handle events from its children, using event.target to identify the source. |
| Event Bubbling | The mechanism by which events fired on a child element propagate up through its ancestors. |
| Debounce | A technique that delays execution until a burst of events stops, by resetting a timer on each event. |
| Interaction Log | New workspace component that displays events firing in the preview in real time. |
| Event Simulation | Programmatically dispatching events (click, keydown, input) in tests to simulate user behavior. |
| Event Wrangler Badge | Achievement badge awarded on completing all 15 Track 3 challenges. |

---

## Appendix A: All Track 3 Patterns

| # | Pattern Name | Plain English | Key Code |
|---|---|---|---|
| 1 | Click handler | React to user clicks | addEventListener("click", fn) |
| 2 | Event object reading | Inspect what triggered the event | event.target, event.key |
| 3 | Input sync | Live-update display from input | "input" event + .value |
| 4 | Enter key detection | Trigger on Enter press | event.key === "Enter" |
| 5 | Event delegation | One parent listener for all children | Listen on parent, check event.target |
| 6 | Form prevention | Stop default form reload | event.preventDefault() |
| 7 | Hover effect | React to mouse enter/leave | "mouseover" + "mouseout" pair |
| 8 | Toggle on click | Switch state per click | Click + classList.toggle + batch update |
| 9 | Debounce | Wait until user stops acting | clearTimeout + setTimeout |
| 10 | Event cleanup | Remove listener when done | removeEventListener(type, namedFn) |

## Appendix B: Cumulative Pattern Count

| Track | Patterns | Running Total |
|---|---|---|
| Track 1: Fundamentals | 19 | 19 |
| Track 2: DOM Manipulation | 15 | 34 |
| Track 3: Events & Interactions | 10 | 44 |

## Appendix C: Suggested Future Tracks

| Track | Title | Focus |
|---|---|---|
| Track 4 | Async JS | Callbacks, promises, fetch, async/await, loading states |
| Track 5 | CSS + JS Together | Dynamic styles, animations, transitions, scroll effects |
| Track 6 | Mini Components | Accordion, tabs, modal, tooltip, carousel from scratch |
| Track 7 | Real Patterns | Throttle, local storage, form validation, infinite scroll |
