// Enemies our player must avoid
class Enemy {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    // constructor function creates an enemy instance with random speed, row, and starting point

    constructor(){
        this.sprite = 'images/enemy-bug.png';
        this.speed = (1.5+Math.random())*100;
        this.row = Math.floor(3*Math.random());
        // converts the row to y coordinate
        this.y = 50+this.row*83;
        // randomizes starting point
        this.x = Math.random()*-500;
    }
// Update the enemy's position, required method for game
// update function moves the enemy right while on the screen
    update(dt){
        this.x+=dt*this.speed;
        // when the enemy moves off screen it is moved back to the left side in a random row, and sped up slightly.
        if (this.x>700) {
            this.speed+=10;
            this.x=-100;
            this.row = Math.floor(3*Math.random());
            this.y = 50+this.row*83;
        };
    }
// Draw the enemy on the screen, required method for game
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    // player constructor function sets the player sprite & starting point
    constructor(){
        this.sprite = 'images/char-boy.png';
        this.row = 5;
        this.column = 2;
    }
    // update function repositions the player according to any moves made since last update
    update(enemies){
        this.x = this.column*101;
        this.y = this.row*83-20;
        this.render()
        // check for impacts
        for (let enemy of enemies) {
            if (enemy.row==(this.row-1) && enemy.x>this.x-65 && enemy.x<this.x+30){
                location.reload();
            }
        }
    }
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    // handle input function changes the player object so that it will move on the next update
    handleInput(direction){
        if (direction=='up' && this.row !== 0) {
            this.row-=1;
            // checks for won game
            if (this.row==0) {
                winGame();
            }
        }else if (direction=='down' && this.row !== 5) {
            this.row+=1;
        }else if (direction=='left' && this.column !== 0) {
            this.column-=1
        }else if (direction=='right' && this.column !== 4) {
            this.column+=1
        }
    }
}

// Now instantiate your objects.

// Place all enemy objects in an array called allEnemies
var allEnemies =[new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy()];

// Place the player object in a variable called player
const player = new Player();


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

function winGame() {
    document.body.insertAdjacentHTML('afterbegin','<h1>YOU WIN!</h1>');
}
