"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Phone,
  Mail,
  StickyNote,
  ArrowRightLeft,
  Building2,
  Home,
  Linkedin,
  Globe,
  Users,
  Megaphone,
  Handshake,
  UserPlus,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Lead } from "@/lib/types/database";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

function getScoreConfig(score: number): {
  label: string;
  dotClass: string;
  barClass: string;
  badgeClass: string;
} {
  if (score >= 61)
    return {
      label: "Chaud",
      dotClass: "bg-emerald-500",
      barClass: "bg-emerald-500",
      badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
    };
  if (score >= 31)
    return {
      label: "Tiede",
      dotClass: "bg-amber-500",
      barClass: "bg-amber-400",
      badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
    };
  return {
    label: "Froid",
    dotClass: "bg-slate-400",
    barClass: "bg-slate-300",
    badgeClass: "bg-slate-50 text-slate-600 border-slate-200",
  };
}

function getSourceConfig(source: string): {
  label: string;
  icon: React.ReactNode;
  colorClass: string;
} {
  switch (source) {
    case "linkedin":
      return {
        label: "LinkedIn",
        icon: <Linkedin className="h-3 w-3" />,
        colorClass: "text-blue-600",
      };
    case "inbound":
      return {
        label: "Inbound",
        icon: <UserPlus className="h-3 w-3" />,
        colorClass: "text-violet-600",
      };
    case "partenaire":
      return {
        label: "Partenaire",
        icon: <Handshake className="h-3 w-3" />,
        colorClass: "text-indigo-600",
      };
    case "seo":
      return {
        label: "SEO",
        icon: <Globe className="h-3 w-3" />,
        colorClass: "text-teal-600",
      };
    case "webinar":
      return {
        label: "Webinar",
        icon: <Users className="h-3 w-3" />,
        colorClass: "text-sky-600",
      };
    case "salon":
      return {
        label: "Salon",
        icon: <Award className="h-3 w-3" />,
        colorClass: "text-orange-600",
      };
    case "formulaire":
      return {
        label: "Formulaire",
        icon: <Globe className="h-3 w-3" />,
        colorClass: "text-cyan-600",
      };
    case "ads":
      return {
        label: "Ads",
        icon: <Megaphone className="h-3 w-3" />,
        colorClass: "text-pink-600",
      };
    case "parrainage":
      return {
        label: "Parrainage",
        icon: <UserPlus className="h-3 w-3" />,
        colorClass: "text-green-600",
      };
    case "referral":
      return {
        label: "Referral",
        icon: <UserPlus className="h-3 w-3" />,
        colorClass: "text-emerald-600",
      };
    default:
      return {
        label: source,
        icon: <Globe className="h-3 w-3" />,
        colorClass: "text-muted-foreground",
      };
  }
}

interface LeadCardProps {
  lead: Lead;
  showMigrateButton?: boolean;
  onMigrate?: (leadId: string) => void;
}

export function LeadCard({ lead, showMigrateButton, onMigrate }: LeadCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: lead.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const scoreConfig = getScoreConfig(lead.score);
  const sourceConfig = getSourceConfig(lead.source);
  const timeAgo = formatDistanceToNow(new Date(lead.updated_at), {
    addSuffix: true,
    locale: fr,
  });
  const scorePercent = Math.min(100, lead.score);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "bg-card border border-border rounded-xl p-3 cursor-grab active:cursor-grabbing shadow-sm",
        "hover:shadow-md hover:border-border/80 transition-all duration-150",
        "select-none touch-manipulation",
        isDragging && "opacity-40 shadow-xl ring-2 ring-primary/30 scale-[0.98]"
      )}
    >
      {/* Score bar — full-width accent at top */}
      <div className="h-1 rounded-full bg-muted mb-3 -mx-0 overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all", scoreConfig.barClass)}
          style={{ width: `${scorePercent}%` }}
        />
      </div>

      {/* Header: Name + Score dot */}
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-sm leading-snug truncate">
            {lead.first_name} {lead.last_name}
          </p>
          {lead.company && (
            <p className="text-xs text-muted-foreground truncate flex items-center gap-1 mt-0.5">
              <Building2 className="h-3 w-3 shrink-0 text-muted-foreground/70" />
              <span className="truncate">{lead.company}</span>
            </p>
          )}
        </div>
        {/* Score indicator */}
        <div className="flex flex-col items-end shrink-0">
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                "text-xs font-bold tabular-nums",
                lead.score >= 61
                  ? "text-emerald-600"
                  : lead.score >= 31
                  ? "text-amber-600"
                  : "text-slate-500"
              )}
            >
              {lead.score}
            </span>
            <span
              className={cn(
                "inline-block w-2 h-2 rounded-full shrink-0",
                scoreConfig.dotClass
              )}
            />
          </div>
        </div>
      </div>

      {/* Badges row */}
      <div className="flex flex-wrap gap-1 mb-2">
        {/* Source badge with icon */}
        <span
          className={cn(
            "inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full",
            "bg-muted/60 border border-border/60",
            sourceConfig.colorClass
          )}
        >
          {sourceConfig.icon}
          {sourceConfig.label}
        </span>

        {/* Score label badge */}
        <span
          className={cn(
            "inline-flex items-center text-[10px] font-medium px-1.5 py-0.5 rounded-full border",
            scoreConfig.badgeClass
          )}
        >
          {scoreConfig.label}
        </span>

        {/* Properties badge */}
        <span className="inline-flex items-center gap-0.5 text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-muted/60 border border-border/60 text-muted-foreground">
          <Home className="h-2.5 w-2.5" />
          {lead.nb_properties}
        </span>
      </div>

      {/* Last activity */}
      <p className="text-[10px] text-muted-foreground/80 mb-2.5 truncate">
        Mis a jour {timeAgo}
      </p>

      {/* Quick actions */}
      <div className="flex items-center gap-0.5 border-t border-border/60 pt-2.5">
        <button
          className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
          title="Appeler"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Phone className="h-3.5 w-3.5" />
        </button>
        <button
          className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
          title="Email"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Mail className="h-3.5 w-3.5" />
        </button>
        <button
          className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
          title="Note"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <StickyNote className="h-3.5 w-3.5" />
        </button>
        {showMigrateButton && (
          <button
            className="ml-auto min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg hover:bg-primary/10 text-primary transition-colors"
            title="Migrer vers B2B"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onMigrate?.(lead.id);
            }}
          >
            <ArrowRightLeft className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
