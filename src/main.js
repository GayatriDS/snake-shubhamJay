let snake=undefined;
let food=undefined;
let numberOfRows=60;
let numberOfCols=120;

let animator=undefined;


const hasSnakeCollidedHori = function(snake){
  return snake.hasCollidedHorizontally(0,numberOfCols-1);
};

const hasSnakeCollidedVert = function(snake){
  return snake.hasCollidedVertically(0,numberOfRows-1);
};

const hasSnakeCollidedWall = function(snake){
  return hasSnakeCollidedHori(snake) || hasSnakeCollidedVert(snake);
};

const hasSnakeEatenItself = function(snake){
  return snake.isEatingItself();
}

const isGameOver = function(snake){
  return hasSnakeCollidedWall(snake) || hasSnakeEatenItself(snake);
};

const getBody  = function(){
  return document.getElementById("gameBody");
};

const createRestarButton = function(){
  let button = document.createElement("button");
  button.innerText = "Restart Game";
  button.id = "restartButton";
  button.addEventListener("click",restartGame);
  return button;
};

const showButtonToPlayAgain = function () {
  let body = getBody();
  let restartButton = createRestarButton();
  body.appendChild(restartButton);
};

const stopGame = function(){
  clearInterval(animator);
  showButtonToPlayAgain();
};

const animateSnake=function() {
  let oldHead=snake.getHead();
  let oldTail=snake.move();
  let head=snake.getHead();
  paintBody(oldHead);
  unpaintSnake(oldTail);
  paintHead(head);
  if(head.isSameCoordAs(food)) {
    snake.grow();
    createFood(numberOfRows,numberOfCols);
    drawFood(food);
  };
  if(isGameOver(snake)){
    stopGame();
  };
}

const changeSnakeDirection=function(event) {
  switch (event.code) {
    case "KeyA":
      snake.turnLeft();
      break;
    case "KeyD":
      snake.turnRight();
      break;
    case "KeyC":
      snake.grow();
      break;
    default:
  }
}

const addKeyListener=function() {
  let grid=document.getElementById("keys");
  grid.onkeyup=changeSnakeDirection;
  grid.focus();
}

const createSnake=function() {
  let tail=new Position(12,10,"east");
  let body=[];
  body.push(tail);
  body.push(tail.next());
  let head=tail.next().next();

  snake=new Snake(head,body);
}

const createFood=function(numberOfRows,numberOfCols) {
  food=generateRandomPosition(numberOfCols,numberOfRows);
}

const restartGame = function(){
  document.location.reload();
  // startGame();
};

const startGame=function() {
  createSnake();
  drawGrids(numberOfRows,numberOfCols);
  drawSnake(snake);
  createFood(numberOfRows,numberOfCols);
  drawFood(food);
  addKeyListener();
  animator=setInterval(animateSnake,140);
}

window.onload=startGame;
