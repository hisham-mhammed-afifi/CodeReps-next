# Story 8: Pattern Library

**Version:** v1.0 | **Last Updated:** 2026-03-21 | **Complexity:** 50/100 (Moderate)
**Dependencies:** Story 3
**PRD Reference:** REQ-015

---

**USER STORY**

As a beginner developer building problem-solving skills,
I want a personal library of all the patterns I've unlocked so I can review and reference them,
so that I internalize these patterns over time and can quickly recall them when facing new problems.

---

**ACCEPTANCE CRITERIA**

**Background:**

Given I am a signed-in user who has completed at least one challenge

**Scenarios:**

Scenario 1: Browse my unlocked patterns as a growing collection

Given I navigate to the Pattern Library page
When the page loads
Then I should see a grid of pattern cards for all 19 Track 1 patterns
And unlocked patterns should display the pattern name, plain-English description, and JS code snippet
And locked patterns (from incomplete challenges) should appear as dimmed placeholder cards showing only the pattern name
And the visual contrast between locked and unlocked should make my progress feel tangible

Scenario 2: Dive into a pattern for detailed reference

Given I see an unlocked pattern card in the library
When I select the card
Then I should see the full pattern detail: name, description ("When you need to..."), code example, and a link to the source challenge
And I should be able to navigate to the source challenge directly to revisit it
And I should be able to return to the library without losing my place

Scenario 3: See my collection grow as motivation

Given I have unlocked 10 of 19 patterns
When I view the Pattern Library
Then I should see a progress indicator showing "10 of 19 patterns unlocked"
And the layout should naturally highlight what I've earned while teasing what's ahead
And the locked cards should motivate me to continue, not frustrate me

---

**Additional Requirements:**

- Pattern Library is accessible from the main navigation at all times.
- The page uses skeleton loaders during data fetch.
- Pattern cards use Clean White (#FAFAFA) background with the pattern name in Electric Indigo.
- Code snippets on cards use JetBrains Mono font with syntax highlighting.
- The grid is responsive: 3 columns on desktop, 2 on tablet, 1 on mobile.
- `pattern_library_viewed` event fires on page load with `patterns_unlocked_count`.
- Cards are keyboard-navigable and pattern details are screen-reader accessible.

---

**Complexity Breakdown:**

```
Scenarios:    3 x 13 = 39  [new]
Systems:      1 (pattern system) x 8 = 8     [established - Story 3]
Roles:        1 (learner) x 3 = 3            [established - Story 1]
Integrations: 0
Total: 50/100 (Moderate)
```
