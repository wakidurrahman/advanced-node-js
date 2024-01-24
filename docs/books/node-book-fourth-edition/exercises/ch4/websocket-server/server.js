/**
 * communicate between a browser and server using WebSockets.
 */
const WebSocket = require("ws");

// used the ws module to define a WebSocket server
const WebSocketServer = new WebSocket.Server({
  port: 3000,
});

// registered a listener for the connection event
WebSocketServer.on("connection", (socket) => {
  socket.on("message", (msg) => {
    const incomingMessage = msg.toString()
    console.log("Received: ", incomingMessage);
    if (incomingMessage.toString() === "Hello") socket.send("World!");
  });
});
