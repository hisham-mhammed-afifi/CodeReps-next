# Story 7: Track 3 Challenge Content

**Version:** v1.0 | **Last Updated:** 2026-03-24 | **Complexity:** 63/100 (Moderate)
**Dependencies:** Stories 4, 5
**PRD Reference:** REQ-014, REQ-015

---

**USER STORY**

As a beginner developer who has mastered DOM manipulation,
I want 15 progressively challenging event-handling problems that teach me how to make pages respond to clicks, typing, hovering, and key presses,
so that I can build real interactive UIs and understand how every website I use actually works under the hood.

---

**ACCEPTANCE CRITERIA**

**Background:**

Given the event simulation test runner and timing-aware assertions are functional
And the Interaction Log is active

**Scenarios:**

Scenario 1: All 15 challenges load with valid data

Given Track 3 is unlocked for a user who completed Track 2
When the user browses the Track 3 challenge list
Then all 15 challenges should be present, ordered by difficulty (Easy 1-4, Medium 5-8, Hard 9-15)
And each challenge should have: title, difficulty, estimated time, problem statement, starter code, starter HTML, starter CSS, solution(s), explanation, breakdown blocks, concept options, test cases, DOM test cases, event test cases, and patterns unlocked
And `requiresPreview` and `requiresInteractionLog` should be true for all 15 challenges
And no challenge should have missing or placeholder fields

Scenario 2: Event test cases simulate correct user interactions

Given the user opens any Track 3 challenge and submits the correct solution
When the test runner executes
Then event test cases should dispatch the correct event types on the correct target elements
And the resulting DOM state should match all assertions
And timing-aware tests (Challenge 9: debounce) should wait appropriately before asserting
And all tests should pass for the reference solution

Scenario 3: Starter HTML supports interactive elements

Given the user opens any Track 3 challenge
When the preview renders the Starter HTML
Then interactive elements (buttons, inputs, textareas, forms, draggable items) should be present and functional in the preview
And Starter CSS should style interactive states (hover, focus, active, selected, dragging, open/closed) so the preview looks presentable
And the Interaction Log should capture events when the user interacts with these elements

Scenario 4: Challenge definitions conform to the extended type

Given the ChallengeDefinition interface has been extended with requiresInteractionLog and eventTestCases
When each challenge definition file is loaded
Then TypeScript should compile without errors
And all required fields should be present and correctly typed
And event test cases should include: target selector, event type, event constructor properties, optional waitMs, and DOM assertions

---

**Additional Requirements:**

- Challenge definitions live in `src/lib/challenges/events-interactions/` following the same file pattern as Tracks 1 and 2.
- All content is sourced from the Track 3 Challenge Design Document. No placeholder or AI-generated content.
- Starter CSS per challenge should style interactive states visibly (e.g., .selected highlighted, .dragging opacity, .open visible, .over-limit red, .correct green, .wrong red).
- The 15 challenges collectively unlock 10 patterns, bringing the cumulative library total to 44.
- Challenge 15 (Quiz App capstone) includes the full questions data array in its definition, not as a separate import.
- Challenges 11-14 unlock composite skills (keyboard nav, drag reorder, multi-step UI, tooltip positioning) that are documented as advanced techniques in the explanation text but do not create standalone pattern cards (the 10 pattern cards come from Challenges 1-10 and the capstone).

---

**Complexity Breakdown:**

```
Scenarios:    4 x 13 = 52  [new]
Systems:      1 (challenge engine) x 8 = 8  [established - Track 1]
Roles:        1 (learner) x 3 = 3           [established - Story 1]
Integrations: 0
Total: 63/100 (Moderate)
```

Note: The complexity is in authoring 15 challenge definitions with correct event test cases and timing specs, not in system architecture.
