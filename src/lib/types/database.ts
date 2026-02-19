export type PipelineType = "b2c" | "b2b";
export type LeadType = "b2c" | "b2b";
export type LeadStatus = "active" | "won" | "lost" | "archived";
export type ActivityType = "call" | "email" | "note" | "meeting" | "status_change" | "score_update";
export type MessageDirection = "inbound" | "outbound";
export type MessageChannel = "email" | "form" | "linkedin" | "phone" | "other";
export type MessageStatus = "unread" | "in_progress" | "done";
export type TemplateType = "b2c" | "b2b";

export interface PipelineStage {
  id: string;
  pipeline_type: PipelineType;
  name: string;
  display_order: number;
  color: string;
  auto_actions: Record<string, unknown>[];
  created_at: string;
}

export interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  lead_type: LeadType;
  source: string;
  pipeline_stage_id: string | null;
  assigned_to: string | null;
  score: number;
  nb_properties: number;
  status: LeadStatus;
  notes: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  // Joined fields
  pipeline_stage?: PipelineStage;
}

export interface Activity {
  id: string;
  lead_id: string;
  user_id: string | null;
  activity_type: ActivityType;
  content: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface Template {
  id: string;
  name: string;
  template_type: TemplateType;
  category: string;
  subject: string | null;
  body: string;
  variables: string[];
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface InboxMessage {
  id: string;
  lead_id: string | null;
  direction: MessageDirection;
  channel: MessageChannel;
  subject: string | null;
  content: string;
  status: MessageStatus;
  assigned_to: string | null;
  template_id: string | null;
  created_at: string;
  // Joined fields
  lead?: Lead;
}

// Dashboard stats
export interface DashboardStats {
  total_leads: number;
  new_leads_this_week: number;
  conversion_rate: number;
  active_trials: number;
  mrr: number;
  arr: number;
  churn_rate: number;
  unread_messages: number;
}
