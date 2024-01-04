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
  addCategory,
  listCategories,
  listCategoryItems,
  updateCategory,
} from "../src/utils";

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
  .command("update")
  // Set the argument ID to be required
  .argument("<ID>", "Order ID")
  // Set the argument AMOUNT to be required
  .argument("<AMOUNT>", "Order Amount")
  // Set the action to be executed when the command is run
  .action(async (id, amount) => await updateCategory(id, amount));



  // Create a command for listing categories by IDs

// Parse the arguments from process.argv
program.parse();
