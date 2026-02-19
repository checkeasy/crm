import type { Lead, PipelineStage } from "@/lib/types/database";

export const b2bStages: PipelineStage[] = [
  { id: "b2b-1", pipeline_type: "b2b", name: "Lead", display_order: 1, color: "#94a3b8", auto_actions: [], created_at: "" },
  { id: "b2b-2", pipeline_type: "b2b", name: "Qualification", display_order: 2, color: "#a78bfa", auto_actions: [], created_at: "" },
  { id: "b2b-3", pipeline_type: "b2b", name: "Demo", display_order: 3, color: "#60a5fa", auto_actions: [], created_at: "" },
  { id: "b2b-4", pipeline_type: "b2b", name: "Proposition", display_order: 4, color: "#fbbf24", auto_actions: [], created_at: "" },
  { id: "b2b-5", pipeline_type: "b2b", name: "Signe", display_order: 5, color: "#34d399", auto_actions: [], created_at: "" },
];

export const b2cStages: PipelineStage[] = [
  { id: "b2c-1", pipeline_type: "b2c", name: "Lead", display_order: 1, color: "#94a3b8", auto_actions: [], created_at: "" },
  { id: "b2c-2", pipeline_type: "b2c", name: "Essai gratuit", display_order: 2, color: "#60a5fa", auto_actions: [], created_at: "" },
  { id: "b2c-3", pipeline_type: "b2c", name: "Activation", display_order: 3, color: "#fbbf24", auto_actions: [], created_at: "" },
  { id: "b2c-4", pipeline_type: "b2c", name: "Payant", display_order: 4, color: "#34d399", auto_actions: [], created_at: "" },
];

export const b2bLeads: Lead[] = [
  {
    id: "l1", first_name: "Marie", last_name: "Laurent", email: "m.laurent@techcorp.fr",
    phone: "+33 6 12 34 56 78", company: "TechCorp", lead_type: "b2b", source: "linkedin",
    pipeline_stage_id: "b2b-3", assigned_to: null, score: 85, nb_properties: 45,
    status: "active", notes: "Demo prevue cette semaine", metadata: { arr_potential: 24000 },
    created_at: "2026-02-10T10:00:00Z", updated_at: "2026-02-18T14:30:00Z",
  },
  {
    id: "l2", first_name: "Pierre", last_name: "Martin", email: "p.martin@startupflow.io",
    phone: "+33 6 23 45 67 89", company: "StartupFlow", lead_type: "b2b", source: "inbound",
    pipeline_stage_id: "b2b-2", assigned_to: null, score: 72, nb_properties: 12,
    status: "active", notes: "Budget a valider avec CEO", metadata: { arr_potential: 12000 },
    created_at: "2026-02-12T08:00:00Z", updated_at: "2026-02-17T16:00:00Z",
  },
  {
    id: "l3", first_name: "Lucas", last_name: "Moreau", email: "l.moreau@datascale.com",
    phone: "+33 6 34 56 78 90", company: "DataScale", lead_type: "b2b", source: "partenaire",
    pipeline_stage_id: "b2b-4", assigned_to: null, score: 91, nb_properties: 120,
    status: "active", notes: "Attente validation CFO", metadata: { arr_potential: 48000 },
    created_at: "2026-02-05T09:00:00Z", updated_at: "2026-02-19T10:00:00Z",
  },
  {
    id: "l4", first_name: "Claire", last_name: "Dubois", email: "c.dubois@cloudnative.fr",
    phone: "+33 6 45 67 89 01", company: "CloudNative", lead_type: "b2b", source: "seo",
    pipeline_stage_id: "b2b-1", assigned_to: null, score: 40, nb_properties: 5,
    status: "active", notes: "Telechargement whitepaper", metadata: { arr_potential: 8000 },
    created_at: "2026-02-15T11:00:00Z", updated_at: "2026-02-15T11:00:00Z",
  },
  {
    id: "l5", first_name: "Thomas", last_name: "Leroy", email: "t.leroy@finops.tech",
    phone: "+33 6 56 78 90 12", company: "FinOps Tech", lead_type: "b2b", source: "webinar",
    pipeline_stage_id: "b2b-3", assigned_to: null, score: 78, nb_properties: 32,
    status: "active", notes: "Tres engage apres webinar pricing", metadata: { arr_potential: 36000 },
    created_at: "2026-02-08T14:00:00Z", updated_at: "2026-02-18T09:00:00Z",
  },
  {
    id: "l6", first_name: "Antoine", last_name: "Rousseau", email: "a.rousseau@devtools.io",
    phone: "+33 6 67 89 01 23", company: "DevTools.io", lead_type: "b2b", source: "linkedin",
    pipeline_stage_id: "b2b-2", assigned_to: null, score: 65, nb_properties: 15,
    status: "active", notes: "CTO interesse, besoin valider avec CEO", metadata: { arr_potential: 18000 },
    created_at: "2026-02-11T10:00:00Z", updated_at: "2026-02-16T15:00:00Z",
  },
  {
    id: "l7", first_name: "Julie", last_name: "Garcia", email: "j.garcia@scaleup.co",
    phone: "+33 6 78 90 12 34", company: "ScaleUp.co", lead_type: "b2b", source: "partenaire",
    pipeline_stage_id: "b2b-5", assigned_to: null, score: 95, nb_properties: 28,
    status: "won", notes: "Client signe ! Onboarding en cours.", metadata: { arr_potential: 30000 },
    created_at: "2026-01-20T09:00:00Z", updated_at: "2026-02-14T12:00:00Z",
  },
  {
    id: "l8", first_name: "Nicolas", last_name: "Blanc", email: "n.blanc@apiplatform.fr",
    phone: "+33 6 89 01 23 45", company: "API Platform FR", lead_type: "b2b", source: "inbound",
    pipeline_stage_id: "b2b-1", assigned_to: null, score: 35, nb_properties: 3,
    status: "active", notes: "Premier contact via formulaire", metadata: { arr_potential: 6000 },
    created_at: "2026-02-17T08:00:00Z", updated_at: "2026-02-17T08:00:00Z",
  },
  {
    id: "l9", first_name: "Isabelle", last_name: "Faure", email: "i.faure@hostpro.fr",
    phone: "+33 6 11 22 33 44", company: "HostPro", lead_type: "b2b", source: "salon",
    pipeline_stage_id: "b2b-1", assigned_to: null, score: 55, nb_properties: 22,
    status: "active", notes: "Rencontree au salon Rent Paris", metadata: { arr_potential: 15000 },
    created_at: "2026-02-14T16:00:00Z", updated_at: "2026-02-14T16:00:00Z",
  },
];

