import express from "express";
import path from "path";

import routes from "./routes/routes.js";

import * as url from "url";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

/**
 * initialize express:
 * where we create our Express.js server, where app represents the server.
 */

const app = express();

const HOSTNAME = process.env.HOSTNAME || "0.0.0.0";
const PORT = process.env.PORT || 3000;

/**
 * app.set()
 *
 * The first app.set() command sets the views `namespace` to our views folder. Express
 *
 * The second app.set() command sets the view engine, and in our case, we set it to use the EJS view engine. Note
 */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/**
 * The app.use() function is used to register middleware.
 */
// register the static Express.js middleware to host the public directory
app.use(express.static(path.join(__dirname, "public")));
app.use("/", routes);

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server listening on port ${PORT}`);
});
