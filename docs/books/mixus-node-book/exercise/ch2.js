const fs = require("fs");
// Example: 1

// Set function to be called after 1 second
setTimeout(() => {
  console.log(`Timeout run at ${new Date().toTimeString()}`);
}, 1000);

// Store the start time
let startTime = new Date();
console.log(`Enter loop at : ${startTime.toTimeString()}`);

// Run a loop for 4 seconds
let i = 0;
// increment i while (current time < start time + 4000 ms)
while (new Date().getTime() < startTime.getTime() + 4000) {
  i++;
}

console.log(
  `Exit loop at: ${new Date().toTimeString()} . Ran ${i}  iterations.`
);

// Example: 2

console.log('----------- Example: 2 -----------------------')
// Reading a file
setTimeout(() => {
  console.log(`setTimeout at: ${new Date().toTimeString()}`);
}, 1000);

// when you start an operation like reading a file,
// you can pass control back to Node and have your code run when the data has been read.
fs.readFile("./file/test.txt",'utf8', (err, result) => {
  // Event-loop get when the data has been read
  if (err) throw err;
  console.log("Read file Data: ", result.toString());
});
