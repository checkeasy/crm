"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Users, Flame, TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { mockLeads } from "@/lib/mock-data";
import type { LucideIcon } from "lucide-react";

function getKpis() {
  const totalLeads = mockLeads.length;
  const hotLeads = mockLeads.filter((l) => l.score >= 61).length;
  const wonLeads = mockLeads.filter((l) => l.status === "won").length;
  const conversionRate = totalLeads > 0 ? ((wonLeads / totalLeads) * 100).toFixed(1) : "0";

  const b2cWon = mockLeads.filter((l) => l.status === "won" && l.lead_type === "b2c").length;
  const b2bWon = mockLeads.filter((l) => l.status === "won" && l.lead_type === "b2b").length;
  const mrr = b2cWon * 12.49 + b2bWon * 49;

  return { totalLeads, hotLeads, conversionRate, mrr };
}

interface KpiConfig {
  key: "totalLeads" | "hotLeads" | "conversionRate" | "mrr";
  label: string;
  icon: LucideIcon;
  change: number;
  format: (v: number | string) => string;
  gradient: string;
  iconBg: string;
  sparkData: number[];
}

const kpiConfig: KpiConfig[] = [
  {
    key: "totalLeads",
    label: "Total leads",
    icon: Users,
    change: 12,
    format: (v) => v.toString(),
    gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
    iconBg: "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
    sparkData: [4, 6, 5, 8, 7, 10, 9, 12, 11, 14, 16, 20],
  },
  {
    key: "hotLeads",
    label: "Leads chauds",
    icon: Flame,
    change: 18,
    format: (v) => v.toString(),
    gradient: "from-orange-500/10 via-orange-500/5 to-transparent",
    iconBg: "bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400",
    sparkData: [2, 3, 2, 4, 5, 4, 6, 5, 7, 8, 9, 10],
  },
  {
    key: "conversionRate",
    label: "Taux conversion",
    icon: TrendingUp,
    change: 2.1,
    format: (v) => `${v}%`,
    gradient: "from-emerald-500/10 via-emerald-500/5 to-transparent",
    iconBg: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
    sparkData: [10, 12, 11, 13, 12, 15, 14, 16, 15, 17, 18, 20],
  },
  {
    key: "mrr",
    label: "MRR pipeline",
    icon: DollarSign,
    change: 8,
    format: (v) =>
      new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }).format(Number(v)),
    gradient: "from-violet-500/10 via-violet-500/5 to-transparent",
    iconBg: "bg-violet-500/10 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400",
    sparkData: [100, 120, 150, 130, 180, 200, 190, 220, 250, 280, 310, 340],
  },
];

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const height = 32;
  const width = 80;
  const step = width / (data.length - 1);

  const points = data.map((v, i) => {
    const x = i * step;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(" ");

  const areaPoints = `0,${height} ${points} ${width},${height}`;

  return (
    <svg width={width} height={height} className="overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id={`spark-fill-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#spark-fill-${color})`} />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const sparkColors: Record<string, string> = {
  totalLeads: "#3B82F6",
  hotLeads: "#F97316",
  conversionRate: "#10B981",
  mrr: "#8B5CF6",
};

export function KpiCards() {
  const kpis = getKpis();

  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      {kpiConfig.map((kpi) => {
        const value = kpis[kpi.key];
        const isPositive = kpi.change >= 0;
        const Icon = kpi.icon;
        const ChangeIcon = isPositive ? ArrowUpRight : ArrowDownRight;

        return (
          <Card
            key={kpi.key}
            className="group relative overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5"
          >
            {/* Gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${kpi.gradient} opacity-60 transition-opacity duration-300 group-hover:opacity-100`} />

            {/* Large faded icon background */}
            <Icon className="absolute -bottom-3 -right-3 h-24 w-24 text-foreground/[0.03] transition-transform duration-500 group-hover:scale-110" />

            <CardContent className="relative p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  {/* Icon + Label */}
                  <div className="flex items-center gap-2.5">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${kpi.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {kpi.label}
                    </span>
                  </div>

                  {/* Value */}
                  <div className="text-3xl font-bold tracking-tight">
                    {kpi.format(value as never)}
                  </div>

                  {/* Change indicator */}
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold ${
                        isPositive
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      <ChangeIcon className="h-3 w-3" />
                      {isPositive ? "+" : ""}{kpi.change}%
                    </span>
                    <span className="text-[11px] text-muted-foreground">vs mois dernier</span>
                  </div>
                </div>

                {/* Sparkline */}
                <div className="hidden sm:block pt-1">
                  <MiniSparkline data={kpi.sparkData} color={sparkColors[kpi.key]} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
