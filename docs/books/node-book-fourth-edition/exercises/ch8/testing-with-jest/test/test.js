const uppercase = require("../src/uppercase.js");

/**
 * Add a Jest describe() block. Jest describe() blocks are used to group and structure our tests.
 */
describe("uppercase", () => {
  /**
   * Use Jest's test() syntax to define an individual test.
   *
   * ** test will use Jest's assertion syntax to verify that
   *  when we call our `uppercase.js` module with the string "hello" it returns "HELLO".
   */
  test("uppercase hello returns HELLO", () => {
    expect(uppercase("hello")).toBe("HELLO");
    expect(uppercase("hello")).not.toBe("hello");
  });
});

/**
 * We can use a mock to verify that our function has been called with the correct parameters,
 * without actually executing the function.
 */
describe("uppercase", () => {
  test("uppercase hello returns HELLO with Mock ", () => {
    /**
     * jest.fn(() => "HELLO"); returns a new mock function.
     * We assign this to a variable named uppercase.
     * The parameter`() => "HELLO"` is a callback function that returns the string "HELLO".
     * this is to demonstrate how we can simulate a function's return value.
     */
    const uppercase = jest.fn(() => "HELLO"); // returns a new mock function

    const result = uppercase("hello");

    // We use the `Expect` method `.toHaveBeenCalled()` to verify that our mock function got called with the correct parameter.
    expect(uppercase).toHaveBeenCalledWith("hello");
    expect(result).toBe("HELLO");
  });
});
