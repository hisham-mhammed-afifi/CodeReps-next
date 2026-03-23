"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useProgressStore } from "@/stores/progressStore";
import { useBadgeStore } from "@/stores/badgeStore";
import { checkAndAwardDomBuilderBadge } from "@/lib/badges/award-logic";
import { getAllPatterns, TOTAL_PATTERNS } from "@/lib/challenges/patterns";
import { track2Challenges } from "@/lib/challenges/dom-manipulation";
import { Track2CompletionHero } from "@/components/track-complete/Track2CompletionHero";
import { Track2SummaryStats } from "@/components/track-complete/Track2SummaryStats";
import { Track3Card } from "@/components/track-complete/Track3Card";
import { Track2RevisitBanner } from "@/components/track-complete/Track2RevisitBanner";

const TRACK_SLUG = "dom-manipulation";

export default function Track2CompletePage() {
  const router = useRouter();
  const eventsFiredRef = useRef(false);

  const {
    hydrate,
    hydrated,
    isTrackCompleted,
    getTrackCompletedCount,
    getTrackCompletedSlugs,
    getTrackTotalTimeSpent,
    getTrackTotalAttempts,
    getProgress,
  } = useProgressStore();

  const {
    hydrate: hydrateBadges,
    hydrated: badgesHydrated,
    getBadge,
  } = useBadgeStore();

  useEffect(() => {
    hydrate();
    hydrateBadges();
  }, [hydrate, hydrateBadges]);

  // Ensure badge is awarded (idempotent)
  useEffect(() => {
    if (!hydrated || !badgesHydrated) return;
    if (!isTrackCompleted(TRACK_SLUG)) return;
    checkAndAwardDomBuilderBadge();
  }, [hydrated, badgesHydrated, isTrackCompleted]);

  // Redirect if track is not actually completed
  useEffect(() => {
    if (hydrated && !isTrackCompleted(TRACK_SLUG)) {
      router.replace("/dashboard");
    }
  }, [hydrated, isTrackCompleted, router]);

  // Fire analytics events (once)
  useEffect(() => {
    if (!hydrated || !badgesHydrated) return;
    if (!isTrackCompleted(TRACK_SLUG)) return;
    if (eventsFiredRef.current) return;
    eventsFiredRef.current = true;

    const totalTime = getTrackTotalTimeSpent(TRACK_SLUG);
    const totalAttempts = getTrackTotalAttempts(TRACK_SLUG);

    // track_completed event
    window.dispatchEvent(
      new CustomEvent("codereps:track_completed", {
        detail: {
          track_slug: TRACK_SLUG,
          total_time_seconds: totalTime,
          total_attempts: totalAttempts,
        },
      }),
    );

    // capstone_completed event
    const capstoneChallenge = track2Challenges.find((c) => c.order === 15);
    if (capstoneChallenge) {
      const capstoneProgress = getProgress(capstoneChallenge.slug);
      if (capstoneProgress) {
        window.dispatchEvent(
          new CustomEvent("codereps:capstone_completed", {
            detail: {
              mode: capstoneProgress.mode,
              hints_used: capstoneProgress.hintsUsed ? 1 : 0,
              attempts: capstoneProgress.attempts,
              total_time_seconds: capstoneProgress.timeSpentSeconds,
            },
          }),
        );
      }
    }
  }, [
    hydrated,
    badgesHydrated,
    isTrackCompleted,
    getTrackTotalTimeSpent,
    getTrackTotalAttempts,
    getProgress,
  ]);

  if (!hydrated || !badgesHydrated) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <div className="space-y-6 animate-pulse">
          <div className="mx-auto h-20 w-20 rounded-2xl bg-muted" />
          <div className="mx-auto h-8 w-64 rounded bg-muted" />
          <div className="mx-auto h-4 w-80 rounded bg-muted" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-border/50 bg-card p-4 animate-pulse"
              >
                <div className="mx-auto mb-2 h-9 w-9 rounded-full bg-muted" />
                <div className="mx-auto h-5 w-12 rounded bg-muted" />
                <div className="mx-auto mt-1 h-3 w-16 rounded bg-muted" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!isTrackCompleted(TRACK_SLUG)) {
    return null; // Will redirect via useEffect
  }

  const completedCount = getTrackCompletedCount(TRACK_SLUG);
  const completedSlugs = getTrackCompletedSlugs(TRACK_SLUG);
  const totalTime = getTrackTotalTimeSpent(TRACK_SLUG);
  const totalAttempts = getTrackTotalAttempts(TRACK_SLUG);

  const allPatterns = getAllPatterns();
  const track2PatternsUnlocked = allPatterns.filter(
    (p) =>
      p.trackSlug === TRACK_SLUG && completedSlugs.includes(p.challengeSlug),
  ).length;

  const badge = getBadge("dom-builder");
  const noHints = badge?.metadata?.no_hints === true;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <div className="space-y-8">
        <Track2CompletionHero noHints={noHints} />

        <Track2SummaryStats
          completedCount={completedCount}
          totalChallenges={track2Challenges.length}
          newPatterns={track2PatternsUnlocked}
          totalPatterns={TOTAL_PATTERNS}
          totalTimeSeconds={totalTime}
          totalAttempts={totalAttempts}
          noHints={noHints}
        />

        <Track3Card />

        <Track2RevisitBanner />
      </div>
    </div>
  );
}
