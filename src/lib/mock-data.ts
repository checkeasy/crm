import type { Lead, PipelineStage, InboxMessage, Template, Activity } from "@/lib/types/database";

// Pipeline stages
export const pipelineStages: PipelineStage[] = [
  // B2C
  { id: "s1", pipeline_type: "b2c", name: "Lead", display_order: 1, color: "#9CA3AF", auto_actions: [], created_at: "2026-01-01" },
  { id: "s2", pipeline_type: "b2c", name: "Essai gratuit", display_order: 2, color: "#3B82F6", auto_actions: [], created_at: "2026-01-01" },
  { id: "s3", pipeline_type: "b2c", name: "Activation", display_order: 3, color: "#F59E0B", auto_actions: [], created_at: "2026-01-01" },
  { id: "s4", pipeline_type: "b2c", name: "Payant", display_order: 4, color: "#10B981", auto_actions: [], created_at: "2026-01-01" },
  // B2B
  { id: "s5", pipeline_type: "b2b", name: "Lead", display_order: 1, color: "#9CA3AF", auto_actions: [], created_at: "2026-01-01" },
  { id: "s6", pipeline_type: "b2b", name: "Qualification", display_order: 2, color: "#8B5CF6", auto_actions: [], created_at: "2026-01-01" },
  { id: "s7", pipeline_type: "b2b", name: "Demo", display_order: 3, color: "#3B82F6", auto_actions: [], created_at: "2026-01-01" },
  { id: "s8", pipeline_type: "b2b", name: "Proposition", display_order: 4, color: "#F59E0B", auto_actions: [], created_at: "2026-01-01" },
  { id: "s9", pipeline_type: "b2b", name: "Signe", display_order: 5, color: "#10B981", auto_actions: [], created_at: "2026-01-01" },
];

