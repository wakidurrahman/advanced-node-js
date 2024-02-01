const express = require("express");
const helmet = require("helmet");

const app = express();

// to use the helmet middleware. The helmet module sets the injected HTTP headers to sensible secure defaults.
app.use(
  helmet({
    referrerPolicy: { policy: "no-referrer" },
  })
);

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
