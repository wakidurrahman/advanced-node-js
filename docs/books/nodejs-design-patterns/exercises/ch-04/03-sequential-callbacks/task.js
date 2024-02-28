const asyncOperation = (callback) => process.nextTick(callback);

function task1(callback) {
  console.log('Task1 called');
  asyncOperation(() => task2(callback));
}

function task2(callback) {
  console.log('Task2 called');
  asyncOperation(() => task3(callback));
}

function task3(callback) {
  console.log('Task3 called');
  asyncOperation(() => {
    // Finally executes the callback
    console.log('Finally executes the callback');
    callback('Hello world!');
  });
}

task1((msg) => {
  if (msg) {
    console.log("Callback argument catch: ",msg);
  }
  // executed when task1, task2, and task3 are completed.
  console.log('Tasks 1, 2 and 3 executed');
});
