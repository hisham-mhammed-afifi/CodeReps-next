"use client";

import { useState, useCallback, useMemo } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { BreakdownBlock } from "@/types/challenge";

interface SortableBlockProps {
  block: BreakdownBlock;
  index: number;
  status: "idle" | "correct" | "incorrect";
  isLocked: boolean;
}

function SortableBlock({ block, index, status, isLocked }: SortableBlockProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id, disabled: isLocked });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-3 rounded-lg border px-4 py-3 transition-colors",
        isDragging && "z-10 shadow-lg",
        status === "idle" && "border-border bg-card",
        status === "correct" &&
          "border-brand-emerald bg-brand-emerald/5",
        status === "incorrect" &&
          "border-brand-rose bg-brand-rose/5",
        isLocked && "cursor-default",
      )}
      role="listitem"
      aria-label={`Step ${index + 1}: ${block.text}${status === "correct" ? " (correct)" : ""}${status === "incorrect" ? " (incorrect position)" : ""}`}
    >
      {!isLocked && (
        <button
          type="button"
          className="touch-none cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-brand-indigo rounded"
          aria-label={`Drag to reorder: ${block.text}`}
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </button>
      )}
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
        {index + 1}
      </span>
      <span className="flex-1 text-sm text-foreground">{block.text}</span>
      {status === "correct" && (
        <Check className="h-4 w-4 text-brand-emerald shrink-0" aria-hidden="true" />
      )}
      {status === "incorrect" && (
        <X className="h-4 w-4 text-brand-rose shrink-0" aria-hidden="true" />
      )}
    </div>
  );
}

interface StepBreakdownProps {
  blocks: BreakdownBlock[];
  onComplete: () => void;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function StepBreakdown({ blocks, onComplete }: StepBreakdownProps) {
  const [items, setItems] = useState<BreakdownBlock[]>(() => {
    let shuffled = shuffleArray(blocks);
    // Ensure shuffled order differs from correct order
    while (
      shuffled.length > 1 &&
      shuffled.every((b, i) => b.order === blocks[i].order)
    ) {
      shuffled = shuffleArray(blocks);
    }
    return shuffled;
  });
  const [blockStatuses, setBlockStatuses] = useState<
    Record<string, "idle" | "correct" | "incorrect">
  >(() => Object.fromEntries(blocks.map((b) => [b.id, "idle" as const])));
  const [allCorrect, setAllCorrect] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const correctOrder = useMemo(
    () => [...blocks].sort((a, b) => a.order - b.order),
    [blocks],
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      setItems((prev) => {
        const oldIndex = prev.findIndex((b) => b.id === active.id);
        const newIndex = prev.findIndex((b) => b.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
      // Reset statuses on reorder
      if (hasSubmitted) {
        setBlockStatuses(
          Object.fromEntries(blocks.map((b) => [b.id, "idle" as const])),
        );
        setHasSubmitted(false);
      }
    },
    [blocks, hasSubmitted],
  );

  function handleSubmit() {
    setHasSubmitted(true);
    const statuses: Record<string, "correct" | "incorrect"> = {};
    let correct = true;

    items.forEach((block, index) => {
      if (block.id === correctOrder[index].id) {
        statuses[block.id] = "correct";
      } else {
        statuses[block.id] = "incorrect";
        correct = false;
      }
    });

    setBlockStatuses(statuses);
    setAllCorrect(correct);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-foreground mb-2">
          Step 2: Break Down
        </h2>
        <p className="text-muted-foreground text-sm mb-1">
          Drag the steps into the correct order to solve this problem.
        </p>
        <p className="text-muted-foreground text-xs">
          Keyboard: Use Tab to focus a block, then arrow keys to reorder, Enter
          to drop.
        </p>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((b) => b.id)}
          strategy={verticalListSortingStrategy}
        >
          <div
            role="list"
            aria-label="Breakdown steps to arrange"
            className="space-y-2"
          >
            {items.map((block, index) => (
              <SortableBlock
                key={block.id}
                block={block}
                index={index}
                status={blockStatuses[block.id] ?? "idle"}
                isLocked={allCorrect}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {hasSubmitted && !allCorrect && (
        <p
          className="text-sm text-brand-amber"
          role="alert"
        >
          Some steps are in the wrong position. Look at the highlighted blocks
          and try again.
        </p>
      )}

      {allCorrect && (
        <p
          className="text-sm text-brand-emerald font-medium"
          role="status"
        >
          All steps are in the correct order!
        </p>
      )}

      {!allCorrect && (
        <Button
          onClick={handleSubmit}
          className="bg-brand-indigo hover:bg-brand-indigo/90 text-white"
        >
          Check order
        </Button>
      )}

      {allCorrect && (
        <Button
          onClick={onComplete}
          className="bg-brand-indigo hover:bg-brand-indigo/90 text-white"
        >
          Next step
        </Button>
      )}
    </div>
  );
}
