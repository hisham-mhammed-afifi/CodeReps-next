import type { ChallengeMode } from "@/types/progress";

/**
 * Returns which modes are available for a given challenge based on:
 * - Track slug (different tracks have different progression curves)
 * - Challenge order (position in track)
 * - Whether the full track has been completed
 * - Whether this is a first attempt or a revisit
 */
export function getAvailableModes(
  challengeOrder: number,
  isTrackCompleted: boolean,
  isFirstAttempt: boolean,
  trackSlug: string = "fundamentals",
): ChallengeMode[] {
  // After completing all challenges in the track, all modes unlock everywhere
  if (isTrackCompleted) {
    return ["guided", "semi_guided", "independent"];
  }

  if (trackSlug === "dom-manipulation") {
    return getTrack2AvailableModes(challengeOrder);
  }

  return getTrack1AvailableModes(challengeOrder, isFirstAttempt);
}

function getTrack1AvailableModes(
  challengeOrder: number,
  isFirstAttempt: boolean,
): ChallengeMode[] {
  // Challenges 1-5: Guided only on first attempt
  if (challengeOrder <= 5) {
    if (isFirstAttempt) {
      return ["guided"];
    }
    return ["guided"];
  }

  // Challenges 6-10: Guided or Semi-Guided
  if (challengeOrder <= 10) {
    return ["guided", "semi_guided"];
  }

  // Challenges 11-15: All three modes
  return ["guided", "semi_guided", "independent"];
}

function getTrack2AvailableModes(
  challengeOrder: number,
): ChallengeMode[] {
  // Challenges 1-5: Guided and Semi-Guided (user already knows the framework)
  if (challengeOrder <= 5) {
    return ["guided", "semi_guided"];
  }

  // Challenges 6-15: All three modes
  return ["guided", "semi_guided", "independent"];
}

/**
 * Returns the default mode for a challenge when no mode is explicitly selected.
 * Track 1: always guided.
 * Track 2: guided (1-5), semi_guided (6-10), independent (11-15).
 */
export function getDefaultMode(
  challengeOrder: number = 1,
  trackSlug: string = "fundamentals",
): ChallengeMode {
  if (trackSlug === "dom-manipulation") {
    if (challengeOrder <= 5) return "guided";
    if (challengeOrder <= 10) return "semi_guided";
    return "independent";
  }

  return "guided";
}

/**
 * Whether the mode prompt should be shown for this challenge.
 * Only shown when there's more than one mode available.
 */
export function shouldShowModePrompt(
  challengeOrder: number,
  isTrackCompleted: boolean,
  isFirstAttempt: boolean,
  trackSlug: string = "fundamentals",
): boolean {
  const modes = getAvailableModes(challengeOrder, isTrackCompleted, isFirstAttempt, trackSlug);
  return modes.length > 1;
}

/**
 * Whether Independent mode should be visually encouraged (highlighted).
 * Track 1: challenges 11-15 or track completed.
 * Track 2: challenges 11-15 or track completed (Semi-Guided highlighted for 6-10).
 */
export function shouldEncourageIndependent(
  challengeOrder: number,
  isTrackCompleted: boolean,
): boolean {
  return challengeOrder >= 11 || isTrackCompleted;
}

/**
 * Whether Semi-Guided mode should be visually highlighted as the recommended default.
 * Only applies to Track 2 challenges 6-10.
 */
export function shouldHighlightSemiGuided(
  challengeOrder: number,
  isTrackCompleted: boolean,
  trackSlug: string = "fundamentals",
): boolean {
  if (isTrackCompleted) return false;
  return trackSlug === "dom-manipulation" && challengeOrder >= 6 && challengeOrder <= 10;
}

/**
 * Returns the prompt message shown in the mode selection screen.
 * Track 2 acknowledges the user already knows the framework.
 */
export function getModePromptMessage(
  challengeOrder: number,
  trackSlug: string = "fundamentals",
): string {
  if (trackSlug === "dom-manipulation") {
    if (challengeOrder <= 5) {
      return "You've done this before. Guided or semi-guided?";
    }
    return "Ready to try with less guidance? Pick the approach that feels right for you.";
  }

  return "Ready to try with less guidance? Pick the approach that feels right for you.";
}

/**
 * Returns a capstone note for Challenge 15, or null if not applicable.
 */
export function getCapstoneNote(
  challengeOrder: number,
  trackSlug: string = "fundamentals",
): string | null {
  if (trackSlug === "dom-manipulation" && challengeOrder === 15) {
    return "Try it without hints for the full DOM Builder badge";
  }
  return null;
}

/**
 * Validates that a requested mode is allowed for the given challenge context.
 * Returns the mode if valid, or falls back to the track-aware default.
 */
export function enforceMode(
  requestedMode: ChallengeMode,
  challengeOrder: number,
  isTrackCompleted: boolean,
  isFirstAttempt: boolean,
  trackSlug: string = "fundamentals",
): ChallengeMode {
  const available = getAvailableModes(challengeOrder, isTrackCompleted, isFirstAttempt, trackSlug);
  if (available.includes(requestedMode)) {
    return requestedMode;
  }
  return getDefaultMode(challengeOrder, trackSlug);
}
