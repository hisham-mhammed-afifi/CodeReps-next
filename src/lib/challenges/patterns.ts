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

/** Track metadata keyed by trackSlug — driven by data, not hardcoded grouping */
export const TRACK_META: Record<string, { title: string; order: number }> = {
  fundamentals: { title: "Fundamentals", order: 1 },
  "dom-manipulation": { title: "DOM Manipulation", order: 2 },
};

export interface TrackPatternGroup {
  trackSlug: string;
  trackTitle: string;
  trackOrder: number;
  patterns: LibraryPattern[];
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

/**
 * Groups patterns by track, sorted by track order.
 * Uses track_id (trackSlug) on each pattern — no hardcoded grouping logic.
 */
export function getPatternsByTrack(): TrackPatternGroup[] {
  const all = getAllPatterns();
  const grouped = new Map<string, LibraryPattern[]>();

  for (const pattern of all) {
    const existing = grouped.get(pattern.trackSlug) ?? [];
    existing.push(pattern);
    grouped.set(pattern.trackSlug, existing);
  }

  const groups: TrackPatternGroup[] = [];
  for (const [trackSlug, patterns] of grouped) {
    const meta = TRACK_META[trackSlug] ?? {
      title: trackSlug,
      order: 999,
    };
    groups.push({
      trackSlug,
      trackTitle: meta.title,
      trackOrder: meta.order,
      patterns,
    });
  }

  groups.sort((a, b) => a.trackOrder - b.trackOrder);
  return groups;
}

export const TOTAL_PATTERNS = getAllPatterns().length;
