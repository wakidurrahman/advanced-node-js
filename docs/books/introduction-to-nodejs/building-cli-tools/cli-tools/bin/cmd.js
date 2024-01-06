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
import { interactiveApp } from "../src/prompts.js";
import {
  addProduct,
  categories,
  listCategories,
  listCategoryItems,
  updateProduct,
} from "../src/utils.js";

/**
 * Create a new Command Program
 *
 * Instructing commander to create a new Command program.
 * To create a new program we apply a new Command instance to the program.
 */
const program = new Command();

// Create a new Program
program
  // Set the name of the program
  .name("cli-tools")
  // Set the description
  .description("Back office for My App")
  // Set the version
  .version("1.0.0")
  // Set the option to run application in interactive mode
  .option("-i, --interactive", "Run App in interactive mode")
  // Set the primary program action to be executed when no commands are specified
  .action(() => {
    // No-operation (noop)
  });

// Create a command for updating an order
program
  // Set the command name
  .command("update")
  .description("Update an order")
  .option("-i, --interactive", "Run Update Command in interactive mode")
  .argument("[ID]", "Order ID")
  .argument("[AMOUNT]", "Order Amount");

// Create a command for listing categories by IDs
program
  // Set the command name
  .command("add")
  // Set the command description
  .description("Add Product by ID to a Category")
  // Set the option to run command in interactive mode
  .option("-i, --interactive", "Run Update Command in interactive mode")
  // Set the category to be optional
  .argument("[CATEGORY]", "Product Category")
  // Set the argument ID to be optional
  .argument("[ID]", "Product ID")
  // Set the argument NAME to be optional
  .argument("[NAME]", "Product Name")
  // Set the argument AMOUNT to be optional
  .argument("[AMOUNT]", "Product RRP")
  // Set the argument INFO to be optional.
  // it can accept more than one parameter.
  // This allows us to send through strings to our backend to provide a long-form product description.
  .argument("[INFO...]", "Product Info");

/**
 * Create a command for listing categories
 *
 * We are also creating a program.option() that defines our two CLI flags as the first argument to the method.
 * For both of our flags, we are also setting our short-hand expressions -a, for its long-handed declaration --all.
 *
 * The idea is that we can either provide the name of the individual category
 * to be listed or we can list all the categories from our application by commanding the output via a flag.
 */
program
  // Set the command name
  .command("list")
  // Set the command description
  .description("List categories")
  // Set the option to run command in interactive mode
  .option("-i, --interactive", "Run Update Command in interactive mode")
  // Set the option to list all categories
  .option("-a, --all", "List all categories")
  // Set the category to be optional
  .argument("[CATEGORY]", "Category to list IDs for");

// Parse the arguments from process.argv
program.parse();

/**
 * Main function to run the program
 *
 * This argument will accept the program that we have defined as its only functional argument.
 *
 * @param {*} program
 * @returns
 */

async function main(program) {
  // Get the command, process.args and options
  const command = program?.args.at(0) || "";
  const cliArgs = program?.args.slice(1) || [];
  const options = program?.opts() || {};

  // Guard clauses
  if (!command && !options.interactive) {
    // Display the help
    program.help();
  }
  if (!command && options.interactive) {
    // Run the interactive app
    return interactiveApp();
  }
  if (command && options.interactive) {
    // Run the interactive app with the command
    return interactiveApp(command);
  }
  if (options.interactive && cliArgs.length > 0) {
    throw new Error("Cannot specify both interactive and command");
    process.exit(1);
  }

  // Execute the command
  switch (command) {
    case "add": {
      const [category, id, name, amount, info] = cliArgs;
      if (
        !categories.includes(category) ||
        !category ||
        !id ||
        !name ||
        !amount
      ) {
        throw new Error("Invalid arguments specified");
      }
      await addProduct(category, id, name, amount, info);
      break;
    }
    case "update": {
      const [id, amount] = cliArgs;
      if (!id && !amount) {
        throw new Error("Invalid arguments specified");
      }
      await updateProduct(id, amount);
      break;
    }
    case "list": {
      const { all } = options;
      const [category] = cliArgs;

      if (category && all) {
        throw new Error("Cannot specify both category and 'all'");
      }

      if (all || category === "all") {
         listCategories();
      } else if (categories.includes(category)) {
        await listCategoryItems(category);
      } else {
        throw new Error("Invalid category specified");
      }
      break;
    }

    default:
      await interactiveApp();
  }
}

// Run the main function
main(program);
