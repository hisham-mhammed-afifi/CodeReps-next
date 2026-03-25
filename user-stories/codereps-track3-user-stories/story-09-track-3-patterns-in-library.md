# Story 9: Track 3 Patterns in the Pattern Library

**Version:** v1.0 | **Last Updated:** 2026-03-24 | **Complexity:** 37/100 (Simple)
**Dependencies:** Story 7
**PRD Reference:** REQ-016

---

**USER STORY**

As a beginner developer building my pattern collection,
I want my new event-handling patterns to join my existing Fundamentals and DOM patterns in one library,
so that I have a complete 44-pattern reference covering logic, DOM manipulation, and interactivity.

---

**ACCEPTANCE CRITERIA**

**Background:**

Given I am a signed-in user who has completed at least one Track 3 challenge

**Scenarios:**

Scenario 1: Track 3 patterns appear under a dedicated section

Given I navigate to the Pattern Library
When the page loads
Then I should see patterns grouped under three track sections: "Fundamentals" (19), "DOM Manipulation" (15), and "Events & Interactions" (10)
And Track 3 patterns should show the event types and methods involved (e.g., addEventListener, event.target, setTimeout)

Scenario 2: Cumulative count reflects all three tracks

Given I have unlocked 19 Track 1 patterns, 15 Track 2 patterns, and 6 Track 3 patterns
When I view the Pattern Library
Then the progress indicator should show "40 of 44 patterns unlocked"
And the count should span all three tracks
And locked Track 3 patterns should appear as dimmed placeholders

Scenario 3: Pattern cards link to the correct Track 3 source challenge

Given I select an unlocked Track 3 pattern card (e.g., "Event Delegation")
When the detail view opens
Then it should link to Track 3 Challenge 05: Event Delegation - Clickable List
And clicking the link should navigate to that challenge's workspace
And the pattern detail should show event-specific code examples with syntax highlighting

---

**Additional Requirements:**

- Track grouping is driven by `track_id` on each pattern record. No hardcoded grouping.
- Section headers use the track's title from the tracks table.
- Grid layout remains the same: 3 columns desktop, 2 tablet, 1 mobile.
- Track 3 pattern cards include a small "Events" tag/badge to visually distinguish them from Track 1 ("Logic") and Track 2 ("DOM") patterns.
- The `pattern_library_viewed` event now includes `patterns_unlocked_count` spanning all three tracks.

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
