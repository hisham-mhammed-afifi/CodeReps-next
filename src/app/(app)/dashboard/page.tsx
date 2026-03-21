"use client";

import { useEffect } from "react";
import { getAllChallenges } from "@/lib/challenges/track-1-fundamentals";
import { useProgressStore } from "@/stores/progressStore";
import { TrackHeader } from "@/components/dashboard/TrackHeader";
import { ChallengeCard } from "@/components/dashboard/ChallengeCard";
import { ChallengeCardSkeleton } from "@/components/dashboard/ChallengeCardSkeleton";

export default function DashboardPage() {
  const { hydrate, hydrated, getChallengeStatus, getCompletedCount } =
    useProgressStore();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const challenges = getAllChallenges();
  const completedCount = getCompletedCount();

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <div className="space-y-4 animate-pulse">
          <div className="h-8 w-48 rounded bg-muted" />
          <div className="h-4 w-72 rounded bg-muted" />
          <div className="h-2 w-full rounded-full bg-muted" />
        </div>
        <div className="mt-8 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <ChallengeCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  function isChallengeUnlocked(order: number): boolean {
    if (order === 1) return true;
    const prevChallenge = challenges.find((c) => c.order === order - 1);
    if (!prevChallenge) return false;
    return getChallengeStatus(prevChallenge.slug) === "completed";
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <TrackHeader
        title="Track 1: Fundamentals"
        description="Master core JavaScript patterns through guided practice"
        completedCount={completedCount}
        totalCount={challenges.length}
      />

      <div className="mt-8 space-y-3">
        {challenges.map((challenge) => {
          const unlocked = isChallengeUnlocked(challenge.order);
          const status = getChallengeStatus(challenge.slug);
          const isFirst = challenge.order === 1;

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
              isFirst={isFirst}
            />
          );
        })}
      </div>
    </div>
  );
}