export const b2cLeads: Lead[] = [
  {
    id: "l10", first_name: "Sophie", last_name: "Bernard", email: "s.bernard@gmail.com",
    phone: "+33 6 90 12 34 56", company: null, lead_type: "b2c", source: "formulaire",
    pipeline_stage_id: "b2c-2", assigned_to: null, score: 45, nb_properties: 2,
    status: "active", notes: "En periode d'essai. 3 connexions cette semaine.", metadata: {},
    created_at: "2026-02-13T09:00:00Z", updated_at: "2026-02-18T10:00:00Z",
  },
  {
    id: "l11", first_name: "Emma", last_name: "Petit", email: "e.petit@outlook.fr",
    phone: "+33 7 01 23 45 67", company: null, lead_type: "b2c", source: "seo",
    pipeline_stage_id: "b2c-1", assigned_to: null, score: 30, nb_properties: 1,
    status: "active", notes: "Inscription newsletter.", metadata: {},
    created_at: "2026-02-16T14:00:00Z", updated_at: "2026-02-16T14:00:00Z",
  },
  {
    id: "l12", first_name: "Hugo", last_name: "Robert", email: "h.robert@gmail.com",
    phone: "+33 7 12 34 56 78", company: null, lead_type: "b2c", source: "formulaire",
    pipeline_stage_id: "b2c-3", assigned_to: null, score: 60, nb_properties: 3,
    status: "active", notes: "A active 2 fonctionnalites cles. Upsell possible.", metadata: {},
    created_at: "2026-02-10T11:00:00Z", updated_at: "2026-02-17T08:00:00Z",
  },
  {
    id: "l13", first_name: "Lea", last_name: "Richard", email: "l.richard@yahoo.fr",
    phone: "+33 7 23 45 67 89", company: null, lead_type: "b2c", source: "parrainage",
    pipeline_stage_id: "b2c-4", assigned_to: null, score: 80, nb_properties: 1,
    status: "won", notes: "Convertie en payant. Plan Pro.", metadata: {},
    created_at: "2026-01-25T10:00:00Z", updated_at: "2026-02-12T14:00:00Z",
  },
  {
    id: "l14", first_name: "Maxime", last_name: "Durand", email: "m.durand@free.fr",
    phone: "+33 7 34 56 78 90", company: null, lead_type: "b2c", source: "seo",
    pipeline_stage_id: "b2c-2", assigned_to: null, score: 38, nb_properties: 1,
    status: "active", notes: "Trial actif, faible usage.", metadata: {},
    created_at: "2026-02-14T12:00:00Z", updated_at: "2026-02-14T12:00:00Z",
  },
  {
    id: "l15", first_name: "Camille", last_name: "Simon", email: "c.simon@gmail.com",
    phone: "+33 7 45 67 89 01", company: null, lead_type: "b2c", source: "ads",
    pipeline_stage_id: "b2c-1", assigned_to: null, score: 25, nb_properties: 1,
    status: "active", notes: "Clic pub Google Ads.", metadata: {},
    created_at: "2026-02-18T09:00:00Z", updated_at: "2026-02-18T09:00:00Z",
  },
  {
    id: "l16", first_name: "Paul", last_name: "Michel", email: "p.michel@hotmail.fr",
    phone: "+33 7 56 78 90 12", company: null, lead_type: "b2c", source: "formulaire",
    pipeline_stage_id: "b2c-2", assigned_to: null, score: 50, nb_properties: 2,
    status: "active", notes: "Trial actif, usage moyen. A contacter.", metadata: {},
    created_at: "2026-02-11T15:00:00Z", updated_at: "2026-02-16T11:00:00Z",
  },
  {
    id: "l17", first_name: "Alice", last_name: "Bonnet", email: "a.bonnet@gmail.com",
    phone: "+33 7 67 89 01 23", company: null, lead_type: "b2c", source: "referral",
    pipeline_stage_id: "b2c-1", assigned_to: null, score: 55, nb_properties: 4,
    status: "active", notes: "Parrainee par Lea Richard. 4 biens, potentiel B2B.", metadata: {},
    created_at: "2026-02-17T10:00:00Z", updated_at: "2026-02-17T10:00:00Z",
  },
];
