# Story 2: Code Writing & Test Verification

**Version:** v1.0 | **Last Updated:** 2026-03-21 | **Complexity:** 76/100 (Complex)
**Dependencies:** Story 1
**PRD Reference:** REQ-004, REQ-005, REQ-016

---

**USER STORY**

As a beginner developer who has just thought through a problem step by step,
I want to write my solution in a real code editor and immediately see whether it works against test cases,
so that I get fast, concrete feedback on my code without needing to set up a development environment.

---

**ACCEPTANCE CRITERIA**

**Background:**

Given I am a signed-in user
And I have completed the thinking steps (or entered Semi-Guided/Independent mode)

**Scenarios:**

Scenario 1: Write code with guided starter scaffolding (Step 4 - Write)

Given the code editor loads with the challenge's starter code
And the starter code includes a function signature and step-by-step comments
When I write my solution in the editor
Then I should have syntax highlighting, auto-indentation, and bracket matching
And I should be able to undo/redo my changes
And I should be able to reset to the original starter code at any time

Scenario 2: Run tests and see clear results (Step 5 - Verify)

Given I have written code in the editor
When I submit my solution for verification
Then each test case should display the function call, expected output, and actual output
And passing tests should show a green check with "Passed"
And failing tests should show a red X with a side-by-side expected vs. actual comparison
And I should be able to edit my code and resubmit without limits

Scenario 3: Receive helpful feedback on runtime errors

Given I have submitted code that contains a runtime error
When the sandbox executes my code
Then I should see the error message translated into plain language
And the error should reference the relevant line number in my code
And I should not see raw stack traces or internal sandbox errors

Scenario 4: Code execution respects safety boundaries

Given I have submitted code that contains an infinite loop or heavy computation
When the sandbox execution exceeds 5 seconds
Then execution should be terminated
And I should see a clear message: "Your code took too long. Check for infinite loops."
And the editor should remain functional so I can fix and resubmit

---

**Additional Requirements:**

- Code editor uses Monaco Editor with JetBrains Mono font and Deep Navy background matching the brand theme.
- All code execution happens in Sandpack (browser sandbox). No user code is ever sent to or executed on the server.
- Minimum editor height: 300px on desktop, 200px on mobile.
- On desktop (>= 1024px), the editor occupies the right pane (60% width) with a draggable divider. Below 1024px, the editor renders below the guidance content at full width.
- Test results render below the editor (not in a modal or separate page).
- The editor must be keyboard-navigable and support screen reader announcements for test results.

---

**Complexity Breakdown:**

```
Scenarios:      4 x 13 = 52  [new]
Systems:        1 (challenge engine) x 8 = 8  [established - Story 1]
                1 (code sandbox) x 20 = 20  [new]
Roles:          1 (learner) x 3 = 3  [established - Story 1]
Integrations:   0 (Monaco and Sandpack are bundled libraries, not external services)
Total: 83/100 -> adjusted to 76/100 after session registry

Unadjusted score: 104/100
```

Note: Without session registry, this story would flag. The challenge engine and learner role carry over from Story 1, bringing it under threshold. The code sandbox is a genuinely new system requiring its own setup and error handling.
