# Templates Inbox CRM CheckEasy

## Vue d'ensemble

10 templates prédéfinis (5 B2C + 5 B2B). Chaque template utilise des variables dynamiques injectées automatiquement depuis la fiche lead.

### Variables disponibles

| Variable | Description | Exemple |
|----------|-------------|---------|
| `{{prenom}}` | Prénom du lead | Marie |
| `{{nom}}` | Nom du lead | Dupont |
| `{{entreprise}}` | Nom de la conciergerie (B2B) | Conciergerie Azur |
| `{{nb_biens}}` | Nombre de biens gérés | 45 |
| `{{plan}}` | Plan actuel ou proposé | Pro |
| `{{date_demo}}` | Date/heure de la démo planifiée | jeudi 20 février à 14h30 |
| `{{commercial_prenom}}` | Prénom du commercial assigné | Thomas |
| `{{commercial_email}}` | Email du commercial | thomas@checkeasy.com |
| `{{lien_essai}}` | Lien d'inscription essai gratuit | checkeasy.com/essai |
| `{{lien_demo}}` | Lien de réservation démo | checkeasy.com/demo |
| `{{lien_calendly}}` | Lien Calendly du commercial | calendly.com/checkeasy-demo |

---

## Templates B2C — Propriétaires

### B2C-1 : Bienvenue après inscription essai

**Catégorie** : onboarding
**Déclencheur** : automatique à la création du compte essai
**Canal** : email
**Objet** : Bienvenue {{prenom}} ! Votre essai CheckEasy est actif

```
Bonjour {{prenom}},

Bienvenue sur CheckEasy ! Votre essai gratuit de 14 jours est maintenant actif.

Voici comment démarrer en 3 minutes :

1. Ajoutez votre premier bien (adresse + photos de référence)
2. Lancez votre première inspection guidée
3. Recevez votre rapport IA automatique

C'est aussi simple que ça. La plupart de nos utilisateurs reçoivent leur premier rapport en moins de 5 minutes.

👉 Commencer maintenant : {{lien_essai}}

Une question ? Répondez simplement à cet email, on vous répond en moins de 2h.

À très vite,
L'équipe CheckEasy
```

---

### B2C-2 : Relance J+3 si pas d'activation

**Catégorie** : relance
**Déclencheur** : automatique si 0 inspection après 3 jours
**Canal** : email
**Objet** : {{prenom}}, votre bien n'est pas encore protégé

```
Bonjour {{prenom}},

Vous avez créé votre compte CheckEasy il y a 3 jours, mais vous n'avez pas encore lancé votre première inspection.

On comprend — la mise en route peut sembler complexe. Sauf que non : ça prend littéralement 5 minutes.

Voici une vidéo de 2 minutes qui vous montre exactement comment faire :
👉 [Voir la vidéo tutoriel]

Saviez-vous que 73% des litiges Airbnb auraient pu être évités avec un état des lieux photo horodaté ?

Ne laissez pas votre bien sans protection. Votre essai se termine dans 11 jours.

👉 Lancer ma première inspection : {{lien_essai}}

L'équipe CheckEasy
```

---

### B2C-3 : Félicitations première inspection

**Catégorie** : engagement
**Déclencheur** : automatique après la première inspection complétée
**Canal** : email
**Objet** : Bravo {{prenom}} ! Votre premier rapport IA est prêt

```
Bonjour {{prenom}},

Votre premier rapport d'inspection est prêt ! Vous venez de franchir une étape importante : votre bien est maintenant documenté avec des preuves photos horodatées et géolocalisées.

Ce que votre rapport contient :
- Photos horodatées de chaque pièce
- Analyse IA de l'état du logement
- Détection automatique d'anomalies
- Rapport PDF partageable (valeur juridique)

Imaginez : ce rapport existe maintenant pour CHAQUE rotation de voyageur, automatiquement.

Vous êtes sur le plan Libre (2 biens max). Pour profiter de toutes les fonctionnalités :

- Plan Essentiel : 4.99€/mois — rapports illimités + historique complet
- Plan Intensif : 19.99€/mois — tout inclus + planning ménage + livret IA

👉 Choisir mon plan : {{lien_essai}}

L'équipe CheckEasy
```

---

### B2C-4 : Proposition upgrade

**Catégorie** : upsell
**Déclencheur** : automatique si utilisation régulière (≥3 inspections) et plan Libre/Essentiel
**Canal** : email
**Objet** : {{prenom}}, passez au niveau supérieur

