"use client";

import Link from "next/link";
import { ShieldCheck, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BadgeDefinition, UserBadge } from "@/types/badge";

interface BadgeCardProps {
  badge: BadgeDefinition;
  earned: UserBadge;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function BadgeCard({ badge, earned }: BadgeCardProps) {
  const noHints = earned.metadata?.no_hints === true;

  return (
    <Link
      href="/challenge/dynamic-filter-ui"
      className={cn(
        "group flex items-center gap-4 rounded-xl border p-4 transition-colors",
        "hover:bg-brand-indigo/5",
        noHints
          ? "border-brand-indigo/40 bg-brand-indigo/5"
          : "border-border bg-card",
      )}
      aria-label={`${badge.name} badge${noHints ? ", completed without hints" : ""}`}
    >
      {/* Badge icon */}
      <div
        className={cn(
          "relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl",
          noHints
            ? "bg-brand-indigo/15 shadow-[0_0_12px_2px_rgba(99,102,241,0.25)]"
            : "bg-brand-indigo/10",
        )}
      >
        <ShieldCheck
          className="h-7 w-7 text-brand-indigo"
          aria-hidden="true"
        />
        {noHints && (
          <Star
            className="absolute -right-1 -top-1 h-4 w-4 fill-brand-amber text-brand-amber"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Badge info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-foreground">
            {badge.name}
          </h3>
          {noHints && (
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-amber/10 px-2 py-0.5 text-[10px] font-semibold text-brand-amber">
              <Star className="h-2.5 w-2.5 fill-brand-amber" aria-hidden="true" />
              No hints
            </span>
          )}
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
          {badge.description}
        </p>
        <p className="mt-1 text-[10px] text-brand-slate-400">
          Earned {formatDate(earned.earnedAt)}
        </p>
      </div>
    </Link>
  );
}
