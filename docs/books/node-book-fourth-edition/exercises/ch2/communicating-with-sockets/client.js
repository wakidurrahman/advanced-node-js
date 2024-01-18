const net = require("net");
const HOSTNAME = "localhost";
const PORT = 5000;

const socket = net.connect(PORT, HOSTNAME);
// Connected to that socket
socket.write("World");

// We also need to add a function that will listen for data returned by the socket
socket.on('data', (data) => {
  console.log(data.toString());
});
