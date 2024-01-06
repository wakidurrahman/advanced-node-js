// we are using the ESM syntax to import the got library.
// Implement GOT to make HTTP request
import { got } from "got";
import {
  displayAmount,
  displayID,
  displayInfo,
  displaySuccess,
  displayText,
  displayTimestamp,
  displayCategory,
  displayName,
  displayRRP,
  displayKey,
  error as displayError,
  log as displayLog,
} from "./displays.js";

// This line sets up an API constant which references the default address of our local web service.
// Set the API URL
const API = "http://localhost:3000";

// Set the categories
export const categories = ["confectionery", "electronics"];

// Update the order with the given ID
export async function updateProduct(id, amount) {
  displayLog(`${displayTimestamp()}`);
  displayLog(
    `${displayInfo("Updating Order")} ${displayID(id)} ${displayText(
      "with amount"
    )} ${displayAmount(amount)}`
  );

  try {
    if (isNaN(+amount)) {
      displayError(" must be a number");
      process.exit(1);
    }
    // Use `got` HTTP request library for Node.js to make a POST request to the API.
    await got.post(`${API}/orders/${id}`, {
      json: { amount: +amount },
    });
    // Log the result to the console
    displayLog(
      `${displaySuccess()} ${displayText("Order")} ${displayID(
        id
      )} ${displayText("updated with amount")} ${displayAmount(amount)}`
    );
  } catch (err) {
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
    displayError(err.message);
    process.exit(1);
  }
}

/**
 * Add a new Order
 *
 * we are passing through all the arguments ...args that would be provided to the function.
 * This allows us to destructure and extract the values that we need,
 * to allow us to provide the additional functionality that we require.
 * @param  {...any} args
 */

export async function addProduct(...args) {
  // Destructure the arguments
  let [category, id, name, amount, info] = args;
  displayLog(`${displayTimestamp()}`);
  displayLog(
    `${displayInfo(" Request to add item to category")} ${displayCategory(
      category
    )}`
  );
  displayLog(
    `${displayText("Adding item")} ${displayID(id)} ${displayText(
      "with amount"
    )} ${displayAmount(amount)}`
  );

  try {
    // we force the type of the amount to be an integer by using the '+' before the amount
    if (isNaN(+amount)) {
      displayError(`<AMOUNT> must be a number`);
      process.exit(1);
    }
    // use GOT library to make a POST request to the API
    await got.post(`${API}/${category}`, {
      json: {
        id,
        name,
        rrp: +amount,
        info: info.join(" "),
      },
    });
    // Log the result to the console
    displayLog(
      `${displaySuccess("Product Added! :")} ${displayID(id)} ${displayText(
        "-"
      )} ${displayName(name)} ${displayText(
        "has been added to the"
      )} ${displayCategory(category)} ${displayText("category")}`
    );
  } catch (err) {
    // If there is an error, log it to the console and exit
    displayError(err.message);
    process.exit(1);
  }
}

/**
 * List the categories
 *
 * This is a very simple functionality,
 * where we loop over the categories array and log each one out to the terminal.
 *
 */
//
export function listCategories() {
  displayLog(`${displayTimestamp()}`);
  displayLog(`${displayInfo(" Listing categories")}`);

  try {
    // Loop through the categories and log them to the console
    displayLog(displayText("Categories received from API:"));
    for (const cat of categories) displayLog(cat);
  } catch (err) {
    // If there is an error, log it to the console and exit
    displayError(err.message);
    process.exit(1);
  }
}

/**
 * List the IDs for the given category
 *
 * The purpose of this function is to list the Items within each category
 * when the category is supplied to the method.
 * It makes a GET request to our mock-srv pointing at the relevant category endpoint,
 * then displays the output to the terminal.
 * @param {*} category
 */
export async function listCategoryItems(category) {
  displayLog(`${displayTimestamp()}`);
  displayLog(`${displayInfo(" List IDs")}`);

  try {
    // Use GOT Library to make a GET request to the API
    const result = await got(`${API}/${category}/`).json();
    // Log the result to the console
    displayLog(`${displaySuccess("IDs received from API:")}`);
    for (const item of result) {
      displayLog(
        `${displayKey("ID:")}\t${displayID(item.id)} ${displayKey(
          "Name:"
        )}\t${displayName(item.name)} ${displayKey("RRP:")}\t${displayRRP(
          item.rrp
        )} ${displayKey("Product Info:")}\n\t${displayText(item.info)}`
      );
    }
  } catch (err) {
    // If there is an error, log it to the console and exit
    displayError(err.message);
    process.exit(1);
  }
}
