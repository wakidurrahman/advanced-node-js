import Enquirer from "enquirer";
import { program } from "commander";
import {
  addProduct,
  categories,
  listCategories,
  listCategoryItems,
  updateProduct,
} from "./utils.js";
import { displayInfo, displayText, error, log } from "./displays.js";
// Import the Enquirer prompt types
const { prompt } = Enquirer;

/**
 * First create an array of question objects that follow a predefined shape.
 * The type of question can have a number of different properties, which we will define using “autocomplete” or “input”.
 * Then each question is assigned its own unique name, descriptive message for the question and a list of choices,
 */
const categoryQuestions = [
  {
    type: "autocomplete",
    name: "category",
    message: "Category",
    choices: categories,
  },
];

const orderQuestions = [
  ...categoryQuestions,
  {
    type: "input",
    name: "id",
    message: "ID",
  },
  {
    type: "input",
    name: "name",
    message: "Name",
  },
  {
    type: "input",
    name: "amount",
    message: "Amount",
  },
  {
    type: "input",
    name: "info",
    message: "Info",
  },
];

const updateQuestions = [
  {
    type: "input",
    name: "id",
    message: "ID",
  },
  {
    type: "input",
    name: "amount",
    message: "Amount",
  },
];

const commandsList = ["add", "update", "list", "list by Id's", "help", "exit"];

const commandsQuestions = [
  {
    type: "autocomplete",
    name: "command",
    message: "Command",
    choices: commandsList,
  },
];

export const promptListIds = async () => {
  /**
   * These are received asynchronously by awaiting the response from the prompt:
   * This command will return the named input 'category' an the return value,
   */
  const { category } = await prompt(categoryQuestions);
  return listCategoryItems(category);
};

export const promptAddOrder = async () => {
  const { category, id, name, amount, info } = await prompt(orderQuestions);
  return addProduct(category, id, name, amount, info);
};

export const promptUpdate = async () => {
  const { id, amount } = await prompt(updateQuestions);
  return updateProduct(id, amount);
};

export const promptCommand = async () => {
  const { command } = await prompt(commandsQuestions);
  return command;
};

/**
 * we can begin to construct out the main terminal prompt that will,
 * in effect, enclose the predefined functionality together.
 *
 * We first make the method accept an optional argument where we pass through a command from our 'program' .
 * We define this functionality as if we can do one of two things with our method.
 * The first is to act as a standalone application where it is not given any command to execute.
 * The second is where we pass the command as the optional argument to the function.
 * If no command is passed, then the application is prompted to display the promptCommand() that we designed earlier.
 * @param {*} cmd
 * @returns
 */
export const interactiveApp = async (cmd) => {
  log(displayText("Back office for My App"));
  log(displayInfo("Interactive Mode"));

  try {
    // If we pass the command as the optional argument to the function. 
    // If no command is passed, then the application is prompted to display the promptCommand() that we designed earlier.
    // with the command variable now defined from either the functional argument or form a user derived input we pass it through a series of 'switches'
    const command = cmd ?? promptCommand();
    switch (command) {
      case "add":
        log(displayInfo("Add Order"));
        await promptAddOrder();
        return interactiveApp();
      case "update":
        log(displayInfo("Update Order"));
        await promptUpdate();
        return interactiveApp();
      case "list":
        log(displayInfo("List Categories"));
        await listCategories();
        return interactiveApp();
      case "list by ID's":
        log(displayInfo("List Category Items"));
        await promptListIds();
        return interactiveApp();
      case "help":
        program.help();
      case "exit":
        program.exit(0);
    }
  } catch (err) {
    error(err);
    process.exit(1);
  }
};

