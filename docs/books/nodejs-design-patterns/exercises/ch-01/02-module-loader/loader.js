/**
 * In this particular implementation we are using the original `resolve()` from Node.js `require` therefor we have to do the following:
 *
 * 1. store a reference to the original require function (`originalRequire`)
 * 2. redefine `require` by overriding the global `require` function
 * 3. the new `require.resolve()` will essentially need to call the original require `resolve()`
 *
 */

const originalRequire = require;

const fs = originalRequire("fs");

/**
 *
 * @param {*} filename
 * @param {*} module
 * @param {*} require
 */

function loadModule(filename, module, require) {
  const wrappedSrc = `(function (module, exports, require) {
    ${fs.readFileSync(filename, "utf8")}
})(module, module.exports, require)`;
  eval(wrappedSrc);
}

/**
 * The function simulates the behavior of the original `require()` function of Node.js, which is used to load a module.
 */

require = function require(moduleName) {
  console.log(`Require invoked for module: ${moduleName}`);

  const id = require.resolve(moduleName); // ①

  if (require.cache[id]) {
    // ②
    return require.cache[id].exports;
  }

  // module metadata
  const module = {
    // ③
    exports: {}, // The exports variable is just a reference to the initial value of module.exports.
    id,
  };

  // Update the cache
  require.cache[id] = module; // ④

  // load the module
  loadModule(id, module, require); // ⑤

  // return exported variable
  return module.exports; // ⑥
};

require.cache = {};
require.resolve = (moduleName) => {
  // reuse the original resolving algorithm for simplicity
  return originalRequire.resolve(moduleName);
};

// Load the entry point using our homemade 'require'
require(process.argv[2]);
