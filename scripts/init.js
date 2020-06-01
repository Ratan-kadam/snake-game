// main executor all global varibales required for all other scripts
const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d");
const cobra = new Snake('Cobra');
const mouse = new Prey('mouse');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

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

(function() {
  window.addEventListener('keyup', function(e) {
    const { key } = e;
    cobra.changeDirection(key);
  });

  var gameInterval = setInterval(function() {
    context.clearRect(0,0,canvasWidth,canvasHeight);
    mouse.drawPrey();

    const exitGame = cobra.drawSnake();
    if (exitGame) {
      clearInterval(gameInterval);
    }

    const newPreyLocation = cobra.eatPrey(mouse.x(), mouse.y());

    if (newPreyLocation) {
      mouse.newLocation();
    }
  }, 250);
})();
