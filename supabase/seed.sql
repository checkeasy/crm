-- Seed data : leads realistes pour demo CRM CheckEasy
-- Note : pipeline_stage_id doit correspondre aux IDs crees dans la migration.
-- Ce fichier suppose que les stages ont ete crees avec gen_random_uuid()
-- et utilise des sous-requetes pour les referencer.

-- B2B Leads
INSERT INTO crm_leads (first_name, last_name, email, phone, company, lead_type, source, pipeline_stage_id, score, nb_properties, status, notes, metadata) VALUES
  ('Marie', 'Laurent', 'm.laurent@techcorp.fr', '+33 6 12 34 56 78', 'TechCorp', 'b2b', 'LinkedIn', (SELECT id FROM crm_pipeline_stages WHERE pipeline_type = 'b2b' AND name = 'Demo' LIMIT 1), 85, 1, 'active', 'Interessee par API usage-based. Demo prevue semaine prochaine.', '{"arr_potential": 24000, "employees": 35}'),
  ('Pierre', 'Martin', 'p.martin@startupflow.io', '+33 6 23 45 67 89', 'StartupFlow', 'b2b', 'Inbound', (SELECT id FROM crm_pipeline_stages WHERE pipeline_type = 'b2b' AND name = 'Qualification' LIMIT 1), 72, 1, 'active', 'A rempli le formulaire de contact. PME SaaS en croissance.', '{"arr_potential": 12000, "employees": 8}'),
  ('Lucas', 'Moreau', 'l.moreau@datascale.com', '+33 6 34 56 78 90', 'DataScale', 'b2b', 'Partenaire', (SELECT id FROM crm_pipeline_stages WHERE pipeline_type = 'b2b' AND name = 'Proposition' LIMIT 1), 91, 1, 'active', 'Proposition envoyee. Attente validation CFO.', '{"arr_potential": 48000, "employees": 120}'),
  ('Claire', 'Dubois', 'c.dubois@cloudnative.fr', '+33 6 45 67 89 01', 'CloudNative', 'b2b', 'SEO', (SELECT id FROM crm_pipeline_stages WHERE pipeline_type = 'b2b' AND name = 'Lead' LIMIT 1), 40, 1, 'active', 'Visite repetee du site. Telechargement whitepaper.', '{"arr_potential": 8000, "employees": 5}'),
  ('Thomas', 'Leroy', 't.leroy@finops.tech', '+33 6 56 78 90 12', 'FinOps Tech', 'b2b', 'Webinar', (SELECT id FROM crm_pipeline_stages WHERE pipeline_type = 'b2b' AND name = 'Demo' LIMIT 1), 78, 1, 'active', 'Participe au webinar pricing. Tres engage.', '{"arr_potential": 36000, "employees": 45}'),
  ('Antoine', 'Rousseau', 'a.rousseau@devtools.io', '+33 6 67 89 01 23', 'DevTools.io', 'b2b', 'LinkedIn', (SELECT id FROM crm_pipeline_stages WHERE pipeline_type = 'b2b' AND name = 'Qualification' LIMIT 1), 65, 1, 'active', 'CTO interesse, besoin de valider avec CEO.', '{"arr_potential": 18000, "employees": 15}'),
  ('Julie', 'Garcia', 'j.garcia@scaleup.co', '+33 6 78 90 12 34', 'ScaleUp.co', 'b2b', 'Partenaire', (SELECT id FROM crm_pipeline_stages WHERE pipeline_type = 'b2b' AND name = 'Signe' LIMIT 1), 95, 1, 'won', 'Client signe ! Onboarding en cours.', '{"arr_potential": 30000, "employees": 28}'),
  ('Nicolas', 'Blanc', 'n.blanc@apiplatform.fr', '+33 6 89 01 23 45', 'API Platform FR', 'b2b', 'Inbound', (SELECT id FROM crm_pipeline_stages WHERE pipeline_type = 'b2b' AND name = 'Lead' LIMIT 1), 35, 1, 'active', 'Premier contact via formulaire.', '{"arr_potential": 6000, "employees": 3}'),

