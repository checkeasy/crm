"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, ChevronDown } from "lucide-react";
import type { Template, Lead } from "@/lib/types/database";
import { cn } from "@/lib/utils";

interface QuickReplyTemplatesProps {
  templates: Template[];
  lead?: Lead;
  onSelect: (content: string) => void;
}

const categoryLabels: Record<string, string> = {
  prospection: "Prospection",
  demo: "Demo",
  suivi: "Suivi",
  closing: "Closing",
  relance: "Relance",
  onboarding: "Onboarding",
  engagement: "Engagement",
  upsell: "Upsell",
  support: "Support",
};

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    prospection: "bg-violet-100 text-violet-700 border-violet-200",
    demo: "bg-blue-100 text-blue-700 border-blue-200",
    suivi: "bg-sky-100 text-sky-700 border-sky-200",
    closing: "bg-emerald-100 text-emerald-700 border-emerald-200",
    relance: "bg-amber-100 text-amber-700 border-amber-200",
    onboarding: "bg-teal-100 text-teal-700 border-teal-200",
    engagement: "bg-pink-100 text-pink-700 border-pink-200",
    upsell: "bg-orange-100 text-orange-700 border-orange-200",
    support: "bg-slate-100 text-slate-700 border-slate-200",
  };
  return colors[category] ?? "bg-muted text-muted-foreground border-border";
}

export function QuickReplyTemplates({
  templates,
  lead,
  onSelect,
}: QuickReplyTemplatesProps) {
  const b2bTemplates = templates.filter((t) => t.template_type === "b2b");
  const b2cTemplates = templates.filter((t) => t.template_type === "b2c");

  const primaryTemplates =
    lead?.lead_type === "b2b" ? b2bTemplates : b2cTemplates;
  const secondaryTemplates =
    lead?.lead_type === "b2b" ? b2cTemplates : b2bTemplates;
  const primaryLabel =
    lead?.lead_type === "b2b" ? "B2B - Conciergeries" : "B2C - Proprietaires";
  const secondaryLabel =
    lead?.lead_type === "b2b" ? "B2C - Proprietaires" : "B2B - Conciergeries";

  const replaceVariables = (body: string): string => {
    if (!lead) return body;
    return body
      .replace(/\{\{prenom\}\}/g, lead.first_name)
      .replace(/\{\{nom\}\}/g, lead.last_name)
      .replace(/\{\{entreprise\}\}/g, lead.company ?? "")
      .replace(/\{\{nb_biens\}\}/g, String(lead.nb_properties))
      .replace(/\{\{commercial_prenom\}\}/g, "Jean")
      .replace(/\{\{commercial_email\}\}/g, "j.dupont@checkeasy.fr")
      .replace(/\{\{plan\}\}/g, "Pro")
      .replace(/\{\{date_demo\}\}/g, "a convenir")
      .replace(/\{\{lien_essai\}\}/g, "checkeasy.com/essai")
      .replace(/\{\{lien_demo\}\}/g, "checkeasy.com/demo")
      .replace(/\{\{lien_calendly\}\}/g, "calendly.com/checkeasy-demo");
  };

  const handleSelect = (template: Template) => {
    onSelect(replaceVariables(template.body));
  };

  const totalCount = templates.length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="min-h-[36px] gap-1.5 pl-2.5 pr-2"
        >
          <FileText className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          <span className="text-sm">Templates</span>
          <span className="inline-flex items-center justify-center text-[10px] font-medium rounded-full w-4 h-4 bg-primary/10 text-primary">
            {totalCount}
          </span>
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={4}
        className="w-80 max-h-[360px] overflow-y-auto"
      >
        {/* Primary group — matching lead type */}
        <DropdownMenuLabel className="flex items-center gap-2 py-2">
          <span className="text-xs font-semibold text-foreground">
            {primaryLabel}
          </span>
          <span className="text-[10px] text-muted-foreground bg-muted rounded-full px-1.5 py-0.5">
            {primaryTemplates.length}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {primaryTemplates.map((tpl) => (
          <DropdownMenuItem
            key={tpl.id}
            onClick={() => handleSelect(tpl)}
            className={cn(
              "flex items-start gap-2.5 py-2.5 px-3 cursor-pointer min-h-[52px]",
              "focus:bg-accent"
            )}
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium leading-snug truncate">
                {tpl.name}
              </p>
              <div className="mt-1">
                <span
                  className={cn(
                    "inline-flex text-[10px] font-medium px-1.5 py-0.5 rounded-full border",
                    getCategoryColor(tpl.category)
                  )}
                >
                  {categoryLabels[tpl.category] ?? tpl.category}
                </span>
              </div>
            </div>
          </DropdownMenuItem>
        ))}

        {/* Secondary group */}
        {secondaryTemplates.length > 0 && (
          <>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuLabel className="flex items-center gap-2 py-2">
              <span className="text-xs font-semibold text-muted-foreground">
                {secondaryLabel}
              </span>
              <span className="text-[10px] text-muted-foreground bg-muted rounded-full px-1.5 py-0.5">
                {secondaryTemplates.length}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {secondaryTemplates.map((tpl) => (
              <DropdownMenuItem
                key={tpl.id}
                onClick={() => handleSelect(tpl)}
                className={cn(
                  "flex items-start gap-2.5 py-2.5 px-3 cursor-pointer min-h-[52px]",
                  "focus:bg-accent opacity-80"
                )}
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium leading-snug truncate">
                    {tpl.name}
                  </p>
                  <div className="mt-1">
                    <Badge
                      variant="outline"
                      className="text-[10px] px-1.5 h-4 rounded-full"
                    >
                      {tpl.template_type.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
