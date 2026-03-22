"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LayoutGrid, Repeat } from "lucide-react";

export function RevisitBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.7 }}
      className="rounded-xl border border-border bg-card p-5"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-emerald/10">
          <Repeat
            className="h-4 w-4 text-brand-emerald"
            aria-hidden="true"
          />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">
            Keep getting your reps in
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            All 15 challenges are open for re-attempt with every mode unlocked
            — Guided, Semi-Guided, and Independent. Your original completion
            data stays intact.
          </p>
          <Link
            href="/dashboard"
            className="mt-3 inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-indigo"
          >
            <LayoutGrid className="h-4 w-4" aria-hidden="true" />
            Back to Track 1 Dashboard
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
