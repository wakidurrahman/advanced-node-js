import { EventEmitter } from 'events';

function helloEvents() {
  const eventEmitter = new EventEmitter();

  setTimeout(() => eventEmitter.emit('complete', 'Hello World!'), 100);
  return eventEmitter;
}

function helloCallback(callback) {
  setTimeout(() => callback(null, 'Hello World from callback function'), 100);
}

helloEvents().on('complete', (message) => console.log(message));
helloCallback((error, message) => console.log(message));