// Mock leads
export const mockLeads: Lead[] = [
  { id: "l1", first_name: "Sophie", last_name: "Martin", email: "sophie.martin@gmail.com", phone: "+33612345678", company: null, lead_type: "b2c", source: "website_b2c", pipeline_stage_id: "s3", assigned_to: null, score: 75, nb_properties: 2, status: "active", notes: null, metadata: {}, created_at: "2026-02-18T10:00:00Z", updated_at: "2026-02-18T14:00:00Z", pipeline_stage: pipelineStages[2] },
  { id: "l2", first_name: "Thomas", last_name: "Renard", email: "t.renard@conciergerie-azur.com", phone: "+33698765432", company: "Conciergerie Azur", lead_type: "b2b", source: "event_rent_2026", pipeline_stage_id: "s7", assigned_to: "user1", score: 80, nb_properties: 45, status: "active", notes: "Rencontre au salon Rent", metadata: { pms_tool: "lodgify" }, created_at: "2026-02-15T09:00:00Z", updated_at: "2026-02-18T16:00:00Z", pipeline_stage: pipelineStages[6] },
  { id: "l3", first_name: "Marie", last_name: "Lefevre", email: "marie@guestpro.fr", phone: "+33687654321", company: "GuestPro", lead_type: "b2b", source: "linkedin_dm", pipeline_stage_id: "s8", assigned_to: "user2", score: 88, nb_properties: 65, status: "active", notes: "Tres interessee, attend validation budget", metadata: {}, created_at: "2026-02-10T14:00:00Z", updated_at: "2026-02-17T11:00:00Z", pipeline_stage: pipelineStages[7] },
  { id: "l4", first_name: "Jean-Marc", last_name: "Dupont", email: "jmdupont@outlook.fr", phone: "+33645678901", company: null, lead_type: "b2c", source: "referral", pipeline_stage_id: "s2", assigned_to: null, score: 55, nb_properties: 1, status: "active", notes: null, metadata: { referral_code: "REF-SOPHIE01" }, created_at: "2026-02-17T08:00:00Z", updated_at: "2026-02-17T08:00:00Z", pipeline_stage: pipelineStages[1] },
  { id: "l5", first_name: "Claire", last_name: "Bernard", email: "claire.b@email.com", phone: null, company: null, lead_type: "b2c", source: "website_b2c", pipeline_stage_id: "s4", assigned_to: null, score: 82, nb_properties: 3, status: "won", notes: null, metadata: {}, created_at: "2026-01-20T12:00:00Z", updated_at: "2026-02-15T09:00:00Z", pipeline_stage: pipelineStages[3] },
  { id: "l6", first_name: "Lucas", last_name: "Moreau", email: "lucas.moreau@gmail.com", phone: "+33656789012", company: null, lead_type: "b2c", source: "contact_form", pipeline_stage_id: "s1", assigned_to: null, score: 20, nb_properties: 1, status: "active", notes: null, metadata: {}, created_at: "2026-02-19T07:00:00Z", updated_at: "2026-02-19T07:00:00Z", pipeline_stage: pipelineStages[0] },
  { id: "l7", first_name: "Antoine", last_name: "Garcia", email: "a.garcia@riviera-concierge.com", phone: "+33667890123", company: "Riviera Conciergerie", lead_type: "b2b", source: "phone_inbound", pipeline_stage_id: "s9", assigned_to: "user2", score: 95, nb_properties: 80, status: "won", notes: "Signe Pro+ sur devis", metadata: {}, created_at: "2026-01-05T10:00:00Z", updated_at: "2026-02-01T14:00:00Z", pipeline_stage: pipelineStages[8] },
  { id: "l8", first_name: "Camille", last_name: "Roux", email: "camille.roux@hotmail.fr", phone: null, company: null, lead_type: "b2c", source: "linkedin_post", pipeline_stage_id: "s2", assigned_to: null, score: 35, nb_properties: 1, status: "active", notes: null, metadata: {}, created_at: "2026-02-16T15:00:00Z", updated_at: "2026-02-16T15:00:00Z", pipeline_stage: pipelineStages[1] },
  { id: "l9", first_name: "Pierre", last_name: "Faure", email: "p.faure@sun-concierge.com", phone: "+33678901234", company: "Sun Conciergerie", lead_type: "b2b", source: "partner_lodgify", pipeline_stage_id: "s6", assigned_to: "user1", score: 52, nb_properties: 22, status: "active", notes: null, metadata: { pms_tool: "lodgify" }, created_at: "2026-02-14T11:00:00Z", updated_at: "2026-02-18T10:00:00Z", pipeline_stage: pipelineStages[5] },
  { id: "l10", first_name: "Emma", last_name: "Petit", email: "emma.petit@gmail.com", phone: "+33689012345", company: null, lead_type: "b2c", source: "website_b2c", pipeline_stage_id: "s3", assigned_to: null, score: 68, nb_properties: 2, status: "active", notes: null, metadata: {}, created_at: "2026-02-13T09:00:00Z", updated_at: "2026-02-18T08:00:00Z", pipeline_stage: pipelineStages[2] },
  { id: "l11", first_name: "Hugo", last_name: "Simon", email: "hugo@keyconcierge.fr", phone: "+33690123456", company: "Key Conciergerie", lead_type: "b2b", source: "linkedin_dm", pipeline_stage_id: "s5", assigned_to: "user1", score: 38, nb_properties: 12, status: "active", notes: null, metadata: {}, created_at: "2026-02-19T06:00:00Z", updated_at: "2026-02-19T06:00:00Z", pipeline_stage: pipelineStages[4] },
  { id: "l12", first_name: "Isabelle", last_name: "Morel", email: "isabelle.morel@free.fr", phone: null, company: null, lead_type: "b2c", source: "referral", pipeline_stage_id: "s4", assigned_to: null, score: 78, nb_properties: 2, status: "won", notes: null, metadata: {}, created_at: "2026-01-28T16:00:00Z", updated_at: "2026-02-10T12:00:00Z", pipeline_stage: pipelineStages[3] },
  { id: "l13", first_name: "Nicolas", last_name: "Lambert", email: "n.lambert@alphost.com", phone: "+33601234567", company: "AlpHost Conciergerie", lead_type: "b2b", source: "event_rent_2026", pipeline_stage_id: "s7", assigned_to: "user2", score: 70, nb_properties: 35, status: "active", notes: "Demo planifiee pour le 21/02", metadata: {}, created_at: "2026-02-15T14:00:00Z", updated_at: "2026-02-18T17:00:00Z", pipeline_stage: pipelineStages[6] },
  { id: "l14", first_name: "Julie", last_name: "Bonnet", email: "julie.bonnet@yahoo.fr", phone: "+33612340987", company: null, lead_type: "b2c", source: "website_b2c", pipeline_stage_id: "s1", assigned_to: null, score: 15, nb_properties: 1, status: "active", notes: null, metadata: {}, created_at: "2026-02-19T08:30:00Z", updated_at: "2026-02-19T08:30:00Z", pipeline_stage: pipelineStages[0] },
  { id: "l15", first_name: "David", last_name: "Thomas", email: "david.t@gmail.com", phone: null, company: null, lead_type: "b2c", source: "contact_form", pipeline_stage_id: "s2", assigned_to: null, score: 42, nb_properties: 2, status: "active", notes: null, metadata: {}, created_at: "2026-02-12T10:00:00Z", updated_at: "2026-02-16T14:00:00Z", pipeline_stage: pipelineStages[1] },
  { id: "l16", first_name: "Aurelie", last_name: "Girard", email: "aurelie@oceanview-concierge.com", phone: "+33623456789", company: "OceanView Conciergerie", lead_type: "b2b", source: "referral", pipeline_stage_id: "s8", assigned_to: "user2", score: 85, nb_properties: 55, status: "active", notes: "Recommandee par Riviera Conciergerie", metadata: {}, created_at: "2026-02-08T13:00:00Z", updated_at: "2026-02-17T16:00:00Z", pipeline_stage: pipelineStages[7] },
  { id: "l17", first_name: "Maxime", last_name: "Fournier", email: "max.fournier@outlook.com", phone: "+33634567890", company: null, lead_type: "b2c", source: "website_b2c", pipeline_stage_id: "s2", assigned_to: null, score: 48, nb_properties: 1, status: "active", notes: null, metadata: {}, created_at: "2026-02-11T11:00:00Z", updated_at: "2026-02-15T09:00:00Z", pipeline_stage: pipelineStages[1] },
  { id: "l18", first_name: "Nathalie", last_name: "Rousseau", email: "nathalie.r@biarritz-homes.com", phone: "+33645670123", company: "Biarritz Homes", lead_type: "b2b", source: "phone_inbound", pipeline_stage_id: "s6", assigned_to: "user1", score: 60, nb_properties: 18, status: "active", notes: null, metadata: {}, created_at: "2026-02-17T09:00:00Z", updated_at: "2026-02-18T15:00:00Z", pipeline_stage: pipelineStages[5] },
  { id: "l19", first_name: "Olivier", last_name: "Blanc", email: "o.blanc@gmail.com", phone: null, company: null, lead_type: "b2c", source: "linkedin_post", pipeline_stage_id: "s1", assigned_to: null, score: 25, nb_properties: 1, status: "active", notes: null, metadata: {}, created_at: "2026-02-18T16:00:00Z", updated_at: "2026-02-18T16:00:00Z", pipeline_stage: pipelineStages[0] },
  { id: "l20", first_name: "Stephanie", last_name: "Mercier", email: "steph@premium-gestion.fr", phone: "+33656780345", company: "Premium Gestion", lead_type: "b2b", source: "linkedin_dm", pipeline_stage_id: "s9", assigned_to: "user2", score: 92, nb_properties: 110, status: "won", notes: "Pro+ signe, 110 biens", metadata: {}, created_at: "2025-12-10T10:00:00Z", updated_at: "2026-01-20T14:00:00Z", pipeline_stage: pipelineStages[8] },
];

