"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { ChallengeDefinition } from "@/types/challenge";
import type { ChallengeMode } from "@/types/progress";
import { useChallengeStore } from "@/stores/challengeStore";
import { useProgressStore } from "@/stores/progressStore";
import { useAutoSave } from "@/hooks/useAutoSave";
import { useTimeTracker } from "@/hooks/useTimeTracker";
import { StepCodeEditor } from "./StepCodeEditor";
import { StepVerify } from "./StepVerify";
import { CompletionFlow } from "./CompletionFlow";
import { HintPanel } from "./HintPanel";
import { SemiGuidedHintContent } from "./SemiGuidedHintContent";
import { ModeSelector } from "./ModeSelector";
import { ToastContainer } from "@/components/ui/toast";
import { getNextChallengeSlug } from "@/lib/challenges/track-1-fundamentals";
import { LivePreviewPanel } from "./LivePreviewPanel";

interface SemiGuidedWorkspaceProps {
  challenge: ChallengeDefinition;
  availableModes?: ChallengeMode[];
  encourageIndependent?: boolean;
}

/** Strip guiding comments from starter code, keeping only the function signature. */
function getFunctionSignature(starterCode: string): string {
  return starterCode
    .split("\n")
    .filter((line) => !line.trim().startsWith("//"))
    .join("\n");
}

export function SemiGuidedWorkspace({
  challenge,
  availableModes,
  encourageIndependent,
}: SemiGuidedWorkspaceProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    challengeCompleted,
    setChallenge,
    completeStep,
    setChallengeCompleted,
  } = useChallengeStore();

  const { hydrate, getProgress, initProgress, addTime, updateMode } = useProgressStore();
  const { toasts, removeToast } = useAutoSave(challenge.slug);

  const [leftPanePercent, setLeftPanePercent] = useState(30);
  const containerRef = useRef<HTMLDivElement>(null);

  // Hydrate progress store and initialize for semi-guided mode
  useEffect(() => {
    hydrate();
    const saved = getProgress(challenge.slug);
    // Initialize the store with semi-guided starter code (no comments)
    const semiGuidedChallenge = {
      ...challenge,
      starterCode: getFunctionSignature(challenge.starterCode),
    };
    setChallenge(semiGuidedChallenge, saved);
    initProgress(challenge.slug);
  }, [challenge, setChallenge, hydrate, getProgress, initProgress]);

  // Track time spent
  useTimeTracker(
    !challengeCompleted,
    useCallback(
      (seconds: number) => {
        addTime(challenge.slug, seconds);
      },
      [challenge.slug, addTime],
    ),
  );

  const handleDividerDrag = useCallback((deltaX: number) => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.offsetWidth;
    const deltaPercent = (deltaX / containerWidth) * 100;
    setLeftPanePercent((prev) =>
      Math.min(50, Math.max(20, prev + deltaPercent)),
    );
  }, []);

  const handleAllTestsPassed = useCallback(() => {
    completeStep("verify");
    setChallengeCompleted(true);
  }, [completeStep, setChallengeCompleted]);

  const handleModeChange = useCallback(
    (newMode: ChallengeMode) => {
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("codereps:mode_switched", {
            detail: { from_mode: "semi_guided", to_mode: newMode },
          }),
        );
      }
      updateMode(challenge.slug, newMode);
      const params = new URLSearchParams(searchParams.toString());
      params.set("mode", newMode);
      router.push(`/challenge/${challenge.slug}?${params.toString()}`);
    },
    [challenge.slug, router, searchParams, updateMode],
  );

  const nextChallengeSlug = getNextChallengeSlug(challenge.slug);
  const semiGuidedStarterCode = getFunctionSignature(challenge.starterCode);

  return (
    <div className="flex flex-col h-full">
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Header */}
      <div className="border-b border-border bg-card px-4 py-3 sm:px-6 flex items-start justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-xl font-bold text-foreground">
            {challenge.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {challenge.difficulty} &middot; ~{challenge.estimatedMinutes} min
            &middot;{" "}
            <span className="text-brand-indigo font-medium">Semi-Guided</span>
          </p>
        </div>
        <ModeSelector
          currentMode="semi_guided"
          onModeChange={handleModeChange}
          availableModes={availableModes}
          encourageIndependent={encourageIndependent}
        />
      </div>

      <div
        ref={containerRef}
        className="flex flex-1 flex-col lg:flex-row overflow-hidden"
      >
        {/* Hint sidebar (desktop) / stacked sections (mobile) */}
        <div
          className="w-full overflow-y-auto border-b lg:border-b-0 lg:border-r border-border p-4 space-y-3"
          style={{
            flexBasis: `${leftPanePercent}%`,
            flexShrink: 0,
            flexGrow: 0,
          }}
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Thinking Steps (optional)
          </p>

          <HintPanel stepNumber={1} title="Understand" stepName="understand">
            <SemiGuidedHintContent
              step="understand"
              challenge={challenge}
            />
          </HintPanel>

          <HintPanel stepNumber={2} title="Break Down" stepName="breakdown">
            <SemiGuidedHintContent
              step="breakdown"
              challenge={challenge}
            />
          </HintPanel>

          <HintPanel stepNumber={3} title="Map to Code" stepName="map">
            <SemiGuidedHintContent
              step="map"
              challenge={challenge}
            />
          </HintPanel>
        </div>

        {/* Draggable divider - desktop only */}
        <div
          className="hidden lg:flex w-1.5 cursor-col-resize items-center justify-center bg-border hover:bg-brand-indigo/40 transition-colors shrink-0"
          onPointerDown={(e) => {
            const el = e.currentTarget;
            el.setPointerCapture(e.pointerId);
            let lastX = e.clientX;
            const onMove = (ev: PointerEvent) => {
              const delta = ev.clientX - lastX;
              lastX = ev.clientX;
              handleDividerDrag(delta);
            };
            const onUp = () => {
              el.removeEventListener("pointermove", onMove);
              el.removeEventListener("pointerup", onUp);
            };
            el.addEventListener("pointermove", onMove);
            el.addEventListener("pointerup", onUp);
          }}
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize panes"
          tabIndex={0}
        >
          <div className="h-8 w-0.5 rounded-full bg-brand-slate-400/40" />
        </div>

        {/* Main content: editor + preview + verify */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Code editor */}
          <div className={`${challenge.requiresPreview ? "flex-[6]" : "flex-1"} flex flex-col bg-brand-navy overflow-hidden min-h-[200px] lg:min-h-0`}>
            <StepCodeEditor starterCode={semiGuidedStarterCode} />
          </div>

          {/* Live Preview Panel (Track 2+) */}
          {challenge.requiresPreview && challenge.starterHTML && (
            <div className="flex-[4] overflow-hidden">
              <LivePreviewPanel
                starterHTML={challenge.starterHTML}
                starterCSS={challenge.starterCSS}
                isFirstChallenge={challenge.order === 1}
              />
            </div>
          )}

          {/* Verify section */}
          <div className="border-t border-border bg-card p-4 overflow-y-auto max-h-[40%]">
            <StepVerify
              testCases={challenge.testCases}
              onAllPassed={handleAllTestsPassed}
              starterHTML={challenge.starterHTML}
              starterCSS={challenge.starterCSS}
            />
            {challengeCompleted && (
              <div className="mt-4">
                <CompletionFlow
                  challenge={challenge}
                  nextChallengeSlug={nextChallengeSlug}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
