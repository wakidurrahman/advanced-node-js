/**
 * we will create a TCP server and a TCP client and allow them to communicate.
 * TCP stands for "Transmission Control Protocol".
 * TCP provides a standard that allows devices to communicate over a network.
 */

const net = require("net");

// To store the hostname and port
const HOSTNAME = "localhost";
const PORT = 5000;

// Create the server
net
  .createServer((socket) => {
    console.log("Client Connected.");
    // Socket event listener
    socket.on("data", (name) => {
      socket.write(`Hello ${name}!`);
    });
  })
  .listen(PORT, HOSTNAME);
