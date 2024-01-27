import express from "express";
const routes = express.Router();

routes.get("/", (req, res) => {
  res.render("index", {
    title: "Express with EJS template engine",
  });
});

export default routes;