-- B2C Leads
  ('Sophie', 'Bernard', 's.bernard@gmail.com', '+33 6 90 12 34 56', NULL, 'b2c', 'Formulaire', (SELECT id FROM crm_pipeline_stages WHERE pipeline_type = 'b2c' AND name = 'Essai gratuit' LIMIT 1), 45, 2, 'active', 'En periode dessai. 3 connexions cette semaine.', '{}'),
  ('Emma', 'Petit', 'e.petit@outlook.fr', '+33 7 01 23 45 67', NULL, 'b2c', 'SEO', (SELECT id FROM crm_pipeline_stages WHERE pipeline_type = 'b2c' AND name = 'Lead' LIMIT 1), 30, 1, 'active', 'Inscription newsletter.', '{}'),
  ('Hugo', 'Robert', 'h.robert@gmail.com', '+33 7 12 34 56 78', NULL, 'b2c', 'Formulaire', (SELECT id FROM crm_pipeline_stages WHERE pipeline_type = 'b2c' AND name = 'Activation' LIMIT 1), 60, 3, 'active', 'A active 2 fonctionnalites cles. Upsell possible.', '{}'),
  ('Lea', 'Richard', 'l.richard@yahoo.fr', '+33 7 23 45 67 89', NULL, 'b2c', 'Parrainage', (SELECT id FROM crm_pipeline_stages WHERE pipeline_type = 'b2c' AND name = 'Payant' LIMIT 1), 80, 1, 'won', 'Convertie en payant. Plan Pro.', '{}'),
  ('Maxime', 'Durand', 'm.durand@free.fr', '+33 7 34 56 78 90', NULL, 'b2c', 'SEO', (SELECT id FROM crm_pipeline_stages WHERE pipeline_type = 'b2c' AND name = 'Essai gratuit' LIMIT 1), 38, 1, 'active', 'Trial actif, faible usage.', '{}'),
  ('Camille', 'Simon', 'c.simon@gmail.com', '+33 7 45 67 89 01', NULL, 'b2c', 'Ads', (SELECT id FROM crm_pipeline_stages WHERE pipeline_type = 'b2c' AND name = 'Lead' LIMIT 1), 25, 1, 'active', 'Clic pub Google Ads.', '{}'),
  ('Paul', 'Michel', 'p.michel@hotmail.fr', '+33 7 56 78 90 12', NULL, 'b2c', 'Formulaire', (SELECT id FROM crm_pipeline_stages WHERE pipeline_type = 'b2c' AND name = 'Essai gratuit' LIMIT 1), 50, 2, 'active', 'Trial actif, usage moyen. A contacter.', '{}');

-- Activities pour quelques leads
INSERT INTO crm_activities (lead_id, activity_type, content, metadata) VALUES
  ((SELECT id FROM crm_leads WHERE email = 'm.laurent@techcorp.fr' LIMIT 1), 'meeting', 'Demo produit realisee. Points cles : API pricing, integration HubSpot, SSO.', '{"duration_min": 45}'),
  ((SELECT id FROM crm_leads WHERE email = 'm.laurent@techcorp.fr' LIMIT 1), 'email', 'Envoi de la proposition commerciale avec pricing usage-based.', '{}'),
  ((SELECT id FROM crm_leads WHERE email = 'p.martin@startupflow.io' LIMIT 1), 'call', 'Appel de qualification. Besoin confirme. Budget a valider avec CEO.', '{"duration_min": 20}'),
  ((SELECT id FROM crm_leads WHERE email = 'l.moreau@datascale.com' LIMIT 1), 'note', 'Proposition envoyee. Attente retour CFO avant vendredi.', '{}'),
  ((SELECT id FROM crm_leads WHERE email = 'l.moreau@datascale.com' LIMIT 1), 'email', 'Relance envoyee suite a absence de reponse depuis 5 jours.', '{}'),
  ((SELECT id FROM crm_leads WHERE email = 'j.garcia@scaleup.co' LIMIT 1), 'status_change', 'Passage en statut Signe.', '{"from": "Proposition", "to": "Signe"}'),
  ((SELECT id FROM crm_leads WHERE email = 't.leroy@finops.tech' LIMIT 1), 'meeting', 'Demo technique avec CTO. Tres positif sur integration.', '{"duration_min": 60}'),
  ((SELECT id FROM crm_leads WHERE email = 's.bernard@gmail.com' LIMIT 1), 'score_update', 'Score mis a jour apres 3 connexions en 1 semaine.', '{"old_score": 30, "new_score": 45}');

