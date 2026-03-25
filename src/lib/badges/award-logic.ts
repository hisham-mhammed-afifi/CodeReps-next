import { track2Challenges } from "@/lib/challenges/dom-manipulation";
import { useProgressStore } from "@/stores/progressStore";
import { useBadgeStore } from "@/stores/badgeStore";

/**
 * Check whether the DOM Builder badge should be awarded and, if so, award it.
 *
 * Conditions:
 *  - All 15 Track 2 challenges must have status "completed" in the progress store.
 *  - The badge has not already been awarded (idempotent).
 *
 * The no-hints distinction checks whether the user opened any hint panels
 * during Challenge 15 (the capstone). If `hintsUsed` is falsy for the
 * capstone challenge, `metadata.no_hints` is set to true.
 *
 * Returns true if the badge was newly awarded, false otherwise.
 */
export function checkAndAwardDomBuilderBadge(): boolean {
  const progressState = useProgressStore.getState();
  const badgeState = useBadgeStore.getState();

  // Already earned — nothing to do
  if (badgeState.hasBadge("dom-builder")) return false;

  // Check all 15 Track 2 challenges are completed
  if (!progressState.isTrackCompleted("dom-manipulation")) return false;

  // Determine no-hints distinction for Challenge 15 (capstone)
  const capstoneSlugs = track2Challenges.filter((c) => c.order === 15);
  const capstoneSlug = capstoneSlugs[0]?.slug;
  const capstoneProgress = capstoneSlug
    ? progressState.getProgress(capstoneSlug)
    : null;

  const noHints = capstoneProgress ? !capstoneProgress.hintsUsed : false;

  badgeState.awardBadge("dom-builder", { no_hints: noHints });

  // Fire analytics event
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("codereps:badge_earned", {
        detail: {
          badge_slug: "dom-builder",
          no_hints: noHints,
        },
      }),
    );
  }

  return true;
}
