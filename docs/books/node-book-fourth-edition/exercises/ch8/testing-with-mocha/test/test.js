// Node.js assert module
const assert = require("assert");


const { add, subtract, multiply, divide } = require("../src/calculator.js");

/**
 * Use Mocha's describe() and it() syntax to write some unit tests for our calculator.js program;
 */

// Mocha describe() block, which will contain multiple tests.
describe("Calculator Test", () => {
  /**
   * We can add a nested describe() to test our add() function from calculator.js.
   * Nested  describe() definitions enable test cases to be logically grouped.
   */

  describe("add() Test", () => {
    /**
     * we use the Mocha it() syntax.
     */

    it("add(2,3) should return 5", () => {
      /**
       * Our test case will use the Chai assertion library to validate that when
       * we pass the add() function, the numbers 2, 3, and 5 will be returned as expected.
       */
      assert.equal(add(2, 3), 5);
    });

    it("add('2','3') should return 23", () => {
      /**
       * Our test case will use the Chai assertion library to validate that when
       * we pass the add() function, the numbers 2, 3, and 5 will be returned as expected.
       */
      assert.equal(add("2", "3"), 23);
    });
  });

  describe("subtract() Test", () => {
    it("subtract(8,3) should return 5", () => {
      assert.equal(subtract(8, 3), 5);
    });

    it("subtract('8','3') should return 5", () => {
      assert.equal(subtract("8", "3"), 9);
    });
  });
});
