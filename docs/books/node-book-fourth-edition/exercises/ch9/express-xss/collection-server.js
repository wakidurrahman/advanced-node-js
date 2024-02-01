const http = require("http");

const HOSTNAME = process.env.HOSTNAME || "0.0.0.0";
const PORT = process.env.PORT || 3001;

const server = http.createServer((req, res) => {
  console.log(
    req.connection.remoteAddress,
    Buffer.from(req.url.split("/attack/")[1], "base64").toString().trim()
  );
  res.end("Hello Collection Server!");
});

server.listen(PORT, HOSTNAME, () => {
  console.log(`Collection Server listening on port ${PORT}`);
});
