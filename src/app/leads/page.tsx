"use client";

import { useState, useMemo, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Users, Plus, Download } from "lucide-react";
import { mockLeads } from "@/lib/mock-data";
import type { Lead } from "@/lib/types/database";
import {
  LeadFilters,
  type ScoreFilter,
  type StatusFilter,
  type TypeFilter,
} from "@/components/leads/LeadFilters";
import {
  LeadTable,
  type SortField,
  type SortDirection,
} from "@/components/leads/LeadTable";
import { LeadPagination } from "@/components/leads/LeadPagination";

const PAGE_SIZE = 10;

export default function LeadsPage() {
  // Filter state
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [scoreFilter, setScoreFilter] = useState<ScoreFilter>("all");
  const [sourceFilter, setSourceFilter] = useState("all");

  // Sort state
  const [sortField, setSortField] = useState<SortField>("updated_at");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Selection state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Filter logic
  const filteredLeads = useMemo(() => {
    let result = [...mockLeads];

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (lead) =>
          lead.first_name.toLowerCase().includes(q) ||
          lead.last_name.toLowerCase().includes(q) ||
          `${lead.first_name} ${lead.last_name}`.toLowerCase().includes(q) ||
          (lead.email && lead.email.toLowerCase().includes(q)) ||
          (lead.company && lead.company.toLowerCase().includes(q))
      );
    }

    // Type filter
    if (typeFilter !== "all") {
      result = result.filter((lead) => lead.lead_type === typeFilter);
    }

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter((lead) => lead.status === statusFilter);
    }

    // Score filter
    if (scoreFilter !== "all") {
      result = result.filter((lead) => {
        if (scoreFilter === "hot") return lead.score > 60;
        if (scoreFilter === "warm") return lead.score >= 30 && lead.score <= 60;
        if (scoreFilter === "cold") return lead.score < 30;
        return true;
      });
    }

    // Source filter
    if (sourceFilter !== "all") {
      result = result.filter((lead) => lead.source === sourceFilter);
    }

    return result;
  }, [search, typeFilter, statusFilter, scoreFilter, sourceFilter]);

  // Sort logic
  const sortedLeads = useMemo(() => {
    const sorted = [...filteredLeads];
    sorted.sort((a: Lead, b: Lead) => {
      let comparison = 0;
      switch (sortField) {
        case "name":
          comparison = `${a.first_name} ${a.last_name}`.localeCompare(
            `${b.first_name} ${b.last_name}`
          );
          break;
        case "score":
          comparison = a.score - b.score;
          break;
        case "updated_at":
          comparison =
            new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
          break;
        case "created_at":
          comparison =
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
          break;
      }
      return sortDirection === "asc" ? comparison : -comparison;
    });
    return sorted;
  }, [filteredLeads, sortField, sortDirection]);

  // Pagination logic
  const totalPages = Math.ceil(sortedLeads.length / PAGE_SIZE);
  const paginatedLeads = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return sortedLeads.slice(start, start + PAGE_SIZE);
  }, [sortedLeads, currentPage]);

  // Handlers
  const handleSort = useCallback(
    (field: SortField) => {
      if (sortField === field) {
        setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
      } else {
        setSortField(field);
        setSortDirection("desc");
      }
    },
    [sortField]
  );

  const handleToggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleToggleSelectAll = useCallback(() => {
    setSelectedIds((prev) => {
      if (prev.size === paginatedLeads.length) {
        return new Set();
      }
      return new Set(paginatedLeads.map((l) => l.id));
    });
  }, [paginatedLeads]);

  const handleResetFilters = useCallback(() => {
    setSearch("");
    setTypeFilter("all");
    setStatusFilter("all");
    setScoreFilter("all");
    setSourceFilter("all");
    setCurrentPage(1);
  }, []);

  // Reset page when filters change
  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setCurrentPage(1);
  }, []);

  const handleTypeChange = useCallback((value: TypeFilter) => {
    setTypeFilter(value);
    setCurrentPage(1);
  }, []);

  const handleStatusChange = useCallback((value: StatusFilter) => {
    setStatusFilter(value);
    setCurrentPage(1);
  }, []);

  const handleScoreChange = useCallback((value: ScoreFilter) => {
    setScoreFilter(value);
    setCurrentPage(1);
  }, []);

  const handleSourceChange = useCallback((value: string) => {
    setSourceFilter(value);
    setCurrentPage(1);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Leads</h2>
            <p className="text-sm text-muted-foreground">
              {mockLeads.length} prospects au total
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Exporter</span>
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4" />
            Nouveau lead
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <LeadFilters
            search={search}
            onSearchChange={handleSearchChange}
            typeFilter={typeFilter}
            onTypeFilterChange={handleTypeChange}
            statusFilter={statusFilter}
            onStatusFilterChange={handleStatusChange}
            scoreFilter={scoreFilter}
            onScoreFilterChange={handleScoreChange}
            sourceFilter={sourceFilter}
            onSourceFilterChange={handleSourceChange}
            onReset={handleResetFilters}
            filteredCount={filteredLeads.length}
            totalCount={mockLeads.length}
          />
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <LeadTable
            leads={paginatedLeads}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
            selectedIds={selectedIds}
            onToggleSelect={handleToggleSelect}
            onToggleSelectAll={handleToggleSelectAll}
          />
          <Separator />
          <LeadPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={sortedLeads.length}
            pageSize={PAGE_SIZE}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>
    </div>
  );
}
