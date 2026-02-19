"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Flame, TrendingUp, DollarSign } from "lucide-react";
import { mockLeads } from "@/lib/mock-data";

function getKpis() {
  const totalLeads = mockLeads.length;
  const hotLeads = mockLeads.filter((l) => l.score >= 61).length;
  const wonLeads = mockLeads.filter((l) => l.status === "won").length;
  const conversionRate = totalLeads > 0 ? ((wonLeads / totalLeads) * 100).toFixed(1) : "0";

  // MRR: B2C won * avg 12.49 + B2B won * avg 49
  const b2cWon = mockLeads.filter((l) => l.status === "won" && l.lead_type === "b2c").length;
  const b2bWon = mockLeads.filter((l) => l.status === "won" && l.lead_type === "b2b").length;
  const mrr = b2cWon * 12.49 + b2bWon * 49;

  return { totalLeads, hotLeads, conversionRate, mrr };
}

const kpiConfig = [
  {
    key: "totalLeads" as const,
    label: "Total leads",
    icon: Users,
    change: "+12%",
    format: (v: number) => v.toString(),
  },
  {
    key: "hotLeads" as const,
    label: "Leads chauds",
    icon: Flame,
    change: "+18%",
    format: (v: number) => v.toString(),
  },
  {
    key: "conversionRate" as const,
    label: "Taux conversion",
    icon: TrendingUp,
    change: "+2.1%",
    format: (v: string) => `${v}%`,
  },
  {
    key: "mrr" as const,
    label: "MRR pipeline",
    icon: DollarSign,
    change: "+8%",
    format: (v: number) =>
      new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v),
  },
];

export function KpiCards() {
  const kpis = getKpis();

  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      {kpiConfig.map((kpi) => {
        const value = kpis[kpi.key];
        return (
          <Card key={kpi.key}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.label}
              </CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {kpi.format(value as never)}
              </div>
              <p className="text-xs text-emerald-600 mt-1">
                {kpi.change} vs mois dernier
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
