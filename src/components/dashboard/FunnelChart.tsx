"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { funnelData } from "@/lib/mock-data";
import { ArrowDown } from "lucide-react";

const B2C_COLOR = "#3B82F6";
const B2B_COLOR = "#8B5CF6";

export function FunnelChart() {
  const maxTotal = Math.max(...funnelData.map((d) => d.b2c + d.b2b));

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">Funnel de conversion</CardTitle>
            <CardDescription className="mt-1">
              Progression des leads a travers le pipeline
            </CardDescription>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: B2C_COLOR }} />
              B2C
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: B2B_COLOR }} />
              B2B
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {funnelData.map((step, index) => {
            const total = step.b2c + step.b2b;
            const widthPercent = (total / maxTotal) * 100;
            const b2cPercent = total > 0 ? (step.b2c / total) * 100 : 0;
            const b2bPercent = total > 0 ? (step.b2b / total) * 100 : 0;

            // Conversion rate from previous stage
            const prevTotal = index > 0 ? funnelData[index - 1].b2c + funnelData[index - 1].b2b : total;
            const convRate = prevTotal > 0 ? ((total / prevTotal) * 100).toFixed(0) : "100";

            // Minimum width so the funnel still looks good
            const displayWidth = Math.max(widthPercent, 20);

            return (
              <div key={step.stage}>
                {/* Conversion arrow between stages */}
                {index > 0 && (
                  <div className="flex items-center justify-center py-0.5">
                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <ArrowDown className="h-3 w-3" />
                      <span className="font-medium">{convRate}%</span>
                    </div>
                  </div>
                )}

                {/* Funnel bar */}
                <div className="flex items-center gap-3">
                  {/* Stage label */}
                  <div className="w-28 shrink-0 text-right">
                    <span className="text-xs font-medium text-foreground">{step.stage}</span>
                  </div>

                  {/* Bar container */}
                  <div className="flex-1">
                    <div className="mx-auto" style={{ width: `${displayWidth}%` }}>
                      <div className="flex h-10 overflow-hidden rounded-lg transition-all duration-500">
                        {/* B2C portion */}
                        <div
                          className="relative flex items-center justify-center transition-all duration-500"
                          style={{
                            width: `${b2cPercent}%`,
                            background: `linear-gradient(135deg, ${B2C_COLOR}, ${B2C_COLOR}cc)`,
                          }}
                        >
                          {step.b2c > 0 && b2cPercent > 15 && (
                            <span className="text-xs font-semibold text-white drop-shadow-sm">
                              {step.b2c}
                            </span>
                          )}
                        </div>
                        {/* B2B portion */}
                        <div
                          className="relative flex items-center justify-center transition-all duration-500"
                          style={{
                            width: `${b2bPercent}%`,
                            background: `linear-gradient(135deg, ${B2B_COLOR}, ${B2B_COLOR}cc)`,
                          }}
                        >
                          {step.b2b > 0 && b2bPercent > 15 && (
                            <span className="text-xs font-semibold text-white drop-shadow-sm">
                              {step.b2b}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Total count */}
                  <div className="w-14 shrink-0">
                    <span className="text-sm font-bold text-foreground">{total}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary stats */}
        <div className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-4">
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">
              {funnelData[0].b2c + funnelData[0].b2b}
            </p>
            <p className="text-[11px] text-muted-foreground">Entrants</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">
              {funnelData[funnelData.length - 1].b2c + funnelData[funnelData.length - 1].b2b}
            </p>
            <p className="text-[11px] text-muted-foreground">Convertis</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-emerald-600">
              {(
                ((funnelData[funnelData.length - 1].b2c + funnelData[funnelData.length - 1].b2b) /
                  (funnelData[0].b2c + funnelData[0].b2b)) *
                100
              ).toFixed(1)}
              %
            </p>
            <p className="text-[11px] text-muted-foreground">Taux global</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
