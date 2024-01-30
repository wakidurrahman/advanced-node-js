const express = require("express");
const bodyParser = require("body-parser");
const { join } = require("path");

const router = require("./routes/index.js");
const HOSTNAME = process.env.HOSTNAME || "0.0.0.0";
const PORT = process.env.PORT || 3000;

const app = express();

app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: false, // option instructs body-parser to use the querystring library for URL parsing.
  })
);

app.use("/", router);

app.listen(PORT, HOSTNAME, () => {
  console.log("Server listening on port 3000");
});
