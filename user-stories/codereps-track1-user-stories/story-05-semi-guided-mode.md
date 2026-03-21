# Story 5: Semi-Guided Mode

**Version:** v1.0 | **Last Updated:** 2026-03-21 | **Complexity:** 37/100 (Simple)
**Dependencies:** Story 2
**PRD Reference:** REQ-009

---

**USER STORY**

As a beginner developer gaining confidence after the first few guided challenges,
I want to try coding with thinking steps available as optional hints rather than mandatory gates,
so that I can test how much of the thinking process I've internalized while still having a safety net.

---

**ACCEPTANCE CRITERIA**

**Background:**

Given I am a signed-in user
And I have selected Semi-Guided mode for a challenge

**Scenarios:**

Scenario 1: Start directly in the code editor with hints nearby

Given I enter a challenge in Semi-Guided mode
When the workspace loads
Then the code editor should be immediately active with the function signature (no step-by-step comments)
And Steps 1-3 (Understand, Break Down, Map to Code) should appear as collapsed accordion panels alongside the editor
And the panels should be collapsed by default
And I should not be required to open any panel before coding

Scenario 2: Access thinking steps on demand without penalty

Given I am coding in Semi-Guided mode and feel stuck
When I expand a hint panel (e.g., Step 2 - Break Down)
Then the full content of that step should be visible (same content as Guided mode)
And I should be able to collapse it again at any time
And expanding a panel should not reset my code or progress

Scenario 3: Test verification works the same as Guided mode

Given I have written my solution in Semi-Guided mode
When I submit for verification
Then test cases should run with the same pass/fail display as Guided mode
And on all-pass, I should see the explanation and pattern unlock as normal
And on failure, I should be able to edit and resubmit

---

**Additional Requirements:**

- On desktop, hint panels render as a collapsible sidebar on the left. On mobile (< 1024px), panels render as expandable sections above the editor.
- Each panel expansion is tracked as a `hint_panel_opened` analytics event with the step name.
- The editor loads with the function signature only (no guiding comments in the code body).
- Semi-Guided mode is available on Challenges 6-15 during first pass, and on all challenges after Track 1 completion.

---

**Complexity Breakdown:**

```
Scenarios:    3 x 13 = 37  [new]
Systems:      1 (challenge engine) x 8 = 8   [established - Story 1]
              (absorbed into scenario weight - no new system)
Roles:        1 (learner) x 3 = 3            [established - Story 1]
Integrations: 0
Total: 37/100 (Simple) - session-adjusted

Unadjusted: 56/100
```

Note: This story layers a mode variant onto the existing challenge engine. No new systems or integrations, keeping complexity low.
