export function PatternLibrarySkeleton() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      {/* Header skeleton */}
      <div className="space-y-3 animate-pulse">
        <div className="h-8 w-56 rounded bg-muted" />
        <div className="h-4 w-80 rounded bg-muted" />
        <div className="h-2 w-full max-w-xs rounded-full bg-muted" />
      </div>

      {/* Grid skeleton */}
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-xl border border-border bg-muted p-5"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="h-8 w-8 rounded-lg bg-muted-foreground/10" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-20 rounded bg-muted-foreground/10" />
                <div className="h-4 w-32 rounded bg-muted-foreground/10" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 w-full rounded bg-muted-foreground/10" />
              <div className="h-3 w-3/4 rounded bg-muted-foreground/10" />
            </div>
            <div className="mt-3 h-12 rounded-md bg-muted-foreground/10" />
          </div>
        ))}
      </div>
    </div>
  );
}
