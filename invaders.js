const enemyTag = new Image();

enemyTag.src = "enemy.jpg";
class Bullet {
    x;
    y;

    constructor(x, y){
        this.x = x;
        this.y = y;

    }
    update() {
        this.y -= 10;
    }

    draw(context) {
        context.fillStyle = "red";
        context.beginPath();
        context.arc(this.x, this.y, 5, 0, Math.PI * 2);
        context.fill();
    }

}
class Enemy {
        x;
        y;


    constructor(x, y){
        this.x = x;
        this.y = y;
        this.cooldown = 0;
        this.health = 20;
    }


    draw(context) {
            context.drawImage(enemyTag, this.x, this.y, 50, 50);
        
    }

    update(){
        if(this.cooldown == 0){
        this.x += Math.floor(Math.random() * 20 - 10);
                    if(this.x <= 0){
            this.x +=10;
        }
        if(this.x >= 750){
            this.x -= 10;
        }
        this.y += Math.floor(Math.random() * 20 - 10);
        if(this.y <= 0){
            this.y +=10;
        }
        if(this.y >= 550){
            this.y -= 10;
        }
        this.cooldown = 15;
    }
       this.cooldown --;
    }
    hit(bullet){
        if(bullet.x >= this.x &&
             bullet.x <= this.x + 50 &&
              bullet.y >= this.y &&
               bullet.y <= this.y + 50){

            this.health -= 10;
            return true;
        }else{
            return false;
        }
    }
        
    
}
let enemies = [];


// new Bullet(10, 20);
let player = {
    x: 400,
    y: 580,
    cooldown: 0,
    score: 0,
    update: function(){
        if(keys.left && this.x > 10) {
            this.x -= 10;
    }
    if(keys.right && this.x < 790) {
        this.x += 10;
    }
    if(keys.up && this.y > 0) {
        this.y -= 10;
    }
    if(keys.down && this.y < 580) {
        this.y += 10;
    };
    if(this.cooldown > 0){
        this.cooldown --
    }
    },


    Drawwin: function(context){
        let Gameover

        context.fillStyle = 'white';
        context.font = '48px Verdana';
        context.fillText(Gameover, 400, 240 );

    },
    draw: function(context){


        context.fillStyle = 'white';
        context.font = '48px Verdana';
        context.fillText("Score " + this.score, 10, 520 );





        context.fillStyle = "lightblue";
        // context.fillRect(390, 580, 20, 20);
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.x - 10, this.y + 20);
        context.lineTo(this.x + 10, this.y + 20);
        context.fill();

    },
    shoot: function(){
        this.cooldown = 10;
        return new Bullet(this.x, this.y)
    }
};

let bullets = [];

let keys = {
    up: false,
    down: false,
    right: false,
    left: false,
    shoot: false,
};

function update() {
player.update();

if(keys.shoot && player.cooldown == 0){
    let bullet = player.shoot();
    bullets.push(bullet);
}

    for(let index = 0; index < bullets.length; index++) {
        if(bullets[index].y < 0) {
            bullets.splice(index, 1);
        } else {
            bullets[index].y -= 10;
        }
    }
    for(let index = 0; index < enemies.length; index++){
        enemies[index].update();

        for (let bulletIndex = 0; bulletIndex < bullets.length; bulletIndex++){

            if(enemies[index].hit(bullets[bulletIndex])){
                bullets.splice(bulletIndex, 1);
                player.score += 1;
            }

        }
        if(enemies[index].health <= 0){
            enemies.splice(index, 1);
            player.score += 10;
        }
    }

    drawPlayer();
}

function setup() {
    let canvas = document.getElementById('invaders-canvas');
    let context = canvas.getContext('2d');

    context.fillStyle = 'black';
    context.fillRect(0, 0, 800, 600);

    context.fillStyle = 'white';
    context.font = '48px Verdana';
    context.fillText("Space Invaders", 10, 50);
    
    for (let count = 0; count <= 7; count++) {
        let x = 100 * count + 20;
        const enemy = new Enemy(x, 20);

        enemies.push(enemy);
    }


}

function drawPlayer() {
    let canvas = document.getElementById('invaders-canvas');
    let context = canvas.getContext('2d');

    context.fillStyle = 'black';
    context.fillRect(0, 0, 800, 600);
    
    //context.fillStyle = "lightblue";
    // context.fillRect(390, 580, 20, 20);
    //context.beginPath();
    //context.moveTo(player.x, player.y);
    //context.lineTo(player.x - 10, player.y + 20);
    //context.lineTo(player.x + 10, player.y + 20);
    //context.fill();
    player.draw(context);

    for(let index = 0; index < enemies.length; index++) {
        enemies[index].draw(context);
    }
    for(let index = 0; index < bullets.length; index++) {
        bullets [index].draw(context);
    }
    if(enemies.length == 0){
    
            context.fillStyle = 'white';
            context.font = '48px Verdana';
            context.fillText("Gameover", 400, 240 );
    
        
    }


}

function movePlayer(event) {
    switch(event.key) {
        case "ArrowLeft":
            keys.left = true;
            break;
        case "ArrowRight":
            keys.right = true;
            break;
        case "ArrowUp":
            keys.up = true;
            break;
        case "ArrowDown":
            keys.down = true;
            break;

        case " ":
            keys.shoot = true;
            break;
    }

}

function keyUp(event) {
    switch(event.key) {
        case "ArrowLeft":
            keys.left = false;
            break;
        case "ArrowRight":
            keys.right = false;
            break;
        case "ArrowUp":
            keys.up = false;
            break;
        case "ArrowDown":
            keys.down = false;
            break;
            case " ":
                keys.shoot = false;
    }
}

window.addEventListener('load', setup);
window.addEventListener('keydown', movePlayer);
window.addEventListener('keyup', keyUp);

setInterval(update, 50)