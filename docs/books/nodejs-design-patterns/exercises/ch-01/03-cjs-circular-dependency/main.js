const a = require("./a"); // ①
const b = require("./b");

console.log("Circular Dependency")

console.log("a ->", JSON.stringify(a, null, 2));
console.log("b ->", JSON.stringify(b, null, 2));
