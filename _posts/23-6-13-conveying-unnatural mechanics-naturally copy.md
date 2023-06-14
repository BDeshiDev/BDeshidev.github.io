---
title: "Conveying unnatural mechanics naturally in Control:Override" 
by: B-DeshiDev
published: true
layout: devlog
tags:
  - Control:Override
  - Level Design
  - Tutorialization
# headerImage: '/assets/img/Screenshot (92.2.0).png'
previewImage: '/assets/img/Screenshot (92.2.0).png'
game: 'Control:Override'
comments: true
customcss:
  - '/assets/css/devlog.css'
---
The phase mechanic is arguably the core mechanic of Control:Override. The player can *force* the game to make them *phase* through a obstacle collider. Roughly 80% of the puzzles rely on it in some way. But since the mechanic is a bit unnatural, teaching the player to do it was a challenge. Here is how I tutorialized this to gradually teach the players the nuances of this mechanic.

# Ensure that the player knows what they need to do regardless of the mechanic
The player can be confused about the mechanic but they should not be confused by what the level wants them to do.

To do this, I made the player start the level in a position where they can see the exit. Then they fall. So they immediately understand that they need to go up.

# If an action is unnatural, make it the only remaining choice
The level starts with a big, imposing block preventing you from moving forward. At this point, the player doesn't know about the phasing mechanic.  
