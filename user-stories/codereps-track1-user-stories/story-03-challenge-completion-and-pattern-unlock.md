# Story 3: Challenge Completion & Pattern Unlock

**Version:** v1.0 | **Last Updated:** 2026-03-21 | **Complexity:** 50/100 (Moderate)
**Dependencies:** Story 2
**PRD Reference:** REQ-006, REQ-007

---

**USER STORY**

As a beginner developer who just passed all test cases,
I want to see what pattern I discovered and why it matters in real development,
so that I build a growing mental toolkit of reusable problem-solving strategies I can recognize and apply in future challenges.

---

**ACCEPTANCE CRITERIA**

**Background:**

Given I am a signed-in user
And I have submitted code that passes all test cases for a challenge

**Scenarios:**

Scenario 1: Receive a meaningful explanation after success

Given all test cases have passed
When the success state activates
Then I should see the challenge's explanation text below the test results
And the explanation should highlight the pattern name in bold
And the explanation should connect the pattern to at least one real-world use case
And I should understand why this pattern matters beyond this specific challenge

Scenario 2: Earn a pattern card as a tangible reward

Given the explanation has been displayed
When the pattern unlock triggers
Then a pattern card should animate into view (fade + scale, not a modal popup)
And the card should show the pattern name, plain-English description, and JS code snippet
And if the challenge unlocks multiple patterns, they should appear sequentially
And each card should link back to the source challenge for future reference

Scenario 3: Continue my momentum after completion

Given I have reviewed the explanation and pattern card(s)
When I choose to continue
Then I should be able to proceed directly to the next challenge
Or I should be able to return to the track view to see my updated progress
And my completion should feel celebratory without blocking my flow

---

**Additional Requirements:**

- Success triggers a subtle confetti animation (2 seconds, brand accent colors: Emerald Green, Amber, Electric Indigo). Particles fall from top. Animation is dismissable.
- Confetti respects `prefers-reduced-motion` by not rendering.
- Pattern unlock triggers a toast notification (bottom-right desktop, bottom-center mobile). Auto-dismisses after 4 seconds.
- No modal popups for any in-challenge success event.
- Pattern cards use Clean White (#FAFAFA) background with Electric Indigo accent for the pattern name.

---

**Complexity Breakdown:**

```
Scenarios:    3 x 13 = 39  [new]
Systems:      1 (challenge engine) x 8 = 8   [established - Story 1]
Roles:        1 (learner) x 3 = 3            [established - Story 1]
Integrations: 0
Total: 50/100 (Moderate)
```
