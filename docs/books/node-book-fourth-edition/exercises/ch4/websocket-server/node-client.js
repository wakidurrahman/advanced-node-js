/**
 * create a WebSocket client in Node.js, enabling two Node.js programs to communicate over WebSockets.
 * 
 * Created a WebSocket communication between two Node.js programs
 */

const WebSocket = require("ws");
const ws = new WebSocket("ws://localhost:3000");

// Set up some listeners on our sockets.

ws.on("open", () => console.log("Connected"));
ws.on("close", () => console.log("Disconnected"));
ws.on("message", (msg) => console.log("Received: ", msg.toString()));

setInterval(() => {
  ws.send("Hello");
}, 3000);
