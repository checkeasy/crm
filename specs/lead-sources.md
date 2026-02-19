# Sources de Leads CRM CheckEasy

## Vue d'ensemble

Chaque lead entrant est automatiquement tagué par sa source. La source détermine le pipeline par défaut, la priorité et les champs capturés.

---

## Sources et configuration

### 1. Landing Page Site Web

| Paramètre | Valeur |
|-----------|--------|
| **Tag automatique** | `source:website` |
| **Pipeline par défaut** | B2C (formulaire propriétaire) ou B2B (formulaire conciergerie) — selon la page |
| **Priorité** | Haute (intent fort) |
| **Champs capturés** | email, prénom, nom, téléphone (optionnel), nb_biens, type (propriétaire/conciergerie), UTM source/medium/campaign |

**Pages distinctes :**
- `/proprietaires` → pipeline B2C, tag `source:website_b2c`
- `/conciergeries` → pipeline B2B, tag `source:website_b2b`
- `/essai-gratuit` → pipeline B2C, tag `source:website_trial`
- `/demo` → pipeline B2B, tag `source:website_demo`

---

### 2. LinkedIn (DMs + Posts)

| Paramètre | Valeur |
|-----------|--------|
| **Tag automatique** | `source:linkedin_dm` ou `source:linkedin_post` |
| **Pipeline par défaut** | B2B |
| **Priorité** | Haute (contact direct) |
| **Champs capturés** | prénom, nom, entreprise, poste, URL profil LinkedIn, nb_biens (estimé), notes du Chasseur |

**Règles :**
- Tout DM LinkedIn du Chasseur avec une conciergerie → saisie manuelle dans CRM dans les 2h
- Engagement sur post LinkedIn (commentaire pertinent) → le Chasseur crée le lead avec tag `source:linkedin_post`
- Enrichissement auto via profil LinkedIn : entreprise, poste, localisation

---

### 3. Bouche à oreille / Referral

| Paramètre | Valeur |
|-----------|--------|
| **Tag automatique** | `source:referral` + `referrer:{id_parrain}` |
| **Pipeline par défaut** | Selon le type du lead (B2C si propriétaire, B2B si conciergerie) |
| **Priorité** | Très haute (taux de conversion 3x supérieur) |
| **Champs capturés** | email, prénom, nom, téléphone, nb_biens, type, referrer_id, referrer_name |

**Règles :**
- Lien de parrainage unique par client existant : `checkeasy.com/r/{code}`
- Le parrain est notifié quand son filleul s'inscrit
- Crédit automatique : 1 mois offert au parrain si le filleul convertit en payant
- Tag `referral_quality:high` si le parrain est un compte Pro/Pro+

---

### 4. Partenariats (conciergeries, agences immo, channel managers)

| Paramètre | Valeur |
|-----------|--------|
| **Tag automatique** | `source:partner_{nom_partenaire}` |
| **Pipeline par défaut** | B2B |
| **Priorité** | Haute |
| **Champs capturés** | email, prénom, nom, entreprise, téléphone, nb_biens, partner_id, partner_name, type_partenariat |

**Types de partenariats :**
- **Co-marketing** (Lodgify, Guesty, PriceLabs, Turno) : leads partagés via landing co-brandée
- **Agences immobilières** : leads propriétaires qui mettent en location courte durée
- **Assureurs LCD** : leads propriétaires cherchant à réduire leur prime
- Chaque partenaire a un `partner_id` et un dashboard de suivi de ses leads

---

### 5. Appels entrants

| Paramètre | Valeur |
|-----------|--------|
| **Tag automatique** | `source:phone_inbound` |
| **Pipeline par défaut** | B2B (les propriétaires appellent rarement) |
| **Priorité** | Très haute (urgence implicite) |
| **Champs capturés** | téléphone, prénom, nom, entreprise (si B2B), nb_biens, besoin exprimé, notes de l'appel |

**Règles :**
- Le commercial qui décroche crée le lead dans le CRM immédiatement
- Enregistrement du résumé d'appel obligatoire (champ `notes`)
- Si appel manqué → rappel dans les 2h max, tag `missed_call`

---

### 6. Formulaire contact site web

