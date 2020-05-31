// main executor all global varibales required for all other scripts
const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d");
const cobra = new snake('Cobra');
context.fillStyle = "#D1FF04";
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const DIRECTION = {
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
  RIGHT: 'ArrowRight',
  LEFT: 'ArrowLeft'
};

(function() {
  window.addEventListener('keyup', function(e) {
    const { key } = e;
    cobra.changeDirection(key);
  });

  setInterval(function() {
    context.clearRect(0,0,canvasWidth,canvasHeight);
    cobra.drawSnake()
  }, 230);
})();
