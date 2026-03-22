# Story 9: Track 2 Completion & Track 3 Gate

**Version:** v1.0 | **Last Updated:** 2026-03-22 | **Complexity:** 37/100 (Simple)
**Dependencies:** Story 8
**PRD Reference:** -

---

**USER STORY**

As a beginner developer who has conquered all 15 DOM manipulation challenges and earned the DOM Builder badge,
I want a meaningful completion moment that celebrates how far I've come and shows me that events and interactions are next,
so that I feel proud of mastering the DOM and motivated to keep going.

---

**ACCEPTANCE CRITERIA**

**Background:**

Given I am a signed-in user who has just completed Challenge 15 and received the DOM Builder badge

**Scenarios:**

Scenario 1: Experience a rewarding Track 2 completion moment

Given the badge has been awarded
When the Track 2 completion screen appears
Then I should see a summary of my journey: challenges completed (15/15), patterns unlocked (15 new, 34 total), DOM Builder badge earned, total time practiced, and total attempts
And the completion should feel more significant than individual challenge completions (longer celebration, more prominent layout)
And if I earned the no-hints distinction, it should be highlighted in the summary

Scenario 2: See Track 3 as the clear next step

Given I am viewing the Track 2 completion screen
When I look for what comes next
Then I should see a "Track 3: Events & Interactions" card in an unlocked state
And the card should include the track title, brief description, and an entry point to begin
And I should understand that Track 3 builds on the DOM patterns I just learned (e.g., "Now make the page respond to users")

Scenario 3: Revisit Track 2 for independent practice

Given I have completed Track 2
When I return to the Track 2 dashboard
Then all 15 challenges should be available for re-attempt in any mode
And my original completion data should remain intact (not overwritten)
And the DOM Builder badge should be visible on the Track 2 dashboard header

---

**Additional Requirements:**

- The `track_completed` event fires with: user_id, track_slug "dom-manipulation", total_time_seconds, total_attempts.
- The `capstone_completed` event fires with: mode, hints_used count, attempts, total_time_seconds.
- Completion celebration uses a more prominent animation than individual challenges (longer confetti, badge reveal animation, 3-4 seconds).
- Animation respects `prefers-reduced-motion`.
- Track 3 card shows a "Coming soon" state if Track 3 content is not yet available, with an option to be notified when it launches.
- The completion screen tracks the transition funnel: track_completed (Track 2) > challenge_started (Track 3 C1).
- Re-attempts create new user_progress entries but never remove the original completed_at timestamp.

---

**Complexity Breakdown:**

```
Scenarios:    3 x 13 = 39  [new]
Systems:      1 (challenge engine) x 8 = 8    [established - Track 1]
              1 (badge system) x 8 = 8        [established - Story 8]
              (absorbed - completion screen reads existing data)
Roles:        1 (learner) x 3 = 3             [established - Story 1]
Integrations: 0
Total: 37/100 (Simple) - session-adjusted

Unadjusted: 56/100
```
