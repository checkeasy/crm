# Lead Scoring CRM CheckEasy

## Vue d'ensemble

Deux grilles de scoring distinctes : B2C (propriétaires) et B2B (conciergeries). Score de 0 à 100. Calcul automatique à chaque événement pertinent. Le score détermine la priorité d'action et les automatisations déclenchées.

---

## Seuils communs

| Catégorie | Score | Signification | Actions |
|-----------|-------|---------------|---------|
| **Froid** | 0–30 | Peu engagé, pas prioritaire | Nurturing automatique uniquement |
| **Tiède** | 31–60 | Intéressé, à travailler | B2C : séquence email ciblée / B2B : le Chasseur planifie un contact |
| **Chaud** | 61–100 | Prêt à convertir | B2C : offre spéciale + push notification / B2B : l'Architecte prend en charge immédiatement |

---

## Scoring B2C — Propriétaires (0–100)

### Critère 1 : Source d'acquisition (0–25 points)

| Source | Points | Justification |
|--------|--------|---------------|
| Referral (parrainage) | +25 | Intent maximal, confiance du parrain |
| Landing page essai gratuit | +20 | Démarche volontaire d'inscription |
| Formulaire contact avec mention "tarif/prix" | +20 | Intent commercial fort |
| Landing page propriétaire (sans inscription) | +15 | Intérêt mais pas encore engagé |
| LinkedIn post (clic) | +15 | Engagement contenu |
| Formulaire contact générique | +10 | Demande d'info |
| Lead magnet (téléchargement PDF) | +10 | Intérêt mais froid |

### Critère 2 : Nombre de logements (0–30 points)

| Nombre de biens | Points | Justification |
|-----------------|--------|---------------|
| 1 bien | +5 | Petit propriétaire, plan Libre suffit souvent |
| 2 biens | +15 | Cible Essentiel/Intensif |
| 3–4 biens | +25 | Multi-propriétaire, forte valeur |
| 5+ biens | +30 | Potentiel migration B2B |

### Critère 3 : Engagement produit (0–25 points)

| Action | Points | Conditions |
|--------|--------|------------|
| Compte créé (inscription) | +5 | À l'inscription |
| Premier bien ajouté | +5 | Configuration initiale |
| Première inspection lancée | +10 | Activation réelle |
| 3+ inspections réalisées | +15 | Usage régulier |
| Consultation page pricing | +5 | Intent achat |
| Clic sur CTA upgrade | +10 | Intent achat fort |
| Utilisation quotidienne (7j consécutifs) | +20 | Power user |
| Invitation d'un autre utilisateur | +25 | Ambassadeur |

**Plafond engagement** : 25 points max (les points ne se cumulent pas au-delà).

### Critère 4 : Ancienneté inscription (0–20 points)

| Ancienneté | Points | Justification |
|------------|--------|---------------|
| 0–3 jours | +20 | Fraîcheur maximale, fenêtre de conversion |
| 4–7 jours | +15 | Encore engagé |
| 8–14 jours (fin essai) | +10 | Dernière chance |
| 15–30 jours | +5 | Refroidi mais récupérable |
| >30 jours sans activité | 0 | Froid, nurturing long |

### Malus B2C

| Événement | Points | Conditions |
|-----------|--------|------------|
| Aucun login depuis 7 jours | -10 | Pendant l'essai |
| Email non ouvert (3 emails consécutifs) | -5 | Désengagement |
| Désabonnement email | -15 | Perte de canal |
| Essai expiré sans conversion | -20 | Reset partiel du score |

### Exemple de calcul B2C

```
Sophie, 34 ans, 2 biens, inscrite via landing page essai il y a 2 jours, a créé son premier bien et fait 1 inspection.

Source : landing page essai = +20
Nb biens : 2 = +15
Engagement : compte créé (+5) + bien ajouté (+5) + inspection (+10) = +20 (plafonné à 25 → 20)
Ancienneté : 2 jours = +20

Score total = 20 + 15 + 20 + 20 = 75 → CHAUD
Action : offre upgrade immédiate + notification in-app
```

---

## Scoring B2B — Conciergeries (0–100)

### Critère 1 : Taille de la conciergerie (0–40 points)

