/**
 * Step 1: to demonstrate a JSON pollution attack.
 *
 */
const http = require("http");

const { STATUS_CODES } = http;

const HOSTNAME = process.env.HOSTNAME || "0.0.0.0";
const PORT = process.env.PORT || 3000;

const greeting = (req, res) => {
  let data = "";
  req.on("data", (chunk) => (data += chunk));

  req.on("end", () => {
    try {
      data = JSON.parse(data);
    } catch (err) {
      res.end("");
      return;
    }

    if (data.hasOwnProperty("name")) {
      res.end(`${data.msg} ${data.name}`);
    } else {
      res.end(data.msg);
    }
  });
};

/**
 * create a server that is susceptible to a JSON pollution attack.
 *
 * The server will accept `msg` and `name` as `URL parameters` and respond with a message built with these values:
 */
const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/") {
    greeting(req, res);
    return;
  }

  res.statusCode = 404;
  res.end(STATUS_CODES[res.statusCode]);
});

server.listen(PORT, HOSTNAME, () => {
  console.log("Server listening on port 3000");
});

