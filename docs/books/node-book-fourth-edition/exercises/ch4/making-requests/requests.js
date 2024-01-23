/**
 * To use the Node.js core `http` module to send an
 * HTTP GET request,
 * HTTP POST request
 */
const http = require("http");
const https = require("https");

/**
 * HTTP GET Request
 *
 * To send a request to "http://example.com",
 * expect to see the HTML representation of http://example.com printed to STDOUT
 *
 * our function forwards the response we receive from the endpoint to STDOUT.
 */

// http.get("http://example.com", (res) => res.pipe(process.stdout));

/**
 * HTTP POST request.
 */

// first need to define the data that we want to send with the request.
// const payload = `{
//     "name": "Beth",
//     "job": "Software Engineer"
// }`;

const payload = `{"test": "value"}`;

/***
 * To create a configuration object for the options we want to send with the HTTP POST request.
 *
 * To send the HTTP POST request to http://postman-echo.com.
 * This is a test endpoint
 * that will return our HTTP `headers`, `parameters`, and `content` of our HTTP POST request
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

// To send the HTTPS POST request.
const postRequestHttps = https.request(options, (res) => {
  // write the responses of HTTPS status code
  process.stdout.write(`Status Code: ${res.statusCode} \n`);

  // body to STDOUT once the response is received
  process.stdout.write("Body: ");
  // Forwards the request's response to STDOUT
  res.pipe(process.stdout);
});

// To send the HTTP POST request.
const postRequest = http.request(options, (res) => {
  // write the responses of HTTP status code
  process.stdout.write(`Status Code: ${res.statusCode} \n`);

  // body to STDOUT once the response is received
  process.stdout.write("Body: ");
  // Forwards the request's response to STDOUT
  res.pipe(process.stdout);
});

/**
 * An error event listener was added to the request object to capture and log any errors to STDOUT:
 * catch any errors that occur on the request
 */
postRequest.on("error", (err) => console.error("Error: ", err));
// To send our request with the payload
postRequest.end(payload);
