"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Bell, Check, Monitor } from "lucide-react";

const NOTIFY_STORAGE_KEY = "codereps-track2-notify";

function getStoredNotify(): boolean {
  try {
    return localStorage.getItem(NOTIFY_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export function Track2Card() {
  const [notifyRequested, setNotifyRequested] = useState(getStoredNotify);

  function handleNotify() {
    setNotifyRequested(true);
    try {
      localStorage.setItem(NOTIFY_STORAGE_KEY, "true");
    } catch {
      // localStorage unavailable
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.4 }}
      className="rounded-xl border border-border bg-card p-6"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-indigo/10">
          <Monitor
            className="h-5 w-5 text-brand-indigo"
            aria-hidden="true"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-foreground">
              Track 2: DOM Manipulation
            </h3>
            <span className="rounded-full bg-brand-amber/10 px-2.5 py-0.5 text-xs font-medium text-brand-amber">
              Coming soon
            </span>
          </div>

          <p className="mt-1.5 text-sm text-muted-foreground">
            Take the patterns you unlocked in Track 1 and apply them to real
            browser interactions — selecting elements, updating the page, and
            responding to user actions.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            {notifyRequested ? (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-emerald">
                <Check className="h-4 w-4" aria-hidden="true" />
                You&apos;ll be notified when Track 2 launches
              </span>
            ) : (
              <button
                onClick={handleNotify}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-indigo px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-indigo/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-indigo"
              >
                <Bell className="h-4 w-4" aria-hidden="true" />
                Notify me when it launches
              </button>
            )}
          </div>

          <p className="mt-3 text-xs text-muted-foreground">
            <ArrowRight
              className="mr-1 inline h-3 w-3"
              aria-hidden="true"
            />
            Track 2 builds directly on the patterns you mastered here.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
