"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { sourceLabels } from "@/lib/mock-data";

export type ScoreFilter = "all" | "hot" | "warm" | "cold";
export type StatusFilter = "all" | "active" | "won" | "lost" | "archived";
export type TypeFilter = "all" | "b2b" | "b2c";

interface LeadFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  typeFilter: TypeFilter;
  onTypeFilterChange: (value: TypeFilter) => void;
  statusFilter: StatusFilter;
  onStatusFilterChange: (value: StatusFilter) => void;
  scoreFilter: ScoreFilter;
  onScoreFilterChange: (value: ScoreFilter) => void;
  sourceFilter: string;
  onSourceFilterChange: (value: string) => void;
  onReset: () => void;
  filteredCount: number;
  totalCount: number;
}

export function LeadFilters({
  search,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
  statusFilter,
  onStatusFilterChange,
  scoreFilter,
  onScoreFilterChange,
  sourceFilter,
  onSourceFilterChange,
  onReset,
  filteredCount,
  totalCount,
}: LeadFiltersProps) {
  const hasActiveFilters =
    search !== "" ||
    typeFilter !== "all" ||
    statusFilter !== "all" ||
    scoreFilter !== "all" ||
    sourceFilter !== "all";

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher par nom, email, entreprise..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
            aria-label="Rechercher des leads"
          />
          {search && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Effacer la recherche"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground shrink-0 hidden sm:block" />

          {/* Type filter */}
          <select
            value={typeFilter}
            onChange={(e) => onTypeFilterChange(e.target.value as TypeFilter)}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
            aria-label="Filtrer par type"
          >
            <option value="all">Tous types</option>
            <option value="b2b">B2B</option>
            <option value="b2c">B2C</option>
          </select>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value as StatusFilter)}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
            aria-label="Filtrer par statut"
          >
            <option value="all">Tous statuts</option>
            <option value="active">Actif</option>
            <option value="won">Gagne</option>
            <option value="lost">Perdu</option>
            <option value="archived">Archive</option>
          </select>

          {/* Score filter */}
          <select
            value={scoreFilter}
            onChange={(e) => onScoreFilterChange(e.target.value as ScoreFilter)}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] hidden md:block"
            aria-label="Filtrer par score"
          >
            <option value="all">Tous scores</option>
            <option value="hot">Chaud (&gt;60)</option>
            <option value="warm">Tiede (30-60)</option>
            <option value="cold">Froid (&lt;30)</option>
          </select>

          {/* Source filter */}
          <select
            value={sourceFilter}
            onChange={(e) => onSourceFilterChange(e.target.value)}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] hidden lg:block"
            aria-label="Filtrer par source"
          >
            <option value="all">Toutes sources</option>
            {Object.entries(sourceLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mobile-only score + source filters */}
      <div className="flex gap-2 md:hidden">
        <select
          value={scoreFilter}
          onChange={(e) => onScoreFilterChange(e.target.value as ScoreFilter)}
          className="h-9 flex-1 rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
          aria-label="Filtrer par score"
        >
          <option value="all">Tous scores</option>
          <option value="hot">Chaud (&gt;60)</option>
          <option value="warm">Tiede (30-60)</option>
          <option value="cold">Froid (&lt;30)</option>
        </select>
        <select
          value={sourceFilter}
          onChange={(e) => onSourceFilterChange(e.target.value)}
          className="h-9 flex-1 rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] lg:hidden"
          aria-label="Filtrer par source"
        >
          <option value="all">Toutes sources</option>
          {Object.entries(sourceLabels).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Active filters summary */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted-foreground">
          {filteredCount === totalCount
            ? `${totalCount} leads`
            : `${filteredCount} sur ${totalCount} leads`}
        </span>

        {hasActiveFilters && (
          <>
            <span className="text-muted-foreground">|</span>
            {search && (
              <Badge variant="secondary" className="gap-1 text-xs">
                Recherche: &quot;{search}&quot;
                <button onClick={() => onSearchChange("")} aria-label="Retirer le filtre recherche">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {typeFilter !== "all" && (
              <Badge variant="secondary" className="gap-1 text-xs">
                {typeFilter.toUpperCase()}
                <button onClick={() => onTypeFilterChange("all")} aria-label="Retirer le filtre type">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {statusFilter !== "all" && (
              <Badge variant="secondary" className="gap-1 text-xs">
                {statusFilter === "active" ? "Actif" : statusFilter === "won" ? "Gagne" : statusFilter === "lost" ? "Perdu" : "Archive"}
                <button onClick={() => onStatusFilterChange("all")} aria-label="Retirer le filtre statut">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {scoreFilter !== "all" && (
              <Badge variant="secondary" className="gap-1 text-xs">
                {scoreFilter === "hot" ? "Chaud" : scoreFilter === "warm" ? "Tiede" : "Froid"}
                <button onClick={() => onScoreFilterChange("all")} aria-label="Retirer le filtre score">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {sourceFilter !== "all" && (
              <Badge variant="secondary" className="gap-1 text-xs">
                {sourceLabels[sourceFilter] ?? sourceFilter}
                <button onClick={() => onSourceFilterChange("all")} aria-label="Retirer le filtre source">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            <Button
              variant="ghost"
              size="xs"
              onClick={onReset}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3" />
              Reinitialiser
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
