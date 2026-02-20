"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { User, Palette, Bell, Users, Puzzle } from "lucide-react";
import { ProfileTab } from "@/components/settings/ProfileTab";
import { AppearanceTab } from "@/components/settings/AppearanceTab";
import { NotificationsTab } from "@/components/settings/NotificationsTab";
import { TeamTab } from "@/components/settings/TeamTab";
import { IntegrationsTab } from "@/components/settings/IntegrationsTab";

const tabs = [
  { value: "profil", label: "Profil", icon: User },
  { value: "apparence", label: "Apparence", icon: Palette },
  { value: "notifications", label: "Notifications", icon: Bell },
  { value: "equipe", label: "Equipe", icon: Users },
  { value: "integrations", label: "Integrations", icon: Puzzle },
] as const;

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Parametres
        </h2>
        <p className="text-sm text-muted-foreground">
          Gerez votre compte, votre equipe et vos preferences.
        </p>
      </div>

      <Tabs defaultValue="profil" className="w-full">
        <TabsList className="w-full flex-wrap justify-start gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="gap-1.5 text-xs sm:text-sm"
              >
                <Icon className="size-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <div className="mt-6">
          <TabsContent value="profil">
            <ProfileTab />
          </TabsContent>

          <TabsContent value="apparence">
            <AppearanceTab />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationsTab />
          </TabsContent>

          <TabsContent value="equipe">
            <TeamTab />
          </TabsContent>

          <TabsContent value="integrations">
            <IntegrationsTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
