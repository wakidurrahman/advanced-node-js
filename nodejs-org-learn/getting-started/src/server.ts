// Importing the http module
import * as http from "http";

// Defining types for hostname and port.
const hostname: string = '127.0.0.1';
const port: number = 3000;
/**
 * The createServer() method of http creates a new HTTP server and returns it.
 * Specifying types for the 'req' and 'res' parameters in the callback function of createServer.
 * Explicitly specifying the type of the server variable as 'http.Server'.
 */

const server: http.Server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  /**
   * Whenever a new request is received, the request event is called, 
   * providing two objects: a request (an http.IncomingMessage object) and a response (an http.ServerResponse object).
   * Those 2 objects are essential to handle the HTTP call.
   */
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
