"use client";

import Link from "next/link";
import { ArrowRight, Brain, Blocks, Code2, FlaskConical, Lightbulb } from "lucide-react";

const FRAMEWORK_STEPS = [
  {
    icon: Brain,
    label: "Understand",
    description: "Read the problem and rephrase it in your own words",
  },
  {
    icon: Blocks,
    label: "Break Down",
    description: "Split the problem into small, logical steps",
  },
  {
    icon: Lightbulb,
    label: "Map to Code",
    description: "Connect each step to JavaScript concepts you know",
  },
  {
    icon: Code2,
    label: "Write",
    description: "Turn your plan into working code",
  },
  {
    icon: FlaskConical,
    label: "Verify",
    description: "Run tests to make sure your solution works",
  },
];

export function WelcomeState() {
  return (
    <div className="mx-auto max-w-xl text-center">
      <h2 className="text-2xl font-bold text-foreground">
        Welcome to Track 1: Fundamentals
      </h2>
      <p className="mt-2 text-muted-foreground">
        15 challenges that teach you how to think through coding problems using
        our 5-step framework. No tricks, no gotchas — just structured practice.
      </p>

      <div className="mt-8 space-y-3 text-left">
        {FRAMEWORK_STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <div
              key={step.label}
              className="flex items-start gap-3 rounded-xl border border-border bg-card p-3"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-indigo/10 text-sm font-bold text-brand-indigo">
                {i + 1}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-brand-indigo" aria-hidden="true" />
                  <p className="text-sm font-semibold text-foreground">
                    {step.label}
                  </p>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <Link
        href="/challenge/the-greeting-machine"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-indigo px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-indigo/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-indigo"
      >
        Start Challenge 1
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );
}
