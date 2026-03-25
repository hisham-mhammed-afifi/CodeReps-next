"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Trophy } from "lucide-react";
import { getAllChallenges } from "@/lib/challenges/track-1-fundamentals";
import { track2Challenges } from "@/lib/challenges/dom-manipulation";
import { getAllPatterns, TOTAL_PATTERNS } from "@/lib/challenges/patterns";
import { useProgressStore } from "@/stores/progressStore";
import { useBadgeStore } from "@/stores/badgeStore";
import { getBadgeBySlug } from "@/lib/badges/definitions";
import { BadgeCard } from "@/components/badges/BadgeCard";
import { TrackHeader } from "@/components/dashboard/TrackHeader";
import { TrackTabs } from "@/components/dashboard/TrackTabs";
import { ChallengeCard } from "@/components/dashboard/ChallengeCard";
import { ChallengeCardSkeleton } from "@/components/dashboard/ChallengeCardSkeleton";
import {
  ProgressSummary,
  ProgressSummarySkeleton,
} from "@/components/dashboard/ProgressSummary";
import { WelcomeState } from "@/components/dashboard/WelcomeState";
import type { ChallengeDefinition } from "@/types/challenge";

const track1Challenges = getAllChallenges();

function DashboardSkeleton() {
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

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}

function DashboardContent() {
  const searchParams = useSearchParams();
  const activeTrack = searchParams.get("track") ?? "fundamentals";

  const {
    hydrate,
    hydrated,
    getChallengeStatus,
    getCompletedSlugs,
    getTrackCompletedCount,
    getTrackTotalTimeSpent,
    getProgress,
    hasStartedTrack,
    isTrackCompleted,
  } = useProgressStore();

  const {
    hydrate: hydrateBadges,
    hydrated: badgesHydrated,
    getAllEarnedBadges,
    getBadge,
  } = useBadgeStore();

  useEffect(() => {
    hydrate();
    hydrateBadges();
  }, [hydrate, hydrateBadges]);

  if (!hydrated) {
    return <DashboardSkeleton />;
  }

  if (!hasStartedTrack()) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <WelcomeState />
      </div>
    );
  }

  const t1Unlocked = isTrackCompleted("fundamentals");
  const showTrack2 = t1Unlocked;
  const viewingTrack2 = showTrack2 && activeTrack === "dom-manipulation";

  // Build tab list
  const tabs = [
    {
      slug: "fundamentals",
      label: "Track 1: Fundamentals",
      completedCount: getTrackCompletedCount("fundamentals"),
      totalCount: track1Challenges.length,
    },
  ];
  if (showTrack2) {
    tabs.push({
      slug: "dom-manipulation",
      label: "Track 2: DOM",
      completedCount: getTrackCompletedCount("dom-manipulation"),
      totalCount: track2Challenges.length,
    });
  }

  // Pick the active challenge list and track config
  const challenges = viewingTrack2 ? track2Challenges : track1Challenges;
  const trackSlug = viewingTrack2 ? "dom-manipulation" : "fundamentals";
  const trackCompletedCount = getTrackCompletedCount(trackSlug);
  const trackTime = getTrackTotalTimeSpent(trackSlug);
  const completedSlugs = getCompletedSlugs();
  const allPatterns = getAllPatterns();
  const patternsUnlocked = allPatterns.filter(
    (p) => p.trackSlug === trackSlug && completedSlugs.includes(p.challengeSlug),
  ).length;

  const domBadge = getBadge("dom-builder");
  const noHints = domBadge?.metadata?.no_hints === true;

  const completionHref = viewingTrack2 ? "/track-2-complete" : "/track-complete";
  const trackTitle = viewingTrack2
    ? "Track 2: DOM Manipulation"
    : "Track 1: Fundamentals";
  const trackDesc = viewingTrack2
    ? "Select, create, and modify elements on the page"
    : "Master core JavaScript patterns through guided practice";

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      {/* Tabs (only show when Track 2 is unlocked) */}
      {showTrack2 && (
        <TrackTabs tracks={tabs} activeTrack={viewingTrack2 ? "dom-manipulation" : "fundamentals"} />
      )}

      {/* Badges (cross-track, always visible) */}
      {badgesHydrated && getAllEarnedBadges().length > 0 && (
        <div className="mb-6">
          <h2 className="mb-3 text-sm font-semibold text-foreground">Badges</h2>
          <div className="space-y-3">
            {getAllEarnedBadges().map((earned) => {
              const def = getBadgeBySlug(earned.badgeSlug);
              if (!def) return null;
              return (
                <BadgeCard key={earned.badgeSlug} badge={def} earned={earned} />
              );
            })}
          </div>
        </div>
      )}

      {/* Active track content */}
      <TrackHeader
        title={trackTitle}
        description={trackDesc}
        completedCount={trackCompletedCount}
        totalCount={challenges.length}
        badgeName={viewingTrack2 && domBadge ? "DOM Builder" : null}
        badgeNoHints={viewingTrack2 && noHints}
      />

      {isTrackCompleted(trackSlug) && (
        <Link
          href={completionHref}
          className="mt-6 flex items-center gap-3 rounded-xl border border-brand-emerald/30 bg-brand-emerald/5 p-4 transition-colors hover:bg-brand-emerald/10"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-emerald/10">
            <Trophy className="h-5 w-5 text-brand-emerald" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground">
              {viewingTrack2 ? "Track 2" : "Track 1"} Complete!
            </p>
            <p className="text-xs text-muted-foreground">
              View your completion summary and see what&apos;s next
            </p>
          </div>
        </Link>
      )}

      <div className="mt-6">
        <ProgressSummary
          completedCount={trackCompletedCount}
          totalChallenges={challenges.length}
          patternsUnlocked={patternsUnlocked}
          totalPatterns={TOTAL_PATTERNS}
          totalTimeSeconds={trackTime}
        />
      </div>

      <ChallengeList
        challenges={challenges}
        getChallengeStatus={getChallengeStatus}
        getProgress={getProgress}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Challenge list (extracted to keep page readable)                     */
/* ------------------------------------------------------------------ */

import type { ChallengeStatus } from "@/types/progress";
import type { UserProgress } from "@/types/progress";

interface ChallengeListProps {
  challenges: ChallengeDefinition[];
  getChallengeStatus: (slug: string) => ChallengeStatus;
  getProgress: (slug: string) => UserProgress | null;
}

function ChallengeList({
  challenges,
  getChallengeStatus,
  getProgress,
}: ChallengeListProps) {
  function isUnlocked(order: number): boolean {
    if (order === 1) return true;
    const prev = challenges.find((c) => c.order === order - 1);
    if (!prev) return false;
    return getChallengeStatus(prev.slug) === "completed";
  }

  const nextUpSlug =
    challenges.find((c) => {
      return isUnlocked(c.order) && getChallengeStatus(c.slug) !== "completed";
    })?.slug ?? null;

  return (
    <div className="mt-8 space-y-3">
      {challenges.map((challenge) => {
        const unlocked = isUnlocked(challenge.order);
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
  );
}
