// <-------------------- CONSTANTS AND VARIABLES -------------------->

let eatSound = new Audio('Audios/eating-sound-effect-36186.mp3');
let gameEndSound = new Audio('Audios/gameEnd_beeps-6008.mp3');
let inputDir = {x: 0, y: 0};
let snakeArray = [
    {x: 20, y: 17}
];
let food = {x: 7, y: 9};
let box = document.querySelector('.box');
let lastPaintTime = 0;
let speed = 10;
let score = 0;




// <-------------------- GAME ANIMATION FUNCTION -------------------->

function mainFunc(ctime){
    window.requestAnimationFrame(mainFunc);
    // console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameFunc();
}



function collisionFunc(snake){

    // IF THE SNAKE COLLIDE WITH ITSELF
    for(i=1; i<snakeArray.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        };
    }

    // IF SNAKE COLLIDE WITH THE BOUNDRY
    if(snake[0].x <=0 || snake[0].y <=0 || snake[0].x >=30 || snake[0].y >=20){
        return true;
    }
};



function gameFunc(){

    
    // COLLISION-AFTER UPDATE CASE IF SNAKE COLLIDE WITH FOOD 
    if(collisionFunc(snakeArray)){
        inputDir = {x: 0, y: 0};
        snakeArray = [{x:20 ,y: 17}];
        gameEndSound.play();
        alert(`GAME OVER: YOU SCORED ${score}`);
        score = 0;
    };

   
    // COLLISION-AFTER UPDATE CASE IF SNAKE COLLIDE WITH FOOD
    for(i=snakeArray.length - 2; i >= 0; i--){
        snakeArray[i+1] = {...snakeArray[i]};
    };
    snakeArray[0].x += inputDir.x;
    snakeArray[0].y += inputDir.y;


    // CHANGING THE SPEED ON BUTTON CLICK
    document.getElementById('1x').addEventListener('click', ()=>{speed = 10});
    document.getElementById('2x').addEventListener('click', ()=>{speed = 20});
    document.getElementById('4x').addEventListener('click', ()=>{speed = 40});


    // ARRAY/OBJECTS VALUES-UPDATE CASE IF SNAKE COLLIDE WITH FOOD 
    if((snakeArray[0].x === food.x) && (snakeArray[0].y === food.y)){
        snakeArray.unshift({x: snakeArray[0].x + inputDir.x, y: snakeArray[0].y + inputDir.y});
        let a = 1;
        let b = 20;
        food = {x: Math.floor(a + (b-a)* Math.random()) ,y: Math.floor(a + (b-a)* Math.random())};
        eatSound.play();
        score += 1;
        document.querySelector('.score').innerHTML = `score is: ${score} with speed ${speed}`;
    };


    // SNAKE AND FOOD VALUES/GRID POSITIONS 
    box.innerHTML = "";
    snakeArray.forEach((e , index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        box.appendChild(snakeElement);
    });
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    box.appendChild(foodElement);
};




// <-------------------- GAME LOGIC FUNCTION -------------------->

window.requestAnimationFrame(mainFunc);
window.addEventListener('keydown', (e)=>{
    inputDir = {x: 0, y: 1};
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
    
        default:
            break;
    }
});