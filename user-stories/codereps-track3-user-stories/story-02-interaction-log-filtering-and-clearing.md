# Story 2: Interaction Log Filtering & Clearing

**Version:** v1.0 | **Last Updated:** 2026-03-24 | **Complexity:** 37/100 (Simple)
**Dependencies:** Story 1
**PRD Reference:** REQ-002, REQ-003

---

**USER STORY**

As a beginner developer debugging an event handler,
I want to filter the Interaction Log to show only the event type I care about and clear the noise when the log gets crowded,
so that I can focus on the specific events my code should be responding to without scrolling through dozens of irrelevant entries.

---

**ACCEPTANCE CRITERIA**

**Background:**

Given I am a signed-in user
And the Interaction Log has accumulated multiple event entries

**Scenarios:**

Scenario 1: Filter the log by event type

Given the log contains a mix of click, input, keydown, and mouseover events
When I select "Click" from the filter dropdown
Then only click events should be visible
And all other event types should be hidden (not deleted)
And the active filter should be visually indicated in the dropdown

Scenario 2: Reset filter to show all events

Given I have filtered the log to show only click events
When I select "All" from the filter dropdown
Then all event entries should be visible again
And no entries should have been lost during filtering

Scenario 3: Clear the entire log

Given the log contains 50 entries
When I click the "Clear" button in the log header
Then all log entries should be removed
And the empty state placeholder should return: "Interact with the preview to see events here."
And new interactions should start populating the log fresh

---

**Additional Requirements:**

- Filter dropdown sits in the Interaction Log header, to the right of the "Event Log" label.
- Filter options: All, Click, Input, Keydown, Submit, Mouseover/Mouseout.
- "Clear" button sits to the right of the filter dropdown with a trash icon (Lucide).
- Filtering is instant (client-side, no re-fetch). It hides/shows existing entries, does not destroy them.
- The `interaction_log_filtered` analytics event fires on filter change with filter_value.
- The `interaction_log_cleared` analytics event fires on clear with entries_cleared count.
- Both the filter dropdown and Clear button are keyboard-accessible (Tab focus, Enter/Space to activate).
- Screen reader announces filter change: "Showing [filter type] events" and clear: "Event log cleared."

---

**Complexity Breakdown:**

```
Scenarios:    3 x 13 = 39  [new]
Systems:      1 (interaction log) x 8 = 8   [established - Story 1]
Roles:        1 (learner) x 3 = 3           [established - Story 1]
Integrations: 0
Total: 37/100 (Simple) - session-adjusted

Unadjusted: 56/100
```
