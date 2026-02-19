# Schéma Base de Données CRM CheckEasy

## Vue d'ensemble

Base de données PostgreSQL (Supabase). 6 tables principales avec relations, index et Row Level Security (RLS).

---

## Diagramme des relations

```
crm_leads (1) ──→ (N) crm_activities
crm_leads (1) ──→ (N) crm_inbox_messages
crm_leads (1) ──→ (N) crm_lead_scores
crm_leads (N) ──→ (1) crm_pipeline_stages
crm_inbox_messages (N) ──→ (1) crm_templates
crm_pipeline_stages ←── groupées par pipeline_type (b2c/b2b)
```

---

## Table : crm_pipeline_stages

Étapes des pipelines B2C et B2B.

```sql
CREATE TABLE crm_pipeline_stages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pipeline_type TEXT NOT NULL CHECK (pipeline_type IN ('b2c', 'b2b')),
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    color TEXT NOT NULL DEFAULT '#6B7280',
    duration_max_days INTEGER,
    auto_actions JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    UNIQUE (pipeline_type, slug),
    UNIQUE (pipeline_type, "order")
);

CREATE INDEX idx_pipeline_stages_type ON crm_pipeline_stages(pipeline_type);
```

### Données initiales

```sql
INSERT INTO crm_pipeline_stages (pipeline_type, name, slug, "order", color, duration_max_days, auto_actions) VALUES
-- B2C
('b2c', 'Lead',           'lead',       1, '#9CA3AF', 2,  '[{"type": "email", "template": "b2c-1"}]'),
('b2c', 'Essai gratuit',  'trial',      2, '#3B82F6', 14, '[{"type": "email", "template": "b2c-2", "delay_days": 3, "condition": "no_inspection"}]'),
('b2c', 'Activation',     'activation', 3, '#F59E0B', 7,  '[{"type": "email", "template": "b2c-3"}, {"type": "email", "template": "b2c-4", "delay_days": 3}]'),
('b2c', 'Payant',         'paying',     4, '#10B981', NULL, '[{"type": "email", "template": "nps", "delay_days": 30}]'),
-- B2B
('b2b', 'Lead',           'lead',       1, '#9CA3AF', 3,  '[{"type": "notification", "target": "chasseur"}]'),
('b2b', 'Qualification',  'qualification', 2, '#8B5CF6', 5, '[]'),
('b2b', 'Démo',           'demo',       3, '#3B82F6', 10, '[{"type": "email", "template": "b2b-2"}]'),
('b2b', 'Proposition',    'proposal',   4, '#F59E0B', 15, '[{"type": "email", "template": "b2b-4"}, {"type": "email", "template": "b2b-5", "delay_days": 7, "condition": "no_response"}]'),
('b2b', 'Signé',          'signed',     5, '#10B981', NULL, '[{"type": "email", "template": "onboarding"}]');
```

---

## Table : crm_leads

Table principale des leads/contacts CRM.

```sql
CREATE TABLE crm_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    type TEXT NOT NULL CHECK (type IN ('b2c', 'b2b')),
    source TEXT NOT NULL,
    source_secondary TEXT,
    pipeline_stage_id UUID NOT NULL REFERENCES crm_pipeline_stages(id),
    assigned_to UUID REFERENCES auth.users(id),
    score INTEGER NOT NULL DEFAULT 0 CHECK (score >= 0 AND score <= 100),
    score_category TEXT GENERATED ALWAYS AS (
        CASE
            WHEN score <= 30 THEN 'cold'
            WHEN score <= 60 THEN 'warm'
            ELSE 'hot'
        END
    ) STORED,
    nb_properties INTEGER DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'stale', 'lost', 'won', 'nurture')),
    lost_reason TEXT CHECK (
        lost_reason IS NULL OR lost_reason IN ('price', 'timing', 'competitor', 'no_need', 'no_response', 'other')
    ),
    notes TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    referrer_id UUID REFERENCES crm_leads(id),
    partner_id TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Index pour les requêtes fréquentes
CREATE INDEX idx_leads_type ON crm_leads(type);
CREATE INDEX idx_leads_status ON crm_leads(status);
CREATE INDEX idx_leads_score ON crm_leads(score DESC);
CREATE INDEX idx_leads_assigned ON crm_leads(assigned_to);
CREATE INDEX idx_leads_pipeline_stage ON crm_leads(pipeline_stage_id);
CREATE INDEX idx_leads_source ON crm_leads(source);
CREATE INDEX idx_leads_email ON crm_leads(email);
CREATE INDEX idx_leads_created ON crm_leads(created_at DESC);
CREATE INDEX idx_leads_score_category ON crm_leads(score_category);
CREATE INDEX idx_leads_type_status ON crm_leads(type, status);

-- Trigger updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_leads_updated_at
    BEFORE UPDATE ON crm_leads
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();
```

