import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Phone, Building2, Calendar } from "lucide-react";
import Link from "next/link";

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/leads">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Fiche Lead</h2>
          <p className="text-muted-foreground text-sm">ID: {id}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Informations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-semibold text-primary">ML</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Marie Laurent</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge>B2B</Badge>
                    <Badge variant="outline">Demo</Badge>
                  </div>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 pt-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>m.laurent@techcorp.fr</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>+33 6 12 34 56 78</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span>TechCorp - Paris</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Ajoute le 15 fev. 2026</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Historique des activites</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Les activites de ce lead seront affichees ici...
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <span className="text-4xl font-bold text-emerald-600">85</span>
                <p className="text-sm text-muted-foreground mt-1">/100</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Envoyer un email
              </Button>
              <Button variant="outline" className="w-full" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Planifier un appel
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
