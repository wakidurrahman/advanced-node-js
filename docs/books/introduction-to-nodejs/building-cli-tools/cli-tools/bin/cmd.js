#!/usr/bin/env node

/**
 * This first line is a unix and unix-like system
 * (e.g. Linux, MacOS) directive known as the ”shebang” or the “hashbang”
 * (as per the two leading characters of its syntax,
 * where "bang" is a synonym for exclamation point).
 *
 * When a non-binary file has executable permissions and is run from the command line, the "hashbang" is checked so that the Operating System knows what interpreter to execute the text of the file with.
 */

// The complete solution for node.js command-line interfaces.
import { Command } from "commander";
import { updateCategory } from '../src/utils';

/**
 * Create a new Command Program
 *
 * Instructing commander to create a new Command program.
 * To create a new program we apply a new Command instance to the program.
 */
const program = new Command();

// This line sets up an API constant which references the default address of our local web service.
const API = "http://localhost:3000";

/**
 * Log the usage of the command to the console
 * @param {*} msg
 */

const usage = (msg = "Back office for My App") => {
  console.log(`\n${msg}\n`);
};

/**
 * Update the order with the give ID
 * @param {*} id
 * @param {*} amount
 */
async function updateItem(id, amount) {
  usage(`Updating order ${id} with amount ${amount}`);
  try {
    if (isNaN(+amount)) {
      usage("Error: <AMOUNT> must be a number");
      process.exit(1);
    }
    // Use `got` HTTP request library for Node.js to make a POST request to the API.
    await got.post(`${API}/orders/${id}`, { json: { amount: +amount } });
    // Log the result to the console
    usage(`Order ${id} updated with amount ${amount}`);
  } catch (error) {
    /**
     * If there is an error, log it to the console and exit
     *
     * It rejects in the case of a request responding with a 4xx or 5xx status code,
     * or in case of any other errors, such as a network error.
     * An awaited promise in a try block will fall through to the catch block if the awaited promise is rejected.
     * So in the event of any error making the request,
     * the catch block will log out whatever the error message might be,
     * and then exit the process with a code of 1 to indicate it was not successful.
     */

    console.error(error.message);
    process.exit(1);
  }
}

// Create a new program
program
  .name("cli-tools") // Set the name of the program
  .description("Back office for My App") // set the description
  .version("1.0.0"); // Set the version

// Create a command for adding a new order program.
program
  // Set the command name
  .command("update")
  // Set the argument ID to be required
  .argument("<ID>", "Order ID")
  // Set the argument AMOUNT to be required
  .argument("<AMOUNT>", "Order Amount")
  // Set the action to be executed when the command is run
  .action(async (id, amount) => await updateItem(id, amount));

// Parse the arguments from process.argv
program.parse();
