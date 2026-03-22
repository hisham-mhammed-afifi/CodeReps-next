# Story 8: Badge System & DOM Builder Badge

**Version:** v1.0 | **Last Updated:** 2026-03-22 | **Complexity:** 63/100 (Moderate)
**Dependencies:** Story 5
**PRD Reference:** REQ-012, new tables (badges, user_badges)

---

**USER STORY**

As a beginner developer who has worked through all 15 DOM challenges,
I want to earn a tangible badge that recognizes my achievement and distinguishes how I completed the capstone,
so that I feel a real sense of accomplishment and have visible proof of my DOM manipulation skills.

---

**ACCEPTANCE CRITERIA**

**Background:**

Given the badges and user_badges tables exist in the database

**Scenarios:**

Scenario 1: Earn the DOM Builder badge on Track 2 completion

Given I have completed all 15 Track 2 challenges (all tests passed)
When the Track 2 completion state triggers
Then the "DOM Builder" badge should be awarded to my account
And the badge should be persisted in the user_badges table with earned_at timestamp
And a `badge_earned` analytics event should fire with badge_slug "dom-builder"

Scenario 2: Capstone no-hints distinction is tracked

Given I completed Challenge 15 in Independent mode without expanding any hint panels
When the DOM Builder badge is awarded
Then the badge should include a "Completed without hints" label/distinction
And the user_badges metadata field should record `{"no_hints": true}`
And the distinction should be visible wherever the badge is displayed

Scenario 3: Badge is visible on my dashboard and profile

Given I have earned the DOM Builder badge
When I view my dashboard or profile
Then the badge should appear with its icon, name, and the date I earned it
And if I earned the no-hints distinction, it should be visually indicated (e.g., a subtle star or glow)
And the badge should link back to Track 2 for context

Scenario 4: Capstone with hints still earns the full badge

Given I completed Challenge 15 but used hint panels during my attempt
When the DOM Builder badge is awarded
Then I should still receive the full badge (no penalty)
And the metadata should record `{"no_hints": false}`
And the badge should not feel diminished or lesser than the no-hints version
And the no-hints distinction should feel like a bonus, not a requirement

---

**Additional Requirements:**

- The badges table stores: id, slug, name, description, icon, track_id (nullable FK).
- The user_badges table stores: id, user_id, badge_id, earned_at, metadata (jsonb, nullable).
- Badge award logic runs server-side after the final challenge_completed event for Track 2.
- The system checks all 15 challenges have status "completed" before awarding.
- For the no-hints check: query whether any `hint_panel_opened` event was recorded for Challenge 15 in the user's current completion attempt.
- Badge design follows brand guidelines: Electric Indigo primary, geometric/minimal icon, works at small sizes (32x32 for dashboard, 64x64 for profile).
- The badge system is extensible. Future tracks can define their own badges using the same tables and logic pattern.
- Only one DOM Builder badge per user (idempotent). Re-completing Track 2 does not award a duplicate.

---

**Complexity Breakdown:**

```
Scenarios:    4 x 13 = 52  [new]
Systems:      1 (badge system) x 20 = 20   [new]
Roles:        1 (learner) x 3 = 3          [established - Story 1]
Integrations: 0
Total: 63/100 (Moderate) - session-adjusted

Unadjusted: 82/100
```

Note: The badge system is new infrastructure (new tables, new award logic, new UI display), which drives the score up. But the logic is straightforward: check completion, insert record, render badge.
