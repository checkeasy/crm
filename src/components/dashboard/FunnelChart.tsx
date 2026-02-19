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
  Legend,
} from "recharts";
import { funnelData } from "@/lib/mock-data";

export function FunnelChart() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Funnel de conversion</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          {mounted && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={funnelData}
                margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis
                  dataKey="stage"
                  tick={{ fontSize: 11 }}
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
                />
                <Legend
                  wrapperStyle={{ fontSize: "13px" }}
                  iconType="circle"
                  iconSize={8}
                />
                <Bar
                  dataKey="b2c"
                  name="B2C (Proprietaires)"
                  fill="#3B82F6"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="b2b"
                  name="B2B (Conciergeries)"
                  fill="#8B5CF6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
