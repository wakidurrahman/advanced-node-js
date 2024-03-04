const makeSampleTask = (name) => (callback) => {
  console.log(`${name} started`);
  setTimeout(() => {
    console.log(`${name} completed----------`);
    callback();
  }, Math.random() * 2000);
};

const tasks = [
  makeSampleTask('Task 1'),
  makeSampleTask('Task 2'),
  makeSampleTask('Task 3'),
  makeSampleTask('Task 4'),
  makeSampleTask('Task 5'),
  makeSampleTask('Task 6'),
  makeSampleTask('Task 7'),
  makeSampleTask('Task 8'),
  makeSampleTask('Task 9'),
  makeSampleTask('Task 10'),
  makeSampleTask('Task 11'),
];

const concurrency = 2;
let running = 0;
let completed = 0;
let index = 0;

// [1]: 
/**
 * [1]: We have an iterator function, 
 * Which we call next(), and then an inner loop 
 * that spawns as possible in parallel while staying within the concurrency limit.
 * 
 */
function next() {
  while (running < concurrency && index < tasks.length) {
    console.log('While Start: ', index);
    console.log('Running: ', running);
    const task = tasks[index++];

    // [2]
    /**
     * The callback we pass to each task,
     * which checks whether we completed all the tasks in the list.
     * If there are still tasks to run, it invokes next() to spawn another set of tasks.
     */

    task(() => {
      if (++completed === tasks.length) {
        return finish('Wow');
      }
      console.log('Task Index: ', index);
      running--;
      next();
    });

    console.log('Index Count : ', index);
    running++;
  }
}

next();

function finish(message) {
  // All the tasks completed
  console.log(`${message} all the tasks executed!`);
}
