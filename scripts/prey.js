function Prey (name) {
  'use strict'

  if (!!Prey.instance) {
    return Prey.instance;
  }
  Prey.instance = this;

  let x = 10; // initial location
  let y = 10;
  const samplePreyLocations = [50, 100, 150, 200, 250, 300, 350, 400, 450];

  this.name = name;

  function getX() {
    return x;
  }

  function getY() {
    return y;
  }

  function randomIndex() {
    return Math.floor((Math.random() * 10) % 9);
  }

  function pickRandomCordinate() {
    const index = randomIndex();
    return samplePreyLocations[index];
  }

  function changeLocation() {
    x = pickRandomCordinate();
    y = pickRandomCordinate();
  }

  function drawPrey() {
    context.fillStyle= COLORS.MOUSE;
    context.fillRect(getX(), getY(), 10, 10);
  }

  return {
    x: getX,
    y: getY,
    drawPrey: drawPrey,
    newLocation: changeLocation,
  }
}
