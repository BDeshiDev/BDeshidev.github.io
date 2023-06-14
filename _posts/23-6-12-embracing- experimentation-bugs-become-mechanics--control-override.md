---
title: "Embracing experimentation: How bugs became mechanics in Control:Override" 
by: B-DeshiDev
published: true
layout: devlog
tags:
  - Control:Override
  - Design
# headerImage: '/assets/img/Screenshot (92.2.0).png'
previewImage: '/assets/img/Screenshot (92.2.0).png'
game: 'Control:Override'
comments: true
customcss:
  - '/assets/css/devlog.css'
---
Control:Override is a game about sharing controls with the environment. Instead of moving yourself, you can "share" those with the rest of the environment. 
<img src="https://img.itch.zone/aW1nLzU3MjMyMDQuZ2lm/original/n6I3Ov.gif" />
<img src="https://cdn.akamai.steamstatic.com/steam/apps/1406090/extras/not-a-gif.gif?t=1618990597" />
That is what you'll be doing for most of the game. *However, it is NOT the core mechanic of the game.*
# The "bug"
The players 2D movement input now completely applies to platforms. So they can be moved horizontally and vertically. *What is the obvious edgecase you now have to deal with?*
>What happens when the player moves platforms to intentionally trap themselves? 


The programmer brain, once it identifies an edgecase, will scream at you to fix it, **"C'mon, just kill the player when that happpens. It's the obvious solution. Just do it already."**

As game developers, our goal is to make interesting games. Instead of dismissing 

# The actual core mechanic of Control:Override
It turns out, 
<img src="https://cdn.akamai.steamstatic.com/steam/apps/1406090/extras/bugs-features-tools.gif?t=1681819544">