-- Inbox messages
INSERT INTO crm_inbox_messages (lead_id, direction, channel, subject, content, status) VALUES
  ((SELECT id FROM crm_leads WHERE email = 'm.laurent@techcorp.fr' LIMIT 1), 'inbound', 'email', 'RE: Proposition commerciale TechCorp', 'Bonjour, nous avons etudie votre proposition. Quelques questions sur les paliers de pricing au-dela de 50k calls/mois. Pouvez-vous preciser ?', 'unread'),
  ((SELECT id FROM crm_leads WHERE email = 'c.dubois@cloudnative.fr' LIMIT 1), 'inbound', 'form', 'Demande dinformation - CloudNative', 'Bonjour, nous sommes une startup de 5 personnes et nous cherchons un outil pour automatiser notre process de vente SaaS. Pouvez-vous nous proposer une demo ?', 'unread'),
  ((SELECT id FROM crm_leads WHERE email = 't.leroy@finops.tech' LIMIT 1), 'inbound', 'email', 'Suite demo - Questions techniques', 'Suite a notre demo, notre CTO a quelques questions sur la securite des donnees et la conformite RGPD. Pourriez-vous nous envoyer votre DPA ?', 'in_progress'),
  ((SELECT id FROM crm_leads WHERE email = 'l.moreau@datascale.com' LIMIT 1), 'outbound', 'email', 'Relance proposition DataScale', 'Bonjour Lucas, je me permets de vous relancer concernant notre proposition. N hesitez pas si vous avez des questions.', 'done'),
  ((SELECT id FROM crm_leads WHERE email = 'a.rousseau@devtools.io' LIMIT 1), 'inbound', 'linkedin', 'Message LinkedIn - DevTools.io', 'Salut, je suis CTO chez DevTools.io. Votre solution minteresse pour automatiser nos PoC clients. On peut en discuter ?', 'unread');

-- Templates
INSERT INTO crm_templates (name, template_type, category, subject, body, variables) VALUES
  ('Premier contact B2B', 'b2b', 'outbound', 'Decouvrez comment accelerer vos ventes SaaS', 'Bonjour {{first_name}},\n\nJe me permets de vous contacter car {{company}} correspond exactement au profil des entreprises que nous aidons a accelerer leur conversion PoC -> Paid.\n\nNotre solution permet de :\n- Creer un PoC en 10 minutes\n- Generer des devis usage-based precis\n- Centraliser vos documents de conformite\n\nSeriez-vous disponible pour un echange de 15 minutes cette semaine ?\n\nCordialement,\n{{sender_name}}', '["first_name", "company", "sender_name"]'),
  ('Suivi post-demo B2B', 'b2b', 'followup', 'Suite a notre demo - {{company}}', 'Bonjour {{first_name}},\n\nMerci pour le temps accorde lors de notre demo. Comme convenu, voici un recapitulatif des points abordes :\n\n{{demo_summary}}\n\nN hesitez pas a me contacter pour toute question.\n\nCordialement,\n{{sender_name}}', '["first_name", "company", "demo_summary", "sender_name"]'),
  ('Relance proposition', 'b2b', 'followup', 'Votre proposition CheckEasy - {{company}}', 'Bonjour {{first_name}},\n\nJe me permets de vous relancer concernant la proposition que nous vous avons envoyee le {{proposal_date}}.\n\nAvez-vous eu le temps de la parcourir ? Je reste disponible pour en discuter.\n\nCordialement,\n{{sender_name}}', '["first_name", "company", "proposal_date", "sender_name"]'),
  ('Bienvenue trial B2C', 'b2c', 'onboarding', 'Bienvenue sur CheckEasy !', 'Bonjour {{first_name}},\n\nBienvenue sur CheckEasy ! Votre essai gratuit est actif.\n\nVoici 3 etapes pour bien demarrer :\n1. Completez votre profil\n2. Importez vos premiers contacts\n3. Lancez votre premiere campagne\n\nBesoin daide ? Repondez a cet email.\n\nL equipe CheckEasy', '["first_name"]'),
  ('Activation trial B2C', 'b2c', 'activation', 'Vous navez pas encore essaye cette fonctionnalite', 'Bonjour {{first_name}},\n\nNous avons remarque que vous navez pas encore utilise {{feature_name}}. Cette fonctionnalite vous permettrait de {{benefit}}.\n\nCliquez ici pour lessayer : {{feature_link}}\n\nL equipe CheckEasy', '["first_name", "feature_name", "benefit", "feature_link"]');