### Champ metadata (JSONB) — structure type

```json
{
    "utm_source": "google",
    "utm_medium": "cpc",
    "utm_campaign": "b2c-trial-feb2026",
    "linkedin_url": "https://linkedin.com/in/...",
    "website": "https://conciergerie-azur.com",
    "pms_tool": "lodgify",
    "estimated_revenue": 5000,
    "pain_points": ["qualite_menage", "litiges_voyageurs"],
    "current_tools": ["whatsapp", "excel"],
    "event_name": "Rent Paris 2026",
    "referral_code": "REF-ABC123"
}
```

---

## Table : crm_activities

Journal de toutes les interactions et événements sur un lead.

```sql
CREATE TABLE crm_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL REFERENCES crm_leads(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id),
    type TEXT NOT NULL CHECK (type IN (
        'call', 'email_sent', 'email_received', 'note',
        'meeting', 'demo', 'status_change', 'stage_change',
        'score_change', 'assignment_change', 'sms', 'linkedin_message'
    )),
    content TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_activities_lead ON crm_activities(lead_id, created_at DESC);
CREATE INDEX idx_activities_type ON crm_activities(type);
CREATE INDEX idx_activities_user ON crm_activities(user_id);
CREATE INDEX idx_activities_created ON crm_activities(created_at DESC);
```

### Exemples de metadata par type

```json
// type: "call"
{"duration_seconds": 300, "outcome": "interested", "next_action": "send_demo_invite"}

// type: "stage_change"
{"from_stage": "qualification", "to_stage": "demo", "reason": "qualified_by_chasseur"}

// type: "score_change"
{"from_score": 45, "to_score": 72, "trigger": "demo_scheduled"}

// type: "email_sent"
{"template_id": "uuid", "subject": "Démo CheckEasy", "opened": true, "clicked": true}
```

---

## Table : crm_templates

Templates de messages réutilisables.

```sql
CREATE TABLE crm_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    type TEXT NOT NULL CHECK (type IN ('b2c', 'b2b')),
    category TEXT NOT NULL CHECK (category IN (
        'onboarding', 'relance', 'engagement', 'upsell',
        'support', 'prospection', 'demo', 'suivi', 'closing'
    )),
    subject TEXT NOT NULL,
    body TEXT NOT NULL,
    variables TEXT[] NOT NULL DEFAULT '{}',
    channel TEXT NOT NULL DEFAULT 'email' CHECK (channel IN ('email', 'sms', 'linkedin', 'whatsapp')),
    is_active BOOLEAN NOT NULL DEFAULT true,
    ab_variant TEXT CHECK (ab_variant IN ('a', 'b')),
    stats JSONB DEFAULT '{"sent": 0, "opened": 0, "clicked": 0, "replied": 0}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_templates_type ON crm_templates(type);
CREATE INDEX idx_templates_category ON crm_templates(category);
CREATE INDEX idx_templates_slug ON crm_templates(slug);

CREATE TRIGGER trg_templates_updated_at
    BEFORE UPDATE ON crm_templates
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();
```

### Données initiales

