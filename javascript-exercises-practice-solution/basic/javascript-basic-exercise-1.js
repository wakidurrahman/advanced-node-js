// 01: Display the current day and time in a specific format.
/**
 * Write a JavaScript program to display the current day and time in the following format
 * Today is: Tuesday.
 * Current time is: 10 PM: 30: 38
 */

// Get the current date and time
const today1 = new Date("2023-01-11T15:00:00.512Z"); // test 'Noon'
const today2 = new Date("2023-01-11T03:00:00.512Z"); // test "Midnight"
const today = new Date("2024-01-15T01:59:40.820Z");
// Get the day of the week (0-6, where 0 is Sunday and 6 is Saturday)
const day = today.getDay();
// Array of day names
const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Display the current day
console.log(`Today is: ${dayNames[day]}.`);

// Get the current hour, minute, and second.
let hour = today.getHours();
const minute = today.getMinutes();
const second = today.getSeconds();

// Determine if it's AM or PM
let prepend = hour >= 12 ? " PM " : " AM ";

// Convert 24-hour format to 12-hour format
hour = hour >= 12 ? hour - 12 : hour;

// Check for special cases when hour is 0;
if (hour === 0 && prepend === " PM ") {
  if (minute === 0 && second === 0) {
    hour = 12;
    prepend = " Noon";
  } else {
    hour = 12;
    prepend = " PM";
  }
}

// Check for special cases when hour is 0;
if (hour === 0 && prepend === " AM ") {
  if (minute === 0 && second === 0) {
    hour = 12;
    prepend = " Midnight";
  } else {
    hour = 12;
    prepend = " AM";
  }
}

console.log(`Current Time : ${hour}${prepend} : ${minute} : ${second}`);
