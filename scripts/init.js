// main executor all global varibales required for all other scripts
const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d");
const cobra = new Snake('Cobra');
const mouse = new Prey('mouse');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
let gameInterval;


const DIRECTION = {
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
  RIGHT: 'ArrowRight',
  LEFT: 'ArrowLeft'
};

const CONTROLS = [DIRECTION.UP, DIRECTION.DOWN, DIRECTION.RIGHT, DIRECTION.LEFT];

const COLORS = {
  SNAKE: '#f2f3f4',
  MOUSE: '#7ac7c0',
  EXIT: '#860111',
};

const GAME_STATUS = {
  INIT: 'init',
  EXIT: 'exit',
};

function manageDomManipulation(status) {
  switch (status) {
    case 'init':
      document.getElementById('game_restart').classList.remove('opacity-full');
      break;
    case 'exit':
      context.fillStyle = COLORS.EXIT;
      context.font = "40px Arial";
      context.fillText("Game Over", 130, 250);
      document.getElementById('game_restart').classList.add('opacity-full');
      break;
    default:
  }
}

function loadGame() {
  cobra.reset()
  manageDomManipulation(GAME_STATUS.INIT);
  gameInterval = setInterval(function() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    mouse.drawPrey();
    cobra.drawSnake();
    const exitGame = cobra.checkSelfBite();
    if (exitGame) {
      manageDomManipulation(GAME_STATUS.EXIT);
      clearInterval(gameInterval);
    }

    const newPreyLocation = cobra.eatPrey(mouse.x(), mouse.y());

    if (newPreyLocation) {
      mouse.newLocation();
    }
  }, 200);
}

function changeDirection(e) {
  const {
    key
  } = e;
  const isKeyAllowed = CONTROLS.indexOf(key) > -1;
  if (isKeyAllowed) {
    cobra.changeDirection(key);
  }
}

function debouce(func, delay) {
  let timer;
  return function(args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      func(args)
    }, delay);
  }
}

var eventRegistration = function() {
  window.addEventListener('keyup', debouce(changeDirection, 100));
};

function restart() {
  if (gameInterval) {
    clearInterval(gameInterval);
  }
  loadGame();
}

(function() {
  eventRegistration();
  loadGame();
})();
