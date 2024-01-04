#!/usr/bin/env node

/**
 * This first line is a unix and unix-like system
 * (e.g. Linux, MacOS) directive known as the ”shebang” or the “hashbang”
 * (as per the two leading characters of its syntax,
 * where "bang" is a synonym for exclamation point).
 *
 * When a non-binary file has executable permissions and is run from the command line, the "hashbang" is checked so that the Operating System knows what interpreter to execute the text of the file with.
 */

// we are using the ESM syntax to import the got library.
import got from "got";

// This line sets up an API constant which references the default address of our local web service.
const API = "http://localhost:3000";

/**
 *
 * @param {*} msg
 */

const usage = (msg = "Back office for My App") => {
  console.log(`\n${msg}\n`);
  console.log("Usage: cmd <ID> <AMOUNT>");
};

/**
 * Get the arguments from the command line
 *
 * The `process.argv` property holds an array of strings.
 *
 * The first element in the `process.argv` array contains the `full path` to the currently executing node binary.
 * The second element in the `process.argv` array contains the `full path` to the file that has been executed with node (in this case the cmd.js file).
 * Neither of these are important to us,
 * so we use `process.argv.slice(2)` to create a new array (argv) that has the first two elements of the `process.argv` array chopped off.
 */
const argv = process.argv.slice(2);

/**
 * If there are no arguments, show the usage and exit
 * So if there are less than two elements in the argv array, that is an input error.
 * We call the `usage` function with no arguments (which means it outputs the default msg in the usage function),
 * and then exit with a code of 1 (any non-zero code is a non-successful exit).
 */
//
if (argv.length < 2) {
  usage();
  process.exit(1);
}

/**
 * Deconstruct the arguments into variables
 *
 * If both positional arguments are provided,
 * we use array destructure to assign the first element of `argv` to the `id` constant and the second element to the `amt` constant.
 *
 */
//
const [argID, argAmount] = argv;

/**
 * Check if the Amount is a number
 *
 * Since all arguments that come from the command line are strings,
 * we convert the `amt` string to a number and assign it to the amount constant.
 * Amounts must be whole numbers, which we verify using Number.isInteger.
 */
//
const amount = parseInt(argAmount); // Convert the `amt` string to a number and assign it to the amount constantl

//
/**
 * If the amount is not a number, show the 'usage' and exit
 *
 * This will also return false if a non-numerical string has been passed to Number (it will be `NaN`, which is not an integer).
 *  If amount is not a valid integer we call the usage function — this time with a custom error message, and exit the process with a code of 1.
 */
if (isNaN(amount)) {
  usage("Error: <AMOUNT> must be a number");
  process.exit(1);
}

/**
 * Now for the actual meat of what we want our CLI to do: make a POST request to the `/orders/{ID}` route of our mock service.
 */

// Update the order with the given ID
try {
  // Use `got` HTTP request library for Node.js to make a POST request to the API.
  await got.post(`${API}/orders/${argID}`, { json: { amount } });
  // Log the result to the console
  console.log(`Order ${argID} updated with amount ${amount}`);
} catch (error) {
  // If there is an error, log it to the console and exit
  console.log(error.message);
  process.exit(1);
}
