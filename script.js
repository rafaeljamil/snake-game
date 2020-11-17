//Variable declarations

let canvas = document.getElementById("game");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8*box,
    y: 8*box
}
let direction = "right";
let fruit = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

//Function to draw the background

function setBackground(){
    context.fillStyle = "green";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

//Function to draw the snake

function setSnake(){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "black";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFruit(){
    context.fillStyle = "red";
    context.fillRect(fruit.x, fruit.y, box, box);
}

//Event calls the update function when a key is pressed

document.addEventListener("keydown", update);

//Function update handles the key pressed and set directions

function update(event){
    //Updates the direction var according to the keyboard arrows

    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

//Function Start calls the background and snake drawing,
//gets directions and sets the movement effect

function start(){
    //Making snake come back on the opposite side of screen
    //when reaching end of canvas

    if(snake[0].x > 15*box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 15 * box;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 15 * box;
    if(snake[0].y > 15*box && direction == "down") snake[0].y = 0;

    //Drawing background and snake

    setBackground();
    setSnake();
    drawFruit();

    //Defining orientation

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //Defining directions

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    //Taking last snake position off the array
    // to get the moving effect

    snake.pop();

    //Defining snake's head

    let newHead = {
        x:snakeX,
        y:snakeY
    }

    //And setting the head inside the array

    snake.unshift(newHead);
}

//Interval for game updates

let game = setInterval(start, 300);