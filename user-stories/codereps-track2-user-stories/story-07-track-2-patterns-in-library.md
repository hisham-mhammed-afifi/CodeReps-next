# Story 7: Track 2 Patterns in the Pattern Library

**Version:** v1.0 | **Last Updated:** 2026-03-22 | **Complexity:** 37/100 (Simple)
**Dependencies:** Story 5
**PRD Reference:** REQ-016

---

**USER STORY**

As a beginner developer building a collection of problem-solving patterns,
I want my new DOM manipulation patterns to appear in the same Pattern Library alongside my Track 1 patterns,
so that I have a single growing reference of everything I've learned, organized by track.

---

**ACCEPTANCE CRITERIA**

**Background:**

Given I am a signed-in user who has completed at least one Track 2 challenge

**Scenarios:**

Scenario 1: Track 2 patterns appear under a dedicated section

Given I navigate to the Pattern Library
When the page loads
Then I should see patterns grouped by track: "Fundamentals" (Track 1) and "DOM Manipulation" (Track 2)
And each group should have a visible section header with the track name
And Track 2 patterns should show the DOM methods involved (e.g., querySelector, createElement, classList.toggle)

Scenario 2: Cumulative count reflects both tracks

Given I have unlocked 19 Track 1 patterns and 8 Track 2 patterns
When I view the Pattern Library
Then the progress indicator should show "27 of 34 patterns unlocked"
And the count should span both tracks (not per-track counters only)
And locked Track 2 patterns should appear as dimmed placeholders, same as Track 1

Scenario 3: Pattern cards link to the correct Track 2 source challenge

Given I select an unlocked Track 2 pattern card (e.g., "Create and Append")
When the detail view opens
Then it should link to the Track 2 challenge that unlocked it (Challenge 02: Build a Profile Card)
And clicking the link should navigate me to that challenge's workspace
And the pattern detail should show the DOM-specific code example with syntax highlighting

---

**Additional Requirements:**

- Track grouping is driven by the `track_id` on each pattern record. No hardcoded grouping logic.
- The section headers ("Fundamentals", "DOM Manipulation") use the track's title field from the tracks table.
- Grid layout is the same as Track 1 patterns: 3 columns desktop, 2 tablet, 1 mobile.
- Pattern cards for Track 2 use the same visual design as Track 1 (Clean White background, Electric Indigo pattern name), but DOM patterns include a small "DOM" tag/badge to visually distinguish them from logic patterns.
- Existing `pattern_library_viewed` event now includes `patterns_unlocked_count` spanning both tracks.

---

**Complexity Breakdown:**

```
Scenarios:    3 x 13 = 39  [new]
Systems:      1 (pattern library) x 8 = 8   [established - Track 1]
Roles:        1 (learner) x 3 = 3           [established - Story 1]
Integrations: 0
Total: 37/100 (Simple) - session-adjusted

Unadjusted: 56/100
```
