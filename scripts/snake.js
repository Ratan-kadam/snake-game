/*
  As we want only one instance of snake in game
  making the snake class as singleton;

  to verify: put below lines in init.js

  const snake1 = new snake('cobra');
  const snake2 = new snake('python');
  console.log("snake name:", snake1.name); // output cobra
  console.log("snake1 name:", snake2.name); // outout cobra
*/

function snake (name) {
  'use strict'

  if (!!snake.instance) {
    return snake.instance;
  }
  snake.instance = this;

  this.name = name || 'Anaconda';
  let x=0;
  let y=0;
  const height = 10;
  const width = 10;
  const displacementFactor = 10;
  let currentDirection;

  function getName () {
    return name;
  }

  function getX() {
    return x;
  }

  function getY() {
    return y;
  }

  function updateCordinatesAuto() {
    let newX;
    let newY;
    switch (currentDirection) {
      case DIRECTION.UP:
          newY = y - displacementFactor;
          y = newY < 0 ? canvasHeight : newY;
        break;
      case DIRECTION.DOWN:
          newY = y + displacementFactor;
          y = newY > canvas.height ? 0 : newY;
        break;
      case DIRECTION.RIGHT:
          newX = x + displacementFactor;
          x = newX > canvas.width ? 0 : newX;
        break;
      case DIRECTION.LEFT:
          newX = x - displacementFactor;
          x = newX < 0 ? canvas.width : newX;
        break;
      default:
    }
  }

  function drawSnake() {
    updateCordinatesAuto();
    context.fillRect(getX(),getY(),height, width);
  }

  function changeDirection(direction) {
    currentDirection = direction
  }

  return {
    name: getName(),
    x: getX(),
    y: getY(),
    drawSnake: drawSnake,
    changeDirection: changeDirection,
  }
};
