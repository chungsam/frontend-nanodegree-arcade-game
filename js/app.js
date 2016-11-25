// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.x = Math.random() * 505
    this.y =  60 + (82 * Math.round(Math.random() * 2));
    this.movementSpeed = Math.random() * 2;
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    var reachRowEnd = false;

    if (this.x > 606) {
        this.x = 0;
    } else {
        this.x += this.movementSpeed;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = (505 / 5) * 2 ; 
    this.y = 400;
}

Player.prototype.update = function(dt) {
    this.x * dt;
    this.y * dt;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(inputKey) {
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

    console.log(this.x, this.y);
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player();
var loadEnemies = function() {
    for (i = 0; i < 3; i++) {
        allEnemies.push(new Enemy());
    }
    
}
loadEnemies();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
