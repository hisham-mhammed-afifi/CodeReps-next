# Story 6: Independent Mode

**Version:** v1.0 | **Last Updated:** 2026-03-21 | **Complexity:** 37/100 (Simple)
**Dependencies:** Story 2
**PRD Reference:** REQ-010

---

**USER STORY**

As a beginner developer who has practiced the thinking framework multiple times,
I want to tackle a challenge with nothing but the problem statement and a blank editor,
so that I can prove to myself that I've internalized the problem-solving process and can work independently.

---

**ACCEPTANCE CRITERIA**

**Background:**

Given I am a signed-in user
And I have selected Independent mode for a challenge

**Scenarios:**

Scenario 1: Face the problem with minimal scaffolding

Given I enter a challenge in Independent mode
When the workspace loads
Then I should see only the problem statement (with examples) and the code editor
And the editor should contain only the function signature with an empty body
And no hint panels, breakdown blocks, concept tags, or guiding comments should be visible
And the interface should feel clean and focused

Scenario 2: Fall back to a supported mode if needed

Given I am working in Independent mode and feel stuck
When I choose to switch modes via the mode selector
Then I should be able to switch to Guided or Semi-Guided mode at any time
And my written code should be preserved when switching
And my attempt history should continue (not reset)

Scenario 3: Verification and completion work identically

Given I have written my solution in Independent mode
When I submit for verification
Then test cases, explanations, and pattern unlocks should behave exactly as in Guided mode
And my completion should be recorded with "independent" as the mode

---

**Additional Requirements:**

- Independent mode is available on Challenges 11-15 during first pass, and on all challenges after Track 1 completion.
- The mode selector is always visible in the workspace header regardless of current mode.
- Mode switches are tracked as `mode_switched` analytics events (from_mode, to_mode).
- Problem statement renders above the editor on all viewport sizes.

---

**Complexity Breakdown:**

```
Scenarios:    3 x 13 = 39  [new]
Systems:      1 (challenge engine) x 8 = 8   [established - Story 1]
              (absorbed - no new system)
Roles:        1 (learner) x 3 = 3            [established - Story 1]
Integrations: 0
Total: 37/100 (Simple) - session-adjusted

Unadjusted: 56/100
```
