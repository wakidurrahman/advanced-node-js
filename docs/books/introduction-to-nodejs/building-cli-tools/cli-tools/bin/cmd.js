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
import {
  addProduct,
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

// Create a new program
program
  // Set the name of the program
  .name("cli-tools")
  // Set the description
  .description("Back office for My App")
  // Set the version
  .version("1.0.0"); // Set the version

// Create a command for adding a new order program.
program
  // Set the command name
  .command("updateProduct")
  // Set the argument ID to be required
  .argument("<ID>", "Order ID")
  // Set the argument AMOUNT to be required
  .argument("<AMOUNT>", "Order Amount")
  // Set the action to be executed when the command is run
  .action(async (id, amount) => await updateProduct(id, amount));

// Create a command for listing categories by IDs

program
  // Set the command name
  .command("addProduct")
  // Set the command description
  .description("Add Product by ID to a Category")
  // Set the category to be required
  .argument("<CATEGORY>", "Product Category")
  // Set the argument ID to be required
  .argument("<ID>", "Product ID")
  // Set the argument NAME to be required
  .argument("<NAME>", "Product Name")
  // Set the argument AMOUNT to be required
  .argument("<AMOUNT>", "Product RRP")
  // Set the argument INFO to be optional.
  // it can accept more than one parameter.
  // This allows us to send through strings to our backend to provide a long-form product description.
  .argument("[INFO...]", "Product Info")
  // Set the action to be executed when the command is run
  .action(
    async (category, id, name, amount, info) =>
      await addProduct(category, id, name, amount, info)
  );

// Create a command for listing categories

program
  // Set the command name
  .command("list")
  // Set the command description
  .description("List categories")
  // Set the category to be optional
  .argument("[CATEGORY]", "Category to list IDs for")
  // Set the option to list all categories
  .option("-a, --all", "List all categories")
  // Set the action to be executed when the command is run
  .action(async (args, opts) => {
    if (args && opts.all)
      throw new Error("Cannot specify both category and 'all'");
    if (opts.all || args === "all") {
      listCategories();
    } else if (args === "confectionery" || args === "electronics") {
      await listCategoryItems(args);
    } else {
      throw new Error("Invalid category specified");
    }
  });

// Parse the arguments from process.argv
program.parse();
