# Web Protocols

Node.js was built with web servers in mind.

application programming interfaces (APIs)
HyperText Transfer Protocol (HTTP)

It's important to have an understanding of how Node.js interacts with underlying `web protocols`, as these `web protocols` and fundamental concepts form the basis of most real-world web applications. Later,

Will cover the following:

- Using `http module` to make `HTTP` requests
- Building an `HTTP server` to accept `GET requests`
- Handling `HTTP` `POST requests`
- Using formidable to handle `file uploads`
- Using ws to create a `WebSocket` server
- Sending an automated `email` using your own `SMTP` server

📒 `HTTP`: is a `stateless protocol` that was originally designed to facilitate communication between `web browsers` and `servers`.

## #️⃣ Using http module to make HTTP requests

To build `HTTP servers`, the Node.js core `http` and `https` modules expose APIs that can be used to send requests to other servers.

To use the `Node.js` core `http` and `https` modules to send both an `HTTP` `GET request` and an `HTTP` `POST request`.

📒 **_Important note_** : Postman `(http://postman.com)` is a platform for API development and provides a representational state transfer (REST) client app that you can download to use to send HTTP requests. Postman also provides a service named Postman Echo—this provides an endpoint that you can send your HTTP requests to for testing. Refer to the Postman Echo documentation at: [Link](https://www.postman.com/postman/workspace/published-postman-templates/documentation/631643-f695cab7-6878-eb55-7943-ad88e1ccfd65?ctx=documentation)

We leveraged the Node.js core `http` module to send `HTTP GET` and `HTTP POST` requests.

**_The Node.js core `http module` relies on the underlying Node.js core `net module`._**

### 📝 For the HTTP GET request, we call the http.get() function with two parameters:

```js
http.get("http://example.com", (res) => res.pipe(process.stdout));
```

- The first parameter is the endpoint that we wish to send the request to,
- The second is the callback function. The callback function executes once the HTTP GET request is complete.

### 📝 To make the HTTP POST request, we use the http.request() function.

This function also takes two parameters

```js
const payload = `{"test": "value"}`;
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

// To send the HTTP POST request.
const postRequest = http.request(options, (res) => {
  // write the responses of HTTP status code
  process.stdout.write(`Status Code: ${res.statusCode} \n`);

  // body to STDOUT once the response is received
  process.stdout.write("Body: ");
  // Forwards the request's response to STDOUT
  res.pipe(process.stdout);
});

// catch any errors that occur on the request
postRequest.on("error", (err) => console.error("Error: ", err));
// To send our request with the payload
postRequest.end(payload);
```

- The first parameter to the `request()` function is the options object. we used the options object to configure:
  - Which HTTP method to use. `method: "POST",`
  - the hostname. `const hostname = "postman-echo.com";`
  - the path the request should be sent to, `path: "/post",`
  - the headers to be set on the request. `headers: { ... },`
- The second parameter to the `request()` function is the callback function to be executed upon completion of the HTTP POST request.

### 📝 how to send requests over HTTPS.

`HTTPS` stands for `HyperText Transfer Protocol Secure`. `HTTPS` is an extension of the HTTP protocol.
Communications over `HTTPS` are `encrypted`. Node.js core provides an `https module`, alongside the `http module`, to be used when dealing with `HTTPS` communications.

```js
const https = require("https");

https.get(...);
https.request(...);
```
