import Enquirer from "enquirer";
import {
  addProduct,
  categories,
  listCategoryItems,
  updateProduct,
} from "./utils.js";
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
