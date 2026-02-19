"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { cn } from "@/lib/utils";
import type { Lead, PipelineStage } from "@/lib/types/database";
import { LeadCard } from "./LeadCard";

interface KanbanColumnProps {
  stage: PipelineStage;
  leads: Lead[];
  showMigrateButton?: boolean;
  onMigrate?: (leadId: string) => void;
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

export function KanbanColumn({ stage, leads, showMigrateButton, onMigrate }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: stage.id });
  const leadIds = leads.map((l) => l.id);
  const valueStr = formatValue(leads);

  return (
    <div className="flex flex-col min-w-[260px] w-[260px] md:w-auto md:min-w-0 md:flex-1 shrink-0">
      {/* Column header */}
      <div className="flex items-center gap-2 mb-3 px-1">
        <div
          className="w-3 h-3 rounded-full shrink-0"
          style={{ backgroundColor: stage.color }}
        />
        <h3 className="text-sm font-semibold truncate">{stage.name}</h3>
        <span className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5 shrink-0">
          {leads.length}
        </span>
        {valueStr && (
          <span className="text-[10px] text-muted-foreground ml-auto shrink-0 hidden md:inline">
            {valueStr}
          </span>
        )}
      </div>

      {/* Drop zone */}
      <SortableContext items={leadIds} strategy={verticalListSortingStrategy}>
        <div
          ref={setNodeRef}
          className={cn(
            "flex-1 bg-muted/30 rounded-lg p-2 space-y-2 min-h-[200px] transition-colors",
            isOver && "bg-primary/5 ring-2 ring-primary/20"
          )}
        >
          {leads.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-8">
              Deposez un lead ici
            </p>
          )}
          {leads.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              showMigrateButton={showMigrateButton}
              onMigrate={onMigrate}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}
