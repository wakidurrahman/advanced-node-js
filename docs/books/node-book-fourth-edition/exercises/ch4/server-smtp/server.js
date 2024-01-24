/**
 * creating an SMTP server that can receive email messages
 */
const SMTPServer = require("smtp-server").SMTPServer;

const HOSTNAME = process.env.HOSTNAME || "0.0.0.0";
// Define the port that SMTP server should be accessible at
const POST = process.env.POST || 4321;

// create the SMTP server object
const server = new SMTPServer({
  disabledCommands: ["STARTTLS", "AUTH"], // This option disabled Transport Layer Security (TLS) support and authentication for simplicity
  logger: true, // which enables logging from our SMTP server
});

// Register an error event listener function on the server object that catch any errors
server.on("error", (err) => {
  console.error("Error %s", err.message);
});


// the listen() function a `port`, a `hostname`, and a `callback` function.
server.listen(POST, HOSTNAME, () => {
  console.log(`SMTPServer Server listening on port ${POST}`);
});
