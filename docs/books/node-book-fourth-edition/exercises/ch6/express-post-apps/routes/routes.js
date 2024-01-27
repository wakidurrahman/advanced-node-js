import express from "express";
const routes = express.Router();

routes.get("/:name?", (req, res) => {
  const title = "Express";
  const name = req.params.name;
  res.send(`<!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title> ${title} </title>
        <link rel="stylesheet" href="styles.css"/>
      </head>
      <body>
        <h1> ${title} </h1>
        <p> Welcome to ${title}${name ? `, ${name}.` : ""} </p>
        <form method=POST action=data>
          Name: <input name=name><input type=submit>
        </form>
      </body>
      </html>
      </body>
    </html>`);
});

routes.post("/data", function (req, res) {
  res.redirect(`/${req.body.name}`);
});

export default routes;
