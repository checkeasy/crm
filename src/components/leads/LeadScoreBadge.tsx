import { cn } from "@/lib/utils";

interface LeadScoreBadgeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showBar?: boolean;
}

export function getScoreColor(score: number) {
  if (score > 60) return "text-emerald-600 dark:text-emerald-400";
  if (score >= 30) return "text-amber-600 dark:text-amber-400";
  return "text-red-500 dark:text-red-400";
}

export function getScoreBgColor(score: number) {
  if (score > 60) return "bg-emerald-500";
  if (score >= 30) return "bg-amber-500";
  return "bg-red-500";
}

export function getScoreLabel(score: number) {
  if (score > 60) return "Chaud";
  if (score >= 30) return "Tiede";
  return "Froid";
}

export function getScoreLabelColor(score: number) {
  if (score > 60) return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300";
  if (score >= 30) return "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300";
  return "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300";
}

export function LeadScoreBadge({ score, size = "sm", showBar = true }: LeadScoreBadgeProps) {
  const barWidth = `${Math.min(score, 100)}%`;

  if (size === "lg") {
    return (
      <div className="flex flex-col items-center gap-2">
        <div
          className={cn(
            "relative flex items-center justify-center rounded-full border-4",
            score > 60
              ? "border-emerald-500/30"
              : score >= 30
                ? "border-amber-500/30"
                : "border-red-500/30",
            "h-24 w-24"
          )}
        >
          <div
            className="absolute inset-1 rounded-full"
            style={{
              background: `conic-gradient(${
                score > 60 ? "#10b981" : score >= 30 ? "#f59e0b" : "#ef4444"
              } ${score * 3.6}deg, transparent ${score * 3.6}deg)`,
              opacity: 0.15,
            }}
          />
          <span className={cn("text-3xl font-bold", getScoreColor(score))}>
            {score}
          </span>
        </div>
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
            getScoreLabelColor(score)
          )}
        >
          {getScoreLabel(score)}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          "font-semibold tabular-nums",
          size === "md" ? "text-base" : "text-sm",
          getScoreColor(score)
        )}
      >
        {score}
      </span>
      {showBar && (
        <div className="h-1.5 w-12 overflow-hidden rounded-full bg-muted">
          <div
            className={cn("h-full rounded-full transition-all duration-300", getScoreBgColor(score))}
            style={{ width: barWidth }}
          />
        </div>
      )}
    </div>
  );
}
