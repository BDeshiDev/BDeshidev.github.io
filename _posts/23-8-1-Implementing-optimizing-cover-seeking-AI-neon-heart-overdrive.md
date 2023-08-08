---
title: "Implementing and optimizing cover seeking AI in Neon Heart Overdrive" 
by: B-DeshiDev
published: true
layout: devlog
tags:
  - Gameplay Programming
  - AI Programming
# headerImage: '/assets/img/Screenshot (92.2.0).png'
previewImage: '/assets/img/Screenshot (92.2.0).png'
game: 'Control:Override'
comments: true
customcss:
  - '/assets/css/devlog.css'
---

For the Design Den Jam, I was the gameplay programmer for Neon Heart Overdrive, a retro FPS. I had never made AI for such a game before so it was a new challenge for me. I started by determining the requirements for the AI from my teammate/level designer.
![AI requirements](/assets/blogEmbeds/neon-heart-overdrive-AI-convo.png)
Since I did not play that many FPS/TPS games, I could have made ill fitting AI for the game if I wasn't careful. So I discussed with my level designer exactly what sort of behavior he wanted out of those enemies. Since this was a jam, we focused on enemies that were simple to implement but fun to fight together. The shotgun enemy was straightforward enough. I'll focus on the other two:
1. SMG cop: 
  - Will hide behind cover and occasionally pop out to attack. 
  - Runs away to far away cover when the player gets close.
1. Pistol enemy: 
  - Mix of SMG cops's fleeing behavior and shotgun cop's chasing behavior. 
  - Will try to chase player moving from cover to cover. 
  - After attacking for a while, will flee like the SMG cop.

I had  never implemented any cover seeking behavior before. So that was something I had to figure out during the jam. I sought out existing resources for doing so in Unity. However, I didn't find any. Most of the tutorials seemed to just pick a random cover. That won't do if we wanted cover seeking enemies to behave aggressively(the pistol cop) or defensively(smg cop). Moreover, it would mean that enemies could also choose already occupied covers. So I decided to see if I can do it in a better way.

For the enemies we decided on, and keeping in mind that this is for a jam, 

# Requirements for the cover system
1. It should be flexible enough to let different enemies pick the best cover based on their needs.
1. It should require minimal setup for the level designer(again, jam time limit)
1. It should be reasonably performant.
1. Needs to work with any(reasonable amount of) amount of enemies.
1. Needs to work with any(reasonable amount of) covers. We decided on doing a single, long, level for the jam. There'll be covers in rooms the enemy/you are not in. Only nearby cover should be considered.

# Architecture
1. Each cover object has a CoverComponent that describes the cover. 
1. Each enemy has a CoverTracker component that keeps track of which cover they are currently using.
1. Covers are scored by according to a CoverSeekerProfile on the CoverTracker class. The enemy AI sets the coverProfile according to what it needs at a particular state.

## The CoverComponent itself
The CoverComponent contains data about the cover. We model a single cover object in the following way:
1. Sides: A cover object is composed of multiple sides. Ex: a box shaped cover has four sides. Locations in the same side will generally have similar utility values to the AI. Each side also stores the normal which is used to determine whether the side is exposed. 
2. Cover points: Each side has multiple cover points. Enemies pick a cover side, then a free cover point in that side. 

Since we wanted to minimize involvement from the designer, the cover points are calculated automatically from the collider bounds. The spacing is such that enemies don't collide if they pick adjacent points on same side.

# TODO: ADD GIZMO IMAGE


# Picking the best cover:
The basic idea is simple:
1. Get a list of relevant nearby Cover objects
1. Only pick cover positions that are not exposed.  
1. Sort all of the covers based on the AI's CoverSeekerProfile.
1. Use the best one.

## Getting a list of nearby cover objects:
- I used Physics.OverlapCircleNonAlloc() to get nearby cover objects
- I used the NonAlloc version because it doesn't allocate memory and hence won't cause GC issues.
- I passed a layermask to only search in the coverlayer to make it more efficient.
- I do a getComponent<CoverComponent>()  on each valid collider to get the coverComponent on it.


## Picking coverpositions

### Determining if a spot in the cover is exposed
We never want to pick and go to a cover spot that is already exposed. Each cover object can have multiple cover points. Doing a raycast to every cover point is not ideal.

Moreover, raycasts only consider occlusion. If we rely on raycasts only, we can pick a cover position that is occluded by geometry but on the same side as the player. 

Instead, we consider the angle the player makes with the cover side's normal. If it is <= 90 degrees, this cover side is on the opposite side to the player. In other words, it is not exposed.