// Source display labels
export const sourceLabels: Record<string, string> = {
  website_b2c: "Site web B2C",
  website_b2b: "Site web B2B",
  linkedin_dm: "LinkedIn DM",
  linkedin_post: "LinkedIn Post",
  referral: "Parrainage",
  partner_lodgify: "Partenariat",
  phone_inbound: "Appel entrant",
  contact_form: "Formulaire",
  event_rent_2026: "Salon/Event",
};

// Channel metrics data
export interface ChannelMetric {
  source: string;
  label: string;
  leads: number;
  converted: number;
  revenue: number;
  avgClosingDays: number;
}

export const channelMetrics: ChannelMetric[] = [
  { source: "website_b2c", label: "Site web B2C", leads: 312, converted: 34, revenue: 1245, avgClosingDays: 8 },
  { source: "website_b2b", label: "Site web B2B", leads: 38, converted: 8, revenue: 3920, avgClosingDays: 22 },
  { source: "linkedin_dm", label: "LinkedIn DM", leads: 45, converted: 12, revenue: 5880, avgClosingDays: 28 },
  { source: "linkedin_post", label: "LinkedIn Post", leads: 18, converted: 2, revenue: 240, avgClosingDays: 15 },
  { source: "referral", label: "Parrainage", leads: 28, converted: 10, revenue: 2890, avgClosingDays: 12 },
  { source: "partner_lodgify", label: "Partenariats", leads: 15, converted: 4, revenue: 1960, avgClosingDays: 25 },
  { source: "phone_inbound", label: "Appels entrants", leads: 12, converted: 5, revenue: 4450, avgClosingDays: 18 },
  { source: "contact_form", label: "Formulaire", leads: 52, converted: 4, revenue: 480, avgClosingDays: 20 },
  { source: "event_rent_2026", label: "Salons/Events", leads: 22, converted: 5, revenue: 2450, avgClosingDays: 30 },
];

