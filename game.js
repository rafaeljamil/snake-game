let canvas = document.querySelector(".canvas");
let context = canvas.getContext("2d");
let strtBtn = document.querySelector(".start");
let stopBtn = document.querySelector(".stop");
let okBtn = document.querySelector(".okBtn");
let score = document.querySelector(".score");
let diff = document.getElementsByName("diff");
let gameOver = document.querySelector(".game-over");
let finalScore = document.querySelector(".final-score");
let diffValue = "";
let diffNum = 0
let gameScore = 0;
let box = 32;
let direction = "right";
let snake = [];

snake[0] = {
    x: 8*box,
    y: 8*box
};

//Creating the fruit object with random placement

let fruit = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

//Function to draw the background

function setBackground(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

//Function to draw the snake

function setSnake(){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

//Function to draw the fruit

function drawFruit(){
    context.fillStyle = "brown";
    context.fillRect(fruit.x, fruit.y, box, box);
}

//Event calls the update function when a key is pressed

document.addEventListener("keydown", update);

//Function update handles the key pressed and set directions

function update(event){
    //Updates the direction variable according to the keyboard arrows

    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

//Function Start calls the background and snake drawing,
//gets directions and sets the movement effect

function getDiff(){
    for(i=0;i<diff.length;i++){
        if(diff[i].checked){
            diffValue = diff[i].value;

            switch(diffValue){
                case "easy":
                    diffNum = 300;
                    break;
                case "medium":
                    diffNum = 200;
                    break;
                case "hard":
                    diffNum = 100;
                    break;
                default:
                    break;
            }
        }
    }
}

function startGame(){


    //Making snake come back on the opposite side of screen
    //when reaching end of canvas

    if(snake[0].x > 15*box) snake[0].x = 0;
    if(snake[0].x < 0) snake[0].x = 15*box;
    if(snake[0].y > 15*box) snake[0].y = 0;
    if(snake[0].y < 0) snake[0].y = 15*box;

    //Check if snake hits itself and if it does then game over

    for(i = 1; i < snake.length; i++){
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(start);
            gameIsOver();
        }
    }

    //Drawing background, snake and fruit

    setBackground();
    setSnake();
    drawFruit();
    score.innerHTML = "Score: "+gameScore;

    //Defining orientation

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //Defining directions

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    //Checking if snake collides with the fruit,
    //keeping snake size if it doesn't 
    //and redrawing the fruit if it does

    if(snakeX != fruit.x || snakeY != fruit.y){
        snake.pop();
    }else{
        gameScore++;
        fruit.x = Math.floor(Math.random() * 15 + 1) * box;
        fruit.y = Math.floor(Math.random() * 15 + 1) * box;

    }

    //Defining snake's head

    let newHead = {
        x:snakeX,
        y:snakeY
    }

    //And setting the head inside the array

    snake.unshift(newHead);
}

//Interval for game updates


function start(){
    getDiff();
    if (diffNum == 300){
        setInterval(startGame, 300);
    }else if(diffNum == 200){
        setInterval(startGame, 200);
    }else if(diffNum == 100){
        setInterval(startGame, 100);
    }else{
        setInterval(startGame, 75);
    }

    canvas.classList.remove("hidden");
    score.classList.remove("hidden");
    strtBtn.classList.add("hidden");
    document.querySelector(".difficulty").classList.add("hidden");
    document.querySelector("h1").classList.add("hidden");
    stopBtn.classList.remove("hidden");
    console.log("Game starting");

    console.log("diffNum = "+diffNum);
    console.log("diffValue = "+diffValue);
}

function stop(){

    location.reload();
}

function gameIsOver(){
    canvas.classList.add("hidden");
    score.classList.add("hidden");
    stopBtn.classList.add("hidden");
    gameOver.classList.remove("hidden");
    finalScore.innerHTML = "Your Score Was: "+gameScore;
}

strtBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);
okBtn.addEventListener("click", stop);
