// function makeSampleTask(name) {
//   return (callback) => {
//     console.log(`${name} started`);
//     setTimeout(() => {
//       console.log(`${name} completed`);
//       callback();
//     }, Math.random() * 2000);
//   };
// }

// Here's the makeSampleTask function converted to an arrow function:
const makeSampleTask = (name) => (callback) => {
  console.log(`${name} started`);
  setTimeout(() => {
    console.log(`${name} completed`);
    callback();
  }, Math.random() * 2000);
};

const tasks = [
  makeSampleTask('Task 1'),
  makeSampleTask('Task 2'),
  makeSampleTask('Task 3'),
  makeSampleTask('Task 4'),
  makeSampleTask('Task 5'),
];

let completed = 0;

tasks.forEach((task) =>
  task(() => {
    if (++completed === tasks.length) {
      finish('Wow ');
    }
  })
);

function finish(message) {
  // all the tasks completed
  console.log(`${message} all tasks executed!`);
}
