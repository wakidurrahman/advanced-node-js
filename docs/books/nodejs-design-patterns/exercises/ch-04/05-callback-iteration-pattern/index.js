const tasks = [
  (callback) => {
    console.log('Task 1');
    setTimeout(callback, 1000);
  },
  (callback) => {
    console.log('Task 2');
    setTimeout(callback, 1000);
  },
  (callback) => {
    console.log('Task 3');
    setTimeout(callback, 1000);
  },
  (callback) => {
    console.log('Task 4');
    setTimeout(callback, 1000);
  },
  (callback) => {
    console.log('Task 5');
    setTimeout(callback, 1000);
  },
  (callback) => {
    console.log('Task 6');
    setTimeout(callback, 1000);
  },
];

function iterate(index) {
  console.log('Index ---- ', index);
  if (index === tasks.length) {
    return finish();
  }

  const task = tasks[index];
  console.log('Particular Task -- ', task);
  task(() => iterate(index + 1));
}

function finish() {
  // Iteration completed
  console.log('All tasks executed ----- wow!');
}

iterate(0);
