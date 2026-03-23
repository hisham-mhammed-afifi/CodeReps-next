"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Trophy } from "lucide-react";
import { getAllChallenges } from "@/lib/challenges/track-1-fundamentals";
import { getAllPatterns, TOTAL_PATTERNS } from "@/lib/challenges/patterns";
import { useProgressStore } from "@/stores/progressStore";
import { useBadgeStore } from "@/stores/badgeStore";
import { getBadgeBySlug } from "@/lib/badges/definitions";
import { BadgeCard } from "@/components/badges/BadgeCard";
import { TrackHeader } from "@/components/dashboard/TrackHeader";
import { ChallengeCard } from "@/components/dashboard/ChallengeCard";
import { ChallengeCardSkeleton } from "@/components/dashboard/ChallengeCardSkeleton";
import {
  ProgressSummary,
  ProgressSummarySkeleton,
} from "@/components/dashboard/ProgressSummary";
import { WelcomeState } from "@/components/dashboard/WelcomeState";

export default function DashboardPage() {
  const {
    hydrate,
    hydrated,
    getChallengeStatus,
    getCompletedCount,
    getCompletedSlugs,
    getTotalTimeSpent,
    getProgress,
    hasStartedTrack,
    isTrackCompleted,
  } = useProgressStore();

  const {
    hydrate: hydrateBadges,
    hydrated: badgesHydrated,
    getAllEarnedBadges,
  } = useBadgeStore();

  useEffect(() => {
    hydrate();
    hydrateBadges();
  }, [hydrate, hydrateBadges]);

  const challenges = getAllChallenges();
  const allPatterns = getAllPatterns();

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <div className="space-y-4 animate-pulse">
          <div className="h-8 w-48 rounded bg-muted" />
          <div className="h-4 w-72 rounded bg-muted" />
          <div className="h-2 w-full rounded-full bg-muted" />
        </div>
        <div className="mt-6">
          <ProgressSummarySkeleton />
        </div>
        <div className="mt-8 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <ChallengeCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!hasStartedTrack()) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <WelcomeState />
      </div>
    );
  }

  const completedCount = getCompletedCount();
  const completedSlugs = getCompletedSlugs();
  const totalTime = getTotalTimeSpent();

  const patternsUnlocked = allPatterns.filter((p) =>
    completedSlugs.includes(p.challengeSlug),
  ).length;

  function isChallengeUnlocked(order: number): boolean {
    if (order === 1) return true;
    const prevChallenge = challenges.find((c) => c.order === order - 1);
    if (!prevChallenge) return false;
    return getChallengeStatus(prevChallenge.slug) === "completed";
  }

  // Find the first unlocked, non-completed challenge as "next up"
  const nextUpSlug = challenges.find((c) => {
    const unlocked = isChallengeUnlocked(c.order);
    const status = getChallengeStatus(c.slug);
    return unlocked && status !== "completed";
  })?.slug ?? null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <TrackHeader
        title="Track 1: Fundamentals"
        description="Master core JavaScript patterns through guided practice"
        completedCount={completedCount}
        totalCount={challenges.length}
      />

      {isTrackCompleted() && (
        <Link
          href="/track-complete"
          className="mt-6 flex items-center gap-3 rounded-xl border border-brand-emerald/30 bg-brand-emerald/5 p-4 transition-colors hover:bg-brand-emerald/10"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-emerald/10">
            <Trophy className="h-5 w-5 text-brand-emerald" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground">
              Track 1 Complete!
            </p>
            <p className="text-xs text-muted-foreground">
              View your completion summary and see what&apos;s next
            </p>
          </div>
        </Link>
      )}

      {badgesHydrated && getAllEarnedBadges().length > 0 && (
        <div className="mt-6">
          <h2 className="mb-3 text-sm font-semibold text-foreground">
            Badges
          </h2>
          <div className="space-y-3">
            {getAllEarnedBadges().map((earned) => {
              const def = getBadgeBySlug(earned.badgeSlug);
              if (!def) return null;
              return (
                <BadgeCard
                  key={earned.badgeSlug}
                  badge={def}
                  earned={earned}
                />
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-6">
        <ProgressSummary
          completedCount={completedCount}
          totalChallenges={challenges.length}
          patternsUnlocked={patternsUnlocked}
          totalPatterns={TOTAL_PATTERNS}
          totalTimeSeconds={totalTime}
        />
      </div>

      <div className="mt-8 space-y-3">
        {challenges.map((challenge) => {
          const unlocked = isChallengeUnlocked(challenge.order);
          const status = getChallengeStatus(challenge.slug);
          const progress = getProgress(challenge.slug);

          return (
            <ChallengeCard
              key={challenge.slug}
              order={challenge.order}
              title={challenge.title}
              slug={challenge.slug}
              difficulty={challenge.difficulty}
              estimatedMinutes={challenge.estimatedMinutes}
              status={status}
              isUnlocked={unlocked}
              isNextUp={challenge.slug === nextUpSlug}
              completedMode={
                status === "completed" ? (progress?.mode ?? null) : null
              }
            />
          );
        })}
      </div>
    </div>
  );
}
