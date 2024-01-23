/**
 * To use the Node.js core `http` module to send an
 * HTTP GET request,
 * HTTP POST request
 */
const http = require("http");

http.get("http://example.com", (res) => res.pipe(process.stdout));

// first need to define the data that we want to send with the request
const payload = `{
    "name": "Beth",
    "job": "Software Engineer"
    }`;

/***
 * to create a configuration object for the options we want to send with the HTTP POST request.
 *
 * We're going to send the `HTTP POST` request to http://postman-echo.com.
 * This is a test endpoint that
 * will return our HTTP `headers`, `parameters`, and `content` of our HTTP POST request
 */
const hostname = "postman-echo.com";
const options = {
  method: "POST",
  hostname,
  path: "/post",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(payload),
  },
};