```
Bonjour {{prenom}},

Vous utilisez CheckEasy régulièrement — et c'est exactement pour ça qu'on l'a créé.

En ce moment vous êtes sur le plan {{plan}}. Voici ce que vous débloquez en passant au niveau supérieur :

Plan Essentiel (4.99€/mois) :
✓ Rapports illimités
✓ Historique complet 12 mois
✓ Export PDF haute qualité
✓ Notifications temps réel

Plan Intensif (19.99€/mois) :
✓ Tout le plan Essentiel
✓ Planning agents de ménage
✓ Livret d'accueil IA
✓ Sync calendrier Airbnb/Booking/Abritel
✓ Support prioritaire

Pour le prix d'un café par jour, votre bien est protégé 24/7 avec des preuves à valeur juridique.

👉 Upgrader mon plan : {{lien_essai}}

L'équipe CheckEasy
```

---

### B2C-5 : Support / aide

**Catégorie** : support
**Déclencheur** : manuel ou automatique si 0 activité pendant 7 jours sur un compte actif
**Canal** : email
**Objet** : {{prenom}}, on peut vous aider ?

```
Bonjour {{prenom}},

On a remarqué que vous n'avez pas utilisé CheckEasy récemment. Tout va bien ?

Si vous rencontrez une difficulté, on est là pour vous aider :

- 💬 Répondez à cet email — réponse en moins de 2h
- 📖 Consultez notre centre d'aide : checkeasy.com/aide
- 📞 Appelez-nous : [numéro support]

Questions fréquentes :
- "Comment ajouter un deuxième bien ?" → [lien guide]
- "Comment partager un rapport à mon voyageur ?" → [lien guide]
- "Comment connecter mon calendrier Airbnb ?" → [lien guide]

Votre avis compte. Si quelque chose ne vous convient pas dans CheckEasy, dites-le nous — on améliore le produit chaque semaine grâce aux retours utilisateurs.

L'équipe CheckEasy
```

---

## Templates B2B — Conciergeries

### B2B-1 : Premier contact conciergerie

**Catégorie** : prospection
**Déclencheur** : manuel par le Chasseur
**Canal** : email ou LinkedIn DM
**Objet** : {{entreprise}} — une question sur votre contrôle qualité

```
Bonjour {{prenom}},

Je me permets de vous contacter car je travaille avec plusieurs conciergeries en France sur un sujet qui revient constamment : la gestion du contrôle qualité ménage et des états des lieux.

Chez {{entreprise}}, avec {{nb_biens}} biens à gérer, vous avez probablement déjà rencontré ce type de situations :
- Un propriétaire qui signale une dégradation que votre équipe n'a pas documentée
- Un litige voyageur sans preuves photos horodatées
- Des agents terrain dont vous ne pouvez pas vérifier la qualité du travail à distance

CheckEasy automatise tout ça avec l'IA : inspection guidée, photos horodatées et géolocalisées, analyse qualité automatique, rapports envoyés directement à vos propriétaires.

+2 000 biens équipés dans 3 pays. Des conciergeries comme la vôtre gagnent en moyenne 2h/jour sur le contrôle qualité.

Est-ce que vous auriez 20 minutes cette semaine pour que je vous montre concrètement comment ça fonctionne ?

👉 Réserver un créneau : {{lien_calendly}}

Cordialement,
{{commercial_prenom}}
{{commercial_email}}
CheckEasy
```

---

### B2B-2 : Invitation démo personnalisée

**Catégorie** : démo
**Déclencheur** : manuel par le Chasseur après qualification
**Canal** : email
**Objet** : Démo CheckEasy pour {{entreprise}} — {{date_demo}}

```
Bonjour {{prenom}},

Suite à notre échange, je vous confirme votre démo personnalisée CheckEasy :

📅 Date : {{date_demo}}
⏱ Durée : 25 minutes
📍 Visioconférence : [lien visio]

Ce qu'on va vous montrer :
1. Une inspection en live sur un de VOS biens (si vous le souhaitez)
2. Le rapport IA généré en temps réel
3. Le dashboard de suivi de votre parc de {{nb_biens}} biens
4. Le calcul de ROI personnalisé pour {{entreprise}}

Pour préparer au mieux la démo, pourriez-vous nous partager :
- L'adresse d'un de vos biens (pour une démo en conditions réelles)
- Vos outils actuels de gestion (PMS, channel manager)

À {{date_demo}} !

{{commercial_prenom}}
CheckEasy
```

---

### B2B-3 : Suivi post-démo

**Catégorie** : suivi
**Déclencheur** : automatique 24h après la démo
**Canal** : email
**Objet** : Récap démo CheckEasy — {{entreprise}}

