/**
 * Create a middleware that logs the HTTP method and URL of the received request.
 */

function logsHttpMethodAndUrl() {
  return (req, res, next) => {
    console.log("Request received: ", req.method, req.url);
    next();
  };
}

export default logsHttpMethodAndUrl;
