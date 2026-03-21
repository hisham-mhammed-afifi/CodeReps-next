# Story 4: Challenge Progress & Sequential Unlock

**Version:** v1.0 | **Last Updated:** 2026-03-21 | **Complexity:** 63/100 (Moderate)
**Dependencies:** Story 3
**PRD Reference:** REQ-012

---

**USER STORY**

As a beginner developer practicing in short sessions,
I want my progress saved automatically and the next challenge unlocked when I complete one,
so that I can pick up exactly where I left off and always have a clear next step waiting for me.

---

**ACCEPTANCE CRITERIA**

**Background:**

Given I am a signed-in user working through Track 1

**Scenarios:**

Scenario 1: Progress persists across sessions

Given I have partially completed a challenge (e.g., finished Steps 1-3 but not submitted code)
When I close the browser and return later
Then my challenge should load with my previous progress intact
And my written code should be restored in the editor
And completed steps should remain marked as done
And I should resume from the step where I left off

Scenario 2: Completing a challenge unlocks the next one

Given I have completed Challenge N by passing all tests
When I return to the track view
Then Challenge N+1 should be visible and accessible
And Challenge N should display a completed status indicator
And all challenges beyond N+1 should remain locked with a visual lock state

Scenario 3: Progress tracking captures attempt history

Given I am working on a challenge
When I submit code (whether it passes or fails)
Then the system should record my attempt count, time spent, mode used, and submitted code
And this data should persist so I can see my effort history for each challenge

Scenario 4: First challenge is always accessible

Given I am a new user who has never started Track 1
When I enter the Track 1 view
Then Challenge 1 should be unlocked and ready to start
And Challenges 2-15 should be locked
And the track should clearly communicate "Start here" for Challenge 1

---

**Additional Requirements:**

- Progress auto-saves on each step completion and code submission. No manual "save" action required.
- Progress data stored: status (not_started / in_progress / completed), mode, attempts, completed_at, user_solution, time_spent_seconds.
- Locked challenges show a dimmed card with a lock icon. No interaction beyond viewing the title and difficulty.
- Loading states use skeleton loaders, not spinners.
- If a save fails due to network issues, show a non-blocking toast: "Progress couldn't save. We'll retry automatically." Retry with exponential backoff (3 attempts).

---

**Complexity Breakdown:**

```
Scenarios:      4 x 13 = 52  [new]
Systems:        1 (challenge engine) x 8 = 8   [established - Story 1]
Roles:          1 (learner) x 3 = 3            [established - Story 1]
Integrations:   0
Total: 63/100 (Moderate)
```
