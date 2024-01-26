import express from "express";

import { sentence } from './get-name/index.mjs';
import { wordOfSentence } from './get-name/sentence.js';

const HOSTNAME = process.env.HOSTNAME || "0.0.0.0";
const PORT = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => {
  res.send(`Simple server with one route using express module. Hello from ${sentence}! || ${wordOfSentence}`);
});

app.listen(PORT, HOSTNAME, () =>
  console.log("Express server started on port", PORT)
);
