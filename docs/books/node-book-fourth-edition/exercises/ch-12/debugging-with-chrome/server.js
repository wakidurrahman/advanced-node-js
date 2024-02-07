const express = require("express");

const random = require("./random.js");

const HOSTNAME = process.env.HOSTNAME || "0.0.0.0";
const PORT = process.env.PORT || 3000;

const app = express();

app.get("/:number", (req, res) => {
  const num = req.params.number;
  res.status(200).send(`Random Number:  ${random(num).toString()}`);
});

app.listen(PORT, HOSTNAME, () => {
  console.log("Server listening on port 3000");
});
