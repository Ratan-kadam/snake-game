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

  var instance;

  this.name = name || 'Anaconda';

  function getName () {
    return name;
  }

  snake.instance = this;

  return {
    name: getName(),
  }
};
