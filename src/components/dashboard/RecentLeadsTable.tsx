"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockLeads, sourceLabels } from "@/lib/mock-data";
import {
  ArrowUpDown,
  Search,
  Globe,
  Linkedin,
  Phone,
  Mail,
  Users,
  CalendarDays,
  FileText,
  Handshake,
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

type SortField = "created_at" | "score" | "last_name";
type SortDir = "asc" | "desc";

function scoreColor(score: number): { bg: string; text: string; ring: string } {
  if (score >= 61) return { bg: "bg-red-500", text: "text-white", ring: "ring-red-500/20" };
  if (score >= 31) return { bg: "bg-amber-500", text: "text-white", ring: "ring-amber-500/20" };
  return { bg: "bg-blue-400", text: "text-white", ring: "ring-blue-400/20" };
}

function scoreLabel(score: number): string {
  if (score >= 61) return "Chaud";
  if (score >= 31) return "Tiede";
  return "Froid";
}

function getSourceIcon(source: string) {
  if (source.includes("linkedin")) return Linkedin;
  if (source.includes("phone")) return Phone;
  if (source.includes("email") || source.includes("contact_form") || source.includes("form")) return FileText;
  if (source.includes("referral")) return Handshake;
  if (source.includes("partner")) return Users;
  if (source.includes("event")) return CalendarDays;
  if (source.includes("website")) return Globe;
  return Mail;
}

function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

const avatarColors = [
  "bg-blue-500/15 text-blue-700 dark:text-blue-300",
  "bg-violet-500/15 text-violet-700 dark:text-violet-300",
  "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  "bg-rose-500/15 text-rose-700 dark:text-rose-300",
  "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300",
];

function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarColors[Math.abs(hash) % avatarColors.length];
}

const statusConfig: Record<string, { label: string; className: string }> = {
  active: { label: "Actif", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
  won: { label: "Gagne", className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
  lost: { label: "Perdu", className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
  archived: { label: "Archive", className: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400" },
};

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
    return result.slice(0, 10);
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
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">Derniers leads</CardTitle>
            <CardDescription className="mt-1">
              Les 10 leads les plus recents de votre pipeline
            </CardDescription>
          </div>
          <Badge variant="secondary" className="text-xs">
            {mockLeads.length} total
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par nom, email, entreprise..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-9"
            />
          </div>
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm"
            aria-label="Filtrer par source"
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
            aria-label="Filtrer par type"
          >
            <option value="all">B2C + B2B</option>
            <option value="b2c">B2C</option>
            <option value="b2b">B2B</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="min-w-[200px]">
                  <button
                    onClick={() => toggleSort("last_name")}
                    className="flex items-center gap-1 hover:text-foreground transition-colors"
                  >
                    Nom <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead className="hidden md:table-cell">Type</TableHead>
                <TableHead className="hidden sm:table-cell">Source</TableHead>
                <TableHead className="hidden lg:table-cell">Etape</TableHead>
                <TableHead>
                  <button
                    onClick={() => toggleSort("score")}
                    className="flex items-center gap-1 hover:text-foreground transition-colors"
                  >
                    Score <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead className="hidden md:table-cell">Statut</TableHead>
                <TableHead>
                  <button
                    onClick={() => toggleSort("created_at")}
                    className="flex items-center gap-1 hover:text-foreground transition-colors"
                  >
                    Date <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((lead) => {
                const sc = scoreColor(lead.score);
                const SourceIcon = getSourceIcon(lead.source);
                const initials = getInitials(lead.first_name, lead.last_name);
                const avatarColor = getAvatarColor(lead.first_name + lead.last_name);
                const status = statusConfig[lead.status] || statusConfig.active;

                return (
                  <TableRow
                    key={lead.id}
                    className="group cursor-pointer transition-colors hover:bg-muted/40"
                    onClick={() => {
                      window.location.href = `/leads/${lead.id}`;
                    }}
                    role="link"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        window.location.href = `/leads/${lead.id}`;
                      }
                    }}
                  >
                    {/* Name + Avatar */}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar size="default">
                          <AvatarFallback className={`text-xs font-semibold ${avatarColor}`}>
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {lead.first_name} {lead.last_name}
                          </span>
                          {lead.company && (
                            <span className="block text-xs text-muted-foreground">
                              {lead.company}
                            </span>
                          )}
                        </div>
                      </div>
                    </TableCell>

                    {/* Type badge */}
                    <TableCell className="hidden md:table-cell">
                      <Badge
                        variant={lead.lead_type === "b2b" ? "default" : "secondary"}
                        className="text-[10px] uppercase tracking-wide"
                      >
                        {lead.lead_type}
                      </Badge>
                    </TableCell>

                    {/* Source */}
                    <TableCell className="hidden sm:table-cell">
                      <div className="flex items-center gap-2">
                        <SourceIcon className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {sourceLabels[lead.source] || lead.source}
                        </span>
                      </div>
                    </TableCell>

                    {/* Pipeline stage */}
                    <TableCell className="hidden lg:table-cell">
                      <span className="inline-flex items-center gap-1.5 text-xs">
                        <span
                          className="h-2 w-2 rounded-full shrink-0"
                          style={{ backgroundColor: lead.pipeline_stage?.color }}
                        />
                        {lead.pipeline_stage?.name}
                      </span>
                    </TableCell>

                    {/* Score */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full ${sc.bg} ${sc.text} ring-2 ${sc.ring} text-xs font-bold`}>
                          {lead.score}
                        </div>
                        <span className="hidden sm:inline text-[10px] uppercase tracking-wide text-muted-foreground font-medium">
                          {scoreLabel(lead.score)}
                        </span>
                      </div>
                    </TableCell>

                    {/* Status */}
                    <TableCell className="hidden md:table-cell">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${status.className}`}>
                        {status.label}
                      </span>
                    </TableCell>

                    {/* Date */}
                    <TableCell>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(lead.created_at), "d MMM", { locale: fr })}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                    <div className="flex flex-col items-center gap-2">
                      <Search className="h-8 w-8 text-muted-foreground/40" />
                      <p>Aucun lead trouve.</p>
                      <p className="text-xs">Essayez de modifier vos filtres</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
