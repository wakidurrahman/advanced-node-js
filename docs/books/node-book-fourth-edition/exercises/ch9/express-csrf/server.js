/**
 * Create a server that is vulnerable to CSRF attacks
 */
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const { join } = require("path");

const HOSTNAME = process.env.HOSTNAME || "0.0.0.0";
const PORT = process.env.PORT || 3000;

const app = express();

const mockUser = {
  username: "beth",
  password: "badpassword",
  email: "beth@example.com",
};

// Register the express-session middleware.
app.use(
  session({
    name: "SESSIONID", // The name of the cookie for the session.
    secret: "CSRF attacks", // The secret used to sign the session cookie.
    resave: false,
    saveUninitialized: false,
  })
);

app.use(
  bodyParser.urlencoded({
    extended: false, // option instructs body-parser to use the `qs` querystring library for URL parsing.
  })
);

// define the routes for our server
app.get("/", (req, res) => {
  if (req.session.user) return res.redirect("/account");
  res.send(`
        <h1>Social Media Account - Login</h1>
        <form method="POST" action="/">
            <label for="username">Username:</label><br>
            <input type="text" id="username" name="username" value="beth"><br>
            <label for="password">Password:</label><br>
            <input type="password" id="password" name="password" value="badpassword"><br><br>
            <input type="submit" value="Submit">
        </form> 
    `);
});

app.post("/", (req, res) => {
  if (
    req.body.username === mockUser.username &&
    req.body.password === mockUser.password
  ) {
    req.session.user = req.body.username;
  }
  if (req.session.user) return res.redirect("/account");
  else res.redirect("/");
});

app.get("/account", (req, res) => {
  if (!req.session.user) return res.redirect("/");
  res.send(`
        <h2>Social Media Account - Settings</h2>

        <form method="POST" action="/update">
            <label for="email">Email: ${mockUser.email}</label><br>
            <input type="email" id="email" name="email" value="${mockUser.email}"><br><br><br>
            <input type="submit" value="Update">
        </form> 
    `);
});

app.post("/update", (req, res) => {
  if (!req.session.user) return res.sendStatus(403);
  mockUser.email = req.body.email;
  res.redirect("/");
});

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server listening on port ${PORT}`);
});
