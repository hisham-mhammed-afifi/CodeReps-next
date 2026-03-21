# Story 7: Mode Selection & Progression Rules

**Version:** v1.0 | **Last Updated:** 2026-03-21 | **Complexity:** 50/100 (Moderate)
**Dependencies:** Stories 5, 6
**PRD Reference:** REQ-011

---

**USER STORY**

As a beginner developer progressing through Track 1,
I want the platform to gradually give me more independence as I advance,
so that I build confidence progressively rather than being overwhelmed with choices too early or held back when I'm ready.

---

**ACCEPTANCE CRITERIA**

**Background:**

Given I am a signed-in user navigating Track 1 challenges

**Scenarios:**

Scenario 1: Early challenges enforce guided learning (Challenges 1-5)

Given I am attempting a challenge in the 1-5 range for the first time
When I open the challenge workspace
Then the challenge should load directly in Guided mode
And no mode selector should appear (Guided is the only option)
And I should experience the full 5-step framework without shortcuts

Scenario 2: Mid-range challenges introduce choice (Challenges 6-10)

Given I am attempting a challenge in the 6-10 range
When I open the challenge workspace
Then I should be prompted to choose between Guided and Semi-Guided mode
And the prompt should briefly explain the difference between the two modes
And my choice should be recorded and used as the default for the session

Scenario 3: Advanced challenges offer full independence (Challenges 11-15)

Given I am attempting a challenge in the 11-15 range
When I open the challenge workspace
Then I should be able to choose from Guided, Semi-Guided, or Independent mode
And Independent mode should be visually encouraged (e.g., highlighted or labeled "Try it!")
And I should still be able to pick Guided or Semi-Guided without judgment

Scenario 4: Completed track unlocks all modes everywhere

Given I have completed all 15 challenges in Track 1
When I revisit any challenge (including Challenges 1-5)
Then all three modes should be available via the mode selector
And I should be able to re-attempt any challenge in Independent mode for additional practice

---

**Additional Requirements:**

- Mode selection is tracked via the `mode_selected` analytics event (challenge_id, selected_mode).
- The mode prompt appears once when entering the challenge. After selection, the user can still switch modes via the workspace header selector (Stories 5 and 6 cover this behavior).
- Mode availability rules are enforced server-side to prevent bypassing via URL manipulation.
- The mode prompt should never feel like a test or judgment. Language should be encouraging: "Ready to try with less guidance?" not "Choose your difficulty level."

---

**Complexity Breakdown:**

```
Scenarios:    4 x 13 = 52  [new]
Systems:      1 (challenge engine) x 8 = 8   [established - Story 1]
              (absorbed - mode rules layer onto existing engine)
Roles:        1 (learner) x 3 = 3            [established - Story 1]
Integrations: 0
Total: 50/100 (Moderate) - session-adjusted

Unadjusted: 66/100
```
