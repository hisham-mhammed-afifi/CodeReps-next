# Story 9: Track Dashboard & Challenge Navigation

**Version:** v1.0 | **Last Updated:** 2026-03-21 | **Complexity:** 42/100 (Moderate)
**Dependencies:** Story 4
**PRD Reference:** -

---

**USER STORY**

As a beginner developer returning to practice,
I want a clear overview of where I am in Track 1 and what's next,
so that I can jump back into practice immediately without trying to remember my last session.

---

**ACCEPTANCE CRITERIA**

**Background:**

Given I am a signed-in user who has started Track 1

**Scenarios:**

Scenario 1: See my track progress at a glance

Given I navigate to the Track 1 dashboard
When the page loads
Then I should see all 15 challenges listed in order with their title, difficulty label, and estimated time
And completed challenges should show a completed indicator with the mode I used
And the current (next available) challenge should be visually prominent
And locked challenges should appear dimmed with a lock icon

Scenario 2: Jump into any available challenge directly

Given I am viewing the Track 1 dashboard
When I select any unlocked challenge (completed or in-progress)
Then I should navigate directly to that challenge's workspace
And if the challenge is in-progress, it should resume from where I left off
And if the challenge is completed, I should be able to re-attempt it

Scenario 3: Understand my overall progress without doing math

Given I have completed 8 of 15 challenges
When I view the dashboard
Then I should see a progress summary: challenges completed (8/15), patterns unlocked (count/19), and total time practiced
And the summary should make my progress feel rewarding, not like a grind
And my next recommended challenge should be clearly identified

---

**Additional Requirements:**

- The dashboard is the default landing page after sign-in for users who have started Track 1.
- New users who have not started Track 1 see a welcome state with an introduction to the 5-step framework and a prominent "Start Challenge 1" entry point.
- Difficulty labels use color coding paired with text: Easy (Emerald Green), Medium (Amber), Hard (Rose Red).
- The page uses skeleton loaders during data fetch.
- Challenge cards are keyboard-navigable.
- Progress summary uses actual data, not estimates or approximations.

---

**Complexity Breakdown:**

```
Scenarios:    3 x 13 = 39  [new]
Systems:      1 (challenge engine) x 8 = 8   [established - Story 1]
              (progress display - no new system, reads existing data)
Roles:        1 (learner) x 3 = 3            [established - Story 1]
Integrations: 0
Total: 42/100 (Moderate) - session-adjusted

Unadjusted: 56/100
```
