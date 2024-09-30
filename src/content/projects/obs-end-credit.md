---
title: "Crédits de Fin de Stream pour Twitch : Projet Madyann"
date: "2024-09-28"
resume: "Dans l'univers du streaming, il est essentiel de reconnaître les contributions de sa communauté. Pour cela, nous avons conçu une scène de fin personnalisée pour le stream Twitch de Madyann qui permet d'afficher les crédits des abonnés (subs) et des followers récents. Voir [le repos](https://github.com/Dawgyy/obs-end-credit) Voir [la preview](https://madyann.dawgy.org)"
---
[Repository](https://github.com/Dawgyy/obs-end-credit)
Le but principal de ce projet est de créer une scène de fin interactive et élégante, affichant les noms des abonnés et des followers. Cette scène se veut être un moyen de remercier les viewers pour leur soutien en leur donnant un peu de visibilité en direct à la fin de chaque stream.

## Fonctionnalités

- **Affichage dynamique des crédits** : Les noms des abonnés (subs) et des followers défilent sur l'écran avec un style élégant et fluide.
- **Intégration OBS** : La scène est conçue pour être intégrée directement dans OBS Studio, simplifiant ainsi l'ajout de cette scène à la fin des streams.
- **Utilisation de TailwindCSS** : Pour un style moderne et responsive, TailwindCSS a été utilisé, permettant une personnalisation facile du design et des effets.
- **Backend Node.js** : Le backend permet de récupérer les informations de Twitch, notamment les abonnés et les followers récents, via l'API de Twitch.

## Technologies Utilisées

- **Node.js** : Utilisé pour le serveur backend qui interagit avec l'API Twitch.
- **TailwindCSS** : Pour styliser l'interface de manière rapide et efficace.
- **JavaScript** : Pour la gestion des animations de défilement et l'interaction avec le backend.
- **HTML/CSS** : Pour structurer la page affichée dans OBS.
