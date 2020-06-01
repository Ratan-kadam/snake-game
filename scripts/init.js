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
      context.fillText("Game Over", 130,250);
      document.getElementById('game_restart').classList.add('opacity-full');
    break;
    default:
  }
}

function loadGame() {
  cobra.reset()
  manageDomManipulation(GAME_STATUS.INIT);
  gameInterval = setInterval(function() {
    context.clearRect(0,0,canvasWidth,canvasHeight);
    mouse.drawPrey();

      const exitGame = cobra.drawSnake();
      if (exitGame) {
        manageDomManipulation(GAME_STATUS.EXIT);
        clearInterval(gameInterval);
      }

      const newPreyLocation = cobra.eatPrey(mouse.x(), mouse.y());

      if (newPreyLocation) {
        mouse.newLocation();
      }
    }, 250);
}

var eventRegistration = function() {
  window.addEventListener('keyup', function(e) {
    const { key } = e;
    cobra.changeDirection(key);
  });
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
