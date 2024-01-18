// Nodejs provides a core module name 'dgram' that provides APIs to interact with UDP sockets.

const dgram = require("dgram");
const PORT = 5000;
// To create a socket, the dgram module exposes a 'createSocket()' API
// We pass the udp6 function to instruct that we'd like the socket to interface over both IPv4 and IPv6
const socket = dgram.createSocket('udp6');

// To instruct the socket to start listening for connections, use the `bind` function
// Note that it is not necessary to provide a port. 
// If none is provided (or you provide 0); the operating system will bind to a random free port.
socket.bind(PORT) 

