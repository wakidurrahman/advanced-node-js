const http = require("http");

/**
 * It's a good practice to allow the `hostname` and `port` values to be set via environment variables 
 * as this allows deployment orchestrators, such as Kubernetes, to inject these values at runtime.
 */
const HOSTNAME = process.env.HOSTNAME || "0.0.0.0";
const PORT = process.env.PORT || 3000;

/**
 * Pass the response object, `res`, to error() functions.
 * This object is a Stream.
 * We call res.end() to return the desired content.
 * @param {*} res
 * 
 * we pass an additional parameter, code. We use this to pass and then return HTTP status codes.
 * HTTP status codes are part of the HTTP protocol
 * @param {*} code
 */

function error(res, code) {
  res.statusCode = code;
  //   res.end(`{"error": "${http.STATUS_CODES[code]}"}`);
  res.end(
    JSON.stringify({
      statusCode: code,
      error: "fail!",
      message: `${http.STATUS_CODES[code]}`,
      message: JSON.stringify(http.STATUS_CODES),
    })
  );
}

/**
 * Pass the response object, `res`, to todo() functions.
 * This object is a Stream.
 * We call res.end() to return the desired content.
 * @param {*} res
 */
function todo(res) {
  //   res.end('[{"task_id": 1, "description": "walk dog"}]}');
  res.end(
    JSON.stringify([
      {
        task_id: 1,
        description: "walk dog",
      },
    ])
  );
}

/**
 * Pass the response object, `res`, to index() functions.
 * This object is a Stream.
 * We call res.end() to return the desired content.
 * @param {*} res
 */
function index(res) {
  //   res.end('{"name": "todo-server"}');
  res.end(
    JSON.stringify({
      statusCode: `${res.statusCode}`,
      name: "todo-server",
    })
  );
}

// Create a local server to receive data from
const server = http.createServer((req, res) => {
  /**
   * checks the req.method property for which HTTP method the incoming request was sent with
   * we only allowed GET requests. When any other HTTP method is detected on the incoming request,
   * we return and call our error function.
   */
  //
  if (req.method !== "GET") return error(res, 405);
  /**
   * The second two if statements inspect the req.url value.
   * The url property on the request informs us which route the request was sent to.
   * The if statements  control which function is called upon each request to a specific URL—this forms a simple route handler.
   */
  if (req.url === "/todo") return todo(res);
  if (req.url === "/") return index(res);
  /**
   * This line will only be reached if none of our conditional if statements are satisfied.
   * This will happen when a request is sent to any route other than / or /todo.
   */
  error(res, 404);
});

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server listening on port ${server.address().port}`);
});
