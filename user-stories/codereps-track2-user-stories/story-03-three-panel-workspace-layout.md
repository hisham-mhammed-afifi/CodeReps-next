# Story 3: Three-Panel Workspace Layout

**Version:** v1.0 | **Last Updated:** 2026-03-22 | **Complexity:** 50/100 (Moderate)
**Dependencies:** Story 1
**PRD Reference:** REQ-017

---

**USER STORY**

As a beginner developer working on DOM challenges,
I want the guidance, code editor, and live preview to all be visible at once so I can reference the steps, write code, and see results without switching between tabs,
so that I stay in flow and can visually connect my code to its effect on the page.

---

**ACCEPTANCE CRITERIA**

**Background:**

Given I am a signed-in user
And I have opened a Track 2 challenge

**Scenarios:**

Scenario 1: See all three zones on desktop

Given my viewport is >= 1024px wide
When the challenge workspace loads
Then I should see three visual zones: guidance/steps on the left (40% width), and the right pane split vertically into code editor (top, ~60% of right pane height) and Live Preview (bottom, ~40%)
And all three zones should be visible simultaneously without scrolling the workspace frame
And the layout should feel balanced, not cramped

Scenario 2: Resize the editor and preview to suit my needs

Given the three-panel layout is visible on desktop
When I drag the horizontal divider between the editor and preview
Then the editor and preview should resize proportionally
And neither panel should collapse below its minimum height (editor: 200px, preview: 200px)
And my divider position should persist for the duration of my session

Scenario 3: Panels stack cleanly on smaller viewports

Given my viewport is below 1024px
When the workspace loads
Then all three zones should stack vertically: guidance first, then code editor, then live preview
And each zone should take the full viewport width
And I should be able to scroll between them naturally
And the stacked order should match the workflow (think first, code second, verify third)

Scenario 4: Track 1 challenges retain the original two-panel layout

Given I am revisiting a Track 1 challenge (no Starter HTML, no preview needed)
When the workspace loads
Then the layout should remain the original two-panel split (guidance left, editor right)
And no Live Preview Panel should appear
And the workspace should behave exactly as it did before Track 2 was added

---

**Additional Requirements:**

- The vertical divider between left pane and right pane (guidance vs. editor+preview) remains draggable, same as Track 1.
- The horizontal divider between editor and preview is a new draggable element. It uses a grab cursor on hover and a subtle handle indicator (thin line, Slate 400).
- Default split ratio (editor:preview) is 60:40. Resets to default on new challenge load.
- The layout decision (two-panel vs. three-panel) is driven by the challenge's `requires_preview` field. If false, the Track 1 layout is used.
- Framer Motion transitions are not applied to the divider drag (should feel instant and responsive).
- All three panels are keyboard-navigable via Tab order: guidance > editor > preview.

---

**Complexity Breakdown:**

```
Scenarios:    4 x 13 = 52  [new]
Systems:      1 (workspace layout) x 8 = 8   [established - extends Track 1 layout]
Roles:        1 (learner) x 3 = 3            [established - Story 1]
Integrations: 0
Total: 50/100 (Moderate) - session-adjusted

Unadjusted: 66/100
```
