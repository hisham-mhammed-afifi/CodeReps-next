# Story 1: Guided Problem-Solving Walkthrough

**Version:** v1.0 | **Last Updated:** 2026-03-21 | **Complexity:** 82/100 (Complex)
**Dependencies:** None (start here)
**PRD Reference:** REQ-001, REQ-002, REQ-003, REQ-008

---

**USER STORY**

As a beginner developer who knows JavaScript syntax but freezes at blank editors,
I want to be walked through a structured thinking process before I write any code,
so that I build a repeatable mental model for breaking down problems I can apply to any future challenge.

---

**ACCEPTANCE CRITERIA**

**Background:**

Given I am a signed-in user
And I have opened a challenge in Guided mode

**Scenarios:**

Scenario 1: Rewrite the problem in my own words (Step 1 - Understand)

Given the challenge problem statement is displayed
When I write my own rephrasing of the problem (minimum 10 characters)
And I submit my rephrasing
Then I should see the expected understanding as a collapsible reference block
And I should be able to compare my thinking to the reference
And I should confirm understanding to advance to the next step

Scenario 2: Arrange the breakdown into logical steps (Step 2 - Break Down)

Given I have completed the Understand step
And I see a set of pre-written breakdown blocks in randomized order
When I drag and arrange the blocks into the correct sequence
And I submit my arrangement
Then correctly placed blocks should lock in place with a success indicator
And misplaced blocks should be highlighted with a brief corrective hint
And I should be able to retry until the order is correct before advancing

Scenario 3: Identify the right JavaScript concepts (Step 3 - Map to Code)

Given I have completed the Break Down step
And I see a set of concept tags (both correct and distractor concepts)
When I select the concepts I believe are needed to solve the problem
And I submit my selection
Then correct picks should be confirmed with a brief explanation of why they apply
And incorrect picks should be flagged with an explanation of why they don't fit
And a system hint should appear connecting the selected concepts to my earlier breakdown
And I should be able to proceed to the coding step

Scenario 4: Step progression enforces sequential completion

Given I am working through a challenge in Guided mode
When I have not yet completed the current step
Then the next step should remain inaccessible
And completed steps should display a green check indicator
And the current step should be highlighted with the primary brand color
And I should not be able to skip ahead to a later step

---

**Additional Requirements:**

- Step transitions use a horizontal slide animation (300ms ease-in-out) with content fade-in (200ms). Steps never swap instantly.
- On desktop (>= 1024px), guidance content renders in the left pane (40% width). On viewports below 1024px, steps stack vertically above the editor area.
- The drag-and-drop interface in Step 2 must have a keyboard alternative (arrow keys to reorder, Enter to confirm) for accessibility.
- All step content, indicators, and feedback must be screen-reader accessible.
- Animations respect `prefers-reduced-motion` by reducing to instant transitions.
- Step 1 free-text input has a placeholder: "Rewrite this problem in your own words."

---

**Complexity Breakdown:**

```
Scenarios:    4 x 13 = 52  [new]
Systems:      1 (challenge engine) x 20 = 20  [new]
Roles:        1 (learner) x 10 = 10  [new]
Integrations: 0
Total: 82/100 (Complex)
```

Note: Score is high because this is the foundational story establishing the challenge engine and learner role. Subsequent stories reuse these components at reduced weight.
