import type { PipelineStage } from "@/lib/types/database";
import { cn } from "@/lib/utils";

interface LeadStageBadgeProps {
  stage: PipelineStage | undefined;
  size?: "sm" | "md";
}

export function LeadStageBadge({ stage, size = "sm" }: LeadStageBadgeProps) {
  if (!stage) {
    return (
      <span className="text-xs text-muted-foreground italic">Non defini</span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium",
        size === "md" ? "px-3 py-1 text-sm" : "px-2 py-0.5 text-xs"
      )}
      style={{
        borderColor: `${stage.color}40`,
        backgroundColor: `${stage.color}15`,
        color: stage.color,
      }}
    >
      <span
        className="inline-block shrink-0 rounded-full"
        style={{
          width: size === "md" ? "8px" : "6px",
          height: size === "md" ? "8px" : "6px",
          backgroundColor: stage.color,
        }}
      />
      {stage.name}
    </span>
  );
}

interface PipelineProgressProps {
  currentStage: PipelineStage | undefined;
  stages: PipelineStage[];
}

export function PipelineProgress({ currentStage, stages }: PipelineProgressProps) {
  if (!currentStage) return null;

  const pipelineStages = stages
    .filter((s) => s.pipeline_type === currentStage.pipeline_type)
    .sort((a, b) => a.display_order - b.display_order);

  const currentIndex = pipelineStages.findIndex((s) => s.id === currentStage.id);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5">
        {pipelineStages.map((stage, index) => (
          <div key={stage.id} className="flex items-center gap-1.5">
            <div
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                index <= currentIndex
                  ? "text-white"
                  : "border border-border bg-muted text-muted-foreground"
              )}
              style={
                index <= currentIndex
                  ? { backgroundColor: stage.color }
                  : undefined
              }
              title={stage.name}
            >
              {index + 1}
            </div>
            {index < pipelineStages.length - 1 && (
              <div
                className={cn(
                  "h-0.5 w-4 rounded-full transition-colors",
                  index < currentIndex ? "bg-primary" : "bg-border"
                )}
                style={
                  index < currentIndex
                    ? { backgroundColor: stage.color }
                    : undefined
                }
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-sm font-medium">{currentStage.name}</span>
        <span className="text-xs text-muted-foreground">
          (etape {currentIndex + 1}/{pipelineStages.length})
        </span>
      </div>
    </div>
  );
}
