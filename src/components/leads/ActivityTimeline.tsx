import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Mail,
  Phone,
  Video,
  StickyNote,
  RefreshCw,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import type { Activity, ActivityType } from "@/lib/types/database";
import { commercialUsers } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const activityConfig: Record<
  ActivityType,
  { icon: LucideIcon; label: string; color: string; bgColor: string }
> = {
  email: {
    icon: Mail,
    label: "Email",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/40",
  },
  call: {
    icon: Phone,
    label: "Appel",
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/40",
  },
  meeting: {
    icon: Video,
    label: "Reunion",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900/40",
  },
  note: {
    icon: StickyNote,
    label: "Note",
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-100 dark:bg-amber-900/40",
  },
  status_change: {
    icon: RefreshCw,
    label: "Changement de statut",
    color: "text-gray-600 dark:text-gray-400",
    bgColor: "bg-gray-100 dark:bg-gray-800",
  },
  score_update: {
    icon: TrendingUp,
    label: "Mise a jour du score",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/40",
  },
};

interface ActivityTimelineProps {
  activities: Activity[];
}

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
  if (activities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <StickyNote className="h-5 w-5 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium text-muted-foreground">
          Aucune activite enregistree
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Les interactions avec ce lead apparaitront ici.
        </p>
      </div>
    );
  }

  const sortedActivities = [...activities].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <div className="relative space-y-0">
      {/* Vertical line */}
      <div className="absolute left-[17px] top-2 bottom-2 w-px bg-border" />

      {sortedActivities.map((activity, index) => {
        const config = activityConfig[activity.activity_type];
        const Icon = config.icon;
        const user = activity.user_id
          ? commercialUsers.find((u) => u.id === activity.user_id)
          : null;

        return (
          <div
            key={activity.id}
            className={cn(
              "relative flex gap-3 pb-6",
              index === sortedActivities.length - 1 && "pb-0"
            )}
          >
            {/* Icon dot */}
            <div
              className={cn(
                "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                config.bgColor
              )}
            >
              <Icon className={cn("h-4 w-4", config.color)} />
            </div>

            {/* Content */}
            <div className="flex-1 pt-0.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span
                    className={cn(
                      "inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                      config.bgColor,
                      config.color
                    )}
                  >
                    {config.label}
                  </span>
                  {user && (
                    <span className="ml-2 text-xs text-muted-foreground">
                      par {user.name}
                    </span>
                  )}
                </div>
                <time className="shrink-0 text-xs text-muted-foreground">
                  {format(new Date(activity.created_at), "d MMM yyyy 'a' HH:mm", {
                    locale: fr,
                  })}
                </time>
              </div>
              {activity.content && (
                <p className="mt-1.5 text-sm text-foreground/80 leading-relaxed">
                  {activity.content}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
