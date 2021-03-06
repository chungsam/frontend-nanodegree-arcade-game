Frogger Game Clone
===============================
#### By Sam Chung

This is a frogger game clone that was built as part of Udacity's [Front-End Nanodegree program](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001). It was intially forked 
from this repository: https://github.com/udacity/frontend-nanodegree-arcade-game.

The original repo provided the main game engine, absent of any game logic, as well as example sprite images. I implemented all the necessary game logic, as well as 
added some optional features beyond the original requirements of the project.

## Running the game
Running the game is simple: fork/clone the repo locally, then open the [index.html](index.html) file in a browser of your choice.

## How to Play

### Game Objective
The objective of the game is to get as many points as you can before you collide with the bugs that moving across the screen. 
You get points by moving the player to one of the bonus items that appear on the screen.

You also advance to the next level when you make it past the bugs and reach the water. As you advance levels, the bugs will move faster and faster, making the game more challenging.

### Getting Around
You move the player by using any one of the arrow keys:

Key | What It Does
--- | ------------
Up      :arrow_up: | Moves player up (vertical)
Down    :arrow_down: | Moves player down (vertical)
Left    :arrow_left: | Moves player left (horizontal)
Right   :arrow_right: | Moves player right (horizontal)

### Bonus Items and Points
The current version of the game has the following bonus items:

Item | Sprite | Points Awarded
---- | ------ | --------------
Blue Gem | ![Blue Gem](/images/Gem Blue.png) | 50
Star | ![Star](/images/Star.png) | 100

### Obstacles
The current version of the game has the following obstacles:

Item | Sprite | What It Does
---- | ------ | ------------
Rock | ![Rock](images/Rock.png) | Blocks player from going past it

## Added Features
These optional features were added on top of the basic requirements outlined by the original Udacity project:

* A Simple dashboard that tracks high score, current level, and current score values
* Bonus items that award points, and obstacles that block player movement
* Random placement of all enemies, bonus items and obstacles at the start of each level
* Random assignment of movement speeds for all enemies, with the potential max speed increasing as the levels advance