This is done per cover "side", not cover points. In practice, the angle with the player can vary between cover points. This can lead to unstable behavior where points near the corner are considered not exposed when other points in the same side were. The enemy would see that and jump to that point leaving the safe side they were in. *Doing it per side is both more stable and more performant.*

### Lazy cover evaluation Optimization
A cover object has multiple cover points around it. A particular cover might be queried by multiple enemies. However, it is never necessary to always be updating all cover points/faces. We only care about covers that are not exposed. And we only need to update cover points that are either being queried or are used by an enemy.

To do this, we keep a lastRefreshedTime for each face and each coverpoint. Each query, we check the difference between Time.time and the lastRefreshedTime. If it is greated thatn .5sec, we refresh the face/point and update the the lastRefreshedTime as well.

*As a result, regardless of how many enemies query or which covers are queried, only the necessary ones are evluated at a controllable rate.*

# Keeping track of which cover points are owned by which enemy
The coverpoints each keep a reference to the enemy that currently "owns" it.  This is necessary to prevent enemies from trying to claim coverpoints that are already being used by another enemies.

### Picking cover points/Side
Before scoring the cover that we found, we need to pick an appropriate side and pick an appropriate point there. For this, I simply:

1. Loop through all faces.
2. Verify that the current one is not exposed
3. return the first non occupied slot near to the closest corner .

 The loop is less scary than it looks. We mainly used boxcolliders. So there were only 4 faces/sides. We also want the enemy to peek from behind cover to attack. Choosing the first non occupied slot near the closest corners will make the enemy stay in corners when possible.  

```csharp
public bool tryGetNonExposedSlot
(CoverTracker tracker, out CoverSlotHandle handle)
{
    handle = CoverSlotHandle.Invalid();
    for (int i = 0; i < faces.Count; i++)
    {
        // this particular face may not be occupied yet. '
        //Just call refresh manually
        // this ensures that we get fresh data for this face 
        refreshCoverFacedata(i, tracker);
        //each cover.face keeps track of how many slots are left
        if (!faces[i].isExposed && faces[i].hasFreeSlots())
        {
          for (int j = 0; j < faces[i].coverSlots.Count; j++)
          {
              // just return the first non occupied slot
              if (faces[i].coverSlots[j].occupant == null)
              {
                  handle = new CoverSlotHandle(this, i, j);
                  return true;
              }
          }
        }
    }
    return false;
}
```

## Evaluating the covers
Once we have an unexposed, unoccupied cover point, we score it according to the AI's CoverSeekingProfile. It is simply a struct with various weights that are used to calculate the final score

### Defensive cover seeking
<video src="https://user-images.githubusercontent.com/17526821/259061801-df36c7e7-757b-48a7-b493-3238f2cf0c97.mp4" controls loop autoplay style="width:100%;" >
</video>
![Defensive cover seeking profile](/assets/blogEmbeds/neon-heart-overdrive-flee-cover-seek-profile.png)

This is used by the defensive SMG enemy. Here, we can see that the cop prioritizes picking covers farther away from the player. Moreover, when the enemy is near multiple covers, they pick the one that doesn't involve moving towards the player. Thre could be a cover really close to them

### Offensive cover seeking
<video src="https://user-images.githubusercontent.com/17526821/259061376-8ae3f88e-f807-4e3a-8ffc-489bb93029af.mp4" controls loop autoplay style="width:100%;" >
</video>
![Defensive cover seeking profile](/assets/blogEmbeds/neon-heart-overdrive-chase-cover-seek-profile.png)

# Limitations and improvements
## Pathfinding issues
### Problem
<video src="https://user-images.githubusercontent.com/17526821/259061276-bbde07f3-a4c8-4096-8509-28372e0ad4e7.mp4" controls loop autoplay style="width:100%;" >
</video>
In the above clip you can see the enemy that is supposed to flee, move towards the player and then backwards to a cover point which is not ideal. The cover evaluation system is indeed working properly. The cover point it picks is far from the player and not exposed. The problem is that the path calculated by Unity's Navmesh system doesn't account for whether the player is in the path or not. 

### Solution
The solution is to add a pathfinding penalty around the player. However, the other cop enemy(the offensive focused one) *wants* to move towards the player. So they have different path cost schemes. However, upon research, I realized that Unity's navmesh penalty system is ill suited for this. Different agenst can have different masks for penalty zones. But they cannot have different penalty schemes.

Using a different pathfinding system(Ex: a custom A* library) would allow for this. However, I determined that doing so would require a significant time investment without much gain. In this game, due to the focus on playing offensively, enemies moving towards the player is not that much of a problem since the player *wants* to chase enemies down. Due to this and the time constraints of the jam, I decided to prioritize other tasks. 

However, integrating pathfinding penalties into this system is something I want to explore in the future.


