import type { LeadStatus } from "@/lib/types/database";
import { cn } from "@/lib/utils";
import { CircleCheck, CircleX, Archive, Zap } from "lucide-react";

const statusConfig: Record<
  LeadStatus,
  { label: string; className: string; icon: typeof Zap }
> = {
  active: {
    label: "Actif",
    className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    icon: Zap,
  },
  won: {
    label: "Gagne",
    className: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    icon: CircleCheck,
  },
  lost: {
    label: "Perdu",
    className: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    icon: CircleX,
  },
  archived: {
    label: "Archive",
    className: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
    icon: Archive,
  },
};

interface LeadStatusBadgeProps {
  status: LeadStatus;
  showIcon?: boolean;
}

export function LeadStatusBadge({ status, showIcon = false }: LeadStatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
        config.className
      )}
    >
      {showIcon && <Icon className="h-3 w-3" />}
      {config.label}
    </span>
  );
}
