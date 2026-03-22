"use client";

import { useEffect, useMemo } from "react";
import { useProgressStore } from "@/stores/progressStore";
import { getAllPatterns, TOTAL_PATTERNS } from "@/lib/challenges/patterns";
import { PatternLibraryGrid } from "@/components/patterns/PatternLibraryGrid";
import { PatternLibrarySkeleton } from "@/components/patterns/PatternLibrarySkeleton";

export default function PatternsPage() {
  const { hydrate, hydrated, getChallengeStatus } = useProgressStore();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const patterns = useMemo(() => getAllPatterns(), []);

  // Determine which challenges are completed to know which patterns are unlocked
  const unlockedSlugs = useMemo(() => {
    const slugs = new Set<string>();
    for (const pattern of patterns) {
      if (getChallengeStatus(pattern.challengeSlug) === "completed") {
        slugs.add(pattern.challengeSlug);
      }
    }
    return slugs;
  }, [patterns, getChallengeStatus]);

  const unlockedCount = useMemo(() => {
    return patterns.filter((p) => unlockedSlugs.has(p.challengeSlug)).length;
  }, [patterns, unlockedSlugs]);

  // Fire analytics event on page load
  useEffect(() => {
    if (!hydrated) return;
    // pattern_library_viewed event
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("codereps:analytics", {
          detail: {
            event: "pattern_library_viewed",
            properties: { patterns_unlocked_count: unlockedCount },
          },
        }),
      );
    }
  }, [hydrated, unlockedCount]);

  if (!hydrated) {
    return <PatternLibrarySkeleton />;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <PatternLibraryGrid
        patterns={patterns}
        unlockedSlugs={unlockedSlugs}
        unlockedCount={unlockedCount}
        totalCount={TOTAL_PATTERNS}
      />
    </div>
  );
}
