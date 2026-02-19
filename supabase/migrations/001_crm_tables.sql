-- CRM CheckEasy - Schema de base
-- Pipeline stages, Leads, Activities, Templates, Inbox Messages

-- Pipeline stages
CREATE TABLE crm_pipeline_stages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  pipeline_type TEXT NOT NULL CHECK (pipeline_type IN ('b2c', 'b2b')),
  name TEXT NOT NULL,
  display_order INTEGER NOT NULL,
  color TEXT DEFAULT '#6366f1',
  auto_actions JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leads
CREATE TABLE crm_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company TEXT,
  lead_type TEXT NOT NULL CHECK (lead_type IN ('b2c', 'b2b')),
  source TEXT NOT NULL,
  pipeline_stage_id UUID REFERENCES crm_pipeline_stages(id),
  assigned_to UUID REFERENCES auth.users(id),
  score INTEGER DEFAULT 0,
  nb_properties INTEGER DEFAULT 1,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'won', 'lost', 'archived')),
  notes TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activities
CREATE TABLE crm_activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES crm_leads(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  activity_type TEXT NOT NULL CHECK (activity_type IN ('call', 'email', 'note', 'meeting', 'status_change', 'score_update')),
  content TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Templates
CREATE TABLE crm_templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  template_type TEXT NOT NULL CHECK (template_type IN ('b2c', 'b2b')),
  category TEXT NOT NULL,
  subject TEXT,
  body TEXT NOT NULL,
  variables JSONB DEFAULT '[]',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Inbox messages
CREATE TABLE crm_inbox_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES crm_leads(id) ON DELETE SET NULL,
  direction TEXT NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  channel TEXT NOT NULL CHECK (channel IN ('email', 'form', 'linkedin', 'phone', 'other')),
  subject TEXT,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'in_progress', 'done')),
  assigned_to UUID REFERENCES auth.users(id),
  template_id UUID REFERENCES crm_templates(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_leads_type ON crm_leads(lead_type);
CREATE INDEX idx_leads_stage ON crm_leads(pipeline_stage_id);
CREATE INDEX idx_leads_assigned ON crm_leads(assigned_to);
CREATE INDEX idx_leads_source ON crm_leads(source);
CREATE INDEX idx_activities_lead ON crm_activities(lead_id);
CREATE INDEX idx_inbox_status ON crm_inbox_messages(status);
CREATE INDEX idx_inbox_lead ON crm_inbox_messages(lead_id);

-- RLS
ALTER TABLE crm_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_inbox_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_pipeline_stages ENABLE ROW LEVEL SECURITY;

-- Policies : tous les utilisateurs authentifies peuvent lire
CREATE POLICY "Authenticated users can read leads" ON crm_leads FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert leads" ON crm_leads FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update leads" ON crm_leads FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can read stages" ON crm_pipeline_stages FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can read activities" ON crm_activities FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert activities" ON crm_activities FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can read templates" ON crm_templates FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can manage templates" ON crm_templates FOR ALL TO authenticated USING (true);

CREATE POLICY "Authenticated users can read inbox" ON crm_inbox_messages FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can manage inbox" ON crm_inbox_messages FOR ALL TO authenticated USING (true);

-- Seed pipeline stages
INSERT INTO crm_pipeline_stages (pipeline_type, name, display_order, color) VALUES
  ('b2c', 'Lead', 1, '#94a3b8'),
  ('b2c', 'Essai gratuit', 2, '#60a5fa'),
  ('b2c', 'Activation', 3, '#fbbf24'),
  ('b2c', 'Payant', 4, '#34d399'),
  ('b2b', 'Lead', 1, '#94a3b8'),
  ('b2b', 'Qualification', 2, '#a78bfa'),
  ('b2b', 'Demo', 3, '#60a5fa'),
  ('b2b', 'Proposition', 4, '#fbbf24'),
  ('b2b', 'Signe', 5, '#34d399');
