import type { PatternDefinition } from "@/types/challenge";
import { track1Challenges } from "./track-1-fundamentals";

export interface LibraryPattern extends PatternDefinition {
  /** Which challenge unlocks this pattern */
  challengeSlug: string;
  challengeTitle: string;
  challengeOrder: number;
}

/**
 * Extracts all patterns from Track 1 challenge definitions,
 * enriched with source challenge metadata.
 */
export function getAllPatterns(): LibraryPattern[] {
  const patterns: LibraryPattern[] = [];

  for (const challenge of track1Challenges) {
    for (const pattern of challenge.patternsUnlocked) {
      patterns.push({
        ...pattern,
        challengeSlug: challenge.slug,
        challengeTitle: challenge.title,
        challengeOrder: challenge.order,
      });
    }
  }

  return patterns;
}

export const TOTAL_PATTERNS = getAllPatterns().length;
