/**
 * Defined a regular HTTP server to serve our index.html file.
 */
const fs = require("fs");
const http = require("http");
const path = require("path");
/**
 * It's a good practice to allow the `hostname` and `port` values to be set via environment variables
 *
 */
const HOSTNAME = process.env.HOSTNAME || "0.0.0.0";
const POST = process.env.POST || 3001;

const indexHtmlPage = fs.readFileSync("public/index.html");

const formHtmlPage = fs.readFileSync(
    path.join(__dirname, "public", "index.html")
  );

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.end(indexHtmlPage);
});

server.listen(POST, HOSTNAME, () => {
  console.log(`Server listening on port ${server.address().port}`);
});