```sql
INSERT INTO crm_templates (name, slug, type, category, subject, body, variables) VALUES
('Bienvenue essai B2C', 'b2c-1', 'b2c', 'onboarding', 'Bienvenue {{prenom}} ! Votre essai CheckEasy est actif', '[contenu template B2C-1]', ARRAY['prenom', 'lien_essai']),
('Relance J+3 B2C', 'b2c-2', 'b2c', 'relance', '{{prenom}}, votre bien n''est pas encore protégé', '[contenu template B2C-2]', ARRAY['prenom', 'lien_essai']),
('Félicitations inspection B2C', 'b2c-3', 'b2c', 'engagement', 'Bravo {{prenom}} ! Votre premier rapport IA est prêt', '[contenu template B2C-3]', ARRAY['prenom', 'lien_essai']),
('Proposition upgrade B2C', 'b2c-4', 'b2c', 'upsell', '{{prenom}}, passez au niveau supérieur', '[contenu template B2C-4]', ARRAY['prenom', 'plan', 'lien_essai']),
('Support B2C', 'b2c-5', 'b2c', 'support', '{{prenom}}, on peut vous aider ?', '[contenu template B2C-5]', ARRAY['prenom']),
('Premier contact B2B', 'b2b-1', 'b2b', 'prospection', '{{entreprise}} — une question sur votre contrôle qualité', '[contenu template B2B-1]', ARRAY['prenom', 'entreprise', 'nb_biens', 'lien_calendly', 'commercial_prenom', 'commercial_email']),
('Invitation démo B2B', 'b2b-2', 'b2b', 'demo', 'Démo CheckEasy pour {{entreprise}} — {{date_demo}}', '[contenu template B2B-2]', ARRAY['prenom', 'entreprise', 'nb_biens', 'date_demo', 'commercial_prenom']),
('Suivi post-démo B2B', 'b2b-3', 'b2b', 'suivi', 'Récap démo CheckEasy — {{entreprise}}', '[contenu template B2B-3]', ARRAY['prenom', 'entreprise', 'nb_biens', 'commercial_prenom', 'commercial_email']),
('Proposition commerciale B2B', 'b2b-4', 'b2b', 'closing', 'Proposition commerciale CheckEasy x {{entreprise}}', '[contenu template B2B-4]', ARRAY['prenom', 'entreprise', 'nb_biens', 'plan', 'commercial_prenom', 'commercial_email']),
('Relance signature B2B', 'b2b-5', 'b2b', 'closing', '{{prenom}}, votre proposition CheckEasy expire bientôt', '[contenu template B2B-5]', ARRAY['prenom', 'lien_calendly', 'commercial_prenom', 'commercial_email']);
```

---

## Table : crm_inbox_messages

Messages envoyés et reçus dans l'inbox centralisée.

```sql
CREATE TABLE crm_inbox_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL REFERENCES crm_leads(id) ON DELETE CASCADE,
    direction TEXT NOT NULL CHECK (direction IN ('inbound', 'outbound')),
    channel TEXT NOT NULL CHECK (channel IN ('email', 'sms', 'linkedin', 'whatsapp', 'phone', 'in_app')),
    subject TEXT,
    content TEXT NOT NULL,
    content_html TEXT,
    status TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'in_progress', 'done', 'archived')),
    assigned_to UUID REFERENCES auth.users(id),
    template_id UUID REFERENCES crm_templates(id),
    external_message_id TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    read_at TIMESTAMPTZ,
    replied_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_inbox_lead ON crm_inbox_messages(lead_id, created_at DESC);
CREATE INDEX idx_inbox_status ON crm_inbox_messages(status);
CREATE INDEX idx_inbox_direction ON crm_inbox_messages(direction);
CREATE INDEX idx_inbox_assigned ON crm_inbox_messages(assigned_to);
CREATE INDEX idx_inbox_channel ON crm_inbox_messages(channel);
CREATE INDEX idx_inbox_created ON crm_inbox_messages(created_at DESC);
CREATE INDEX idx_inbox_unread ON crm_inbox_messages(status) WHERE status = 'unread';
```

### Metadata par canal

```json
// email
{"from": "lead@email.com", "to": "thomas@checkeasy.com", "opened_at": "...", "clicked_links": [...]}

// phone
{"duration_seconds": 180, "recording_url": "...", "outcome": "voicemail"}

// linkedin
{"conversation_id": "...", "profile_url": "..."}
```

