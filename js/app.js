/**
 * Code related to the general loading and running of the game.
 */

// Start the game with default state
var gameState = {
    level: 1,
    score: 0,
    highScore: 0
};

var resetGameState = function (gameState) {
    gameState.level = 1;
    gameState.score = 0;
}

var startNewGame = function () {
    resetGameState(gameState);

    loadEnemies();
    loadBonusItems();
    loadObstacles();

    player = new Player();
};

// Show the high score, level, and current score
var drawScoreboard = function (level, score, highScore) {
    ctx.font = "20px Helvetica";
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 600, 50); // Clear the previous stroke for level and score

    ctx.fillStyle = "black";
    ctx.fillText("High Score: " + highScore, 0, 20);
    ctx.fillText("Level: " + level, 210, 20);
    ctx.fillText("Score: " + score, 400, 20);
};

var updateHighScore = function () {
    if (gameState.score >= gameState.highScore) {
        gameState.highScore = gameState.score;
    }
}

var resetGame = function () {
    allEnemies = [];
    allBonusItems = [];
    allObstacles = [];
    resetGameState(gameState);

    startNewGame();

    console.log('Game reset!');
}

var advanceNextLevel = function () {
    player.resetPosition();
    gameState.level += 1;

    // Reload all enemies, bonus items, and obstacles
    allEnemies = [];
    allBonusItems = [];
    allObstacles = [];
    loadEnemies();
    loadBonusItems();
    loadObstacles();

    updateHighScore();

}

/**
 * Some helper functions for functions I was repeatedly using
 */

// Function to randomize x and y placement of static sprites.
// In the future, this may be refactored to include moving objects
// (i.e. enemies), but wasn't currently included as I found it more convenient
// to leave those randomize functions in their respective constructors.
var randomXYPlacement = function (object) {
    if (object instanceof Star |
        object instanceof Rock |
        object instanceof BlueGem) {
        object.x = Math.round(Math.random() * 4) * 100;
        object.y = 60 + (Math.round(Math.random() * 2) * 82);
    }
}

// For debug purposes, prints the game state in the console
// var printGameState = function (gameState) {
//     console.log('***Current State***');
//     console.log('Level: ' + gameState.level);
//     console.log('Score: ' + gameState.score);
// }


// Checks whether the player is at the canvas edge
// to prevent the sprite from going beyond the canvas boundaries.
//
// edgeBuffer variables refer to a kind of "padding" distance from the respective
// edge, and uses hard-coded values that I find "just work". This can probably
// be refactored to make the function more simple. 
var playerAtCanvasEdge = function (player, edge) {
    if (edge == "left") {
        var edgeBuffer = 50;
        if (player.x > edgeBuffer) {
            return false;
        }
        return true;
    } else if (edge == "top") {
        var edgeBuffer = 10;
        if (player.y > edgeBuffer) {
            return false;
        }
        return true;
    } else if (edge == "right") {
        var edgeBuffer = 400;
        if (player.x < edgeBuffer) {
            return false;
        }
        return true;
    } else if (edge == "bottom") {
        var edgeBuffer = 390;
        if (player.y < edgeBuffer) {
            return false;
        }
        return true;
    }
}

// Checks whether there is an obstacle ahead and prevents player
// from going ahead if there is one.
//
// xGap and yGap were used because there is some padding within the 
// rectangular sprite image boundaries for the sprite itself
// (i.e. the image boundaries have some empty space between the edges
// and the actual picture of the sprite itself.)
var playerAdjacentToObstacle = function (player, direction) {
    var isAdjacent = false;
    var xGapBuffer = 15;
    var yGapBuffer = 15;
    var playerXCoordinateAhead, playerYCoordinateAhead;

    if (direction == 'up') {
        playerYCoordinateAhead = player.y - player.yMovementDistance;

        allObstacles.forEach(function (obstacle) {
            var xGap = Math.abs(player.x - obstacle.x);
            var yGap = Math.abs(playerYCoordinateAhead - obstacle.y);
            if (xGap < xGapBuffer && yGap < yGapBuffer) {
                isAdjacent = true;
            }
        });

    } else if (direction == 'down') {
        playerYCoordinateAhead = player.y + player.yMovementDistance;

        allObstacles.forEach(function (obstacle) {
            var xGap = Math.abs(player.x - obstacle.x);
            var yGap = Math.abs(playerYCoordinateAhead - obstacle.y);
            if (xGap < xGapBuffer && yGap < yGapBuffer) {
                isAdjacent = true;
            }
        });

    } else if (direction == 'left') {
        playerXCoordinateAhead = player.x - player.xMovementDistance;

        allObstacles.forEach(function (obstacle) {
            var xGap = Math.abs(playerXCoordinateAhead - obstacle.x);
            var yGap = Math.abs(player.y - obstacle.y);
            if (xGap < xGapBuffer && yGap < yGapBuffer) {
                isAdjacent = true;
            }
        });

    } else if (direction == 'right') {
        playerXCoordinateAhead = player.x + player.xMovementDistance;

        allObstacles.forEach(function (obstacle) {
            var xGap = Math.abs(playerXCoordinateAhead - obstacle.x);
            var yGap = Math.abs(player.y - obstacle.y);
            if (xGap < xGapBuffer && yGap < yGapBuffer) {
                isAdjacent = true;
            }
        });
    }
    return isAdjacent;
}


