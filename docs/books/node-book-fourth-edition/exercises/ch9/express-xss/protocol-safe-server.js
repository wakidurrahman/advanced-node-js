/**
 * To fix the application, we need to escape/sanitize the input.
 */
const express = require("express");
const he = require("he");
const escapeHTML = require("escape-html");

const HOSTNAME = process.env.HOSTNAME || "0.0.0.0";
const PORT = process.env.PORT || 3000;

const app = express();

const getServiceStatus = (callback) => {
  const status = "All systems are running!";
  callback(status);
};

app.get("/", (req, res) => {
  const { previous, lang, token } = req.query;
  console.log("OnClick")
  getServiceStatus((statusMessage) => {
    // prevent reflected XSS attack sent over an HTTP request containing malicious input.
    const href = escapeHTML(`/${previous}${token}/${lang}`);
    res.send(`
        <h1>Service Status</h1>
        <div id=status>
            ${statusMessage}
        </div>
        <div>
            <a href="${href}">Back</a>
        </div>
    `);
  });
});

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server listening on port ${PORT}`);
});