---

## Table : crm_lead_scores

Historique détaillé du scoring de chaque lead.

```sql
CREATE TABLE crm_lead_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL REFERENCES crm_leads(id) ON DELETE CASCADE,
    criteria TEXT NOT NULL,
    score INTEGER NOT NULL,
    details JSONB DEFAULT '{}'::jsonb,
    calculated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_scores_lead ON crm_lead_scores(lead_id, calculated_at DESC);
CREATE INDEX idx_scores_criteria ON crm_lead_scores(criteria);
```

### Valeurs possibles pour criteria

| Criteria | Description |
|----------|-------------|
| `source` | Score basé sur la source d'acquisition |
| `properties` | Score basé sur le nombre de biens |
| `engagement` | Score basé sur l'engagement produit/commercial |
| `recency` | Score basé sur l'ancienneté/fraîcheur |
| `profile` | Score basé sur le profil (B2B : zone géo, PMS, réseau) |
| `malus_inactivity` | Malus d'inactivité |
| `malus_no_show` | Malus no-show démo |
| `malus_unresponsive` | Malus non-réponse |
| `total` | Score total calculé (somme) |

### Exemple d'entrées

```sql
INSERT INTO crm_lead_scores (lead_id, criteria, score, details) VALUES
('lead-uuid', 'source', 15, '{"source": "event_rent_2026", "reason": "salon contact"}'),
('lead-uuid', 'properties', 30, '{"nb_properties": 45, "reason": "26-50 biens"}'),
('lead-uuid', 'engagement', 25, '{"actions": ["call_qualif", "demo_scheduled"], "reason": "démo planifiée"}'),
('lead-uuid', 'profile', 10, '{"zone": "nice", "pms": "lodgify", "reason": "zone active + PMS"}'),
('lead-uuid', 'total', 80, '{"category": "hot"}');
```

---

## Row Level Security (RLS)

### Politique d'accès

| Rôle | crm_leads | crm_activities | crm_inbox_messages | crm_templates | crm_pipeline_stages | crm_lead_scores |
|------|-----------|----------------|--------------------|--------------|--------------------|-----------------|
| **Admin** | CRUD all | CRUD all | CRUD all | CRUD all | CRUD all | Read all |
| **Commercial** | Read/Update assigned | Create own + Read assigned | Read/Update assigned | Read all | Read all | Read assigned |
| **Viewer** | Read all | Read all | Read all | Read all | Read all | Read all |

### Implémentation RLS