// Funnel data
export interface FunnelStep {
  stage: string;
  b2c: number;
  b2b: number;
}

export const funnelData: FunnelStep[] = [
  { stage: "Lead", b2c: 312, b2b: 85 },
  { stage: "Essai / Qualif.", b2c: 187, b2b: 60 },
  { stage: "Activation / Demo", b2c: 78, b2b: 36 },
  { stage: "Payant / Proposition", b2c: 34, b2b: 22 },
  { stage: "Converti / Signe", b2c: 34, b2b: 14 },
];

// ============================================================
// INBOX MOCK DATA
// ============================================================

export const mockInboxMessages: InboxMessage[] = [
  {
    id: "m1", lead_id: "l6", direction: "inbound", channel: "form",
    subject: "Demande d'information sur CheckEasy",
    content: "Bonjour, je suis proprietaire d'un appartement a Nice que je loue sur Airbnb. J'ai eu un probleme de degradation recemment et je cherche une solution pour documenter l'etat de mon bien entre chaque voyageur. Pouvez-vous m'en dire plus sur vos tarifs ?",
    status: "unread", assigned_to: null, template_id: null, created_at: "2026-02-19T09:15:00Z",
    lead: mockLeads.find((l) => l.id === "l6"),
  },
  {
    id: "m2", lead_id: "l11", direction: "inbound", channel: "linkedin",
    subject: "Interesse par CheckEasy pour ma conciergerie",
    content: "Bonjour, j'ai vu votre post sur LinkedIn concernant l'automatisation du controle qualite. Nous gerons 12 biens sur la Cote d'Azur et nous cherchons a standardiser nos inspections. Est-ce possible d'organiser une demo ?",
    status: "unread", assigned_to: "user1", template_id: null, created_at: "2026-02-19T08:30:00Z",
    lead: mockLeads.find((l) => l.id === "l11"),
  },
  {
    id: "m3", lead_id: "l2", direction: "inbound", channel: "email",
    subject: "RE: Suite a notre rencontre au salon Rent",
    content: "Bonjour Thomas, merci pour votre suivi. J'ai discute avec mon associe et nous sommes tres interesses. Nous utilisons actuellement Lodgify comme PMS. Est-ce que CheckEasy s'integre bien ? Pouvons-nous planifier la demo pour la semaine prochaine ?",
    status: "unread", assigned_to: "user1", template_id: null, created_at: "2026-02-19T07:45:00Z",
    lead: mockLeads.find((l) => l.id === "l2"),
  },
  {
    id: "m4", lead_id: "l3", direction: "outbound", channel: "email",
    subject: "Proposition commerciale CheckEasy x GuestPro",
    content: "Bonjour Marie, comme convenu suite a notre demo, voici la proposition commerciale pour GuestPro. Plan recommande : Pro (49EUR/mois) pour vos 65 biens. Inclus : onboarding personnalise + formation equipe terrain. Offre valable 15 jours.",
    status: "done", assigned_to: "user2", template_id: "t9", created_at: "2026-02-18T16:00:00Z",
    lead: mockLeads.find((l) => l.id === "l3"),
  },
  {
    id: "m5", lead_id: "l4", direction: "inbound", channel: "email",
    subject: "Probleme connexion compte essai",
    content: "Bonjour, je me suis inscrit hier via le lien de Sophie Martin mais je n'arrive pas a me connecter. Le mot de passe ne fonctionne pas. Pouvez-vous m'aider ? Merci.",
    status: "in_progress", assigned_to: null, template_id: null, created_at: "2026-02-18T14:20:00Z",
    lead: mockLeads.find((l) => l.id === "l4"),
  },
  {
    id: "m6", lead_id: "l9", direction: "outbound", channel: "email",
    subject: "Invitation demo CheckEasy pour Sun Conciergerie",
    content: "Bonjour Pierre, suite a notre echange, je vous propose une demo personnalisee de CheckEasy. Date : jeudi 20 fevrier a 14h30. Duree : 25 minutes en visio. Je vous montrerai le dashboard adapte a votre parc de 22 biens.",
    status: "done", assigned_to: "user1", template_id: "t7", created_at: "2026-02-18T11:00:00Z",
    lead: mockLeads.find((l) => l.id === "l9"),
  },
  {
    id: "m7", lead_id: "l18", direction: "inbound", channel: "phone",
    subject: "Appel entrant - Biarritz Homes",
    content: "Nathalie Rousseau de Biarritz Homes a appele. 18 biens geres au Pays Basque. Utilise Excel pour le suivi qualite. Interesse par une solution automatisee. A demande un rappel demain matin. Note : parle aussi de formations pour ses agents.",
    status: "unread", assigned_to: "user1", template_id: null, created_at: "2026-02-18T10:15:00Z",
    lead: mockLeads.find((l) => l.id === "l18"),
  },
  {
    id: "m8", lead_id: "l10", direction: "inbound", channel: "form",
    subject: "Question sur le plan Intensif",
    content: "Bonjour, j'utilise CheckEasy depuis 2 semaines en plan Libre. J'adore le produit ! Je vois que le plan Intensif inclut le planning menage. Comment ca fonctionne exactement ? Est-ce que je peux assigner des creneaux a ma femme de menage directement ?",
    status: "in_progress", assigned_to: null, template_id: null, created_at: "2026-02-18T09:30:00Z",
    lead: mockLeads.find((l) => l.id === "l10"),
  },
  {
    id: "m9", lead_id: "l16", direction: "inbound", channel: "email",
    subject: "RE: Proposition commerciale CheckEasy",
    content: "Bonjour, merci pour la proposition. Nous avons quelques questions : 1) Est-il possible d'avoir un tarif degressif pour nos 55 biens ? 2) L'onboarding peut-il se faire sur site a Biarritz ? 3) Quelle est la duree d'engagement minimum ? Merci, Aurelie.",
    status: "unread", assigned_to: "user2", template_id: null, created_at: "2026-02-17T17:00:00Z",
    lead: mockLeads.find((l) => l.id === "l16"),
  },
  {
    id: "m10", lead_id: "l13", direction: "outbound", channel: "email",
    subject: "Recap demo CheckEasy - AlpHost",
    content: "Bonjour Nicolas, merci pour votre temps lors de la demo. Voici un recapitulatif : CheckEasy pour 35 biens = gain estime de 35h/mois. ROI : reduction de 70% des litiges non documentes. Prochaine etape : envoi de la proposition sous 48h.",
    status: "done", assigned_to: "user2", template_id: "t8", created_at: "2026-02-17T15:30:00Z",
    lead: mockLeads.find((l) => l.id === "l13"),
  },
  {
    id: "m11", lead_id: "l8", direction: "inbound", channel: "linkedin",
    subject: "Question rapide via LinkedIn",
    content: "Salut ! J'ai vu votre video sur les degradations Airbnb. Ca m'a fait flipper. J'ai un appart que je loue sur Airbnb, c'est quoi le prix pour proteger 1 bien ? Merci !",
    status: "unread", assigned_to: null, template_id: null, created_at: "2026-02-17T12:00:00Z",
    lead: mockLeads.find((l) => l.id === "l8"),
  },
  {
    id: "m12", lead_id: "l14", direction: "inbound", channel: "form",
    subject: "Inscription newsletter + question",
    content: "Bonjour, je me suis inscrite pour l'essai gratuit ce matin. J'ai un studio a Paris 11e. Question : est-ce que les photos sont stockees longtemps ? J'aimerais avoir un historique sur au moins 1 an pour mes assurances. Merci, Julie.",
    status: "unread", assigned_to: null, template_id: null, created_at: "2026-02-19T08:45:00Z",
    lead: mockLeads.find((l) => l.id === "l14"),
  },
];

