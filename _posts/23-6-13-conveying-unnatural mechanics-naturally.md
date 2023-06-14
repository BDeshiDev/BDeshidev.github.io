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
The phase mechanic is arguably the core mechanic of Control:Override. The player can *force* the game to make them *phase* through a obstacle collider.
![Players phase through unknowingly](/assets/img/gifs/phase_tutorial_2.GIF)

Roughly 80% of the puzzles rely on it in some way. But since the mechanic is a bit unnatural, teaching the player to do it was a challenge. Here is how I tutorialized this to gradually teach the players the nuances of this mechanic.

# Ensure that the player knows what they need to do regardless of the mechanic
>The player can be confused about the mechanic at the start, but they should not be confused by what the level wants them to do.

To do this, I made the player start the level in a position where they can see the exit portal. They've completed levels before, so they recognize the yellow portal as the goal. Then they fall. So they immediately understand that they need to go up. 
![gif showing level endgoal at start](/assets/img/gifs/phase_tutorial_0.GIF)
Moreover, I also designed the level to have a clear path that they can follow. Regardless of the phasing mechanic, they understand where to go.
<img src="/assets/blogEmbeds/co_phase_tut_level.jpg" style="max-height:300px;width:auto">

# If an action is unnatural, make it the only remaining choice
The level starts with a big, imposing block preventing you from moving forward. 

At this point, the player doesn't know about the phasing mechanic. They may try to move the block but they will be stuck after that unless they understand phasing.
![player stuck at start of level](/assets/img/gifs/phase_tutorial_1.GIF)
They understand that they are stuck between the wall and the block. The up powerup is out of reach so they can't reach it. They can either move themselves or the block left or right. 

Moving themselves is pointless because they're blocked in both sides.

Moving the block right gets it stuck. But if they move it left, they're gonna get squished against the wall...
What to do?

# Manufacture the "aha moment"
Moving the block right is obviously useless, so after trying it, they're eventually going  to try to move it left because they have no other option.

![Players phase through unknowingly](/assets/img/gifs/phase_tutorial_2.GIF)
Oh no, I'm gonna die... wait I'm fine. I'm inside the block! And I can move! Freedom!

Onwards to the rest of the level!
![Players phase through unknowingly](/assets/img/gifs/phase_tutorial_3.GIF)
Of course it doesn't end there.
# Don't assume the player immediately understands the mechanic once after encountering it.
Last time, the player themselves initiated the phase mechanic. At this point, they may not fully understand how they did it. They could try move the block again to try to replicate it and see if it was a one off bug or something. Or they may not. As a developer I can't rely on that. *That's why the level requires the player to phase again, but with less hints.*



# Test the player again, but slightly differently
The players progress is blocked by another phasing puzzle. But this time, it's vertical, not horizontal.
![Players phase through unknowingly](/assets/img/gifs/phase_tutorial_4.GIF)
The player understands that they can't reach the ledge by jumping normally. Again, the actions are limited. They cannot mess it up even if they try. But this time the player understands that they really do need to get on top of this platform to reach the ledge. They know that they can phase through blocks. But now it's time to apply that knowledge knowingly instead of out of desparation or accident.


![Players phase through knowingly](/assets/img/gifs/phase_tutorial_5.GIF)
And goal!


That's just a single tutorial level's design though. I rely on more than just this.

# Hint at the mechanic in earlier levels
Actually, this is actually not the first level where the player has to phase. The player first encounters phasing in an earlier level:
![Players phase through knowingly](/assets/img/gifs/phase_tutorial_6.GIF)

Notice that the player can complete the level without thinking. The actions are limited. The player can either jump(will still be stuck) or move the platforms. Eventually, they'll move the bottom platform up and phase by mistake and the level completes. The goal here isn't to teach the player how to phase. Just to get the idea and give them something flashy that they will remember until they understand it. Also, this is vertical phasing. So this acts as am example of vertical phasing before the main phasing tutorial level's 2nd part. 

Now, the "unnatural" mechanic you want to teach in your game might not allow for an "unintentional" demo like this. However, the idea is to give the player something memorable that they can later remember and utilize when learning the mechanic. A similar idea is the "lock doors" in metroidvanias. Typically those games have gates/doors blocking your progress. They are usually very memorable design wise so that the players remember them and want to open them after getting the key/powerup. Same idea. Different execution.

# Provide Visual/Audio feedback when you want the player to pay attention to what they are doing 
Admittedly, this is one of the places where Control:Override falters. The game has no special visual/audio indicators when the player has phased into a block.  It simply... shows the player inside the block without any fanfare. Some glitching effect or a sound ducking effect would probably "sell" the importance of the mechanic to the player. Even though phasing is arguably the core mechanic of Control:Override, in the reviews so far, no one has really said anything about the phasing mechanic. This is because I failed to highlight its importance in-game whether via visuals or audio. Something to fix in a future patch perhaps.

This is one aspect I recommend not skimping out on in your games. If something is important in your game, convey that importance to the player as well. Make them feel good for doing it!

# Don't rely on text if you can help it
Obviously, you could have a text popup or whatever that simply tells the player all of this. But consider the amount of text required to properly explain the nuances of the phasing mechanic. If I shoved a huge screenful of text at the player, they'd just skip it. But if I demonstrate the "unnatural" mechanic with an "aha" moment like this, it'll stick in the player's mind for longer. *Don't take the shortcut. Don't blame the mechanic. Design your game in a way that the unnatural becomes natural.*

