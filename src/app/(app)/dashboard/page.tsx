"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { KpiCards } from "@/components/dashboard/KpiCards";
import { LeadsByChannelChart } from "@/components/dashboard/LeadsByChannelChart";
import { FunnelChart } from "@/components/dashboard/FunnelChart";
import { RecentLeadsTable } from "@/components/dashboard/RecentLeadsTable";
import { ChannelMetricsCards } from "@/components/dashboard/ChannelMetricsCards";
import { BarChart3, Filter, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <WelcomeBanner />

      {/* KPI Cards */}
      <KpiCards />

      {/* Charts Section - 2 column layout on large screens */}
      <div className="grid gap-6 lg:grid-cols-2">
        <LeadsByChannelChart />
        <FunnelChart />
      </div>

      {/* Channel Metrics - Tabbed Section */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <TrendingUp className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">Analyse detaillee</h3>
            <p className="text-xs text-muted-foreground">Performance par canal et leads recents</p>
          </div>
        </div>

        <Tabs defaultValue="leads" className="space-y-4">
          <TabsList>
            <TabsTrigger value="leads" className="gap-1.5">
              <Filter className="h-3.5 w-3.5" />
              Derniers leads
            </TabsTrigger>
            <TabsTrigger value="metrics" className="gap-1.5">
              <BarChart3 className="h-3.5 w-3.5" />
              Metriques canaux
            </TabsTrigger>
          </TabsList>
          <TabsContent value="leads">
            <RecentLeadsTable />
          </TabsContent>
          <TabsContent value="metrics">
            <ChannelMetricsCards />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
