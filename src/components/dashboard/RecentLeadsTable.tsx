"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockLeads, sourceLabels } from "@/lib/mock-data";
import { ArrowUpDown, Search } from "lucide-react";
import type { Lead } from "@/lib/types/database";

type SortField = "created_at" | "score" | "last_name";
type SortDir = "asc" | "desc";

function scoreCategory(score: number) {
  if (score >= 61) return { label: "Chaud", variant: "default" as const, className: "bg-red-500 hover:bg-red-500/90 text-white" };
  if (score >= 31) return { label: "Tiede", variant: "secondary" as const, className: "bg-amber-500 hover:bg-amber-500/90 text-white" };
  return { label: "Froid", variant: "outline" as const, className: "bg-blue-100 text-blue-700" };
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short" });
}

export function RecentLeadsTable() {
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState<"all" | "b2c" | "b2b">("all");
  const [sortField, setSortField] = useState<SortField>("created_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const sources = useMemo(() => {
    const s = new Set(mockLeads.map((l) => l.source));
    return Array.from(s).sort();
  }, []);

  const filtered = useMemo(() => {
    let result = [...mockLeads];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (l) =>
          l.first_name.toLowerCase().includes(q) ||
          l.last_name.toLowerCase().includes(q) ||
          (l.email && l.email.toLowerCase().includes(q)) ||
          (l.company && l.company.toLowerCase().includes(q))
      );
    }
    if (sourceFilter !== "all") {
      result = result.filter((l) => l.source === sourceFilter);
    }
    if (typeFilter !== "all") {
      result = result.filter((l) => l.lead_type === typeFilter);
    }
    result.sort((a, b) => {
      let cmp = 0;
      if (sortField === "created_at") {
        cmp = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      } else if (sortField === "score") {
        cmp = a.score - b.score;
      } else {
        cmp = a.last_name.localeCompare(b.last_name);
      }
      return sortDir === "desc" ? -cmp : cmp;
    });
    return result;
  }, [search, sourceFilter, typeFilter, sortField, sortDir]);

  function toggleSort(field: SortField) {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Derniers leads</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-9"
            />
          </div>
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="all">Toutes sources</option>
            {sources.map((s) => (
              <option key={s} value={s}>
                {sourceLabels[s] || s}
              </option>
            ))}
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as "all" | "b2c" | "b2b")}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="all">B2C + B2B</option>
            <option value="b2c">B2C</option>
            <option value="b2b">B2B</option>
          </select>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <button onClick={() => toggleSort("last_name")} className="flex items-center gap-1 hover:text-foreground">
                  Nom <ArrowUpDown className="h-3 w-3" />
                </button>
              </TableHead>
              <TableHead className="hidden sm:table-cell">Source</TableHead>
              <TableHead className="hidden md:table-cell">Type</TableHead>
              <TableHead className="hidden md:table-cell">Etape</TableHead>
              <TableHead>
                <button onClick={() => toggleSort("score")} className="flex items-center gap-1 hover:text-foreground">
                  Score <ArrowUpDown className="h-3 w-3" />
                </button>
              </TableHead>
              <TableHead>
                <button onClick={() => toggleSort("created_at")} className="flex items-center gap-1 hover:text-foreground">
                  Date <ArrowUpDown className="h-3 w-3" />
                </button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((lead) => {
              const cat = scoreCategory(lead.score);
              return (
                <TableRow key={lead.id}>
                  <TableCell>
                    <div>
                      <span className="font-medium">
                        {lead.first_name} {lead.last_name}
                      </span>
                      {lead.company && (
                        <span className="block text-xs text-muted-foreground">
                          {lead.company}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className="text-xs">{sourceLabels[lead.source] || lead.source}</span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant={lead.lead_type === "b2b" ? "default" : "secondary"} className="text-xs">
                      {lead.lead_type.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span
                      className="inline-flex items-center gap-1.5 text-xs"
                    >
                      <span
                        className="h-2 w-2 rounded-full shrink-0"
                        style={{ backgroundColor: lead.pipeline_stage?.color }}
                      />
                      {lead.pipeline_stage?.name}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge className={`text-xs ${cat.className}`}>
                      {lead.score} - {cat.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {formatDate(lead.created_at)}
                  </TableCell>
                </TableRow>
              );
            })}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  Aucun lead trouve.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
