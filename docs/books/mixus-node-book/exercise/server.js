// http: a Node core library.
const http = require("node:http");

// Create a very simple Node.js HTTP server
const proxy = http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("okay");
  })
  .listen(8080, "127.0.0.1");
  console.log('Server running at http://localhost:8080/.');
