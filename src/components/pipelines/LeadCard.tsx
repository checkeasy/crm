"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Phone, Mail, StickyNote, ArrowRightLeft, Building2, Home } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Lead } from "@/lib/types/database";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

function getScoreBadge(score: number) {
  if (score >= 61) return { label: "Chaud", className: "bg-emerald-100 text-emerald-700 border-emerald-200" };
  if (score >= 31) return { label: "Tiede", className: "bg-amber-100 text-amber-700 border-amber-200" };
  return { label: "Froid", className: "bg-slate-100 text-slate-600 border-slate-200" };
}

function getSourceLabel(source: string) {
  const map: Record<string, string> = {
    linkedin: "LinkedIn",
    inbound: "Inbound",
    partenaire: "Partenaire",
    seo: "SEO",
    webinar: "Webinar",
    salon: "Salon",
    formulaire: "Formulaire",
    ads: "Ads",
    parrainage: "Parrainage",
    referral: "Referral",
  };
  return map[source] ?? source;
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

  const scoreBadge = getScoreBadge(lead.score);
  const timeAgo = formatDistanceToNow(new Date(lead.updated_at), { addSuffix: true, locale: fr });

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "bg-card border border-border rounded-lg p-3 cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-shadow",
        isDragging && "opacity-50 shadow-lg ring-2 ring-primary/20"
      )}
    >
      {/* Header: Name + Score */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="min-w-0">
          <p className="font-medium text-sm truncate">
            {lead.first_name} {lead.last_name}
          </p>
          {lead.company && (
            <p className="text-xs text-muted-foreground truncate flex items-center gap-1">
              <Building2 className="h-3 w-3 shrink-0" />
              {lead.company}
            </p>
          )}
        </div>
        <span className="text-lg font-bold text-primary shrink-0">{lead.score}</span>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-1.5 mb-2">
        <Badge variant="outline" className="text-[10px] px-1.5 py-0">
          {getSourceLabel(lead.source)}
        </Badge>
        <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0 border", scoreBadge.className)}>
          {scoreBadge.label}
        </Badge>
        <Badge variant="outline" className="text-[10px] px-1.5 py-0">
          <Home className="h-2.5 w-2.5 mr-0.5" />
          {lead.nb_properties}
        </Badge>
      </div>

      {/* Last activity */}
      <p className="text-[11px] text-muted-foreground mb-2 truncate">
        {timeAgo}
      </p>

      {/* Quick actions */}
      <div className="flex items-center gap-1 border-t border-border pt-2">
        <button
          className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
          title="Appeler"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => { e.stopPropagation(); }}
        >
          <Phone className="h-3.5 w-3.5" />
        </button>
        <button
          className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
          title="Email"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => { e.stopPropagation(); }}
        >
          <Mail className="h-3.5 w-3.5" />
        </button>
        <button
          className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
          title="Note"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => { e.stopPropagation(); }}
        >
          <StickyNote className="h-3.5 w-3.5" />
        </button>
        {showMigrateButton && (
          <button
            className="ml-auto p-1.5 rounded-md hover:bg-primary/10 text-primary transition-colors"
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