| Nombre de biens gérés | Points | Justification |
|------------------------|--------|---------------|
| 3–10 biens | +10 | Petite conciergerie, plan Pro |
| 11–25 biens | +20 | Conciergerie en croissance |
| 26–50 biens | +30 | Conciergerie établie, deal intéressant |
| 51–100 biens | +35 | Gros compte, potentiel Pro+ |
| 100+ biens | +40 | Enterprise, deal prioritaire sur devis |

### Critère 2 : Source d'acquisition (0–20 points)

| Source | Points | Justification |
|--------|--------|---------------|
| Referral B2B (recommandation d'un client existant) | +20 | Confiance pré-établie |
| Appel entrant | +18 | Urgence + intent |
| Demande de démo site web | +18 | Intent commercial fort |
| Salon/event (contact terrain) | +15 | Relation humaine établie |
| LinkedIn DM (réponse positive) | +15 | Engagement direct |
| Partenariat (lead co-marketing) | +12 | Qualifié partiellement |
| LinkedIn post (engagement) | +8 | Intérêt passif |
| Formulaire contact | +5 | Demande générique |

### Critère 3 : Engagement (0–25 points)

| Action | Points | Conditions |
|--------|--------|------------|
| Réponse au premier email/message | +5 | Engagement initial |
| Appel qualif réalisé avec le Chasseur | +10 | Qualification active |
| Démo planifiée | +15 | Pipeline avancé |
| Démo réalisée | +20 | Fort intérêt confirmé |
| Demande de proposition commerciale | +25 | Intent de closing |

**Plafond engagement** : 25 points max.

### Critère 4 : Profil / Secteur / Géo (0–15 points)

| Critère | Points | Conditions |
|---------|--------|------------|
| Zone géographique active (côte, montagne, grandes villes) | +5 | Forte demande LCD |
| Utilise un PMS/channel manager (Lodgify, Guesty, etc.) | +5 | Structuré, prêt à intégrer |
| Membre d'un réseau pro (ULHG, Conciergeries de France) | +5 | Réseau, potentiel referral |
| Conciergerie premium/luxe | +5 | Panier moyen supérieur |
| Mono-bien ou très petit (<3) | -5 | Pas vraiment B2B |

**Plafond profil** : 15 points max.

### Malus B2B

| Événement | Points | Conditions |
|-----------|--------|------------|
| No-show démo | -15 | Non présenté sans prévenir |
| Pas de réponse après 3 relances | -10 | Ghosting |
| "Pas maintenant" explicite | -10 | Report (nurture long) |
| Concurrent déjà en place | -5 | Barrier plus haute |
| Budget non validé | -5 | Frein décisionnel |

### Exemple de calcul B2B

```
Thomas, conciergerie de 45 biens à Nice, contacté via salon Rent, a eu un appel qualif positif, démo planifiée, utilise Lodgify.

Taille : 45 biens = +30
Source : salon = +15
Engagement : appel qualif (+10) + démo planifiée (+15) = +25 (plafonné à 25)
Profil : zone active Nice (+5) + utilise PMS (+5) = +10

Score total = 30 + 15 + 25 + 10 = 80 → CHAUD
Action : Architecte prioritaire, préparer proposition personnalisée
```

---

## Recalcul et automatisations

### Fréquence de recalcul

- **Temps réel** : à chaque événement (inscription, inspection, clic, appel, démo...)
- **Batch quotidien** : recalcul de l'ancienneté et des malus d'inactivité à 06h00
- **Historique** : chaque score est loggé dans `crm_lead_scores` avec timestamp

### Actions déclenchées par le score

| Seuil franchi | Action B2C | Action B2B |
|---------------|------------|------------|
| Score passe à 31+ (→ Tiède) | Email séquence ciblée | Notification Chasseur : "Lead à contacter" |
| Score passe à 61+ (→ Chaud) | Push notification + offre spéciale | Notification Architecte : "Lead chaud, planifier action" |
| Score descend sous 30 (→ Froid) | Passage en nurturing long terme | Tag "nurture", relance dans 30 jours |
| Score atteint 90+ (B2C) | Alerte migration B2C→B2B potentielle | — |
| Score atteint 90+ (B2B) | — | Deal prioritaire, alerte manager |

### Dashboard scoring

- **Vue liste** : tous les leads triés par score décroissant
- **Vue heatmap** : répartition froid/tiède/chaud par source
- **Graphique évolution** : score moyen des leads par semaine
- **Alertes** : leads chauds non contactés depuis 24h+
