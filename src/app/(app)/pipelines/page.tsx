"use client";

import { useState, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { KanbanBoard } from "@/components/pipelines/KanbanBoard";
import {
  b2bStages,
  b2cStages,
  b2bLeads as initialB2bLeads,
  b2cLeads as initialB2cLeads,
} from "@/components/pipelines/mock-data";
import { toast } from "sonner";

export default function PipelinesPage() {
  const [b2bLeads, setB2bLeads] = useState(initialB2bLeads);
  const [b2cLeads, setB2cLeads] = useState(initialB2cLeads);

  const handleMigrateToB2B = useCallback(
    (leadId: string) => {
      const lead = b2cLeads.find((l) => l.id === leadId);
      if (!lead) return;

      setB2cLeads((prev) => prev.filter((l) => l.id !== leadId));

      const migratedLead = {
        ...lead,
        lead_type: "b2b" as const,
        pipeline_stage_id: "b2b-2",
      };
      setB2bLeads((prev) => [...prev, migratedLead]);

      toast.success(
        `${lead.first_name} ${lead.last_name} migre vers le pipeline B2B (Qualification)`
      );
    },
    [b2cLeads]
  );

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight md:text-2xl">
            Pipelines
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Gerez vos pipelines de vente B2B et B2C.
          </p>
        </div>
        <Button size="sm" className="shrink-0 min-h-[36px]">
          <Plus className="h-4 w-4 mr-1.5" />
          <span className="hidden sm:inline">Nouveau lead</span>
          <span className="sm:hidden">Nouveau</span>
        </Button>
      </div>

      <Tabs defaultValue="b2b" className="w-full">
        <TabsList className="h-10">
          <TabsTrigger value="b2b" className="gap-2 min-h-[36px]">
            <span className="hidden sm:inline">Pipeline B2B</span>
            <span className="sm:hidden">B2B</span>
            <Badge
              variant="secondary"
              className="text-[10px] h-5 px-1.5 rounded-full"
            >
              {b2bLeads.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="b2c" className="gap-2 min-h-[36px]">
            <span className="hidden sm:inline">Pipeline B2C</span>
            <span className="sm:hidden">B2C</span>
            <Badge
              variant="secondary"
              className="text-[10px] h-5 px-1.5 rounded-full"
            >
              {b2cLeads.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="b2b" className="mt-4">
          <KanbanBoard
            stages={b2bStages}
            initialLeads={b2bLeads}
            pipelineType="b2b"
          />
        </TabsContent>

        <TabsContent value="b2c" className="mt-4">
          <KanbanBoard
            stages={b2cStages}
            initialLeads={b2cLeads}
            pipelineType="b2c"
            onMigrate={handleMigrateToB2B}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
