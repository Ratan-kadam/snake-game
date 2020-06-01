/*
  As we want only one instance of snake in game
  making the snake class as singleton;

  to verify: put below lines in init.js

  const snake1 = new snake('cobra');
  const snake2 = new snake('python');
  console.log("snake name:", snake1.name); // output cobra
  console.log("snake1 name:", snake2.name); // outout cobra
*/

function Snake (name) {
  'use strict'

  if (!!Snake.instance) {
    return Snake.instance;
  }
  Snake.instance = this;

  this.name = name || 'Anaconda';
  let x=0;
  let y=0;
  const height = 10;
  const width = 10;
  const displacementFactor = 10;
  let currentDirection;
  let lengthOfSnake = 1; // initial head
  const tail = [];

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

  function eatPrey(preyX, preyY) {
    if (x === preyX && y === preyY) {
      lengthOfSnake++;
      tail.push({ x: preyX, y: preyY });
      return true;
    }
    return false;
  }

  function checkSelfBite(newhead) {
    for(var i=0; i < tail.length; i++) {
      if (tail.length > 1 && newhead.x == tail[i].x && newhead.y == tail[i].y) {
        return true;
      }
    }
  }

  function drawSnake() {
    context.fillStyle = COLORS.SNAKE;
    for (var i=0; i < tail.length; i++) {
      context.fillRect(tail[i].x, tail[i].y, height, width);
    }
    // update tail head location element which is last element
    for (var i=0; i < tail.length - 1; i++) {
      tail[i] = tail[i+1];
    }

    updateCordinatesAuto();

    let exitGame = checkSelfBite({x:x, y:y});

    if (exitGame) {
      return true;
    }
    tail[lengthOfSnake - 1] = { x: x, y: y};

  }

  function changeDirection(newDirection) {
    if (currentDirection === DIRECTION.UP && newDirection ===  DIRECTION.DOWN) {
      return;
    }
    if (currentDirection === DIRECTION.DOWN && newDirection ===  DIRECTION.UP) {
      return;
    }
    if (currentDirection === DIRECTION.LEFT && newDirection ===  DIRECTION.RIGHT) {
      return;
    }
    if (currentDirection === DIRECTION.RIGHT && newDirection ===  DIRECTION.LEFT) {
      return;
    }

    currentDirection = newDirection
  }

  return {
    name: getName(),
    x: getX,
    y: getY,
    drawSnake: drawSnake,
    changeDirection: changeDirection,
    eatPrey: eatPrey,
  }
};