```sql
-- Activer RLS sur toutes les tables
ALTER TABLE crm_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_inbox_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_pipeline_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_lead_scores ENABLE ROW LEVEL SECURITY;

-- Fonction helper pour vérifier le rôle
CREATE OR REPLACE FUNCTION get_user_crm_role()
RETURNS TEXT AS $$
    SELECT COALESCE(
        (SELECT raw_user_meta_data->>'crm_role' FROM auth.users WHERE id = auth.uid()),
        'viewer'
    );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- crm_leads : Admin voit tout, Commercial voit ses leads assignés
CREATE POLICY "admin_full_access_leads" ON crm_leads
    FOR ALL
    USING (get_user_crm_role() = 'admin');

CREATE POLICY "commercial_read_assigned_leads" ON crm_leads
    FOR SELECT
    USING (
        get_user_crm_role() = 'commercial'
        AND (assigned_to = auth.uid() OR assigned_to IS NULL)
    );

CREATE POLICY "commercial_update_assigned_leads" ON crm_leads
    FOR UPDATE
    USING (
        get_user_crm_role() = 'commercial'
        AND assigned_to = auth.uid()
    );

CREATE POLICY "viewer_read_leads" ON crm_leads
    FOR SELECT
    USING (get_user_crm_role() = 'viewer');

-- crm_activities : Admin voit tout, Commercial voit les activités de ses leads
CREATE POLICY "admin_full_access_activities" ON crm_activities
    FOR ALL
    USING (get_user_crm_role() = 'admin');

CREATE POLICY "commercial_read_activities" ON crm_activities
    FOR SELECT
    USING (
        get_user_crm_role() = 'commercial'
        AND lead_id IN (
            SELECT id FROM crm_leads WHERE assigned_to = auth.uid()
        )
    );

CREATE POLICY "commercial_create_activities" ON crm_activities
    FOR INSERT
    WITH CHECK (
        get_user_crm_role() = 'commercial'
        AND user_id = auth.uid()
    );

CREATE POLICY "viewer_read_activities" ON crm_activities
    FOR SELECT
    USING (get_user_crm_role() = 'viewer');

-- crm_inbox_messages : Admin voit tout, Commercial voit les messages de ses leads
CREATE POLICY "admin_full_access_inbox" ON crm_inbox_messages
    FOR ALL
    USING (get_user_crm_role() = 'admin');

CREATE POLICY "commercial_read_inbox" ON crm_inbox_messages
    FOR SELECT
    USING (
        get_user_crm_role() = 'commercial'
        AND (assigned_to = auth.uid() OR lead_id IN (
            SELECT id FROM crm_leads WHERE assigned_to = auth.uid()
        ))
    );

CREATE POLICY "commercial_update_inbox" ON crm_inbox_messages
    FOR UPDATE
    USING (
        get_user_crm_role() = 'commercial'
        AND assigned_to = auth.uid()
    );

CREATE POLICY "viewer_read_inbox" ON crm_inbox_messages
    FOR SELECT
    USING (get_user_crm_role() = 'viewer');

-- crm_templates : Lecture pour tous, CRUD pour admin
CREATE POLICY "admin_full_access_templates" ON crm_templates
    FOR ALL
    USING (get_user_crm_role() = 'admin');

CREATE POLICY "all_read_templates" ON crm_templates
    FOR SELECT
    USING (true);

-- crm_pipeline_stages : Lecture pour tous, CRUD pour admin
CREATE POLICY "admin_full_access_stages" ON crm_pipeline_stages
    FOR ALL
    USING (get_user_crm_role() = 'admin');

CREATE POLICY "all_read_stages" ON crm_pipeline_stages
    FOR SELECT
    USING (true);

-- crm_lead_scores : Admin voit tout, Commercial voit les scores de ses leads
CREATE POLICY "admin_full_access_scores" ON crm_lead_scores
    FOR ALL
    USING (get_user_crm_role() = 'admin');

CREATE POLICY "commercial_read_scores" ON crm_lead_scores
    FOR SELECT
    USING (
        get_user_crm_role() = 'commercial'
        AND lead_id IN (
            SELECT id FROM crm_leads WHERE assigned_to = auth.uid()
        )
    );

CREATE POLICY "viewer_read_scores" ON crm_lead_scores
    FOR SELECT
    USING (get_user_crm_role() = 'viewer');
```

---

## Vues utiles

### Vue : leads avec étape pipeline

```sql
CREATE VIEW crm_leads_with_stage AS
SELECT
    l.*,
    ps.name AS stage_name,
    ps.slug AS stage_slug,
    ps.pipeline_type,
    ps.color AS stage_color,
    ps."order" AS stage_order
FROM crm_leads l
JOIN crm_pipeline_stages ps ON l.pipeline_stage_id = ps.id;
```

### Vue : activité récente par lead

```sql
CREATE VIEW crm_leads_last_activity AS
SELECT DISTINCT ON (lead_id)
    lead_id,
    type AS last_activity_type,
    content AS last_activity_content,
    created_at AS last_activity_at
FROM crm_activities
ORDER BY lead_id, created_at DESC;
```

### Vue : compteurs pipeline (pour Kanban)

