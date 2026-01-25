---
title: 'Twitch Stream End Credits: Madyann Project'
date: '2024-09-28'
resume: "In the streaming world, recognizing community contributions is essential. We designed a custom end scene for Madyann's Twitch stream to display credits for subscribers and recent followers. See [the repo](https://github.com/Dawgyy/obs-end-credit)"
---

[Repository](https://github.com/Dawgyy/obs-end-credit)

## Introduction

In the streaming world, recognizing community contributions is essential. To achieve this, we designed a custom end scene for Madyann's Twitch stream that displays credits for subscribers (subs) and recent followers. This project is designed for OBS Studio and uses modern technologies like TailwindCSS to make the design pleasant and dynamic. In this article, we will explore the project, how it works, and how it was implemented.

## Project Goal

The main goal of this project is to create an interactive and elegant end scene displaying the names of subscribers and followers. This scene aims to be a way to thank viewers for their support by giving them some visibility live at the end of each stream.

## Features

- **Dynamic Credit Display**: Names of subscribers (subs) and followers scroll across the screen with an elegant and fluid style.
- **OBS Integration**: The scene is designed to be integrated directly into OBS Studio, simplifying the addition of this scene to the end of streams.
- **TailwindCSS Usage**: For a modern and responsive style, TailwindCSS was used, allowing for easy customization of design and effects.
- **Node.js Backend**: The backend allows retrieving information from Twitch, including subscribers and recent followers, via the Twitch API.

## Technologies Used

- **Node.js**: Used for the backend server that interacts with the Twitch API.
- **TailwindCSS**: To style the interface quickly and efficiently.
- **JavaScript**: For managing scrolling animations and interaction with the backend.
- **HTML/CSS**: To structure the page displayed in OBS.

## How It Works

1. **Data Retrieval**: The backend written in Node.js retrieves information about subscribers and followers via the Twitch API.
2. **Credit Animation**: The retrieved names are then displayed in the end scene as a scrolling list thanks to CSS animation.
3. **OBS Integration**: The HTML file is integrated into OBS Studio as a browser source, allowing the end scene to be displayed directly in streams.

# Conclusion

This end credit project for Madyann's Twitch stream is designed to be an effective and visually attractive way to thank the community. Thanks to the use of modern technologies, this end scene allows displaying subscriber and follower names in a fluid and dynamic way. Feel free to fork the project, make improvements, or simply use it for your own streams!

---

Thank you for following this article! If you want to see this project in action, tune in to Madyann's stream on Twitch.
