import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Plus } from "lucide-react";

const mockLeads = [
  { id: "1", name: "Marie Laurent", company: "TechCorp", type: "b2b", source: "LinkedIn", score: 85, stage: "Demo" },
  { id: "2", name: "Pierre Martin", company: "StartupFlow", type: "b2b", source: "Inbound", score: 72, stage: "Qualification" },
  { id: "3", name: "Sophie Bernard", company: null, type: "b2c", source: "Formulaire", score: 45, stage: "Essai gratuit" },
  { id: "4", name: "Lucas Moreau", company: "DataScale", type: "b2b", source: "Partenaire", score: 91, stage: "Proposition" },
  { id: "5", name: "Emma Petit", company: null, type: "b2c", source: "SEO", score: 30, stage: "Lead" },
];

function getScoreColor(score: number) {
  if (score >= 80) return "text-emerald-600";
  if (score >= 50) return "text-amber-600";
  return "text-muted-foreground";
}

export default function LeadsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Leads</h2>
          <p className="text-muted-foreground">
            Tous vos prospects et clients potentiels.
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau lead
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Users className="h-5 w-5" />
            Liste des leads ({mockLeads.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mockLeads.map((lead) => (
              <div
                key={lead.id}
                className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-sm font-medium text-primary">
                    {lead.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{lead.name}</span>
                    <Badge variant={lead.type === "b2b" ? "default" : "secondary"} className="text-[10px]">
                      {lead.type.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {lead.company ?? "Particulier"} - {lead.source}
                  </p>
                </div>
                <Badge variant="outline" className="hidden sm:inline-flex">
                  {lead.stage}
                </Badge>
                <span className={`text-sm font-semibold ${getScoreColor(lead.score)}`}>
                  {lead.score}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
