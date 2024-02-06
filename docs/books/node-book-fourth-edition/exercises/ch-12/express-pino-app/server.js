const express = require("express");
const HOSTNAME = process.env.HOSTNAME || "0.0.0.0";
const PORT = process.env.PORT || 3000;
const app = express();

// Add the `pino` and `express-pino-logger`, after the PORT variable assignment
const pino = require("pino")();
const logger = require("express-pino-logger")({
  instance: pino,
});

// register our pino logger as an Express.js middleware.
app.use(logger);
const getRandomNumber = () => Math.floor(Math.random() * 100) + 1;

app.get("/", (req, res) => {
  req.log.info("Generating random number");
  res.status(200).send(`Random Number:  ${getRandomNumber()}`);
});

app.listen(PORT, HOSTNAME, () => {
  pino.info(`Server listening on port ${PORT}`);
  console.log(`Server listening on port ${PORT}`);
});
