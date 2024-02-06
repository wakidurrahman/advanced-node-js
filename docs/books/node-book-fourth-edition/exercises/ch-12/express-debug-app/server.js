const express = require("express");
const debug = require("debug")("my-server");
const app = express();

app.get("/", (req, res) => {
  debug("HTTP GET request to /");
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
