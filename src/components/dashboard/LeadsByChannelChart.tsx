"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";
import { channelMetrics } from "@/lib/mock-data";

const COLORS = [
  "#3B82F6", "#8B5CF6", "#06B6D4", "#F59E0B",
  "#10B981", "#EF4444", "#EC4899", "#6366F1", "#14B8A6",
];

interface TooltipPayloadItem {
  value: number;
  payload: { name: string; leads: number; converted: number; rate: string };
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayloadItem[] }) {
  if (!active || !payload || payload.length === 0) return null;
  const item = payload[0].payload;
  return (
    <div className="rounded-lg border border-border bg-card px-4 py-3 shadow-lg">
      <p className="text-sm font-semibold text-foreground">{item.name}</p>
      <div className="mt-1.5 space-y-1 text-xs text-muted-foreground">
        <p>
          <span className="inline-block w-16 font-medium text-foreground">{item.leads}</span> leads
        </p>
        <p>
          <span className="inline-block w-16 font-medium text-emerald-600">{item.converted}</span> convertis
        </p>
        <p>
          <span className="inline-block w-16 font-medium text-foreground">{item.rate}</span> taux conv.
        </p>
      </div>
    </div>
  );
}

export function LeadsByChannelChart() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const data = channelMetrics
    .map((m) => ({
      name: m.label,
      leads: m.leads,
      converted: m.converted,
      rate: m.leads > 0 ? `${((m.converted / m.leads) * 100).toFixed(1)}%` : "0%",
    }))
    .sort((a, b) => b.leads - a.leads);

  const totalLeads = data.reduce((sum, d) => sum + d.leads, 0);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">Leads par canal</CardTitle>
            <CardDescription className="mt-1">
              {totalLeads} leads au total sur {data.length} canaux
            </CardDescription>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-blue-500" />
              Volume de leads
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[340px] w-full">
          {mounted && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                layout="horizontal"
                margin={{ top: 8, right: 12, left: -8, bottom: 4 }}
              >
                <defs>
                  {data.map((_, index) => (
                    <linearGradient
                      key={`grad-${index}`}
                      id={`barGrad-${index}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor={COLORS[index % COLORS.length]} stopOpacity={1} />
                      <stop offset="100%" stopColor={COLORS[index % COLORS.length]} stopOpacity={0.6} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="hsl(var(--border))"
                  strokeOpacity={0.5}
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  angle={-35}
                  textAnchor="end"
                  height={80}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "hsl(var(--muted))", opacity: 0.3, radius: 4 }}
                />
                <Legend
                  wrapperStyle={{ fontSize: "12px", paddingTop: "4px" }}
                  iconType="circle"
                  iconSize={8}
                  className="sm:hidden"
                />
                <Bar
                  dataKey="leads"
                  name="Leads"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={48}
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`url(#barGrad-${index})`}
                      className="transition-opacity duration-200 hover:opacity-80"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
