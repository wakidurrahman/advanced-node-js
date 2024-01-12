# Handling Input/Output

Node.js brought JavaScript to the server and has enabled us to interact with the operating system with JavaScript.

Node.js interacts with the operating system at a fundamental level: input and output.

## Handling standard I/O

- `STDIN (standard in)`: refers to an input stream that a program can use to read input from a command shell or Terminal. Similarly,
- `STDOUT (standard out)`: refers to the stream that is used to write the output.
- `STDERR (standard error)`: is a separate stream to STDOUT that is typically reserved for outputting errors and diagnostic data.

`process.stdin`, `process.stdout`, and `process.stderr` are all properties on the process object.

```js
process.stdin.on("data", (userInput) => {
  const name = userInput.toString().trim().toUpperCase();
  if (name !== "") {
    process.stdout.write(`Hello ${name}!`);
  } else {
    process.stderr.write("Input was empty.");
  }
});
```

A global `process` object provides the information and control of the Node.js `process`.
For each of the `I/O` channels, they emit data events for every chunk of data received. we were running the program in interactive mode where each data chunk was determined by the newline character when you hit Enter in your shell.

`process.stdin.on("data", (data) => {...});` is what listens for these data events.

Each data event returns a `Buffer` object. The `Buffer` object (typically named `data`) returns a binary representation of the input.

`const name = data.toString()` is what turns the `Buffer` object into a string. The `trim()` function removes the `newline` character that denoted the end of each input.

We write to `STDOUT` and `STDERR` using the respective properties on the process object (`process.stdout.write`, `process.stderr.write`). During the recipe, we also used `CTRL + C` to exit the program in the shell. CTRL + C sends `SIGINT`, or `signal interrupt`, to the Node.js process.
