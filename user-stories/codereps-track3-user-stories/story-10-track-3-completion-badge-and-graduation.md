# Story 10: Track 3 Completion, Badge & Graduation

**Version:** v1.0 | **Last Updated:** 2026-03-24 | **Complexity:** 50/100 (Moderate)
**Dependencies:** Story 7
**PRD Reference:** REQ-013

---

**USER STORY**

As a beginner developer who has worked through all 45 challenges across three tracks,
I want a meaningful graduation moment that celebrates the full journey and shows me what I've accomplished,
so that I feel the weight of going from "I can't solve problems" to "I can build interactive UIs from scratch" and know what to pursue next.

---

**ACCEPTANCE CRITERIA**

**Background:**

Given I am a signed-in user who has just completed Challenge 15 of Track 3

**Scenarios:**

Scenario 1: Earn the Event Wrangler badge on Track 3 completion

Given I have completed all 15 Track 3 challenges
When the Track 3 completion state triggers
Then the "Event Wrangler" badge should be awarded and persisted in user_badges
And a `badge_earned` event should fire with badge_slug "event-wrangler"
And the badge should be visible on my dashboard and profile

Scenario 2: Capstone no-hints distinction is tracked

Given I completed Challenge 15 in Independent mode without expanding any hint panels
When the Event Wrangler badge is awarded
Then the badge should include a "Completed without hints" label
And user_badges metadata should record `{"no_hints": true}`
And completing with hints still earns the full badge with `{"no_hints": false}`

Scenario 3: Three-track graduation summary celebrates the full journey

Given I have completed all three tracks (45 challenges total)
When the Track 3 completion screen appears
Then I should see a graduation summary spanning all three tracks: 45 challenges completed, 44 patterns unlocked, 2 badges earned (DOM Builder + Event Wrangler), total time practiced, and total attempts
And the moment should feel significantly more celebratory than individual track completions (longer animation, larger layout, congratulatory message)
And the `three_track_graduated` event should fire with total_time_seconds, total_attempts, and badges_earned

Scenario 4: Track 4 waitlist gate shows what's coming next

Given I am viewing the graduation screen
When I look for next steps
Then I should see a "What's Next" section listing future tracks: Async JS, CSS + JS Together, Mini Components, Real Patterns
And each future track should show a title, brief description, and a "Notify Me" button
And clicking "Notify Me" should capture my interest (email or flag on user record)
And the tone should be motivating: "You've built the foundation. Here's where it goes next."

Scenario 5: Revisit all tracks for independent practice

Given I have completed all three tracks
When I return to the dashboard
Then all 45 challenges across all three tracks should be available for re-attempt in any mode
And both badges should be visible on the dashboard
And my original completion data should remain intact

---

**Additional Requirements:**

- The graduation celebration uses the most prominent animation in the product: extended confetti (4 seconds), both badge icons animated in sequence, a brief "45/45 challenges, 44 patterns, 3 tracks" counter animation.
- Animation respects `prefers-reduced-motion`.
- The Track 4 waitlist is a simple mechanism: clicking "Notify Me" stores a flag on the user record (or a separate waitlist table entry). No email is sent immediately.
- The `capstone_completed` event fires with mode, hints_used, attempts, and total_time_seconds.
- The `track_completed` event fires with track_slug "events-interactions".
- The graduation screen should only appear when all three tracks are complete. If Track 3 is completed but Tracks 1 or 2 have missing challenges (edge case from revisiting), show the Track 3 completion only, not the graduation.
- Re-attempts on completed challenges never remove the original completed_at timestamp.

---

**Complexity Breakdown:**

```
Scenarios:    5 x 13 = 65  [new]
Systems:      1 (badge system) x 8 = 8       [established - Track 2]
              1 (challenge engine) x 8 = 8    [established - Track 1]
              (absorbed - reads existing data)
Roles:        1 (learner) x 3 = 3            [established - Story 1]
Integrations: 0
Total: 50/100 (Moderate) - session-adjusted

Unadjusted: 85/100
```

Note: Five scenarios push the raw score higher, but all systems are established. The new work is the graduation UI and waitlist mechanism, both of which are straightforward.
