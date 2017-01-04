frontend-nanodegree-arcade-game
===============================

Students should use this [rubric](https://review.udacity.com/#!/projects/2696458597/rubric) for self-checking their submission. Make sure the functions you write are **object-oriented** - either class functions (like Player and Enemy) or class prototype functions such as Enemy.prototype.checkCollisions, and that the keyword 'this' is used appropriately within your class and class prototype functions to refer to the object the function is called upon. Also be sure that the **readme.md** file is updated with your instructions on both how to 1. Run and 2. Play your arcade game.

For detailed instructions on how to get started, check out this [guide](https://docs.google.com/document/d/1v01aScPjSWCCWQLIpFqvg3-vXLH2e8_SZQKC8jNO0Dc/pub?embedded=true).

## Overview
This is a frogger game clone that was built as part of Udacity's [Front-End Nanodegree program](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001). It was intially forked 
from this repository: https://github.com/udacity/frontend-nanodegree-arcade-game.

## Running the game
Running the game is simple: fork/clone the repo locally, then open the [index.html](index.html) file in a browser of your choice.

## How to Play
The objective of the game is to get as many points as you can before you collide with the bugs that moving across the screen. 
You get points by moving the player to one of the bonus items that appear on the screen.

You also advance to the next level when you make it past the bugs and reach the water. As you advance levels, the bugs will move faster and faster, making the game more challenging.

### Getting Around
You move the player by using any one of the arrow keys:

Key | What It Does
--- | ------------
Up :arrow_up: | Moves player up (vertical)
Down :arrow_down: | Moves player down (vertical)
Left :arrow_left: | Moves player left (horizontal)
Right :arrow_right: | Moves player right (horizontal)

### Bonus Items and Points
The current version of the game has the following bonus items:

Item | Points Awarded
---- | --------------
Blue Gem ![Blue Gem](/images/Gem Blue.png) | 50
Star ![Star](/images/Star.png) | 100

### Added Features
These simple and optional features were added on top of the basic requirements outlined by the original Udacity project:

* A Simple dashboard that tracks high score, current level, and current score values.
* Additional of bonus items that award points, and obstacles that block player movement.
* Random placement of all enemies, bonus items and obstacles at the start of each level.
* Random assignment of movement speeds for all enemies, with the potential max speed increasing as the levels advance.

