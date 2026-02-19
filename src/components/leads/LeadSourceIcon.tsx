import {
  Linkedin,
  Mail,
  Phone,
  Globe,
  Users,
  Handshake,
  FileText,
  CalendarDays,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { sourceLabels } from "@/lib/mock-data";

const sourceIconMap: Record<string, LucideIcon> = {
  linkedin_dm: Linkedin,
  linkedin_post: Linkedin,
  website_b2c: Globe,
  website_b2b: Globe,
  referral: Users,
  partner_lodgify: Handshake,
  phone_inbound: Phone,
  contact_form: FileText,
  event_rent_2026: CalendarDays,
  email: Mail,
};

const sourceColorMap: Record<string, string> = {
  linkedin_dm: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/40",
  linkedin_post: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/40",
  website_b2c: "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/40",
  website_b2b: "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/40",
  referral: "text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/40",
  partner_lodgify: "text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/40",
  phone_inbound: "text-teal-600 bg-teal-100 dark:text-teal-400 dark:bg-teal-900/40",
  contact_form: "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800",
  event_rent_2026: "text-rose-600 bg-rose-100 dark:text-rose-400 dark:bg-rose-900/40",
};

interface LeadSourceIconProps {
  source: string;
  showLabel?: boolean;
  size?: "sm" | "md";
}

export function LeadSourceIcon({ source, showLabel = true, size = "sm" }: LeadSourceIconProps) {
  const Icon = sourceIconMap[source] ?? Globe;
  const colorClass = sourceColorMap[source] ?? "text-muted-foreground bg-muted";
  const label = sourceLabels[source] ?? source;

  return (
    <div className="flex items-center gap-1.5">
      <span
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-md",
          size === "md" ? "h-7 w-7" : "h-5 w-5",
          colorClass
        )}
      >
        <Icon className={cn(size === "md" ? "h-4 w-4" : "h-3 w-3")} />
      </span>
      {showLabel && (
        <span className={cn("text-muted-foreground", size === "md" ? "text-sm" : "text-xs")}>
          {label}
        </span>
      )}
    </div>
  );
}
