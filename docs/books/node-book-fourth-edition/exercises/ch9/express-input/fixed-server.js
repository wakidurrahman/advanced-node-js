const express = require("express");

const HOSTNAME = process.env.HOSTNAME || "0.0.0.0";
const PORT = process.env.PORT || 3000;

/**
 * Created an Express.js server that responds to the "/" request and
 * handles a single parameter, msg.
 * The Express.js server returns the msg value we pass it but in uppercase form
 */

const app = express();

/**
 * the asyncWork() function is for demonstrational purposes only.
 * In a real application, we could expect some asynchronous task to happen, such as a query to be made to a database or external service.
 * @param {*} callback
 */
const asyncWork = (callback) => {
  setTimeout(callback, 0);
};

app.get("/", (req, res) => {
    console.log("request", req.query);
  asyncWork(() => {
    let msg = req.query.msg;
    // Our logic to always set the msg variable to the last value is working.
    if (Array.isArray(msg)) msg = msg.pop();
    const upper = (msg || "").toUpperCase();
    res.send(upper);
  });
});


app.listen(PORT, HOSTNAME, () => {
  console.log("Server listening on port 3000");
});
