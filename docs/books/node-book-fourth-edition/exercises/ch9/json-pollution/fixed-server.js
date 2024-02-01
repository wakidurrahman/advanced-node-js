/**
 * Step 2: how to use a JSON schema to protect our applications from these attacks
 */

const http = require("http");
const Ajv = require("ajv");

const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

const { STATUS_CODES } = http;

const HOSTNAME = process.env.HOSTNAME || "0.0.0.0";
const PORT = process.env.PORT || 3000;

const schema = {
  title: "Greeting",
  type: "object",
  properties: {
    msg: { type: "string" },
    name: { type: "string" },
  },
  additionalProperties: false,
  required: ["msg"],
};

const validate = ajv.compile(schema);

const greeting = (req, res) => {
  let data = "";
  req.on("data", (chunk) => (data += chunk));

  req.on("end", () => {
    try {
      data = JSON.parse(data);
    } catch (err) {
      res.end("");
      return;
    }

    if (!validate(data, schema)) {
      console.log(validate.errors);
      res.end("");
      return;
    }

    if (data.hasOwnProperty("name")) {
      res.end(`${data.msg} ${data.name}`);
    } else {
      res.end(data.msg);
    }
  });
};

/**
 * create a server that is susceptible to a JSON pollution attack.
 *
 * The server will accept `msg` and `name` as `URL parameters` and respond with a message built with these values:
 */
const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/") {
    greeting(req, res);
    return;
  }

  res.statusCode = 404;
  res.end(STATUS_CODES[res.statusCode]);
});

server.listen(PORT, HOSTNAME, () => {
  console.log("Server listening on port 3000");
});
