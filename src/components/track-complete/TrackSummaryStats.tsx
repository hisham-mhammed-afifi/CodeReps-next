"use client";

import { motion } from "framer-motion";
import { Trophy, Puzzle, Clock, RotateCcw } from "lucide-react";

interface TrackSummaryStatsProps {
  completedCount: number;
  totalChallenges: number;
  patternsUnlocked: number;
  totalPatterns: number;
  totalTimeSeconds: number;
  totalAttempts: number;
}

function formatTime(seconds: number): string {
  if (seconds < 60) return "< 1 min";
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  if (hours === 0) return `${mins} min`;
  return `${hours}h ${mins}m`;
}

const STATS_CONFIG = [
  {
    key: "challenges",
    icon: Trophy,
    color: "bg-brand-emerald/10",
    iconColor: "text-brand-emerald",
    label: "Challenges",
  },
  {
    key: "patterns",
    icon: Puzzle,
    color: "bg-brand-indigo/10",
    iconColor: "text-brand-indigo",
    label: "Patterns",
  },
  {
    key: "time",
    icon: Clock,
    color: "bg-brand-cyan/10",
    iconColor: "text-brand-cyan",
    label: "Practiced",
  },
  {
    key: "attempts",
    icon: RotateCcw,
    color: "bg-brand-amber/10",
    iconColor: "text-brand-amber",
    label: "Total Attempts",
  },
] as const;

export function TrackSummaryStats({
  completedCount,
  totalChallenges,
  patternsUnlocked,
  totalPatterns,
  totalTimeSeconds,
  totalAttempts,
}: TrackSummaryStatsProps) {
  const values: Record<string, string> = {
    challenges: `${completedCount}/${totalChallenges}`,
    patterns: `${patternsUnlocked}/${totalPatterns}`,
    time: formatTime(totalTimeSeconds),
    attempts: `${totalAttempts}`,
  };

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {STATS_CONFIG.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
            className="rounded-xl border border-border bg-card p-4 text-center"
          >
            <div
              className={`mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full ${stat.color}`}
            >
              <Icon
                className={`h-4 w-4 ${stat.iconColor}`}
                aria-hidden="true"
              />
            </div>
            <p className="text-lg font-bold text-foreground">
              {values[stat.key]}
            </p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
