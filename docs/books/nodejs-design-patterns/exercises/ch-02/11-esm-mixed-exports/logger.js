//a default export and
export default function log(message) {
  console.log("From Default export", message);
}

// a named export 
export function info(message) {
  log(`info: ${message}`);
}
