# Story 5: Timing-Aware Test Assertions

**Version:** v1.0 | **Last Updated:** 2026-03-24 | **Complexity:** 50/100 (Moderate)
**Dependencies:** Story 4
**PRD Reference:** REQ-006

---

**USER STORY**

As a beginner developer who just implemented a debounce pattern,
I want the test runner to wait the correct amount of time after simulating rapid input before checking results,
so that my debounce logic is tested accurately and I don't get false failures from tests that assert too early.

---

**ACCEPTANCE CRITERIA**

**Background:**

Given I am a signed-in user
And I have submitted code for a challenge that uses setTimeout/debounce

**Scenarios:**

Scenario 1: Tests wait for debounce delay before asserting

Given my code debounces input handling with a 300ms setTimeout
When the test runner dispatches an input event
Then the test should wait at least 350ms (300ms delay + 50ms buffer) before asserting on DOM state
And the assertion should check the final debounced result, not intermediate states
And the test result should clearly indicate it passed after the wait

Scenario 2: Timed assertions show pending state while waiting

Given a timing-based test is running
When the wait duration has not yet elapsed
Then the test result should show a "Waiting..." or pending indicator
And the indicator should transition to pass/fail once the wait completes
And the user should understand that the delay is intentional, not a hang

Scenario 3: Timed assertions fail with a clear timeout message

Given my debounce code has a bug and the expected DOM change never happens
When the test runner waits the full tolerance window plus a 5-second maximum timeout
Then the test should fail with a message: "Timed out after [X]ms waiting for [expected state]"
And the timeout should not freeze or block other tests from running
And the user should see both the timeout error and any other test results

---

**Additional Requirements:**

- Timing-aware test cases specify a `waitMs` field in their eventTestCases definition. The test runner waits `waitMs` before asserting.
- The tolerance buffer is 50ms beyond the specified wait (e.g., 300ms debounce = 350ms wait in test).
- Maximum timeout for any timed assertion: 5 seconds. If the assertion has not resolved by then, it fails.
- The `timed_test_completed` analytics event fires with test_name, wait_ms, and passed.
- Timed tests run sequentially (not in parallel) to avoid timer interference.
- The pending indicator uses the Amber color (#F59E0B) with a clock icon, transitioning to green check or red X on resolution.
- If the debounce test false failure rate exceeds 2% (tracked via analytics), the buffer should be increased in a subsequent update.

---

**Complexity Breakdown:**

```
Scenarios:    3 x 13 = 39  [new]
Systems:      1 (event simulation) x 8 = 8  [established - Story 4]
Roles:        1 (learner) x 3 = 3           [established - Story 1]
Integrations: 0
Total: 50/100 (Moderate)
```
