const express = require("express");

const router = require("./routes/index.js");
const auth = require("./routes/auth.js");

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
  setTimeout(() => {
    callback;
  }, 0);
};

app.get("/", (req, res) => {
  asyncWork(() => {
    const upper = (req.query.msg || "").toUpperCase();
    res.send(upper);
  });
});

app.listen(PORT, HOSTNAME, () => {
  console.log("Server listening on port 3000");
});
