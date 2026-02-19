# Pipelines CRM CheckEasy

## Vue d'ensemble

Deux pipelines distincts, un par segment. Aucun croisement : un lead entre dans UN pipeline. Migration B2C vers B2B possible sous conditions strictes.

---

## Pipeline B2C — Propriétaires individuels

**Objectif** : conversion self-service, zéro intervention commerciale.

| # | Étape | Durée max | Critères d'entrée | Actions automatiques | Conditions de passage |
|---|-------|-----------|--------------------|----------------------|-----------------------|
| 1 | **Lead** | 48h | Formulaire rempli OU inscription essai OU lead magnet téléchargé | Tag source auto, email bienvenue (template B2C-1), attribution score initial | Email vérifié + connexion à l'app |
| 2 | **Essai gratuit** | 14 jours | Compte créé, essai activé | Onboarding in-app (checklist), email J+1 "Créez votre premier bien", relance J+3 si pas d'activation (template B2C-2), email J+7 "Astuce : lancez votre première inspection", notification push J+10 "Plus que 4 jours d'essai" | Première inspection complétée |
| 3 | **Activation** | 7 jours post-1ère inspection | Première inspection réalisée | Email félicitations (template B2C-3), affichage rapport IA complet (moment "wow"), notification "Votre bien est protégé", proposition upgrade in-app (template B2C-4) | Paiement effectué OU fin de période sans conversion |
| 4 | **Payant** | Ongoing | Abonnement actif (Essentiel 4.99€/mois ou Intensif 19.99€/mois) | Email confirmation paiement, NPS J+30, email mensuel récapitulatif, détection upsell (si >2 biens → suggestion Intensif), email anniversaire 1 an | Churn : annulation → pipeline "Win-back" |

### Règles d'automatisation B2C

- **Relance abandon essai** : si aucun login après J+5 → séquence email J+5, J+8, J+12 avec contenu éducatif + cas d'usage
- **Relance abandon activation** : si inscription mais 0 inspection après J+7 → email avec vidéo tutoriel 2min
- **Win-back churn** : séquence email J+1, J+7, J+30 après annulation. Offre -50% pendant 3 mois à J+30
- **Détection upsell** : si propriétaire ajoute un 3ème bien sur plan Libre/Essentiel → notification + email upgrade

### KPIs Pipeline B2C

| Métrique | Objectif |
|----------|----------|
| Lead → Essai | >60% |
| Essai → Activation (1ère inspection) | >40% |
| Activation → Payant | >25% |
| Conversion globale Lead → Payant | >6% |
| Time-to-activation moyen | <5 jours |
| Churn mensuel | <5% |

---

## Pipeline B2B — Conciergeries professionnelles

**Objectif** : closing accompagné par les commerciaux, relation personnalisée.

| # | Étape | Durée max | Critères d'entrée | Actions automatiques | Conditions de passage |
|---|-------|-----------|--------------------|----------------------|-----------------------|
| 1 | **Lead** | 72h | Formulaire contact, LinkedIn DM, salon, referral, inbound | Tag source auto, notification Slack au Chasseur, enrichissement auto (LinkedIn, site web, nb biens estimé), email accusé réception | Chasseur qualifie le lead (appel ou échange) |
| 2 | **Qualification** | 5 jours ouvrés | Contact établi par le Chasseur | Fiche lead complétée (nb biens, CA estimé, outils actuels, pain points), score mis à jour, assignation priorité (A/B/C) | Lead qualifié B ou A (score ≥50) + démo planifiée |
| 3 | **Démo** | 10 jours ouvrés | Démo planifiée dans le calendrier | Rappel auto J-1 à la conciergerie, email confirmation avec lien visio, préparation deck personnalisé (Architecte), template suivi post-démo (B2B-3) | Démo réalisée + intérêt confirmé (feedback Architecte) |
| 4 | **Proposition** | 15 jours ouvrés | Intérêt confirmé post-démo | Génération proposition commerciale personnalisée, envoi proposition (template B2B-4), relance auto J+3 si pas de réponse, relance auto J+7, alerte Architecte J+10 pour relance téléphonique | Proposition acceptée OU refusée |
| 5 | **Signé** | Ongoing | Contrat signé, paiement configuré | Email bienvenue Pro (template onboarding), planification onboarding J+1 (Architecte), accès plateforme activé, formation équipe terrain planifiée, NPS J+30, review trimestrielle planifiée | Churn : annulation → pipeline "Win-back B2B" |

