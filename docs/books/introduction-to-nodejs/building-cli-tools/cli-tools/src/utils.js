// we are using the ESM syntax to import the got library.
// Implement GOT to make HTTP request
import { got } from "got";

// This line sets up an API constant which references the default address of our local web service.
// Set the API URL
const API = "http://localhost:3000";

// Set the categories
const categories = ["confectionery", "electronics"];

// Update the order with the given ID
export async function updateCategory(id, amount) {
  console.log(`Updating order ${id} with amount ${amount}`);
  try {
    if (isNaN(+amount)) {
      console.log("Error: <AMOUNT> must be a number");
      process.exit(1);
    }
    // Use `got` HTTP request library for Node.js to make a POST request to the API.
    await got.post(`${API}/orders/${id}`, { json: { amount: +amount } });
    // Log th result to the console
    console.log(`Order ${id} updated with amount ${amount}`);
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
