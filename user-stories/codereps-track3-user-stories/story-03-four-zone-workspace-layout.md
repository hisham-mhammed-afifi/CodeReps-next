# Story 3: Four-Zone Workspace Layout

**Version:** v1.0 | **Last Updated:** 2026-03-24 | **Complexity:** 50/100 (Moderate)
**Dependencies:** Story 1
**PRD Reference:** REQ-017, REQ-019

---

**USER STORY**

As a beginner developer working on event challenges,
I want the guidance, code editor, live preview, and event log all visible at once so I can write a handler, interact with the preview, and watch the events fire without switching between tabs,
so that I build an intuitive understanding of the cause-and-effect relationship between user actions and event handlers.

---

**ACCEPTANCE CRITERIA**

**Background:**

Given I am a signed-in user
And I have opened a Track 3 challenge

**Scenarios:**

Scenario 1: See all four zones on desktop

Given my viewport is >= 1024px wide
When the challenge workspace loads
Then I should see four visual zones: guidance/steps on the left (40% width), code editor in the top-right, and the bottom-right split horizontally into Live Preview (60%) and Interaction Log (40%)
And all four zones should be visible simultaneously
And the layout should not feel cramped at 1024px width

Scenario 2: Resize the preview and log to suit my needs

Given the four-zone layout is visible on desktop
When I drag the horizontal divider between preview and interaction log
Then the two panels should resize proportionally
And neither panel should collapse below its minimum height (preview: 150px, log: 150px)

Scenario 3: Panels stack and log collapses on smaller viewports

Given my viewport is below 1024px
When the workspace loads
Then zones should stack vertically: guidance, then editor, then preview, then interaction log
And the Interaction Log should be collapsed by default with a "Show Event Log" toggle
And expanding the log should push content below it (not overlay)

Scenario 4: Track 1 and Track 2 challenges retain their original layouts

Given I open a Track 1 challenge (no preview, no log)
When the workspace loads
Then the layout should be the original two-panel split (guidance / editor)
And no preview panel or interaction log should appear

Given I open a Track 2 challenge (preview, no log)
When the workspace loads
Then the layout should be the three-zone split (guidance / editor / preview)
And no interaction log should appear

---

**Additional Requirements:**

- The layout decision is driven by two challenge fields: `requiresPreview` and `requiresInteractionLog`. If both false: two-panel. If preview only: three-zone. If both true: four-zone.
- The vertical divider between left pane and right pane remains draggable (same as Tracks 1 and 2).
- The horizontal divider between editor and bottom zone (preview + log) remains draggable (same as Track 2).
- The new horizontal divider between preview and log uses the same grab cursor and handle indicator style as existing dividers.
- Default split ratio (preview:log) is 60:40. Resets on new challenge load.
- The Interaction Log can be fully collapsed on desktop via a collapse button in the log header, giving the preview 100% of the bottom zone width.
- All panels are keyboard-navigable via Tab order: guidance > editor > preview > interaction log.
- Framer Motion transitions are not applied to divider drags (instant, responsive).

---

**Complexity Breakdown:**

```
Scenarios:    4 x 13 = 52  [new]
Systems:      1 (workspace layout) x 8 = 8   [established - extends Track 2 layout]
Roles:        1 (learner) x 3 = 3            [established - Story 1]
Integrations: 0
Total: 50/100 (Moderate) - session-adjusted

Unadjusted: 66/100
```