### Règles d'automatisation B2B

- **Rotation leads** : round-robin entre leads assignés au Chasseur. Si pas de contact en 24h → alerte manager
- **Stale deal alert** : si un deal stagne >2x la durée max de l'étape → notification Slack + email manager
- **Relance post-proposition** : séquence auto J+3, J+7. Si pas de réponse J+10 → l'Architecte appelle
- **Upsell comptes existants** : alerte trimestrielle si utilisation >80% du quota biens → proposition upgrade Pro+
- **Referral auto** : email NPS J+60 avec programme parrainage B2B intégré

### KPIs Pipeline B2B

| Métrique | Objectif |
|----------|----------|
| Lead → Qualification | >70% |
| Qualification → Démo | >50% |
| Démo → Proposition | >60% |
| Proposition → Signé | >30% |
| Conversion globale Lead → Signé | >6% |
| Cycle de vente moyen | <35 jours |
| Deal size moyen (MRR) | >49€ |
| Churn trimestriel | <3% |

---

## Assignation des rôles par étape

| Étape Pipeline | Commercial 1 (Chasseur) | Commercial 2 (Architecte) |
|----------------|------------------------|---------------------------|
| **B2B - Lead** | Responsable (prospection, premier contact) | — |
| **B2B - Qualification** | Responsable (appel qualif, scoring) | Briefé en parallèle si lead A |
| **B2B - Démo** | Support (transmet le contexte) | Responsable (réalise la démo) |
| **B2B - Proposition** | — | Responsable (rédige + négocie) |
| **B2B - Signé** | — | Responsable (onboarding + expansion) |
| **B2C - Toutes étapes** | — | — (100% automatisé) |

### Handoff Chasseur → Architecte

- Se fait à l'étape **Démo**
- Le Chasseur renseigne dans le CRM : résumé du besoin, taille conciergerie, outils actuels, objections identifiées, score, notes personnelles
- L'Architecte reçoit une notification avec la fiche complète
- Briefing oral optionnel si deal > 100 biens (potentiel Pro+)

---

## Migration B2C → B2B

### Conditions de déclenchement

Un propriétaire B2C bascule dans le pipeline B2B si :

1. **Nombre de biens ≥ 5** dans son compte CheckEasy
2. **OU** il renseigne un nom d'entreprise/conciergerie dans son profil
3. **OU** son score B2C atteint 90+ (usage intensif, multi-biens)

### Processus de migration

1. Alerte automatique au Chasseur : "Lead B2C potentiellement B2B détecté"
2. Le Chasseur vérifie manuellement (appel rapide ou email)
3. Si confirmé B2B : changement de pipeline, étape = **Qualification**, historique B2C conservé
4. Si reste B2C : tag "vérifié_b2c" pour ne pas re-alerter

### Seuil conciergerie (≥50 biens)

Un compte B2B gérant 50+ biens est automatiquement flaggé **"Potentiel Pro+"** :
- Notification à l'Architecte
- Proposition commerciale sur devis
- Priorité haute dans le pipeline

---

## Statuts transversaux

Applicable à tous les pipelines :

| Statut | Description | Action |
|--------|-------------|--------|
| **active** | Lead en progression normale | — |
| **stale** | Aucune activité depuis 2x durée max étape | Alerte + relance auto |
| **lost** | Refus explicite ou injoignable après 3 tentatives | Tag raison (prix/timing/concurrent/pas_le_besoin), archivage |
| **won** | Conversion réussie | Passage à Payant (B2C) ou Signé (B2B) |
| **nurture** | Pas prêt maintenant, à recontacter plus tard | Séquence nurturing long terme (1 email/mois) |
