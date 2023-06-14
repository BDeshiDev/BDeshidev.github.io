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

But what if we don't?
![Players phase through unknowingly](/assets/img/gifs/phase_tutorial_2.GIF)
The player just... passes through. But why would that be useful?

Well, now you can have large blocks act as conditional gates. The condition being that the level has to have a wall for you to squish into the block.

And since it is still a block, you can stand on it, move it or whatver. For example, in the same level, you need to use the huge block you just phased through as a stepping stone.
![Players phase through unknowingly](/assets/img/gifs/phase_tutorial_3.GIF)



# The actual core mechanic of Control:Override
It doesn't have any official name in the game but I call it *phasing*. At first it was just a bug, then, as I tried to develop more mechanics, it turned into an integral part of all of them. At this point, I'd call it the core mechanic of Control:Override.

# How a simple bug changed every facet of the game
For example, the game has platforms that can grow. Without the phasing mechanic, this could easily push the player into a wall and kill them.  
![Players phase through growing platforms](/assets/img/gifs/phase grow.GIF)

However, due to the phasing mechanic, the player just enters the platform. And inside the platform, they are essentially invincible. 

In the gif, the player is blocked above by lasers that will kill them on contact. Inside the platform, the lasers cannot pass through and hit them. As seen in the gif, the player can then use this to get past the lasers.

Another example is the boxception levels(for the lack of a better word). These are levels that you can move with input sharing. 
![](/assets/blogEmbeds/control_level%20itself.gif)
However, without the phasing mechanic, it wouldn't be possible to leave these blocks after entering them. That would've limited the potential of the levels.



![](/assets/blogEmbeds/boxception.gif)

As seen in the gif, with phasing, it becomes as easy as finding a wall and squishing yourself to get out. *With the Boxception levels in the game, you'll need to think inside the box, outside the box, and even across the box(es)*


# Bug? More like intentional design
Now, in the player's mind, it definitely feels like a bug. A lot of them feel like they broke the game when they first encountered the mechanic. But gradually it became a tool they use without thinking. 

The boxception levels are, again, an example. They are the last set of levels and by that point, the players get so used to phasing that when they see that little wall inside the box, they don't even need to think, they just go, *"Ah, I can just use that to get out."*

If I were to sum it up the design philosophy of Control:Override's puzzles, it'd be:
<img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1406090/extras/bugs-features-tools.gif?t=1681819544">


Is any of this new? No. There are many game mechanics that used to be bugs. Bunnyhopping is a famous example. 

What I want people to take away from this is that you shouldn't just dismiss a game mechanic interaction(unintentional or not) as a bug to be squashed. Consider it. Explore it. Keep your mind open and perhaps you'll find a new game mechanic.
