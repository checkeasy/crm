"use client";

import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { ChevronDown, LayoutList } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Lead, PipelineStage } from "@/lib/types/database";
import { LeadCard } from "./LeadCard";

interface KanbanColumnProps {
  stage: PipelineStage;
  leads: Lead[];
  showMigrateButton?: boolean;
  onMigrate?: (leadId: string) => void;
  /** When true, renders as an accordion row (used on mobile) */
  accordionMode?: boolean;
}

function formatValue(leads: Lead[]): string {
  const total = leads.reduce((sum, lead) => {
    const arr = (lead.metadata?.arr_potential as number) ?? 0;
    return sum + arr;
  }, 0);
  if (total === 0) return "";
  if (total >= 1000) return `${(total / 1000).toFixed(0)}k EUR`;
  return `${total} EUR`;
}

export function KanbanColumn({
  stage,
  leads,
  showMigrateButton,
  onMigrate,
  accordionMode = false,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: stage.id });
  const leadIds = leads.map((l) => l.id);
  const valueStr = formatValue(leads);
  const [isOpen, setIsOpen] = useState(leads.length > 0);

  if (accordionMode) {
    return (
      <div className="rounded-xl border border-border overflow-hidden">
        {/* Accordion header */}
        <button
          className="w-full flex items-center gap-3 px-4 py-3 bg-card hover:bg-accent/40 transition-colors"
          onClick={() => setIsOpen((v) => !v)}
          style={{ borderTop: `3px solid ${stage.color}` }}
          aria-expanded={isOpen}
        >
          {/* Color dot */}
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ backgroundColor: stage.color }}
          />
          {/* Stage name */}
          <span className="text-sm font-semibold flex-1 text-left truncate">
            {stage.name}
          </span>
          {/* Count badge */}
          <span
            className="inline-flex items-center justify-center text-xs font-medium rounded-full px-2 py-0.5 min-w-[24px] shrink-0"
            style={{
              backgroundColor: `${stage.color}20`,
              color: stage.color,
              border: `1px solid ${stage.color}40`,
            }}
          >
            {leads.length}
          </span>
          {/* Value */}
          {valueStr && (
            <span className="text-xs text-muted-foreground shrink-0 hidden sm:inline">
              {valueStr}
            </span>
          )}
          {/* Chevron */}
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform duration-200 shrink-0",
              isOpen && "rotate-180"
            )}
          />
        </button>

        {/* Accordion content */}
        {isOpen && (
          <SortableContext items={leadIds} strategy={verticalListSortingStrategy}>
            <div
              ref={setNodeRef}
              className={cn(
                "p-3 space-y-2 bg-muted/20 transition-colors",
                isOver && "bg-primary/5 ring-2 ring-inset ring-primary/20"
              )}
            >
              {leads.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-6 text-muted-foreground gap-1.5">
                  <LayoutList className="h-5 w-5 opacity-40" />
                  <p className="text-xs">Deposez un lead ici</p>
                </div>
              ) : (
                leads.map((lead) => (
                  <LeadCard
                    key={lead.id}
                    lead={lead}
                    showMigrateButton={showMigrateButton}
                    onMigrate={onMigrate}
                  />
                ))
              )}
            </div>
          </SortableContext>
        )}
      </div>
    );
  }

  // Default: full column layout (desktop)
  return (
    <div className="flex flex-col min-w-[272px] w-[272px] md:w-auto md:min-w-0 md:flex-1 shrink-0">
      {/* Column header */}
      <div
        className="rounded-t-xl border border-b-0 border-border bg-card px-3 pt-3 pb-2.5"
        style={{ borderTop: `3px solid ${stage.color}` }}
      >
        <div className="flex items-center gap-2">
          {/* Color dot */}
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ backgroundColor: stage.color }}
          />
          {/* Stage name */}
          <h3 className="text-sm font-semibold truncate flex-1">{stage.name}</h3>
          {/* Count badge */}
          <span
            className="inline-flex items-center justify-center text-xs font-medium rounded-full px-2 py-0.5 min-w-[24px] shrink-0"
            style={{
              backgroundColor: `${stage.color}20`,
              color: stage.color,
              border: `1px solid ${stage.color}40`,
            }}
          >
            {leads.length}
          </span>
        </div>
        {valueStr && (
          <p className="text-[11px] text-muted-foreground mt-1 pl-5">{valueStr}</p>
        )}
      </div>

      {/* Drop zone */}
      <SortableContext items={leadIds} strategy={verticalListSortingStrategy}>
        <div
          ref={setNodeRef}
          className={cn(
            "flex-1 rounded-b-xl border border-t-0 border-border bg-muted/25 p-2.5 space-y-2.5 min-h-[240px] transition-colors",
            isOver && "bg-primary/5 ring-2 ring-inset ring-primary/20"
          )}
        >
          {leads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-muted-foreground gap-2">
              <LayoutList className="h-6 w-6 opacity-30" />
              <p className="text-xs text-center leading-relaxed">
                Aucun lead
                <br />
                <span className="opacity-70">Deposez ici pour ajouter</span>
              </p>
            </div>
          ) : (
            leads.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                showMigrateButton={showMigrateButton}
                onMigrate={onMigrate}
              />
            ))
          )}
        </div>
      </SortableContext>
    </div>
  );
}
