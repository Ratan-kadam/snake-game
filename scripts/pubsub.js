// using pubsub to implement score update and other visual dom manipulations

function Pubsub() {
  let score = 0;
  const subscribers = [];

  function updateScore() {
    score = score + 1;
    publish();
  }

  function resetScore() {
    score = 0;
    publish();
  }

  function addSubscriber(subscriber) {
    subscribers.push(subscriber);
  }

  function publish() {
    for(var i=0; i < subscribers.length; i++) {
      subscribers[i].notify();
    }
  }

  return {
    score: function() {
      return score;
    },
    addSubscriber: addSubscriber,
    publish: publish,
    updateScore: updateScore,
    reset: resetScore
  }
}


function Subscriber(name, id) {
  const subscriberName = name;

  return {
    name: function() {
      return subscriberName;
    },
    notify: null, /* needs to be implemented by each object */
  }
}
