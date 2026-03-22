# Story 5: Track 2 Challenge Content

**Version:** v1.0 | **Last Updated:** 2026-03-22 | **Complexity:** 63/100 (Moderate)
**Dependencies:** Story 4
**PRD Reference:** REQ-013, REQ-014, REQ-015

---

**USER STORY**

As a beginner developer who has completed Track 1,
I want 15 progressively challenging DOM manipulation problems that follow the same guided framework I already trust,
so that I can transfer my problem-solving process to the browser DOM and build real frontend skills.

---

**ACCEPTANCE CRITERIA**

**Background:**

Given the challenge engine supports Starter HTML, Starter CSS, and DOM test cases
And the Live Preview Panel and DOM-aware test runner are functional

**Scenarios:**

Scenario 1: All 15 challenges load with valid data

Given Track 2 is unlocked for a user who completed Track 1
When the user browses the Track 2 challenge list
Then all 15 challenges should be present, ordered by difficulty (Easy 1-5, Medium 6-10, Hard 11-15)
And each challenge should have: title, difficulty label, estimated time, problem statement, starter code, starter HTML, starter CSS, solution(s), explanation, breakdown blocks, concept options, test cases, and DOM test cases
And no challenge should have missing or placeholder fields

Scenario 2: Starter HTML renders correctly in the preview

Given the user opens any Track 2 challenge
When the workspace loads
Then the Starter HTML and Starter CSS should render in the Live Preview Panel
And the preview should visually match the intended design for that challenge (styled, not raw HTML)
And the Starter HTML structure should match what the problem statement describes

Scenario 3: Multi-approach challenges accept all valid solutions

Given the user is working on Challenge 10 (Data Attributes) or Challenge 15 (Dynamic Filter UI)
When the user submits a valid solution using a different approach than the primary solution
Then all test cases (both return-value and DOM) should pass
And the user should receive the same completion flow (explanation + pattern unlock)

Scenario 4: Challenge definitions conform to the extended type

Given the ChallengeDefinition interface has been extended with starterHTML, starterCSS, requiresPreview, and domTestCases
When each challenge definition file is loaded
Then TypeScript should compile without errors
And all required fields should be present and correctly typed
And `requiresPreview` should be true for all 15 challenges

---

**Additional Requirements:**

- Challenge definitions live in `src/lib/challenges/dom-manipulation/` following the same file pattern as Track 1.
- All challenge content (problem statements, hints, explanations, test cases) is sourced from the Track 2 Challenge Design Document. No placeholder or AI-generated content.
- Starter CSS per challenge should make the preview look presentable (basic layout, readable font, visible structure) without being the focus of the challenge.
- Each challenge's concepts array uses DOM-specific terms: querySelector, querySelectorAll, createElement, appendChild, classList, textContent, innerHTML, dataset, cloneNode, insertBefore, remove, createDocumentFragment, createTextNode, parentElement, nextSibling, Array.from, template.content.
- The 15 challenges collectively unlock 15 patterns, bringing the cumulative library total to 34.

---

**Complexity Breakdown:**

```
Scenarios:    4 x 13 = 52  [new]
Systems:      1 (challenge engine) x 8 = 8  [established - Track 1]
Roles:        1 (learner) x 3 = 3           [established - Story 1]
Integrations: 0
Total: 63/100 (Moderate)
```

Note: The complexity is in authoring 15 challenge definitions with correct DOM test cases, not in system architecture. The challenge engine is reused from Track 1.
