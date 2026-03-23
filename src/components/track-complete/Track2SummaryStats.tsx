"use client";

import { motion } from "framer-motion";
import { Trophy, Puzzle, Clock, RotateCcw, ShieldCheck, Star } from "lucide-react";

interface Track2SummaryStatsProps {
  completedCount: number;
  totalChallenges: number;
  newPatterns: number;
  totalPatterns: number;
  totalTimeSeconds: number;
  totalAttempts: number;
  noHints: boolean;
}

function formatTime(seconds: number): string {
  if (seconds < 60) return "< 1 min";
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  if (hours === 0) return `${mins} min`;
  return `${hours}h ${mins}m`;
}

export function Track2SummaryStats({
  completedCount,
  totalChallenges,
  newPatterns,
  totalPatterns,
  totalTimeSeconds,
  totalAttempts,
  noHints,
}: Track2SummaryStatsProps) {
  const stats = [
    {
      key: "challenges",
      icon: Trophy,
      color: "bg-brand-emerald/10",
      iconColor: "text-brand-emerald",
      label: "Challenges",
      value: `${completedCount}/${totalChallenges}`,
    },
    {
      key: "patterns",
      icon: Puzzle,
      color: "bg-brand-indigo/10",
      iconColor: "text-brand-indigo",
      label: "Patterns",
      value: `${newPatterns} new (${totalPatterns} total)`,
    },
    {
      key: "badge",
      icon: ShieldCheck,
      color: "bg-brand-indigo/10",
      iconColor: "text-brand-indigo",
      label: "Badge Earned",
      value: "DOM Builder",
    },
    {
      key: "time",
      icon: Clock,
      color: "bg-brand-cyan/10",
      iconColor: "text-brand-cyan",
      label: "Practiced",
      value: formatTime(totalTimeSeconds),
    },
    {
      key: "attempts",
      icon: RotateCcw,
      color: "bg-brand-amber/10",
      iconColor: "text-brand-amber",
      label: "Total Attempts",
      value: `${totalAttempts}`,
    },
  ];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {stats.map((stat, i) => {
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
              <p className="text-sm font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {noHints && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.4 }}
          className="flex items-center justify-center gap-2 rounded-xl border border-brand-amber/30 bg-brand-amber/5 p-3"
        >
          <Star
            className="h-4 w-4 fill-brand-amber text-brand-amber"
            aria-hidden="true"
          />
          <p className="text-sm font-semibold text-foreground">
            Capstone completed without hints
          </p>
          <Star
            className="h-4 w-4 fill-brand-amber text-brand-amber"
            aria-hidden="true"
          />
        </motion.div>
      )}
    </div>
  );
}
