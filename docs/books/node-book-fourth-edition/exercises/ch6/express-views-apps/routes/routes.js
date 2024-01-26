import express from "express";
const routes = express.Router();

routes.get("/", (req, res) => {
  const title = "Express";
  res.render("index", {
    title: "Express with EJS template engine",
  });
});

export default routes;
