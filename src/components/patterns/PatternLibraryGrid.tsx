"use client";

import { useState, useCallback } from "react";
import { Puzzle } from "lucide-react";
import type { LibraryPattern, TrackPatternGroup } from "@/lib/challenges/patterns";
import { PatternLibraryCard } from "./PatternLibraryCard";
import { PatternDetailDialog } from "./PatternDetailDialog";

interface PatternLibraryGridProps {
  trackGroups: TrackPatternGroup[];
  unlockedSlugs: Set<string>;
  unlockedCount: number;
  totalCount: number;
}

export function PatternLibraryGrid({
  trackGroups,
  unlockedSlugs,
  unlockedCount,
  totalCount,
}: PatternLibraryGridProps) {
  const [selectedPattern, setSelectedPattern] =
    useState<LibraryPattern | null>(null);

  const handleSelect = useCallback((pattern: LibraryPattern) => {
    setSelectedPattern(pattern);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedPattern(null);
  }, []);

  const progressPercent =
    totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;

  return (
    <>
      {/* Progress header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-indigo/10">
            <Puzzle
              className="h-5 w-5 text-brand-indigo"
              aria-hidden="true"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Pattern Library
            </h1>
            <p className="text-sm text-muted-foreground">
              Your growing collection of problem-solving patterns
            </p>
          </div>
        </div>

        {/* Cumulative progress indicator spanning both tracks */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <span
              className="text-sm font-semibold text-foreground"
              aria-live="polite"
            >
              {unlockedCount} of {totalCount} patterns unlocked
            </span>
            <span className="text-xs text-muted-foreground">
              {progressPercent}%
            </span>
          </div>
          <div
            className="h-2 w-full rounded-full bg-muted overflow-hidden"
            role="progressbar"
            aria-valuenow={unlockedCount}
            aria-valuemin={0}
            aria-valuemax={totalCount}
            aria-label={`${unlockedCount} of ${totalCount} patterns unlocked`}
          >
            <div
              className="h-full rounded-full bg-brand-indigo transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Pattern sections grouped by track */}
      {trackGroups.map((group) => {
        const isDom = group.trackSlug === "dom-manipulation";

        return (
          <section key={group.trackSlug} className="mb-10 last:mb-0">
            <h2 className="text-lg font-bold text-foreground mb-4">
              {group.trackTitle}
            </h2>

            <div
              className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
              role="list"
              aria-label={`${group.trackTitle} pattern cards`}
            >
              {group.patterns.map((pattern) => {
                const isUnlocked = unlockedSlugs.has(pattern.challengeSlug);
                return (
                  <div
                    key={`${pattern.challengeSlug}-${pattern.name}`}
                    role="listitem"
                  >
                    <PatternLibraryCard
                      pattern={pattern}
                      isUnlocked={isUnlocked}
                      onSelect={handleSelect}
                      showDomBadge={isDom}
                    />
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      {/* Detail dialog */}
      <PatternDetailDialog
        pattern={selectedPattern}
        onClose={handleClose}
      />
    </>
  );
}
