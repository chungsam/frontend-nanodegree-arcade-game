// TODO:
// Make game restart if player collides with enemy or reaches coast
// Add gems and other items to get more points
// Add start screen
// Add level end screen

var gameState = {
    state: {
        level: 1,
        score: 0,
    },
    settings: {
        difficulty: 1
    }
}

var drawScoreboard = function (level, score) {
    ctx.font = "20px Helvetica";
    ctx.fillText("Level: " + level, 210, 20);
    ctx.fillText("Score: " + score, 400, 20);
}

var resetGame = function() {
    // TODO: add animation? (ie. make player spin or something)
    player.x = xStartLocation;
}


// Enemies our player must avoid
var Enemy = function () {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.xStartLocation = Math.random() * 505
    this.x = this.xStartLocation;

    this.yStartLocation = 60 + (82 * Math.round(Math.random() * 2));
    this.y = this.yStartLocation;

    this.movementSpeed = Math.random() * 2 * gameState.state.level;
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
        this.x += this.movementSpeed;
    }

    drawScoreboard(gameState.state.level, gameState.state.score);
    this.checkCollisionWithPlayer();

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * Checks whether the Enemy collided with player
 */
Enemy.prototype.checkCollisionWithPlayer = function () {

    // TODO: adjust sprite width and height
    var spriteWidth = 100;
    var spriteHeight = 100;

    if (player.x >= this.x &&
        player.x < this.x + spriteWidth &&
        player.y >= this.y &&
        player.y < this.y + spriteHeight
    ) {
        console.log("COLLIDED!"); // TODO: Remove after testing
    }
    // call when player.x is close to enemy.x
    // put this logic inside of enemy.prototype.update?
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-boy.png';

    this.xStartLocation = (505 / 5) * 2;
    this.x = this.xStartLocation;

    this.yStartLocation = 400;
    this.y = this.yStartLocation;
}

Player.prototype.update = function (dt) {
    this.x * dt;
    this.y * dt;

    this.checkWaterReached();
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function (inputKey) {
    var xDistance = 100;
    var yDistance = 82;

    if (inputKey === 'left') {
        if (this.x > 50) { // stop from going beyond canvas edge
            this.x -= xDistance;
        }
    } else if (inputKey === 'up') {
        if (this.y > 10) {
            this.y -= yDistance;
        }
    } else if (inputKey === 'right') {
        if (this.x < 400) {
            this.x += xDistance;
        }
    } else if (inputKey === 'down') {
        if (this.y < 390) {
            this.y += yDistance;
        }
    } else {
        console.log("Please use one of the arrow keys");
    }
}

Player.prototype.checkWaterReached = function() {
    var yWaterPosition = 50;
    if (this.y < yWaterPosition) {
        console.log('Water reached!'); // TODO: Remove after testing
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player();
var loadEnemies = function () {
    for (i = 0; i < 3; i++) {
        allEnemies.push(new Enemy());
    }

}
loadEnemies();




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