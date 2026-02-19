"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Phone, Briefcase, Save } from "lucide-react";
import { toast } from "sonner";

export function ProfileTab() {
  const [firstName, setFirstName] = useState("Jean");
  const [lastName, setLastName] = useState("Dupont");
  const [email, setEmail] = useState("j.dupont@checkeasy.fr");
  const [phone, setPhone] = useState("+33 6 12 34 56 78");

  const handleSave = () => {
    toast.success("Profil sauvegarde", {
      description: "Vos informations ont ete mises a jour avec succes.",
    });
  };

  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <User className="size-5 text-primary" />
            Informations personnelles
          </CardTitle>
          <CardDescription>
            Gerez votre profil et vos coordonnees.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar section */}
          <div className="flex items-center gap-4">
            <Avatar className="size-16 text-lg" size="lg">
              <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="font-semibold text-foreground">
                {firstName} {lastName}
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="gap-1">
                  <Briefcase className="size-3" />
                  Commercial SaaS
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Form fields */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="settings-firstName" className="text-sm font-medium text-foreground">
                Prenom
              </label>
              <Input
                id="settings-firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Votre prenom"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="settings-lastName" className="text-sm font-medium text-foreground">
                Nom
              </label>
              <Input
                id="settings-lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Votre nom"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="settings-email" className="text-sm font-medium text-foreground">
              <span className="flex items-center gap-1.5">
                <Mail className="size-3.5 text-muted-foreground" />
                Email
              </span>
            </label>
            <Input
              id="settings-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="settings-phone" className="text-sm font-medium text-foreground">
              <span className="flex items-center gap-1.5">
                <Phone className="size-3.5 text-muted-foreground" />
                Telephone
              </span>
            </label>
            <Input
              id="settings-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+33 6 00 00 00 00"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              <span className="flex items-center gap-1.5">
                <Briefcase className="size-3.5 text-muted-foreground" />
                Role
              </span>
            </label>
            <div className="flex h-9 items-center rounded-md border border-input bg-muted/50 px-3 text-sm text-muted-foreground">
              Commercial SaaS
            </div>
            <p className="text-xs text-muted-foreground">
              Le role est defini par votre administrateur.
            </p>
          </div>

          <div className="flex justify-end pt-2">
            <Button onClick={handleSave} className="gap-2">
              <Save className="size-4" />
              Sauvegarder
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
