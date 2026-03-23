"use client";

interface TrackTab {
  slug: string;
  label: string;
  completedCount: number;
  totalCount: number;
}

interface TrackTabsProps {
  tracks: TrackTab[];
  activeTrack: string;
}

export function TrackTabs({ tracks, activeTrack }: TrackTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Track selection"
      className="mb-6 flex gap-1 rounded-lg border border-border bg-muted/50 p-1"
    >
      {tracks.map((track) => {
        const isActive = track.slug === activeTrack;
        return (
          <a
            key={track.slug}
            href={`/dashboard?track=${track.slug}`}
            role="tab"
            aria-selected={isActive}
            className={`flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-indigo ${
              isActive
                ? "bg-background text-brand-indigo shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="truncate">{track.label}</span>
            <span
              className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                isActive
                  ? "bg-brand-indigo/10 text-brand-indigo"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {track.completedCount}/{track.totalCount}
            </span>
          </a>
        );
      })}
    </div>
  );
}
