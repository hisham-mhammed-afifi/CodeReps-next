# Story 6: Track 2 Mode Progression Rules

**Version:** v1.0 | **Last Updated:** 2026-03-22 | **Complexity:** 37/100 (Simple)
**Dependencies:** Story 5
**PRD Reference:** REQ-011

---

**USER STORY**

As a Track 1 graduate starting Track 2,
I want the platform to give me slightly more independence than Track 1 did from the start, since I already know the framework,
so that I'm not forced through full guidance on easy DOM concepts and can advance to semi-guided or independent faster.

---

**ACCEPTANCE CRITERIA**

**Background:**

Given I am a signed-in user who has completed Track 1
And I am working through Track 2 challenges

**Scenarios:**

Scenario 1: Early challenges default to Guided with Semi-Guided available (Challenges 1-5)

Given I open a Track 2 challenge in the 1-5 range
When the mode selection appears
Then I should be offered Guided (default) and Semi-Guided as options
And Independent should not be available yet
And the prompt should acknowledge I know the framework: "You've done this before. Guided or semi-guided?"

Scenario 2: Mid-range challenges open all modes with Semi-Guided as default (Challenges 6-10)

Given I open a Track 2 challenge in the 6-10 range
When the mode selection appears
Then all three modes should be available (Guided, Semi-Guided, Independent)
And Semi-Guided should be the default/highlighted option
And I should be able to pick any mode without judgment

Scenario 3: Advanced challenges encourage Independent mode (Challenges 11-15)

Given I open a Track 2 challenge in the 11-15 range
When the mode selection appears
Then all three modes should be available
And Independent should be the default/highlighted option
And for Challenge 15 (capstone), a note should appear: "Try it without hints for the full DOM Builder badge"

---

**Additional Requirements:**

- Mode availability is enforced server-side (same as Track 1 Story 7) to prevent URL bypassing.
- Mode selection is tracked via the `mode_selected` analytics event.
- After Track 2 completion, all modes are available on all Track 2 challenges (same pattern as Track 1).
- The mode progression rules are driven by the challenge's track and order, not hardcoded to specific challenge IDs. This allows future tracks to define their own progression curves.

---

**Complexity Breakdown:**

```
Scenarios:    3 x 13 = 39  [new]
Systems:      1 (challenge engine) x 8 = 8  [established - Track 1]
Roles:        1 (learner) x 3 = 3           [established - Story 1]
Integrations: 0
Total: 37/100 (Simple) - session-adjusted

Unadjusted: 56/100
```
