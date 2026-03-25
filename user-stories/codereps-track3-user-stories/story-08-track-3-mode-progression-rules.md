# Story 8: Track 3 Mode Progression Rules

**Version:** v1.0 | **Last Updated:** 2026-03-24 | **Complexity:** 37/100 (Simple)
**Dependencies:** Story 7
**PRD Reference:** REQ-012

---

**USER STORY**

As a Track 2 graduate starting Track 3,
I want the platform to continue the same independence progression I experienced in Track 2,
so that I start guided on new event concepts but move to independent quickly as the patterns become familiar.

---

**ACCEPTANCE CRITERIA**

**Background:**

Given I am a signed-in user who has completed Tracks 1 and 2
And I am working through Track 3 challenges

**Scenarios:**

Scenario 1: Early event challenges default to Guided (Challenges 1-5)

Given I open a Track 3 challenge in the 1-5 range
When the mode selection appears
Then I should be offered Guided (default) and Semi-Guided
And Independent should not be available yet
And the prompt should frame events as new territory: "Events are new. Guided or semi-guided?"

Scenario 2: Mid-range challenges open all modes with Semi-Guided default (Challenges 6-10)

Given I open a Track 3 challenge in the 6-10 range
When the mode selection appears
Then all three modes should be available
And Semi-Guided should be the default/highlighted option

Scenario 3: Advanced challenges encourage Independent (Challenges 11-15)

Given I open a Track 3 challenge in the 11-15 range
When the mode selection appears
Then all three modes should be available
And Independent should be the default/highlighted option
And for Challenge 15 (capstone), a note should appear: "Complete without hints for the full Event Wrangler badge"

---

**Additional Requirements:**

- Mode availability is enforced server-side, same as Tracks 1 and 2.
- Mode selection is tracked via the `mode_selected` analytics event.
- After Track 3 completion, all modes are available on all Track 3 challenges.
- Mode progression rules are driven by the challenge's track and order, not hardcoded to IDs. This is the same system used for Tracks 1 and 2.

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
