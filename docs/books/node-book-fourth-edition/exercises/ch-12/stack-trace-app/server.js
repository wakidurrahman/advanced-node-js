const express = require("express");
const routes = require("./routes");

const HOSTNAME = process.env.HOSTNAME || "0.0.0.0";
const PORT = process.env.PORT || 3000;

const app = express();

app.use(routes);

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server listening on port ${PORT}`);
});