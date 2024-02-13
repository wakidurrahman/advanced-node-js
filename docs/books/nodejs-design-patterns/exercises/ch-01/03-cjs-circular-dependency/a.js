exports.loaded = false; // ② 

const b = require("./b"); // ③

module.exports = {
  b,
  loaded: true, // overrides the previous export
};
