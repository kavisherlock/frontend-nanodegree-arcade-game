var ROW_HEIGHT = 83;
var COL_WIDTH = 101;
var WATER_OFFSET = 20;

// Enemies our player must avoid
var Enemy = function(row, velocity) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.x = 0;
    this.y = row * ROW_HEIGHT - WATER_OFFSET;
    this.vx = velocity;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.vx * dt;
    if (this.x > 5 * COL_WIDTH) {
      this.x = -1 * COL_WIDTH;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollision = function(playerX, playerY) {
  if (this.y != playerY) {
    return false;
  }
  if (this.x > playerX - COL_WIDTH + 30 && this.x < playerX + COL_WIDTH - 30) {
    return true;
  }

  return false;
};


var Player = function() {
    this.sprite = 'images/char-pink-girl.png';

    this.x = 2 * COL_WIDTH;
    this.y = 5 * ROW_HEIGHT - WATER_OFFSET;
};

Player.prototype.handleInput = function(key) {
    switch(key) {
      case 'left':
        this.x = Math.max(0, this.x - COL_WIDTH);
        break;
      case 'right':
        this.x = Math.min(4 * COL_WIDTH, this.x + COL_WIDTH);
        break;
      case 'up':
        this.y = Math.max(-1 * WATER_OFFSET, this.y - ROW_HEIGHT);
        break;
      case 'down':
        this.y = Math.min(5 * ROW_HEIGHT - WATER_OFFSET, this.y + ROW_HEIGHT);
        break;
    }
};

Player.prototype.update = function(dt) {
};

Player.prototype.reset = function(dt) {
  this.x = 2 * COL_WIDTH;
  this.y = 5 * ROW_HEIGHT - WATER_OFFSET;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(1, 200), new Enemy(2, 300), new Enemy(3, 100)];
var player = new Player();

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