// Mock templates for quick reply
export const mockTemplates: Template[] = [
  // B2C Templates
  {
    id: "t1", name: "Bienvenue essai B2C", template_type: "b2c", category: "onboarding",
    subject: "Bienvenue {{prenom}} ! Votre essai CheckEasy est actif",
    body: "Bonjour {{prenom}},\n\nBienvenue sur CheckEasy ! Votre essai gratuit de 14 jours est maintenant actif.\n\nVoici comment demarrer en 3 minutes :\n\n1. Ajoutez votre premier bien (adresse + photos de reference)\n2. Lancez votre premiere inspection guidee\n3. Recevez votre rapport IA automatique\n\nC'est aussi simple que ca. La plupart de nos utilisateurs recoivent leur premier rapport en moins de 5 minutes.\n\nUne question ? Repondez simplement a cet email, on vous repond en moins de 2h.\n\nA tres vite,\nL'equipe CheckEasy",
    variables: ["prenom"], created_by: null, created_at: "2026-01-01", updated_at: "2026-01-01",
  },
  {
    id: "t2", name: "Relance J+3 B2C", template_type: "b2c", category: "relance",
    subject: "{{prenom}}, votre bien n'est pas encore protege",
    body: "Bonjour {{prenom}},\n\nVous avez cree votre compte CheckEasy il y a 3 jours, mais vous n'avez pas encore lance votre premiere inspection.\n\nOn comprend — la mise en route peut sembler complexe. Sauf que non : ca prend litteralement 5 minutes.\n\nSaviez-vous que 73% des litiges Airbnb auraient pu etre evites avec un etat des lieux photo horodate ?\n\nNe laissez pas votre bien sans protection. Votre essai se termine dans 11 jours.\n\nL'equipe CheckEasy",
    variables: ["prenom"], created_by: null, created_at: "2026-01-01", updated_at: "2026-01-01",
  },
  {
    id: "t3", name: "Felicitations inspection B2C", template_type: "b2c", category: "engagement",
    subject: "Bravo {{prenom}} ! Votre premier rapport IA est pret",
    body: "Bonjour {{prenom}},\n\nVotre premier rapport d'inspection est pret ! Vous venez de franchir une etape importante : votre bien est maintenant documente avec des preuves photos horodatees et geolocalisees.\n\nCe que votre rapport contient :\n- Photos horodatees de chaque piece\n- Analyse IA de l'etat du logement\n- Detection automatique d'anomalies\n- Rapport PDF partageable (valeur juridique)\n\nL'equipe CheckEasy",
    variables: ["prenom"], created_by: null, created_at: "2026-01-01", updated_at: "2026-01-01",
  },
  {
    id: "t4", name: "Proposition upgrade B2C", template_type: "b2c", category: "upsell",
    subject: "{{prenom}}, passez au niveau superieur",
    body: "Bonjour {{prenom}},\n\nVous utilisez CheckEasy regulierement — et c'est exactement pour ca qu'on l'a cree.\n\nPlan Essentiel (4.99EUR/mois) :\n- Rapports illimites\n- Historique complet 12 mois\n- Export PDF haute qualite\n- Notifications temps reel\n\nPlan Intensif (19.99EUR/mois) :\n- Tout le plan Essentiel\n- Planning agents de menage\n- Livret d'accueil IA\n- Sync calendrier Airbnb/Booking/Abritel\n- Support prioritaire\n\nPour le prix d'un cafe par jour, votre bien est protege 24/7.\n\nL'equipe CheckEasy",
    variables: ["prenom"], created_by: null, created_at: "2026-01-01", updated_at: "2026-01-01",
  },
  {
    id: "t5", name: "Support B2C", template_type: "b2c", category: "support",
    subject: "{{prenom}}, on peut vous aider ?",
    body: "Bonjour {{prenom}},\n\nOn a remarque que vous n'avez pas utilise CheckEasy recemment. Tout va bien ?\n\nSi vous rencontrez une difficulte, on est la pour vous aider :\n- Repondez a cet email — reponse en moins de 2h\n- Consultez notre centre d'aide\n\nVotre avis compte. Si quelque chose ne vous convient pas dans CheckEasy, dites-le nous.\n\nL'equipe CheckEasy",
    variables: ["prenom"], created_by: null, created_at: "2026-01-01", updated_at: "2026-01-01",
  },
  // B2B Templates
  {
    id: "t6", name: "Premier contact B2B", template_type: "b2b", category: "prospection",
    subject: "{{entreprise}} — une question sur votre controle qualite",
    body: "Bonjour {{prenom}},\n\nJe me permets de vous contacter car je travaille avec plusieurs conciergeries en France sur un sujet qui revient constamment : la gestion du controle qualite menage et des etats des lieux.\n\nChez {{entreprise}}, avec {{nb_biens}} biens a gerer, vous avez probablement deja rencontre ce type de situations :\n- Un proprietaire qui signale une degradation que votre equipe n'a pas documentee\n- Un litige voyageur sans preuves photos horodatees\n- Des agents terrain dont vous ne pouvez pas verifier la qualite du travail a distance\n\nCheckEasy automatise tout ca avec l'IA. +2 000 biens equipes dans 3 pays.\n\nEst-ce que vous auriez 20 minutes cette semaine pour que je vous montre concretement comment ca fonctionne ?\n\nCordialement,\nThomas\nCheckEasy",
    variables: ["prenom", "entreprise", "nb_biens"], created_by: null, created_at: "2026-01-01", updated_at: "2026-01-01",
  },
  {
    id: "t7", name: "Invitation demo B2B", template_type: "b2b", category: "demo",
    subject: "Demo CheckEasy pour {{entreprise}} — {{date_demo}}",
    body: "Bonjour {{prenom}},\n\nSuite a notre echange, je vous confirme votre demo personnalisee CheckEasy :\n\nDate : {{date_demo}}\nDuree : 25 minutes\nVisioconference\n\nCe qu'on va vous montrer :\n1. Une inspection en live sur un de VOS biens (si vous le souhaitez)\n2. Le rapport IA genere en temps reel\n3. Le dashboard de suivi de votre parc de {{nb_biens}} biens\n4. Le calcul de ROI personnalise pour {{entreprise}}\n\nA bientot !\n\nThomas\nCheckEasy",
    variables: ["prenom", "entreprise", "nb_biens", "date_demo"], created_by: null, created_at: "2026-01-01", updated_at: "2026-01-01",
  },
  {
    id: "t8", name: "Suivi post-demo B2B", template_type: "b2b", category: "suivi",
    subject: "Recap demo CheckEasy — {{entreprise}}",
    body: "Bonjour {{prenom}},\n\nMerci pour votre temps lors de la demo. Voici un recapitulatif :\n\nCe que CheckEasy apporte a {{entreprise}} :\n- Inspection IA en 5 min par bien (vs 20-30 min manuellement)\n- Rapports automatiques avec preuves horodatees a valeur juridique\n- Dashboard de suivi qualite pour vos {{nb_biens}} biens\n- Notifications temps reel aux proprietaires\n\nProchaine etape : je vous envoie une proposition commerciale adaptee sous 48h.\n\nDes questions entre-temps ? Je suis disponible.\n\nThomas\nCheckEasy",
    variables: ["prenom", "entreprise", "nb_biens"], created_by: null, created_at: "2026-01-01", updated_at: "2026-01-01",
  },
  {
    id: "t9", name: "Proposition commerciale B2B", template_type: "b2b", category: "closing",
    subject: "Proposition commerciale CheckEasy x {{entreprise}}",
    body: "Bonjour {{prenom}},\n\nComme convenu, voici la proposition commerciale pour {{entreprise}}.\n\nPlan recommande : Pro\nNombre de biens couverts : {{nb_biens}}\nEngagement : mensuel, sans engagement minimum\nInclus : onboarding personnalise + formation equipe terrain\n\nOffre de lancement :\n- 1 mois offert sur votre premiere souscription\n- Onboarding dedie avec configuration de vos {{nb_biens}} biens\n- Formation de vos agents terrain (visio 1h)\n\nLa proposition est valable 15 jours.\n\nThomas\nCheckEasy",
    variables: ["prenom", "entreprise", "nb_biens"], created_by: null, created_at: "2026-01-01", updated_at: "2026-01-01",
  },
  {
    id: "t10", name: "Relance signature B2B", template_type: "b2b", category: "closing",
    subject: "{{prenom}}, votre proposition CheckEasy expire bientot",
    body: "Bonjour {{prenom}},\n\nJe reviens vers vous concernant la proposition commerciale envoyee la semaine derniere pour {{entreprise}}.\n\nCe que nos clients conciergeries disent le plus souvent apres 1 mois :\n\"On ne comprend pas comment on faisait avant.\"\n\"Nos proprietaires recoivent les rapports automatiquement. Ca a change la relation.\"\n\nSi vous avez des questions, je suis disponible.\n\nLa proposition avec le mois offert est valable encore 8 jours.\n\nThomas\nCheckEasy",
    variables: ["prenom", "entreprise"], created_by: null, created_at: "2026-01-01", updated_at: "2026-01-01",
  },
];

