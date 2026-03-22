import type { ChallengeMode } from "@/types/progress";

/**
 * Returns which modes are available for a given challenge based on:
 * - Challenge order (position in track)
 * - Whether the full track has been completed
 * - Whether this is a first attempt or a revisit
 */
export function getAvailableModes(
  challengeOrder: number,
  isTrackCompleted: boolean,
  isFirstAttempt: boolean,
): ChallengeMode[] {
  // After completing all 15 challenges, all modes unlock everywhere
  if (isTrackCompleted) {
    return ["guided", "semi_guided", "independent"];
  }

  // Challenges 1-5: Guided only on first attempt
  if (challengeOrder <= 5) {
    if (isFirstAttempt) {
      return ["guided"];
    }
    // Revisiting a completed challenge in the 1-5 range (track not complete)
    return ["guided"];
  }

  // Challenges 6-10: Guided or Semi-Guided
  if (challengeOrder <= 10) {
    return ["guided", "semi_guided"];
  }

  // Challenges 11-15: All three modes
  return ["guided", "semi_guided", "independent"];
}

/**
 * Returns the default mode for a challenge when no mode is explicitly selected.
 * - Challenges 1-5: always guided
 * - Challenges 6-10: guided (user picks via prompt)
 * - Challenges 11-15: guided (user picks via prompt, independent encouraged)
 */
export function getDefaultMode(): ChallengeMode {
  // Default is always guided — the ModePrompt handles offering choices
  return "guided";
}

/**
 * Whether the mode prompt should be shown for this challenge.
 * Only shown when there's more than one mode available AND it's the user's
 * first time entering this challenge in the current session.
 */
export function shouldShowModePrompt(
  challengeOrder: number,
  isTrackCompleted: boolean,
  isFirstAttempt: boolean,
): boolean {
  const modes = getAvailableModes(challengeOrder, isTrackCompleted, isFirstAttempt);
  return modes.length > 1;
}

/**
 * Whether Independent mode should be visually encouraged (highlighted).
 * True for challenges 11-15 and when track is completed.
 */
export function shouldEncourageIndependent(
  challengeOrder: number,
  isTrackCompleted: boolean,
): boolean {
  return challengeOrder >= 11 || isTrackCompleted;
}

/**
 * Validates that a requested mode is allowed for the given challenge context.
 * Returns the mode if valid, or falls back to the default.
 */
export function enforceMode(
  requestedMode: ChallengeMode,
  challengeOrder: number,
  isTrackCompleted: boolean,
  isFirstAttempt: boolean,
): ChallengeMode {
  const available = getAvailableModes(challengeOrder, isTrackCompleted, isFirstAttempt);
  if (available.includes(requestedMode)) {
    return requestedMode;
  }
  return getDefaultMode();
}
