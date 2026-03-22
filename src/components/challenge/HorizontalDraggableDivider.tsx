"use client";

import { useCallback, useRef } from "react";

interface HorizontalDraggableDividerProps {
  onDrag: (deltaY: number) => void;
}

export function HorizontalDraggableDivider({
  onDrag,
}: HorizontalDraggableDividerProps) {
  const dragging = useRef(false);
  const lastY = useRef(0);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      dragging.current = true;
      lastY.current = e.clientY;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      const delta = e.clientY - lastY.current;
      lastY.current = e.clientY;
      onDrag(delta);
    },
    [onDrag],
  );

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  return (
    <div
      className="hidden lg:flex h-1.5 cursor-row-resize items-center justify-center bg-border hover:bg-brand-indigo/40 transition-colors shrink-0"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      role="separator"
      aria-orientation="horizontal"
      aria-label="Resize editor and preview"
      tabIndex={0}
    >
      <div className="w-8 h-0.5 rounded-full bg-brand-slate-400/40" />
    </div>
  );
}
