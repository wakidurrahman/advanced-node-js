/**
 * This will create a server that renders a simple HTML web page that is susceptible to an XSS attack
 */
const express = require("express");

const HOSTNAME = process.env.HOSTNAME || "0.0.0.0";
const PORT = process.env.PORT || 3000;

const app = express();

const getServiceStatus = (callback) => {
  const status = "All systems are running";
  callback(status);
};

app.get("/", (req, res) => {
  const { previous, lang, token } = req.query;
  getServiceStatus((statusMessage) => {
    res.send(`
        <h1>Service Status</h1>
        <div id=status>
            ${statusMessage}
        </div>
        <div>
            <a href="${previous}${token}/${lang}">Back</a>
        </div>
    `);
  });
});

app.listen(PORT, HOSTNAME, () => {
  console.log("Server listening on port 3000");
});