```sql
CREATE VIEW crm_pipeline_counts AS
SELECT
    ps.id AS stage_id,
    ps.pipeline_type,
    ps.name AS stage_name,
    ps."order",
    ps.color,
    COUNT(l.id) AS lead_count,
    COALESCE(SUM(CASE WHEN l.score_category = 'hot' THEN 1 ELSE 0 END), 0) AS hot_count,
    COALESCE(SUM(CASE WHEN l.score_category = 'warm' THEN 1 ELSE 0 END), 0) AS warm_count,
    COALESCE(SUM(CASE WHEN l.score_category = 'cold' THEN 1 ELSE 0 END), 0) AS cold_count
FROM crm_pipeline_stages ps
LEFT JOIN crm_leads l ON l.pipeline_stage_id = ps.id AND l.status = 'active'
GROUP BY ps.id, ps.pipeline_type, ps.name, ps."order", ps.color
ORDER BY ps.pipeline_type, ps."order";
```

---

## Fonctions Supabase Edge (RPC)

### Recalculer le score d'un lead

```sql
CREATE OR REPLACE FUNCTION recalculate_lead_score(p_lead_id UUID)
RETURNS INTEGER AS $$
DECLARE
    v_total INTEGER := 0;
    v_lead RECORD;
BEGIN
    SELECT * INTO v_lead FROM crm_leads WHERE id = p_lead_id;

    -- Récupérer le dernier score par critère
    SELECT COALESCE(SUM(sub.score), 0) INTO v_total
    FROM (
        SELECT DISTINCT ON (criteria) criteria, score
        FROM crm_lead_scores
        WHERE lead_id = p_lead_id AND criteria != 'total'
        ORDER BY criteria, calculated_at DESC
    ) sub;

    -- Plafonner à 100
    v_total := LEAST(v_total, 100);
    v_total := GREATEST(v_total, 0);

    -- Mettre à jour le lead
    UPDATE crm_leads SET score = v_total WHERE id = p_lead_id;

    -- Logger le score total
    INSERT INTO crm_lead_scores (lead_id, criteria, score, details)
    VALUES (p_lead_id, 'total', v_total, jsonb_build_object(
        'category', CASE
            WHEN v_total <= 30 THEN 'cold'
            WHEN v_total <= 60 THEN 'warm'
            ELSE 'hot'
        END
    ));

    RETURN v_total;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Changer l'étape pipeline d'un lead

```sql
CREATE OR REPLACE FUNCTION move_lead_stage(
    p_lead_id UUID,
    p_new_stage_id UUID,
    p_user_id UUID DEFAULT auth.uid()
)
RETURNS VOID AS $$
DECLARE
    v_old_stage_id UUID;
    v_old_stage_name TEXT;
    v_new_stage_name TEXT;
BEGIN
    SELECT pipeline_stage_id INTO v_old_stage_id FROM crm_leads WHERE id = p_lead_id;
    SELECT name INTO v_old_stage_name FROM crm_pipeline_stages WHERE id = v_old_stage_id;
    SELECT name INTO v_new_stage_name FROM crm_pipeline_stages WHERE id = p_new_stage_id;

    -- Mettre à jour le lead
    UPDATE crm_leads SET pipeline_stage_id = p_new_stage_id WHERE id = p_lead_id;

    -- Logger l'activité
    INSERT INTO crm_activities (lead_id, user_id, type, content, metadata)
    VALUES (
        p_lead_id,
        p_user_id,
        'stage_change',
        format('Passage de "%s" à "%s"', v_old_stage_name, v_new_stage_name),
        jsonb_build_object(
            'from_stage_id', v_old_stage_id,
            'to_stage_id', p_new_stage_id,
            'from_stage_name', v_old_stage_name,
            'to_stage_name', v_new_stage_name
        )
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Détecter les leads stale

```sql
CREATE OR REPLACE FUNCTION detect_stale_leads()
RETURNS SETOF UUID AS $$
BEGIN
    RETURN QUERY
    SELECT l.id
    FROM crm_leads l
    JOIN crm_pipeline_stages ps ON l.pipeline_stage_id = ps.id
    LEFT JOIN crm_leads_last_activity la ON la.lead_id = l.id
    WHERE l.status = 'active'
      AND ps.duration_max_days IS NOT NULL
      AND (
          la.last_activity_at IS NULL
          OR la.last_activity_at < now() - (ps.duration_max_days * 2 || ' days')::interval
      );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```
