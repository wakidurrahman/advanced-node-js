/**
 * Create a server that can handle file uploads, storing the files on the server.
 */

const fs = require("fs");
const http = require("http");
const path = require("path");
const formidable = require("formidable");

/**
 * It's a good practice to allow the `hostname` and `port` values to be set via environment variables
 *
 */
const HOSTNAME = process.env.HOSTNAME || "0.0.0.0";
const POST = process.env.POST || 3000;

const htmlFormPage = fs.readFileSync(
  path.join(__dirname, "public", "form.html")
);

function get(res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(htmlFormPage);
}

function post(req, res) {
  if (!/multipart\/form-data/.test(req.headers["content-type"])) {
    error(res, 415);
    return;
  }

  const form = new formidable.IncomingForm({
    uploadDir: "./uploads",
    multiples: true,
  });

  form.parse(req, (err, fields, files) => {
    if (err) return err;
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        fields,
        files,
      })
    );
  });
}

function error(res, code) {
  res.statusCode = code;
  res.end(http.STATUS_CODES[code]);
}

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    get(res);
    return;
  }
  if (req.method === "POST") {
    post(req, res);
    return;
  }
  error(res, 405);
});

// Server listen method
server.listen(POST, HOSTNAME, () => {
  console.log(`Server listening on port ${server.address().port}`);
});
