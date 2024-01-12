/**
 * We need to tell the program to listen for user input.
 * process.stdin: it is continuing to listen for `process.stdin` data events
 */
process.stdin.on("data", (userInput) => {
  // We can tell the program what it should do each time it detects a data event.

  // processing on each data event
  const name = userInput.toString().trim().toUpperCase();

  // check for whether the input string is empty, and log it STDERR if it is.
  if (name !== "") process.stdout.write(`Hello ${name}!`);
  else process.stderr.write("Input was empty");
});

process.on("SIGINT", () => {
    console.log("Received SIGINT. Press Control-D to exit.")
})