// Mock activities for leads (for inbox detail history)
export const mockActivities: Activity[] = [
  { id: "a1", lead_id: "l2", user_id: "user1", activity_type: "meeting", content: "Rencontre au salon Rent Paris - Thomas interesse, 45 biens, utilise Lodgify", metadata: {}, created_at: "2026-02-15T10:00:00Z" },
  { id: "a2", lead_id: "l2", user_id: "user1", activity_type: "email", content: "Email de suivi envoye post-salon", metadata: {}, created_at: "2026-02-16T09:00:00Z" },
  { id: "a3", lead_id: "l2", user_id: null, activity_type: "email", content: "Reponse recue - interesse par une demo", metadata: {}, created_at: "2026-02-19T07:45:00Z" },
  { id: "a4", lead_id: "l3", user_id: "user2", activity_type: "call", content: "Appel de qualification - 65 biens, budget valide par direction", metadata: {}, created_at: "2026-02-12T11:00:00Z" },
  { id: "a5", lead_id: "l3", user_id: "user2", activity_type: "meeting", content: "Demo realisee - tres positif, demande proposition", metadata: {}, created_at: "2026-02-15T14:00:00Z" },
  { id: "a6", lead_id: "l3", user_id: "user2", activity_type: "email", content: "Proposition commerciale envoyee - Pro 49EUR/mois", metadata: {}, created_at: "2026-02-18T16:00:00Z" },
  { id: "a7", lead_id: "l6", user_id: null, activity_type: "note", content: "Lead entrant via formulaire contact - proprietaire 1 bien Nice", metadata: {}, created_at: "2026-02-19T07:00:00Z" },
  { id: "a8", lead_id: "l11", user_id: "user1", activity_type: "note", content: "Lead LinkedIn DM - Key Conciergerie, 12 biens Cote d'Azur", metadata: {}, created_at: "2026-02-19T06:30:00Z" },
  { id: "a9", lead_id: "l16", user_id: "user2", activity_type: "email", content: "Proposition commerciale envoyee - 55 biens, recommandee par Riviera", metadata: {}, created_at: "2026-02-16T10:00:00Z" },
  { id: "a10", lead_id: "l16", user_id: null, activity_type: "email", content: "Reponse recue - questions sur tarif degressif et onboarding sur site", metadata: {}, created_at: "2026-02-17T17:00:00Z" },
  { id: "a11", lead_id: "l18", user_id: null, activity_type: "call", content: "Appel entrant - Nathalie Rousseau, Biarritz Homes, 18 biens, utilise Excel", metadata: {}, created_at: "2026-02-18T10:15:00Z" },
  { id: "a12", lead_id: "l10", user_id: null, activity_type: "note", content: "Question formulaire contact sur plan Intensif et planning menage", metadata: {}, created_at: "2026-02-18T09:30:00Z" },
];

// Commercial users for assignment dropdown
export const commercialUsers = [
  { id: "user1", name: "Thomas Vidal", role: "Chasseur" },
  { id: "user2", name: "Romain Leroy", role: "Architecte" },
];