```
Bonjour {{prenom}},

Merci pour votre temps lors de la démo d'hier. Voici un récapitulatif de ce que nous avons couvert :

✅ Ce que CheckEasy apporte à {{entreprise}} :
- Inspection IA en 5 min par bien (vs 20-30 min manuellement)
- Rapports automatiques avec preuves horodatées à valeur juridique
- Dashboard de suivi qualité pour vos {{nb_biens}} biens
- Notifications temps réel aux propriétaires

💰 ROI estimé pour {{entreprise}} :
- Gain de temps : ~{{nb_biens}} x 20 min/semaine = {{nb_biens}} heures économisées/mois
- Réduction litiges : -70% de contestations non documentées
- Rétention propriétaires : différenciation qualité vs concurrence

📎 En pièce jointe : le rapport d'exemple généré pendant la démo.

Prochaine étape : je vous envoie une proposition commerciale adaptée à votre parc de {{nb_biens}} biens. Vous devriez la recevoir sous 48h.

Des questions entre-temps ? Je suis disponible.

{{commercial_prenom}}
{{commercial_email}}
CheckEasy
```

---

### B2B-4 : Envoi proposition commerciale

**Catégorie** : closing
**Déclencheur** : manuel par l'Architecte
**Canal** : email
**Objet** : Proposition commerciale CheckEasy x {{entreprise}}

```
Bonjour {{prenom}},

Comme convenu, voici la proposition commerciale pour {{entreprise}}.

📋 Résumé de l'offre :

Plan recommandé : {{plan}}
Nombre de biens couverts : {{nb_biens}}
Tarif mensuel : [tarif calculé]
Engagement : mensuel, sans engagement minimum
Inclus : onboarding personnalisé + formation équipe terrain

🎁 Offre de lancement :
- 1 mois offert sur votre première souscription
- Onboarding dédié avec configuration de vos {{nb_biens}} biens
- Formation de vos agents terrain (visio 1h)

📎 Proposition détaillée en pièce jointe (PDF).

Pour activer votre compte, il vous suffit de :
1. Valider la proposition (répondre "OK" à cet email)
2. On configure tout en 24h
3. Votre équipe peut commencer dès le lendemain

La proposition est valable 15 jours.

Avez-vous des questions ou souhaitez-vous ajuster certains points ?

{{commercial_prenom}}
{{commercial_email}}
CheckEasy
```

---

### B2B-5 : Relance signature

**Catégorie** : relance closing
**Déclencheur** : automatique J+7 si proposition non signée
**Canal** : email
**Objet** : {{prenom}}, votre proposition CheckEasy expire bientôt

```
Bonjour {{prenom}},

Je reviens vers vous concernant la proposition commerciale envoyée la semaine dernière pour {{entreprise}}.

Je comprends que ce type de décision nécessite réflexion. Voici ce que nos clients conciergeries nous disent le plus souvent après 1 mois d'utilisation :

"On ne comprend pas comment on faisait avant." — Conciergerie Riviera, 65 biens
"Nos propriétaires reçoivent les rapports automatiquement. Ça a changé la relation." — GuestPro, 40 biens

Si vous avez des questions ou des points à clarifier, je suis disponible :
- 📞 Par téléphone : [numéro direct]
- 📅 Par visio : {{lien_calendly}}
- 💬 Par email : {{commercial_email}}

La proposition avec le mois offert est valable encore 8 jours.

{{commercial_prenom}}
CheckEasy
```

---

## Règles d'utilisation des templates

### Envoi

- Les templates B2C sont envoyés **automatiquement** selon les déclencheurs définis
- Les templates B2B sont envoyés **manuellement** par le commercial (sauf B2B-3 et B2B-5 qui sont automatiques)
- Chaque envoi est loggé dans `crm_inbox_messages` avec le `template_id`

### Personnalisation

- Le commercial peut modifier le contenu avant envoi (le template est un point de départ)
- Les variables sont injectées automatiquement depuis la fiche lead
- Si une variable est manquante, elle est remplacée par une valeur par défaut ou le champ est masqué

### Tracking

- Ouverture email : trackée via pixel
- Clic sur lien : tracké via UTM
- Réponse : capturée dans l'inbox CRM
- Chaque interaction met à jour le score du lead

### A/B Testing

- Chaque template peut avoir des variantes (A/B)
- Le CRM répartit 50/50 et mesure le taux d'ouverture + taux de clic
- Après 100 envois, la variante gagnante devient le défaut
