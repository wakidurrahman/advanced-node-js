const { Router } = require("express");

const router = Router();

/**
 * The authentication router will contain route handlers for the `/login` and `/logout` endpoints.
 * The `/login` endpoint will require both an HTTP `GET` and an HTTP `POST` handler.
 */

router.get("/login", (req, res, next) => {
  res.render("login", { fail: false });
  next();
});

/**
 * The HTTP `POST` handler for the `/login` endpoint will receive and parse the form data (username and password) to validate the user credentials.
 */

router.post("/login", (req, res, next) => {
  if (req.session.user) {
    res.redirect("/");
    next();
    return;
  }

  if (req.body.username === "beth" && req.body.password === "badpassword") {
    req.session.user = { name: req.body.username };
    res.redirect("/");
    next();
    return;
  }
  res.render("login", { fail: true });
  next();
});

router.get("/logout", (req, res, next) => {
  req.session.user = null;
  res.redirect("/");
});

module.exports = router;
