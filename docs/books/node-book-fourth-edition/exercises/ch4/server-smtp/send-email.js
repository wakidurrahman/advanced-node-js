const nodemailer = require("nodemailer");

const HOSTNAME = process.env.HOSTNAME || "0.0.0.0";
// Define the port that SMTP server should be accessible at
const POST = process.env.POST || 4321;

// Configure the transport object to connect to the SMTP server

const transporter = nodemailer.createTransport({
  host: HOSTNAME,
  port: POST,
});

const emailObject = {
  from: "beth@example.com",
  to: "laddie@example.com",
  subject: "Test email",
  text: "Hello world!",
};
// Call the sendMail() function on the transport object:
transporter.sendMail(emailObject, (err, info) => {
  if (err) {
    console.error(err);
  }
  console.log("Message Send: ", info);
});
