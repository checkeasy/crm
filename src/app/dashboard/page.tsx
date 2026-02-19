"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KpiCards } from "@/components/dashboard/KpiCards";
import { LeadsByChannelChart } from "@/components/dashboard/LeadsByChannelChart";
import { FunnelChart } from "@/components/dashboard/FunnelChart";
import { RecentLeadsTable } from "@/components/dashboard/RecentLeadsTable";
import { ChannelMetricsCards } from "@/components/dashboard/ChannelMetricsCards";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Vue unifiee de votre activite commerciale multi-canal.
        </p>
      </div>

      {/* KPI Cards */}
      <KpiCards />

      {/* Charts */}
      <Tabs defaultValue="channels" className="space-y-4">
        <TabsList>
          <TabsTrigger value="channels">Par canal</TabsTrigger>
          <TabsTrigger value="funnel">Funnel</TabsTrigger>
          <TabsTrigger value="metrics">Metriques</TabsTrigger>
        </TabsList>
        <TabsContent value="channels">
          <LeadsByChannelChart />
        </TabsContent>
        <TabsContent value="funnel">
          <FunnelChart />
        </TabsContent>
        <TabsContent value="metrics">
          <ChannelMetricsCards />
        </TabsContent>
      </Tabs>

      {/* Recent Leads Table */}
      <RecentLeadsTable />
    </div>
  );
}
