let canvas = document.getElementById("game");
let context = canvas.getContext("2d");
let box = 32;

function setBackground(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

setBackground();