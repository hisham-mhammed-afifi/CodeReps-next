export function ChallengeCardSkeleton() {
  return (
    <div className="rounded-xl border border-border/50 bg-card p-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-muted" />
          <div className="space-y-1.5">
            <div className="h-4 w-32 rounded bg-muted" />
            <div className="h-3 w-20 rounded bg-muted" />
          </div>
        </div>
        <div className="h-4 w-4 rounded bg-muted" />
      </div>
    </div>
  );
}
