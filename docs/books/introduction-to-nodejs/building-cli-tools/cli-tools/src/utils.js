// we are using the ESM syntax to import the got library.
// Implement GOT to make HTTP request
import { got } from "got";

// This line sets up an API constant which references the default address of our local web service.
// Set the API URL
const API = "http://localhost:3000";

// Set the categories
const categories = ["confectionery", "electronics"];

// Log the usage of the command to the console
export const log = (message) => {
  console.log(`\n${message}\n`);
};

// Log the error to the console
export const error = (message) => {
  console.error(`\n${message}\n`);
};

// Update the order with the given ID
export async function updateCategory(id, amount) {
  console.log(`Updating order ${id} with amount ${amount}`);
  try {
    if (isNaN(+amount)) {
      log("Error: <AMOUNT> must be a number");
      process.exit(1);
    }
    // Use `got` HTTP request library for Node.js to make a POST request to the API.
    await got.post(`${API}/orders/${id}`, { json: { amount: +amount } });
    // Log th result to the console
    log(`Order ${id} updated with amount ${amount}`);
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
    error(err.message);
    process.exit(1);
  }
}

// Add a new Order

/**
 * Add a new Order
 *
 * we are passing through all the arguments ...args that would be provided to the function.
 * This allows us to destructure and extract the values that we need,
 * to allow us to provide the additional functionality that we require.
 * @param  {...any} args
 */

export async function addCategory(...args) {
  // Destructure the arguments
  let [category, id, name, amount, info] = args;
  log(`Adding item ${id} with amount ${amount}`);

  try {
    // we force the type of the amount to be an integer by using the '+' before the amount
    if (isNaN(+amount)) {
      error(`Error: <AMOUNT> must be a number`);
      process.exit(1);
    }
    // use GOT library to make a POST request to the API
    await got.post(`${API}/${category}`, {
      json: {
        id,
        name,
        rrp: +amount,
        info: info.json(" "),
      },
    });
    // Log the result to the console
    log(`Item "${id}: ${name}" has been added to the ${category} category`);
  } catch (err) {
    // If there is an error, log it to the console and exit
    error(err.message);
    process.exit(1);
  }
}

// List the categories
export function listCategories() {
  log("Listing categories");
  try {
    // Loop through the categories and log them to the console
    for (const cat of categories) log(cat);
  } catch (err) {
    // If there is an error, log it to the console and exit
    error(err.message);
  }
}

// // List the IDs for the given category
export async function listCategoryItems(category) {
  log(`Listing IDs for category ${category}`);
  try {
    // Use GTO Library to make the GET request to the API
    const result = await got(`${API}/${category}`).json();
    // Log the result to the console
    for (const item of result) {
      log(
        `${item.id}: ${item.name} - $${item.rrp}\nProduct Info:\t${item.info}`
      );
    }
  } catch (err) {
    // if there is an error, log it to the console and exit.
    error(err.message);
    process.exit(1);
  }
}