| Paramètre | Valeur |
|-----------|--------|
| **Tag automatique** | `source:contact_form` |
| **Pipeline par défaut** | Détection auto selon contenu (mot-clé "conciergerie"/"agence"/"gestion" → B2B, sinon B2C) |
| **Priorité** | Moyenne |
| **Champs capturés** | email, prénom, nom, téléphone (optionnel), message, type_demande (support/commercial/partenariat/autre) |

**Règles :**
- Réponse automatique dans les 5 min (email accusé réception)
- Tri automatique par type_demande : support → Zendesk, commercial → CRM, partenariat → notification Chasseur
- Si message contient "prix"/"tarif"/"devis" → priorité augmentée, notification immédiate

---

### 7. Salons / Events

| Paramètre | Valeur |
|-----------|--------|
| **Tag automatique** | `source:event_{nom_event}` |
| **Pipeline par défaut** | B2B |
| **Priorité** | Haute |
| **Champs capturés** | prénom, nom, entreprise, poste, téléphone, email, nb_biens, notes terrain, photo carte de visite (optionnel) |

**Events ciblés :**
- Rent (Paris) — salon location courte durée
- EquipHotel (Paris) — hôtellerie et hospitality
- Salons régionaux tourisme et immobilier
- Meetups ULHG / Conciergeries de France

**Règles :**
- Saisie des leads le jour même via formulaire mobile CRM
- Le Chasseur tague chaque lead avec le nom de l'event
- Relance email dans les 48h post-event (template B2B-1 personnalisé avec référence à l'event)
- Objectif : 15-25 leads qualifiés par salon

---

## Récapitulatif par source

| Source | Tag | Pipeline défaut | Priorité | Volume estimé/mois | Taux conversion estimé |
|--------|-----|-----------------|----------|---------------------|----------------------|
| Landing page B2C | `source:website_b2c` | B2C | Haute | 200-500 | 8-12% |
| Landing page B2B | `source:website_b2b` | B2B | Haute | 20-50 | 15-25% |
| LinkedIn DM | `source:linkedin_dm` | B2B | Haute | 30-60 | 20-30% |
| LinkedIn Post | `source:linkedin_post` | B2B | Moyenne | 10-20 | 10-15% |
| Referral | `source:referral` | B2C/B2B | Très haute | 15-40 | 25-40% |
| Partenariats | `source:partner_*` | B2B | Haute | 10-30 | 20-35% |
| Appels entrants | `source:phone_inbound` | B2B | Très haute | 5-15 | 30-50% |
| Formulaire contact | `source:contact_form` | Auto-detect | Moyenne | 30-80 | 5-10% |
| Salons/Events | `source:event_*` | B2B | Haute | 15-25 (par event) | 15-25% |

---

## Métriques par canal — Dashboard

Pour chaque source, le CRM affiche en temps réel :

| Métrique | Description | Formule |
|----------|-------------|---------|
| **Nb leads** | Total leads générés par cette source | COUNT(leads WHERE source = X) |
| **Taux de conversion** | % de leads devenus payants | COUNT(won) / COUNT(total) x 100 |
| **Coût d'acquisition (CAC)** | Coût par lead converti | Dépenses canal / COUNT(won) |
| **Revenue généré** | MRR total des clients issus de cette source | SUM(mrr WHERE source = X) |
| **Temps moyen de closing** | Jours entre création lead et conversion | AVG(won_date - created_date) |
| **LTV estimée** | Valeur vie client par source | MRR moyen x durée rétention moyenne |
| **ROI canal** | Retour sur investissement | (Revenue - Coût) / Coût x 100 |

### Filtres disponibles

- Par période : 7j / 30j / 90j / 12 mois / custom
- Par pipeline : B2C / B2B / Tous
- Par commercial assigné
- Par étape pipeline (pour voir où les leads d'une source bloquent)

---

## Règles de déduplication

- Si un lead existe déjà (même email) : pas de création en doublon, mise à jour du lead existant avec la nouvelle source en tag additionnel `source_secondary:{source}`
- Si un lead B2C revient via une source B2B : alerte migration potentielle (voir specs pipelines)
- Merge automatique si même email + même téléphone sur 2 leads différents → notification pour validation manuelle
