"use client";

import { useState, useCallback } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCenter,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from "@dnd-kit/core";
import type { Lead, PipelineStage, PipelineType } from "@/lib/types/database";
import { KanbanColumn } from "./KanbanColumn";
import { LeadCard } from "./LeadCard";

interface KanbanBoardProps {
  stages: PipelineStage[];
  initialLeads: Lead[];
  pipelineType: PipelineType;
  onMigrate?: (leadId: string) => void;
}

export function KanbanBoard({
  stages,
  initialLeads,
  pipelineType,
  onMigrate,
}: KanbanBoardProps) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 8 },
    })
  );

  const activeLead = activeId ? leads.find((l) => l.id === activeId) : null;

  const getLeadsForStage = useCallback(
    (stageId: string) => leads.filter((l) => l.pipeline_stage_id === stageId),
    [leads]
  );

  const findStageForLead = useCallback(
    (leadId: string): string | null => {
      const lead = leads.find((l) => l.id === leadId);
      return lead?.pipeline_stage_id ?? null;
    },
    [leads]
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeLeadId = active.id as string;
    const overId = over.id as string;

    const isOverStage = stages.some((s) => s.id === overId);
    const overLead = leads.find((l) => l.id === overId);

    let targetStageId: string | null = null;

    if (isOverStage) {
      targetStageId = overId;
    } else if (overLead) {
      targetStageId = overLead.pipeline_stage_id;
    }

    if (!targetStageId) return;

    const currentStageId = findStageForLead(activeLeadId);
    if (currentStageId === targetStageId) return;

    setLeads((prev) =>
      prev.map((l) =>
        l.id === activeLeadId ? { ...l, pipeline_stage_id: targetStageId } : l
      )
    );
  };

  const handleDragEnd = (_event: DragEndEvent) => {
    setActiveId(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      {/*
        Mobile (<md): vertical accordion list — no horizontal scroll needed.
        Desktop (md+): horizontal row of columns with horizontal scroll safety net.
      */}

      {/* Mobile accordion layout */}
      <div className="flex flex-col gap-3 md:hidden">
        {stages.map((stage) => (
          <KanbanColumn
            key={stage.id}
            stage={stage}
            leads={getLeadsForStage(stage.id)}
            showMigrateButton={pipelineType === "b2c"}
            onMigrate={onMigrate}
            accordionMode
          />
        ))}
      </div>

      {/* Desktop kanban layout */}
      <div
        className="hidden md:flex gap-3 overflow-x-auto pb-4"
        style={{
          /* Each column is at least 240px, scales equally */
          gridTemplateColumns: `repeat(${stages.length}, minmax(240px, 1fr))`,
        }}
      >
        {stages.map((stage) => (
          <KanbanColumn
            key={stage.id}
            stage={stage}
            leads={getLeadsForStage(stage.id)}
            showMigrateButton={pipelineType === "b2c"}
            onMigrate={onMigrate}
          />
        ))}
      </div>

      <DragOverlay dropAnimation={{ duration: 150, easing: "ease" }}>
        {activeLead ? (
          <div className="w-[272px] rotate-2 opacity-90">
            <LeadCard lead={activeLead} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
