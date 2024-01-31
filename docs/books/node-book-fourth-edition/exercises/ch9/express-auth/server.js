const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const { join } = require("path");

const router = require("./routes/index.js");
const auth = require("./routes/auth.js");
const HOSTNAME = process.env.HOSTNAME || "0.0.0.0";
const PORT = process.env.PORT || 3000;

const app = express();

app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");

// register the express-session middleware.
app.use(
  session({
    name: "SESSIONID",
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  })
);

app.use(
  bodyParser.urlencoded({
    extended: false, // option instructs body-parser to use the querystring library for URL parsing.
  })
);

app.use("/auth", auth);
app.use("/", router);

app.listen(PORT, HOSTNAME, () => {
  console.log("Server listening on port 3000");
});
