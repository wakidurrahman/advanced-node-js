import Enquirer from "enquirer";
import { categories, listCategoryItems } from "./utils";
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

export const promptListIds = async () => {
  const { category } = await prompt(categoryQuestions);
  return listCategoryItems(category);
};
