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

// Register the express-session middleware.
app.use(
  session({
    name: "SESSIONID", // The name of the cookie for the session.
    secret: "keyboard cat", // The secret used to sign the session cookie. 
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true },
  })
);

app.use(
  bodyParser.urlencoded({
    extended: false, // option instructs body-parser to use the querystring library for URL parsing.
  })
);

// register the authentication router
app.use("/auth", auth);
app.use("/", router);

app.listen(PORT, HOSTNAME, () => {
  console.log("Server listening on port 3000");
});
