"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProgressStore } from "@/stores/progressStore";
import { getAllPatterns, TOTAL_PATTERNS } from "@/lib/challenges/patterns";
import { getAllChallenges } from "@/lib/challenges/track-1-fundamentals";
import { TrackCompletionHero } from "@/components/track-complete/TrackCompletionHero";
import { TrackSummaryStats } from "@/components/track-complete/TrackSummaryStats";
import { Track2Card } from "@/components/track-complete/Track2Card";
import { RevisitBanner } from "@/components/track-complete/RevisitBanner";

export default function TrackCompletePage() {
  const router = useRouter();
  const {
    hydrate,
    hydrated,
    isTrackCompleted,
    getCompletedCount,
    getCompletedSlugs,
    getTotalTimeSpent,
    getTotalAttempts,
  } = useProgressStore();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  // Redirect if track is not actually completed
  useEffect(() => {
    if (hydrated && !isTrackCompleted()) {
      router.replace("/dashboard");
    }
  }, [hydrated, isTrackCompleted, router]);

  // Fire track_completed analytics event (once)
  useEffect(() => {
    if (!hydrated || !isTrackCompleted()) return;

    window.dispatchEvent(
      new CustomEvent("codereps:track_completed", {
        detail: {
          track_slug: "fundamentals",
          total_time_seconds: getTotalTimeSpent(),
          total_attempts: getTotalAttempts(),
        },
      }),
    );
  }, [hydrated, isTrackCompleted, getTotalTimeSpent, getTotalAttempts]);

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <div className="space-y-6 animate-pulse">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-muted" />
          <div className="mx-auto h-8 w-64 rounded bg-muted" />
          <div className="mx-auto h-4 w-80 rounded bg-muted" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
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

  if (!isTrackCompleted()) {
    return null; // Will redirect via useEffect
  }

  const challenges = getAllChallenges();
  const allPatterns = getAllPatterns();
  const completedCount = getCompletedCount();
  const completedSlugs = getCompletedSlugs();
  const totalTime = getTotalTimeSpent();
  const totalAttempts = getTotalAttempts();
  const patternsUnlocked = allPatterns.filter((p) =>
    completedSlugs.includes(p.challengeSlug),
  ).length;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <div className="space-y-8">
        <TrackCompletionHero />

        <TrackSummaryStats
          completedCount={completedCount}
          totalChallenges={challenges.length}
          patternsUnlocked={patternsUnlocked}
          totalPatterns={TOTAL_PATTERNS}
          totalTimeSeconds={totalTime}
          totalAttempts={totalAttempts}
        />

        <Track2Card />

        <RevisitBanner />
      </div>
    </div>
  );
}
