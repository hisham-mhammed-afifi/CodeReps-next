import type { PatternDefinition } from "@/types/challenge";
import { track1Challenges } from "./track-1-fundamentals";
import { track2Challenges } from "./dom-manipulation";

export interface LibraryPattern extends PatternDefinition {
  /** Which challenge unlocks this pattern */
  challengeSlug: string;
  challengeTitle: string;
  challengeOrder: number;
  /** Which track this pattern belongs to */
  trackSlug: string;
}

/**
 * Extracts all patterns from all track challenge definitions,
 * enriched with source challenge metadata.
 */
export function getAllPatterns(): LibraryPattern[] {
  const patterns: LibraryPattern[] = [];
  const allChallenges = [...track1Challenges, ...track2Challenges];

  for (const challenge of allChallenges) {
    for (const pattern of challenge.patternsUnlocked) {
      patterns.push({
        ...pattern,
        challengeSlug: challenge.slug,
        challengeTitle: challenge.title,
        challengeOrder: challenge.order,
        trackSlug: challenge.trackSlug,
      });
    }
  }

  return patterns;
}

export const TOTAL_PATTERNS = getAllPatterns().length;