/**
 * Game objects
 */

// Enemies our player must avoid. Constructor includes random x y placement
// and random movement speeds to make the game more interesting.

var Enemy = function () {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.xStartLocation = Math.random() * 505;
    this.x = this.xStartLocation;

    this.yStartLocation = 60 + (82 * Math.round(Math.random() * 2));
    this.y = this.yStartLocation;

    this.movementSpeed = Math.random() * 2 * gameState.level;
};

// Check collision with player.
Enemy.prototype.checkCollisions = function() {
    var collided = false;

    if (player.x + player.spriteWidth >= this.x &&
            player.x < this.x + this.spriteWidth &&
            player.y >= this.y &&
            player.y < this.y + this.spriteHeight
        ) {
            collided = true;
        }
    return collided;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Sprite movement. Also make sprite reappear from opposite edge 
    // when it goes beyond canvas edge.
    if (this.x > 606) {
        this.x = 0;
    } else {
        (this.x += this.movementSpeed) * dt;
    }

    if (this.checkCollisions()) {
        resetGame();
    }


};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Explicitly hardcoded width and height because the sprite image size
// didn't correspond with the actual size of the sprite.
Enemy.prototype.spriteWidth = 80;
Enemy.prototype.spriteHeight = 85;


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-boy.png';

    this.xStartLocation = (505 / 5) * 2;
    this.yStartLocation = 400;

    this.y = this.yStartLocation;
    this.x = this.xStartLocation;

    this.xMovementDistance = 100;
    this.yMovementDistance = 82;
}

Player.prototype.spriteWidth = 80;

Player.prototype.update = function (dt) {
    this.x * dt;
    this.y * dt;

    if (this.reachedWater()) {
        advanceNextLevel();
    }

    this.checkForBonusItem();

    drawScoreboard(gameState.level,
                    gameState.score,
                    gameState.highScore);

}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function (inputKey) {
    var xDistance = 100;
    var yDistance = 82;

    if (inputKey === 'left') {
        // stop from going beyond canvas edge and check for obstacles
        if (!playerAtCanvasEdge(this, 'left') &&
            !playerAdjacentToObstacle(this, 'left')) {
            this.x -= this.xMovementDistance;
        }
    } else if (inputKey === 'up') {
        if (!playerAtCanvasEdge(this, 'top') &&
            !playerAdjacentToObstacle(this, 'up')) {
            this.y -= this.yMovementDistance;
        }
    } else if (inputKey === 'right') {
        if (!playerAtCanvasEdge(this, 'right') &&
            !playerAdjacentToObstacle(this, 'right')) {
            this.x += this.xMovementDistance;
        }
    } else if (inputKey === 'down') {
        if (!playerAtCanvasEdge(this, 'bottom') &&
            !playerAdjacentToObstacle(this, 'down')) {
            this.y += this.yMovementDistance;
        }
    } else {
        console.log("Please use one of the arrow keys");
    }
}

Player.prototype.resetPosition = function () {
    this.x = this.xStartLocation;
    this.y = this.yStartLocation;
}

Player.prototype.reachedWater = function () {
    var yWaterPosition = 50;
    if (this.y < yWaterPosition) {
        return true;
    }
}

Player.prototype.checkForBonusItem = function () {
    var reachedItem = false;
    var xGapBuffer = 15;
    var yGapBuffer = 15;
    var playerXCoordinateAhead, playerYCoordinateAhead;

    allBonusItems.forEach(function (item) {
        var xGap = Math.abs(player.x - item.x);
        var yGap = Math.abs(player.y - item.y);

        if (xGap < xGapBuffer && yGap < yGapBuffer) {
            var index = allBonusItems.indexOf(item);
            allBonusItems.splice(index, 1);

            gameState.score += item.bonusPoints;
        }
    });
}

// Bonus Items
var allBonusItems = [];

// A blue gem that awards 50 points
var BlueGem = function () {
    this.sprite = 'images/Gem Blue.png';

    randomXYPlacement(this);
}

BlueGem.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

BlueGem.prototype.bonusPoints = 50;


// A star that awards 100 points
var Star = function () {
    this.sprite = 'images/Star.png';

    randomXYPlacement(this);
}

Star.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Star.prototype.bonusPoints = 100;

// Load all the bonus items
var loadBonusItems = function () {
    allBonusItems.push(new BlueGem());
    allBonusItems.push(new Star());
}


// Obstacles that block player movement
var allObstacles = [];

// Rock object
var Rock = function () {
    this.sprite = 'images/Rock.png';

    randomXYPlacement(this);
}

Rock.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

/**
 * Load and start the game
 */

var loadObstacles = function () {
    allObstacles.push(new Rock());
}

// Place all enemy objects in an array called allEnemies
var allEnemies = [];

var loadEnemies = function () {
    for (i = 0; i < 3; i++) {
        allEnemies.push(new Enemy());
    }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

startNewGame();