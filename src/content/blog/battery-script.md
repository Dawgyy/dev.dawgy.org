---
title: 'A Bash Script for My Battery Status'
date: '2024-10-05'
resume: 'Discover how to configure a simple bash script to monitor battery level on Arch Linux, with custom notifications and detailed logs. Why use complex tools when you can configure everything yourself, lightly and efficiently? Staying true to the Arch spirit: total control and simplicity.'
---

## Introduction

As an Arch Linux user, I prefer configuring things myself rather than using pre-made packages. That's exactly the Arch spirit: giving the freedom to customize everything, exactly as you wish. In this article, I will introduce you to a bash script I created to monitor my computer's battery level.

This script is a perfect example of manual and precise configuration, which meets exactly my needs without resorting to heavy and often too complex external tools.

## Why This Script?

The idea of this script is simple: receive notifications based on battery level and status (charging, discharging, full). Why? Because I want to stay informed and keep total control over energy consumption without relying on graphical interfaces or overly standard packages. Moreover, it allows me to customize notification thresholds as I wish.

## Features

- Notifications based on battery status (charging, discharging, full).
- Regular interval notifications when battery drops below a threshold.
- Logging of every battery-related event, useful for future analysis.

<img src="https://cdn.discordapp.com/attachments/1237149289998712893/1291902358200127508/image.png?ex=6701c954&is=670077d4&hm=a0f7ac298cd792fc4aa59033a366a23b1a976c17b14e9d76d6a988be22753db9&">

## The Script

Here is the complete script:

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
        log_event "Error: Unable to retrieve battery information."
        return
    fi

    if [[ "$charging_status" != "$previous_charging_status" ]]; then
        if [[ "$charging_status" == "Charging" ]]; then
            dunstify -u low "Computer is charging" "Battery level: $battery_level%"
            log_event "Notification: Charging (Battery: $battery_level%)"
        elif [[ "$charging_status" == "Discharging" ]]; then
            dunstify -u low "Computer is no longer charging" "Battery level: $battery_level%"
            log_event "Notification: Discharging (Battery: $battery_level%)"
        elif [[ "$charging_status" == "Full" ]]; then
            dunstify -u low "Battery full" "Battery level: $battery_level%"
            log_event "Notification: Battery full (Battery: $battery_level%)"
        fi
        previous_charging_status="$charging_status"
    fi

    if [[ "$charging_status" == "Discharging" && "$battery_level" -le "$LOW_BATTERY_THRESHOLD" ]]; then
        if (( previous_battery_level == -1 || battery_level <= previous_battery_level - NOTIFY_INTERVAL_STEP )); then
            urgency="normal"
            if [[ "$battery_level" -le "$CRITICAL_BATTERY_THRESHOLD" ]]; then
                urgency="critical"
            fi
            dunstify -u $urgency "Low battery" "Battery level: $battery_level%"
            log_event "Warning: Low battery (Battery: $battery_level%)"
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

## Code Explanation

1. **Configuration**: The script starts by defining configuration files and thresholds. It tries to load a user configuration file if it exists.
2. **Logging**: The `log_event` function handles appending timestamped messages to the log file.
3. **Battery Check**: The core logic is in `check_battery`. It uses `acpi` to get battery status.
   - It detects state changes (plugged in, unplugged, full) and sends notifications using `dunstify`.
   - If discharging and below threshold, it sends low battery warnings, escalating urgency as the battery gets lower.
4. **Loop**: The script runs indefinitely, checking the status every `CHECK_INTERVAL` seconds.

## Conclusion

This script provides a lightweight and customizable solution for battery monitoring on Arch Linux, adhering to the DIY philosophy.
