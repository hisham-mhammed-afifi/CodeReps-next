# Story 1: Interaction Log Panel

**Version:** v1.0 | **Last Updated:** 2026-03-24 | **Complexity:** 82/100 (Complex)
**Dependencies:** None (start here)
**PRD Reference:** REQ-001, REQ-018

---

**USER STORY**

As a beginner developer learning event-driven programming,
I want to see a live stream of events firing as I interact with the preview so I can understand what happens under the hood when I click, type, or hover,
so that events stop feeling invisible and I can debug my handlers by confirming which events actually fire.

---

**ACCEPTANCE CRITERIA**

**Background:**

Given I am a signed-in user
And I have opened a Track 3 challenge

**Scenarios:**

Scenario 1: See events appear as I interact with the preview

Given my code has been executed and the Live Preview is active
When I click a button, type in an input, or hover over an element in the preview
Then each event should appear as a new entry in the Interaction Log
And each entry should show: event type (e.g., "click"), target element tag and identifier (e.g., "BUTTON#increment-btn"), and timestamp (HH:MM:SS.ms)
And entries should appear in chronological order with newest at the bottom
And the log should auto-scroll to the latest entry

Scenario 2: Log only captures events from the preview, not the app

Given I am working in the Track 3 workspace
When I click buttons or type in the main CodeReps app UI (navigation, editor, step controls)
Then no entries should appear in the Interaction Log
And the log should only reflect events from inside the preview iframe

Scenario 3: Log starts empty and populates on interaction

Given I have just opened a Track 3 challenge
When the workspace loads (before any interaction with the preview)
Then the Interaction Log should be empty
And a placeholder message should read "Interact with the preview to see events here."
And the first interaction with the preview should replace the placeholder with the first log entry

Scenario 4: Log handles rapid event streams without jank

Given my code listens for mouseover events on a list of 20 items
When I move my mouse quickly across all items in the preview
Then the Interaction Log should display all fired events
And the log should render at 60fps with no visible jank or freezing
And entries older than the 100-entry cap should be removed as new ones arrive

---

**Additional Requirements:**

- The Interaction Log renders in the bottom-right zone of the workspace on desktop (>= 1024px), alongside the Live Preview. Preview takes 60% width, Interaction Log takes 40%.
- On viewports below 1024px, the Interaction Log renders as a collapsible panel below the preview, collapsed by default with a "Show Event Log" toggle.
- Dark background matching the code editor (Deep Navy, #0F172A).
- Log entries use JetBrains Mono font.
- Event type badges are color-coded: click (Electric Indigo #6366F1), input (Cyan #06B6D4), keydown (Amber #F59E0B), submit (Emerald Green #10B981), mouse events (Slate 400 #94A3B8).
- The log hooks into the preview iframe's event system via a message channel or postMessage, never by injecting listeners into user code.
- The logging mechanism must not interfere with the user's event handlers or change timing behavior.
- The panel header shows "Event Log" label.
- The panel must be labeled for screen readers: "Event log showing interactions with the preview."
- The `interaction_log_entry` analytics event fires per log entry with event_type, target_tag, and is_simulated (false for real interactions).

---

**Complexity Breakdown:**

```
Scenarios:    4 x 13 = 52  [new]
Systems:      1 (interaction log) x 20 = 20  [new]
Roles:        1 (learner) x 10 = 10  [new - Track 3 session]
Integrations: 0
Total: 82/100 (Complex)
```

Note: Score is high because this is the foundational story for Track 3, establishing the Interaction Log system and learner role for this session. Subsequent stories reuse these at reduced weight.
