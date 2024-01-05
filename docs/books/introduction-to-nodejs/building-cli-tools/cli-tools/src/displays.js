import {} from "./colors.js";
import {
  bgCyan,
  bgPurple,
  bgRed,
  bgYellow,
  txBlue,
  txCyan,
  txGreen,
  txPurple,
  txRed,
  txYellow,
} from "./colors.js";

// -------------- Export the output display functions -------------------

// Log the usage of the command to the console
export const log = (message) => console.log(`\n${message}\n`);

/**
 * Log the error to the console
 *
 * Taking a look at the error method, we can use template literals to construct a template that integrates our colors and extend them with additional text decorators.
 * we are using the bgRed() method.
 * We are using the chalk.inverse() to help color the background of our “⚠️  Error:” label,
 * we then color the msg to the txRed() color that we defined.
 * Finally, we place the error msg to a new line \n using escape characters.
 *
 * @param {*} message
 * @returns
 */
export const error = (message) =>
  console.error(`${bgRed.inverse(`⚠️ Error:`)}\n${txRed(message)}\n`);

// ------------- The following display methods that we begin to decorate the messages that we are outputting to the terminal from `commands`: --- ------

// Get the current timestamp
const timestamp = () => new Date().toLocaleString();

export const displayTimestamp = () => bgPurple(timestamp());

export const displayInfo = (message) =>
  bgYellow.bold(`ℹ️ ${message ?? "Info:"}`);

export const displaySuccess = (message = "") =>
  bgCyan.inverse.bold(`✅ Success! ${message}`);

export const displayCategory = (category) => txGreen.bold.underline(category);

export const displayAmount = (amount) => txYellow.bold.underline(`$${amount}`);

export const displayID = (id) => txCyan.bold(id);

export const displayName = (name) => txCyan(name);

export const displayRRP = (rrp) => txYellow.bold(`$${rrp}`);

export const displayText = (msg) => txPurple(msg);

export const displayKey = (key) => txBlue.bold(key);
