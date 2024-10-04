---
title: "Un script bash pour l'état de ma batterie"
date: '2024-10-05'
resume: "Découvrez comment configurer un script bash simple pour surveiller le niveau de batterie sous Arch Linux, avec des notifications personnalisées et des logs détaillés. Pourquoi utiliser des outils complexes quand vous pouvez tout configurer vous-même, de manière légère et efficace ? Restons fidèles à l'esprit Arch : contrôle total et simplicité."
---

## Introduction

En tant qu'utilisateur d'Arch Linux, je préfère configurer les choses moi-même plutôt que d'utiliser des paquets préfaits. C'est exactement l'esprit d'Arch : donner la liberté de tout personnaliser, exactement comme vous le souhaitez. Dans cet article, je vais vous présenter un script bash que j'ai créé pour surveiller le niveau de batterie de mon ordinateur.

Ce script est un exemple parfait de configuration manuelle et précise, qui répond exactement à mes besoins sans avoir recours à des outils externes lourds et souvent trop complexes.

## Pourquoi ce Script ?

L'idée de ce script est simple : recevoir des notifications en fonction du niveau de la batterie et de son état (en charge, décharge, pleine). Pourquoi ? Parce que je veux rester informé et garder un contrôle total de la consommation d'énergie sans dépendre des interfaces graphiques ou des paquets trop standards. De plus, cela me permet de personnaliser les seuils de notification comme je le souhaite.

## Fonctionnalités

- Notifications basées sur l'état de la batterie (en charge, décharge, pleine).
- Notifications à intervalles réguliers lorsque la batterie descend en dessous d'un seuil.
- Enregistrement de logs pour chaque événement lié à la batterie, utile pour une future analyse.

