const express = require("express");
const HOSTNAME = process.env.HOSTNAME || "0.0.0.0";
const PORT = process.env.PORT || 3000;
const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server listening on port ${PORT}`);

  setInterval(() => {
    console.log("Server listening...");
  }, 3000);
});
