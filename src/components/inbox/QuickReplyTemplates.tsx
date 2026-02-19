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
import { FileText } from "lucide-react";
import type { Template, Lead } from "@/lib/types/database";

interface QuickReplyTemplatesProps {
  templates: Template[];
  lead?: Lead;
  onSelect: (content: string) => void;
}

export function QuickReplyTemplates({ templates, lead, onSelect }: QuickReplyTemplatesProps) {
  const b2bTemplates = templates.filter((t) => t.template_type === "b2b");
  const b2cTemplates = templates.filter((t) => t.template_type === "b2c");

  // Show templates matching lead type first, then the other group
  const primaryTemplates = lead?.lead_type === "b2b" ? b2bTemplates : b2cTemplates;
  const secondaryTemplates = lead?.lead_type === "b2b" ? b2cTemplates : b2bTemplates;
  const primaryLabel = lead?.lead_type === "b2b" ? "B2B - Conciergeries" : "B2C - Proprietaires";
  const secondaryLabel = lead?.lead_type === "b2b" ? "B2C - Proprietaires" : "B2B - Conciergeries";

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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <FileText className="h-3.5 w-3.5 mr-1.5" />
          Template
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-72 max-h-80 overflow-y-auto">
        {/* Primary group (matching lead type) */}
        <DropdownMenuLabel>{primaryLabel}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {primaryTemplates.map((tpl) => (
          <DropdownMenuItem key={tpl.id} onClick={() => handleSelect(tpl)}>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{tpl.name}</p>
              <p className="text-[10px] text-muted-foreground truncate">{tpl.category}</p>
            </div>
          </DropdownMenuItem>
        ))}

        {/* Secondary group */}
        {secondaryTemplates.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>{secondaryLabel}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {secondaryTemplates.map((tpl) => (
              <DropdownMenuItem key={tpl.id} onClick={() => handleSelect(tpl)}>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{tpl.name}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{tpl.category}</p>
                </div>
              </DropdownMenuItem>
            ))}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