(Image du rendu)[https://cdn.discordapp.com/attachments/1237149289998712893/1291902358200127508/image.png?ex=6701c954&is=670077d4&hm=a0f7ac298cd792fc4aa59033a366a23b1a976c17b14e9d76d6a988be22753db9&]

## Le Script

Voici le script complet :

```bash
#!/bin/bash

CONFIG_FILE="$HOME/.battery_monitor_config"
LOG_FILE="$HOME/.battery_monitor.log"

LOW_BATTERY_THRESHOLD=30
CRITICAL_BATTERY_THRESHOLD=10
CHECK_INTERVAL=10
NOTIFY_INTERVAL_STEP=5

load_config() {
    if [[ -f "$CONFIG_FILE" ]]; then
        source "$CONFIG_FILE"
    fi
}

log_event() {
    local message="$1"
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $message" >> "$LOG_FILE"
}

previous_battery_level=-1
previous_charging_status=""

check_battery() {
    battery_info=$(acpi -b)
    battery_level=$(echo "$battery_info" | grep -P -o '[0-9]+(?=%)')
    charging_status=$(echo "$battery_info" | grep -oP '(Charging|Discharging|Full)')

    if [[ -z "$battery_level" || -z "$charging_status" ]]; then
        log_event "Erreur : Impossible de récupérer les informations de la batterie."
        return
    fi

    if [[ "$charging_status" != "$previous_charging_status" ]]; then
        if [[ "$charging_status" == "Charging" ]]; then
            dunstify -u low "L'ordinateur est en charge" "Niveau de la batterie : $battery_level%"
            log_event "Notification : En charge (Batterie : $battery_level%)"
        elif [[ "$charging_status" == "Discharging" ]]; then
            dunstify -u low "L'ordinateur n'est plus en charge" "Niveau de la batterie : $battery_level%"
            log_event "Notification : Décharge (Batterie : $battery_level%)"
        elif [[ "$charging_status" == "Full" ]]; then
            dunstify -u low "Batterie pleine" "Niveau de la batterie : $battery_level%"
            log_event "Notification : Batterie pleine (Batterie : $battery_level%)"
        fi
        previous_charging_status="$charging_status"
    fi

    if [[ "$charging_status" == "Discharging" && "$battery_level" -le "$LOW_BATTERY_THRESHOLD" ]]; then
        if (( previous_battery_level == -1 || battery_level <= previous_battery_level - NOTIFY_INTERVAL_STEP )); then
            urgency="normal"
            if [[ "$battery_level" -le "$CRITICAL_BATTERY_THRESHOLD" ]]; then
                urgency="critical"
            fi
            dunstify -u $urgency "Batterie faible" "Niveau de la batterie : $battery_level%"
            log_event "Avertissement : Batterie faible (Batterie : $battery_level%)"
            previous_battery_level="$battery_level"
        fi
    fi
}

load_config

while true; do
    check_battery
    sleep $CHECK_INTERVAL
done
```

## Explication du Code

### Variables Globales

- **CONFIG_FILE** et **LOG_FILE** : Ces fichiers contiennent la configuration de l'utilisateur et les logs d'événements. Ils sont situés dans le répertoire personnel (`$HOME`).

  ```bash
  CONFIG_FILE="$HOME/.battery_monitor_config"
  LOG_FILE="$HOME/.battery_monitor.log"
  ```

- **LOW_BATTERY_THRESHOLD** et **CRITICAL_BATTERY_THRESHOLD** : Les seuils de batterie qui déterminent quand une notification est envoyée (30% pour faible, 10% pour critique).

- **CHECK_INTERVAL** : Intervalle entre chaque vérification du niveau de batterie (10 secondes).

- **NOTIFY_INTERVAL_STEP** : Intervalle de pourcentage à atteindre pour envoyer une nouvelle notification.

### Fonctions

#### `load_config()`

Cette fonction charge un fichier de configuration s'il existe. Cela permet de personnaliser certains paramètres sans modifier directement le script.

#### `log_event(message)`

Cette fonction enregistre des messages avec un horodatage dans un fichier de log. C'est particulièrement utile pour déboguer ou vérifier l'historique des notifications.

#### `check_battery()`

Cette fonction principale vérifie l'état de la batterie en utilisant `acpi`. Elle extrait le niveau de batterie et l'état de charge, puis déclenche les notifications appropriées.

- **Notifications d'état** : En fonction de l'état de charge (`Charging`, `Discharging`, `Full`), une notification est envoyée à l'utilisateur via `dunstify`.
- **Notifications de batterie faible** : Si le niveau de la batterie descend sous un certain seuil (défini par `LOW_BATTERY_THRESHOLD`), une notification est envoyée, avec une priorité plus élevée si le niveau est critique.

### Boucle Principale

Le script se termine par une boucle `while true` qui appelle `check_battery()` toutes les `CHECK_INTERVAL` secondes. Cela permet de garder un œil constant sur la batterie.

```bash
while true; do
    check_battery
    sleep $CHECK_INTERVAL
done
```

## Pourquoi Préférer Cela à un Outil Préfabriqué ?

Il existe plusieurs outils qui fournissent des fonctionnalités similaires, mais les raisons pour lesquelles j'ai préféré créer ce script sont :

1. **Simplicité et contrôle total** : Je sais exactement ce que fait chaque ligne de code. Je peux modifier chaque aspect sans dépendre de fonctionnalités cachées dans des paquets externes.

2. **Performance** : Les outils graphiques peuvent être gourmands en ressources. Ce script est léger et fonctionne en arrière-plan sans alourdir le système.

3. **Personnalisation** : Arch Linux est connu pour la liberté qu'il offre. En configurant tout moi-même, je reste fidèle à l'esprit d'Arch et j'apprends plus sur le fonctionnement interne de mon système.

## Conclusion

Ce script est une façon élégante de garder un contrôle précis sur la batterie de votre ordinateur sous Arch Linux. Il est conçu pour les utilisateurs qui, comme moi, aiment tout configurer eux-mêmes et qui veulent une solution simple et efficace pour surveiller la batterie.

Si vous avez des idées pour améliorer ce script ou souhaitez partager votre propre configuration, n'hésitez pas à commenter et partager !
