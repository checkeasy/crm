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

      // Remove from B2C
      setB2cLeads((prev) => prev.filter((l) => l.id !== leadId));

      // Add to B2B as Lead stage
      const migratedLead = {
        ...lead,
        lead_type: "b2b" as const,
        pipeline_stage_id: "b2b-2", // Qualification stage
      };
      setB2bLeads((prev) => [...prev, migratedLead]);

      toast.success(`${lead.first_name} ${lead.last_name} migre vers le pipeline B2B (Qualification)`);
    },
    [b2cLeads]
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Pipelines</h2>
          <p className="text-muted-foreground">
            Gerez vos pipelines de vente B2B et B2C.
          </p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Nouveau lead
        </Button>
      </div>

      <Tabs defaultValue="b2b" className="w-full">
        <TabsList>
          <TabsTrigger value="b2b" className="gap-2">
            Pipeline B2B
            <Badge variant="secondary" className="text-[10px] h-5 px-1.5">
              {b2bLeads.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="b2c" className="gap-2">
            Pipeline B2C
            <Badge variant="secondary" className="text-[10px] h-5 px-1.5">
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
