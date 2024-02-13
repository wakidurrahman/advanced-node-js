exports.loaded = false; // ④

const a = require("./a"); // ⑤ Now, `b.js` requires `a.js` (cycle)

module.exports = {
  a,
  loaded: true, // overrides the previous export.
};




