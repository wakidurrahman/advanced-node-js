const test = require("tape");

const { add, subtract, multiply, divide } = require("../src/calculator.js");

/**
 * First test case
 * Test the add() function by pass the `integers` value.
 */

test("test add integers 1 and 2", (t) => {
  // The plan() function indicates how many assertions should be run within the test. In the case, we had just one assertion in each test case.
  t.plan(1);

  // pass test values 1 and 2 and confirm that we get the result 3
  t.equal(add(1, 2), 3);
});

/**
 * Second test case
 * Test the add() function by pass the numbers as `strings` rather than `integers`.
 */

test("test add string 1 and 2", (t) => {
  t.plan(1);

  // This test is expected to fail as our add() program does not contain `logic` to transform `string` input into `integers`.
  t.equal(add("1", "2"), "12"); // We used t.equal() for our assertion logic.
});

test("test subtract integer 5 and 4", (t) => {
  t.plan(1);

  t.equal(subtract(5, 4), 1); 
});

test("test subtract string 1000 and 4", (t) => {
  t.plan(1);

  t.equal(subtract("1000", "4"), 99); 
});
