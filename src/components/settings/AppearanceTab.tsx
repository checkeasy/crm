"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sun, Moon, Monitor, Palette, PanelLeftClose, Type } from "lucide-react";
import { ToggleSwitch } from "@/components/settings/ToggleSwitch";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const themeOptions = [
  {
    value: "system",
    label: "Systeme",
    description: "Suit les preferences de votre OS",
    icon: Monitor,
  },
  {
    value: "light",
    label: "Clair",
    description: "Theme lumineux pour la journee",
    icon: Sun,
  },
  {
    value: "dark",
    label: "Sombre",
    description: "Theme sombre pour le confort visuel",
    icon: Moon,
  },
] as const;

const fontSizeOptions = [
  { value: "small", label: "Petit" },
  { value: "medium", label: "Moyen" },
  { value: "large", label: "Grand" },
] as const;

export function AppearanceTab() {
  const { theme, setTheme } = useTheme();
  const [compactSidebar, setCompactSidebar] = useState(false);
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium");

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    const label = themeOptions.find((t) => t.value === newTheme)?.label;
    toast.success("Theme mis a jour", {
      description: `Le theme "${label}" a ete applique.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Theme selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Palette className="size-5 text-primary" />
            Theme
          </CardTitle>
          <CardDescription>
            Choisissez l&apos;apparence de votre interface.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-3">
            {themeOptions.map((option) => {
              const Icon = option.icon;
              const isActive = theme === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleThemeChange(option.value)}
                  className={cn(
                    "group relative flex flex-col items-center gap-3 rounded-xl border-2 p-5 text-center transition-all duration-200",
                    isActive
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border hover:border-primary/30 hover:bg-accent/50"
                  )}
                  aria-pressed={isActive}
                  aria-label={`Theme ${option.label}`}
                >
                  <div
                    className={cn(
                      "flex size-12 items-center justify-center rounded-full transition-colors duration-200",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                    )}
                  >
                    <Icon className="size-6" />
                  </div>
                  <div>
                    <p className={cn(
                      "text-sm font-semibold",
                      isActive ? "text-primary" : "text-foreground"
                    )}>
                      {option.label}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {option.description}
                    </p>
                  </div>
                  {isActive && (
                    <div className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <svg className="size-3" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Sidebar compact mode */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <PanelLeftClose className="size-5 text-primary" />
            Barre laterale
          </CardTitle>
          <CardDescription>
            Configurez l&apos;affichage de la navigation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-sm font-medium text-foreground">Mode compact</p>
              <p className="text-xs text-muted-foreground">
                Reduit la barre laterale pour gagner de l&apos;espace ecran.
              </p>
            </div>
            <ToggleSwitch
              enabled={compactSidebar}
              onToggle={() => {
                setCompactSidebar(!compactSidebar);
                toast.success(
                  compactSidebar ? "Mode standard active" : "Mode compact active",
                  { description: "La barre laterale a ete mise a jour." }
                );
              }}
              label="Mode compact de la barre laterale"
            />
          </div>
        </CardContent>
      </Card>

      {/* Font size */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Type className="size-5 text-primary" />
            Taille de police
          </CardTitle>
          <CardDescription>
            Ajustez la taille du texte selon votre preference.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            {fontSizeOptions.map((option) => {
              const isActive = fontSize === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setFontSize(option.value);
                    toast.success("Taille de police mise a jour", {
                      description: `Taille "${option.label}" appliquee.`,
                    });
                  }}
                  className={cn(
                    "flex-1 rounded-lg border-2 px-4 py-3 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                  )}
                  aria-pressed={isActive}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
