"use strict";
const http = require("http");

// Mock data.
const data = JSON.stringify([
  {
    id: "A1",
    name: "Vacuum Cleaner",
    rrp: "99.99",
    info: "The most powerful vacuum in the world.",
  },
  {
    id: "A2",
    name: "Leaf Blower",
    rrp: "303.33",
    info: "This product will blow your socks off.",
  },
  {
    id: "B1",
    name: "Chocolate Bar",
    rrp: "22.40",
    info: "Delicious overpriced chocolate.",
  },
]);

// The createServer function accepts a function known as the request handler.
// The request handler receives two arguments, which we name req (request) and res(response).
// req: The req object provides an API for interacting with the incoming HTTP request. It is an instance of http.IncomingMessage.
// res: The res object provides an API for specifying the outgoing response.
const server = http.createServer((req, res) => {
  /**
   * set CORS header
   *
   * The first res.setHeader call sets the `Access-Control-Allow-Origin` HTTP header to “*”.
   * The browser security model includes a mechanism called Cross-Origin Resource Sharing (CORS) that, by default, does not allow cross-domain requests.
   *
   * Since our hosted web app(client) is served on http://localhost:5050 and our service is hosted on http://localhost:3000,
   * requests from our web app to our service are considered cross-domain requests.
   *
   * To allow the browser to make this request, the service needs to explicitly allow it via the Access-Control-Allow-Origin header.
   * When we set Access-Control-Allow-Origin to “*”, it allows all domains access. This is suitable for local development.
   */
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Set Content-Type header to JSON
  res.writeHead(200, { "Content-Type": "application/json" });
  // send data
  // The res.end(data) call sends our data JSON string as the body of the HTTP response, and then ends the connection.
  res.end(data);
});

// By calling server.listen(3000), we instruct the HTTP server, which listens on port 3000.
server.listen(4000);
console.log("Server listening on port http://localhost:4000/");
