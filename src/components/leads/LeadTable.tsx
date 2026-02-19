"use client";

import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import type { Lead } from "@/lib/types/database";
import { commercialUsers } from "@/lib/mock-data";
import { LeadScoreBadge } from "./LeadScoreBadge";
import { LeadSourceIcon } from "./LeadSourceIcon";
import { LeadStageBadge } from "./LeadStageBadge";
import { cn } from "@/lib/utils";

export type SortField = "name" | "score" | "updated_at" | "created_at";
export type SortDirection = "asc" | "desc";

interface LeadTableProps {
  leads: Lead[];
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
}

function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

function getAvatarGradient(name: string): string {
  const gradients = [
    "from-violet-500 to-purple-600",
    "from-blue-500 to-cyan-500",
    "from-emerald-500 to-teal-500",
    "from-orange-500 to-red-500",
    "from-pink-500 to-rose-500",
    "from-indigo-500 to-blue-500",
    "from-amber-500 to-orange-500",
    "from-teal-500 to-emerald-500",
  ];
  const index = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % gradients.length;
  return gradients[index];
}

function SortIcon({ field, currentField, direction }: { field: SortField; currentField: SortField; direction: SortDirection }) {
  if (field !== currentField) {
    return <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground/50" />;
  }
  return direction === "asc" ? (
    <ArrowUp className="h-3.5 w-3.5" />
  ) : (
    <ArrowDown className="h-3.5 w-3.5" />
  );
}

export function LeadTable({
  leads,
  sortField,
  sortDirection,
  onSort,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
}: LeadTableProps) {
  const router = useRouter();
  const allSelected = leads.length > 0 && selectedIds.size === leads.length;
  const someSelected = selectedIds.size > 0 && selectedIds.size < leads.length;

  function getAssignedUser(userId: string | null) {
    if (!userId) return null;
    return commercialUsers.find((u) => u.id === userId) ?? null;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="w-10">
            <input
              type="checkbox"
              checked={allSelected}
              ref={(el) => {
                if (el) el.indeterminate = someSelected;
              }}
              onChange={onToggleSelectAll}
              className="h-4 w-4 rounded border-border accent-primary"
              aria-label="Selectionner tous les leads"
            />
          </TableHead>
          <TableHead>
            <button
              onClick={() => onSort("name")}
              className="inline-flex items-center gap-1 hover:text-foreground"
            >
              Nom
              <SortIcon field="name" currentField={sortField} direction={sortDirection} />
            </button>
          </TableHead>
          <TableHead className="hidden sm:table-cell">Type</TableHead>
          <TableHead className="hidden md:table-cell">Source</TableHead>
          <TableHead className="hidden lg:table-cell">Etape</TableHead>
          <TableHead>
            <button
              onClick={() => onSort("score")}
              className="inline-flex items-center gap-1 hover:text-foreground"
            >
              Score
              <SortIcon field="score" currentField={sortField} direction={sortDirection} />
            </button>
          </TableHead>
          <TableHead className="hidden xl:table-cell">Assigne a</TableHead>
          <TableHead className="hidden md:table-cell">
            <button
              onClick={() => onSort("updated_at")}
              className="inline-flex items-center gap-1 hover:text-foreground"
            >
              Mis a jour
              <SortIcon field="updated_at" currentField={sortField} direction={sortDirection} />
            </button>
          </TableHead>
          <TableHead className="w-10">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leads.length === 0 ? (
          <TableRow>
            <TableCell colSpan={9} className="h-32 text-center">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <p className="text-sm">Aucun lead ne correspond a vos filtres.</p>
                <p className="text-xs">Essayez de modifier vos criteres de recherche.</p>
              </div>
            </TableCell>
          </TableRow>
        ) : (
          leads.map((lead) => {
            const assignedUser = getAssignedUser(lead.assigned_to);
            const isSelected = selectedIds.has(lead.id);
            const fullName = `${lead.first_name} ${lead.last_name}`;

            return (
              <TableRow
                key={lead.id}
                className={cn(
                  "cursor-pointer transition-colors",
                  isSelected && "bg-primary/5"
                )}
                data-state={isSelected ? "selected" : undefined}
                onClick={() => router.push(`/leads/${lead.id}`)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleSelect(lead.id)}
                    className="h-4 w-4 rounded border-border accent-primary"
                    aria-label={`Selectionner ${fullName}`}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar size="default">
                      <AvatarFallback
                        className={cn(
                          "bg-gradient-to-br text-white text-xs font-semibold",
                          getAvatarGradient(fullName)
                        )}
                      >
                        {getInitials(lead.first_name, lead.last_name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{fullName}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {lead.company ?? lead.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                      lead.lead_type === "b2b"
                        ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300"
                        : "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300"
                    )}
                  >
                    {lead.lead_type}
                  </span>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <LeadSourceIcon source={lead.source} />
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <LeadStageBadge stage={lead.pipeline_stage} />
                </TableCell>
                <TableCell>
                  <LeadScoreBadge score={lead.score} />
                </TableCell>
                <TableCell className="hidden xl:table-cell">
                  {assignedUser ? (
                    <div className="flex items-center gap-2">
                      <Avatar size="sm">
                        <AvatarFallback className="text-[10px]">
                          {assignedUser.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">
                        {assignedUser.name}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground italic">
                      Non assigne
                    </span>
                  )}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(lead.updated_at), {
                      addSuffix: true,
                      locale: fr,
                    })}
                  </span>
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        aria-label={`Actions pour ${fullName}`}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => router.push(`/leads/${lead.id}`)}
                      >
                        <Eye className="h-4 w-4" />
                        Voir
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Pencil className="h-4 w-4" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="destructive">
                        <Trash2 className="h-4 w-4" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}
