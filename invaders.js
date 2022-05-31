let player = {
    x: 400,
    y: 580
}

function setup(){
    let canvas = document.getElementById('invaders-Convas');
    let context = canvas.getContext('2d');
    context.fillStyle = 'black';
    context.fillRect(0, 0, 800, 600)

    context.fillStyle = 'white';
    context.font = '48px Verdana';
    context.fillText("space Invaders", 10, 50);

    context.fillStyle =  'lightblue';
    //context.fillRect(390, 580, 20, 20)
    context.beginPath();
    context.moveTo(player.x, player.y);
    context.lineTo(player.x - 10, player.y + 20);
    context.lineTo(player.x + 10, player.y + 20);
    context.fill();

    DrawPlayer();
}

function DrawPlayer() {
    let canvas = document.getElementById('invaders-Convas');
    let context = canvas.getContext('2d');

    context.fillStyle = 'black';
    context.fillRect(0, 0, 800, 600)

    context.fillStyle = 'white';
    context.font = '48px Verdana';
    context.fillText("space Invaders", 10, 50);

    context.fillStyle =  'lightblue';
    //context.fillRect(390, 580, 20, 20)
    context.beginPath();
    context.moveTo(player.x, player.y);
    context.lineTo(player.x - 10, player.y + 20);
    context.lineTo(player.x + 10, player.y + 20);
    context.fill();
}

function moveplayer(event){
    switch(event.key){
        case "ArrowLeft":
            player.x -= 10
        break;
        case "ArrowRight":
            player.x += 10
        break;
        case "ArrowUp":
            player.y -= 10
        break;
        case "ArrowDown":
            player.y += 10
        break;
    }
    DrawPlayer();
}
window.addEventListener('load', setup);
window.addEventListener('keydown', moveplayer)