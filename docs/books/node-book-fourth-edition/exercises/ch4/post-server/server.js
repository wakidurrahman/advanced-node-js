/**
 * To create a server that accepts and handles both
 * 1. HTTP GET requests
 * 2. HTTP POST requests
 * using the Node.js core APIs provided by the `http` module.
 */

const fs = require("fs");
const http = require("http");
const path = require("path");

// Create a reference to public

const formHtmlPage = fs.readFileSync(
  path.join(__dirname, "public", "form.html")
);

// Provide html form page
function get(res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  // We call the res.end() function to finish the `WriteStream`, writing the response and ending the HTTP connection.
  res.end(formHtmlPage);
}
// Handle Post request
function post(req, res) {
  if (req.headers["content-type"] !== "application/x-www-form-urlencoded") {
    error(res, 415);
    return;
  }

  let input = "";

  /**
   * Within our request handler function, we register a listener for the `data event`.
   * Each time a `chunk` of data is received, 
   * We convert it to a string using the toString() method and append it to our input variable.
   */
  req.on("data", (chunk) => {
    input += chunk.toString();
  });

  /**
   * Once all the data is received from the client, the `end event` is triggered.
   * We pass a callback function to the end event listener, which gets called only once all data is received.
   */
  req.on("end", () => {
    console.log(input);
    res.end(http.STATUS_CODES[200]);
  });
}

// Handle error
function error(res, code) {
  res.statusCode = code;
  res.end(http.STATUS_CODES[code]);
}

const server = http.createServer((req, res) => {
  // Check GET request
  if (req.method === "GET") {
    get(res);
    return;
  }

  // Checks POST request
  if (req.method === "POST") {
    post(req, res);
    return;
  }
  error(res, 405);
});

server.listen(3000, () => {
  console.log("Server response!");
});
