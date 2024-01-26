import express from "express";
import path from "path";

import routes from "./routes/routes.js";

import * as url from "url";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

// initialize express:
const app = express();

const HOSTNAME = process.env.HOSTNAME || "0.0.0.0";
const PORT = process.env.PORT || 3000;

// register the static Express.js middleware to host the public directory
app.use(express.static(path.join(__dirname, "public")));
app.use("/", routes);

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server listening on port ${PORT}`);
});
