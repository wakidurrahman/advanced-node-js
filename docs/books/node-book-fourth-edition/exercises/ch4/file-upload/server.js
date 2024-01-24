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
const contentType = (req) =>
  /multipart\/form-data/.test(req.headers["content-type"]);

const htmlFormPage = fs.readFileSync(
  path.join(__dirname, "public", "form.html")
);

function get(res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(htmlFormPage);
}

function post(req, res) {
  // The post() function checks that the Content-Type header is set to multipart/form-data.
  if (!contentType(req)) {
    // If this header isn't set, we call our error function and return a 415 HTTP status code with the message `Unsupported Media Type`.
    error(res, 415);
    return;
  }
  // Initialized a formidable object with configuration options and assigned it to a constant named form.
  const form = new formidable.IncomingForm({
    keepExtensions: true,
    multiples: true,
    uploadDir: "./uploads",
  });

  /**
   * The `form.parse()` function. This function parses the `request` and collects the form data within the request.
   * The `parsed` form data is passed to our `callback` function, as an array of `fields` and an `array` of files.
   */

  form.parse(req, (err, fields, files) => {
    // First check if any errors occurred during the form.parse() function, and return an error if there was one.
    if (err) return err;
    // Assuming the form data was successfully parsed, we return our response to the request, which is an HTTP status code 200, OK.
    res.writeHead(200, { "Content-Type": "application/json" });
    // We also return the information formidable provides by default about our uploaded file, in a string representation of the JSON format.
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
