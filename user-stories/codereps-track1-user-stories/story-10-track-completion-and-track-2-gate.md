# Story 10: Track 1 Completion & Track 2 Gate

**Version:** v1.0 | **Last Updated:** 2026-03-21 | **Complexity:** 37/100 (Simple)
**Dependencies:** Story 4
**PRD Reference:** -

---

**USER STORY**

As a beginner developer who has worked through all 15 fundamentals challenges,
I want a meaningful completion moment that celebrates my growth and shows me what's next,
so that I feel a real sense of accomplishment and motivation to continue to the next track.

---

**ACCEPTANCE CRITERIA**

**Background:**

Given I am a signed-in user who has just completed Challenge 15

**Scenarios:**

Scenario 1: Experience a rewarding completion moment

Given I have passed all tests on Challenge 15 and viewed the final pattern card
When the track completion state activates
Then I should see a dedicated completion screen summarizing my journey
And the summary should include: total patterns unlocked (19/19), total challenges completed (15/15), total time practiced, and total attempts across all challenges
And the moment should feel celebratory and earned, not like a generic "congratulations" banner

Scenario 2: See the path forward with Track 2

Given I am viewing the Track 1 completion screen
When I look for next steps
Then I should see a Track 2: DOM Manipulation card in an unlocked state
And the card should include the track title, brief description, and an entry point to begin
And I should understand that Track 2 builds on the patterns I just learned

Scenario 3: Revisit Track 1 for independent practice

Given I have completed Track 1
When I return to the Track 1 dashboard
Then all 15 challenges should be available for re-attempt
And all three modes (Guided, Semi-Guided, Independent) should be unlocked on every challenge
And my original completion data should remain intact (not overwritten by re-attempts)

---

**Additional Requirements:**

- The `track_completed` event fires with: user_id, track_slug, total_time_seconds, total_attempts.
- The completion screen uses a more prominent celebration animation than individual challenge completions (longer confetti, brand-colored, with a brief pause before showing the summary).
- Animation respects `prefers-reduced-motion`.
- The Track 2 card shows a "Coming soon" state if Track 2 content is not yet available, with an option to be notified when it launches.
- Re-attempts on completed challenges create new `user_progress` entries (or update existing ones) but never remove the original `completed_at` timestamp.

---

**Complexity Breakdown:**

```
Scenarios:    3 x 13 = 39  [new]
Systems:      1 (challenge engine) x 8 = 8   [established - Story 1]
              (no new system - reads existing progress data)
Roles:        1 (learner) x 3 = 3            [established - Story 1]
Integrations: 0
Total: 37/100 (Simple) - session-adjusted

Unadjusted: 56/100
```
