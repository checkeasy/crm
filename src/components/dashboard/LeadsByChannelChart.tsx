"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { channelMetrics } from "@/lib/mock-data";

const COLORS = [
  "#3B82F6", "#8B5CF6", "#06B6D4", "#F59E0B",
  "#10B981", "#EF4444", "#EC4899", "#6366F1", "#14B8A6",
];

export function LeadsByChannelChart() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const data = channelMetrics.map((m) => ({
    name: m.label,
    leads: m.leads,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Leads par canal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          {mounted && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11 }}
                  angle={-35}
                  textAnchor="end"
                  height={70}
                  className="text-muted-foreground"
                />
                <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "13px",
                  }}
                  labelStyle={{ fontWeight: 600 }}
                  formatter={(value) => [`${value} leads`, "Volume"]}
                />
                <Bar dataKey="leads" radius={[4, 4, 0, 0]}>
                  {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
