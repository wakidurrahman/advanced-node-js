import express from "express";
const routes = express.Router();

routes.get("/", (req, res) => {
  const title = "Express";
  res.send(`<!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title> ${title} </title>
        <link rel="stylesheet" href="styles.css"/>
      </head>
      <body>
        <h1>Hello ${title}! </h1>
        <p>Welcome to ${title}</>
      </body>
    </html>`);
});

export default routes;
