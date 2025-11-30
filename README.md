# Number Guessing Game – Édition Ultime 2025
Un jeu de devinette de nombre ultra-complet, visuellement époustouflant et riche en fonctionnalités :
mode solo avec chronomètre et records, 
mode 1v1 à deux variantes (même nombre ou nombres différents),
interface néon futuriste, animations fluides, sons immersifs et design 100 % responsive.

Demo link: https://er-mouafek.github.io/NewRepo2/
## Technologies utilisées

- **HTML5** – structure sémantique
- **CSS3** – Flexbox, Grid, animations avancées, gradients, backdrop-filter, variables CSS implicites via gradients
- **Vanilla JavaScript (ES6+)** – aucune dépendance externe
- **Google Fonts** – Poppins
- **Effets sonores** – fichiers .mp3/.wav locaux (clicks, countdown, victoire…)

## Fonctionnalités principales

### Mode Solo
- 6 niveaux de difficulté prédéfinis + mode Custom (1 → 10 000)
- Chronomètre précis au centième de seconde
- Compteur d’essais
- Tableau des records par difficulté (stockage sessionStorage – persiste tant que la page n’est pas rafraîchie)
- Animations de countdown 3-2-1-GO! avec flash blanc et onde de choc
- Feedback visuel instantané (trop haut / trop bas / déjà essayé)
- Modal de victoire avec statistiques et bouton rejouer/menu

### Mode 1v1 Battle
Deux sous-modes :
1. **Same Number** → même nombre secret, tours alternés, premier qui trouve gagne
2. **Different Numbers** → chacun son nombre secret, course contre le chrono + nombre d’essais 

- Saisie des noms des joueurs
- Interface split-screen sur grand écran (responsive en colonne sur mobile)
- Chronomètres individuels qui s’arrêtent à la victoire du joueur
- Détermination automatique du vainqueur (moins d’essais → temps le plus rapide en cas d’égalité)
- Modal de victoire détaillée (stats comparatives ou tie)

### Expérience utilisateur
- Écran “Press Start” rétro-gaming
- Transitions fluides entre tous les menus (slide-in/out)
- Effets néon, glow, blur, shockwave
- Sons immersifs (boutons, countdown, victoire)
- Design entièrement responsive (mobile, tablette, desktop)

## Nouveautés explorées / Compétences acquises

- Gestion avancée d’animations CSS complexes (shockwave, pulse, glow, slide)
- Création d’une architecture modulaire en JavaScript pur (sans framework)
- Gestion du focus clavier dans un jeu multijoueur (split-screen)
- Calcul de records avec comparaison essais + temps
- Utilisation de `backdrop-filter: blur()` pour effet verre dépoli moderne
- Gestion propre des sons (préchargement, pause/reprise, volume)
- Expérience “arcade” complète (countdown synchronisé, flash, shockwave)

## Difficultés rencontrées

| Difficulté                                                                   | Solution apportée                                                                        |
|------------------------------------------------------------------------------|------------------------------------------------------------------------------------------|
| Synchroniser le countdown 3-2-1-GO! avec les sons et l’activation des inputs | Création d’un `setInterval` précis + `setTimeout` pour le GO! + flash/shockwave          |
| Faire fonctionner le split-screen en mode 1v1 tout en gardant le focus       | Deux inputs séparés + gestion manuelle du `.focus()` après chaque tour                   |
| Gérer proprement les records sans base de données                            | Stockage en objet JS + persistance via `sessionStorage` (option future : localStorage)   |
| Problèmes de performances sur mobile avec trop d’animations                  | Optimisation des animations (utilisation de `transform` et `opacity` uniquement)         |
