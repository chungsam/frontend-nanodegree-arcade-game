// TODO:
// Make game restart if player collides with enemy or reaches coast
// Add gems and other items to get more points
// Add helper functions for random object placement

// Start the game with default state
var gameState = {
    level: 1,
    score: 0,
    highScore: 0
};

var resetGameState = function (gameState) {
    gameState.level = 1;
    gameState.score = 0;
    gameState.highScore = 0;
}

var startNewGame = function () {
    resetGameState(gameState);

    loadEnemies();
    loadBonusItems();
    loadObstacles();

    player = new Player();

    printGameState(gameState); // TODO: Remove after testing
};

// Show the score
var drawScoreboard = function (level, score, highScore) {
    // TODO: clear text for previous score/level
    // and rename function to something else

    ctx.font = "20px Helvetica";
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 600, 50); // Clear the previous stroke for level and score

    ctx.fillStyle = "black";
    ctx.fillText("High Score: " + highScore, 0, 20);
    ctx.fillText("Level: " + level, 210, 20);
    ctx.fillText("Score: " + score, 400, 20);
};


var resetGame = function () {
    // TODO: add animation? (ie. make player spin or something)
    // player.resetPosition();
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

    allEnemies = [];
    loadEnemies();

    console.log('Advancing to level ' + gameState.level);

    printGameState(gameState); // TODO: Remove after testing
}

// Helper functions
var randomXYPlacement = function (object) {
    // Coordinates are different for moving items vs. static items
    if (object instanceof Star |
        object instanceof Rock |
        object instanceof BlueGem) {
        object.x = Math.round(Math.random() * 4) * 100;
        object.y = 60 + (Math.round(Math.random() * 2) * 82);

    }

}

var printGameState = function (gameState) {
    console.log('***Current State***');
    console.log('Level: ' + gameState.level);
    console.log('Score: ' + gameState.score);
}

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
// from going ahead if there is one
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


// Enemies our player must avoid
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


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (this.x > 606) {
        this.x = 0;
    } else {
        (this.x += this.movementSpeed) * dt;
    }

    drawScoreboard(gameState.level,
        gameState.score,
        gameState.highScore);

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


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

Player.prototype.update = function (dt) {
    this.x * dt;
    this.y * dt;

    if (this.collidedWithEnemy(allEnemies)) {
        resetGame();
    } else if (this.reachedWater()) {
        advanceNextLevel();
    }

    this.checkForBonusItem();

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


// Checks whether the Enemy collided with player

Player.prototype.collidedWithEnemy = function (Enemies) {
    var collided = false;

    Enemies.forEach(function (enemy) {
        // TODO: adjust sprite width and height
        var spriteWidth = 100;
        var spriteHeight = 100;

        if (player.x >= enemy.x &&
            player.x < enemy.x + spriteWidth &&
            player.y >= enemy.y &&
            player.y < enemy.y + spriteHeight
        ) {
            console.log('COLLIDED!'); // TODO: Remove after testing
            collided = true;
        }

    })

    return collided;
}

Player.prototype.reachedWater = function () {
    var yWaterPosition = 50;
    if (this.y < yWaterPosition) {
        console.log('Water reached!'); // TODO: Remove after testing
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

    console.log(this.x);
    console.log(this.y);
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


// Obstacles
var allObstacles = [];

var Rock = function () {
    this.sprite = 'images/Rock.png';

    randomXYPlacement(this);
}

Rock.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

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