# 💁‍♂️ Testing with Node.js

Testing enables you to identify bugs in your code more quickly and efficiently.
Test cases should be written to verify that each piece of code is giving the expected output or result.

> [!TIP]
> Tests can act as a form of documentation for the logic of your program.

`Unit` testing is a specific type of testing where individual `components` or `units of code` are tested.

Testing frameworks provide `components` and `utilities` such as test `runners` for running `automated` tests.

## #️⃣ Testing with [tape](https://www.npmjs.com/package/tape)

`tape` is a `TAP-producing` test harness for node and browsers.

`tape` is one of the more lightweight testing frameworks and is commonly used to implement `unit` testing.

`tape` is a `TAP-producing` test library that provides a lightweight testing interface that requires `minimal` `configuration`.

TAP stands for `Test Anything Protocol` (https://testanything.org/). TAP is a language-agnostic `text-based` `protocol` that enables communication between `unit tests` and a `test harness`. It decouples the reporting of errors from the presentation of the reports.

`TAP` provides a simple and minimal view for test results.

```js
const test = require("tape");

test("timing test", function (t) {
  t.plan(2);

  t.equal(typeof Date.now, "function");
  const start = Date.now();

  setTimeout(function () {
    t.equal(Date.now() - start, 100);
  }, 100);
});

test("test using promises", async function (t) {
  const result = await someAsyncThing();
  t.ok(result);
});
```

As the tests were executing, the test results were output to `STDOUT` in TAP format. In the TAP output, `ok` implies that the test has passed, and `not ok` implies that the test has failed. When a test case has failed, the corresponding error is output.

## #️⃣ Testing with Mocha [tape](https://www.npmjs.com/package/tape)

Mocha is a popular `open source` JavaScript test framework for both `Node.js` and the `browser`.

Write test cases using Mocha for a simple calculator program.

- 👉 We need to install `mocha` as a development dependency: `$ npm i -D mocha`
- 👉 Mocha does not bundle an `assertion` framework, so we'll also install the `Chai` assertion library: `$ npm i -D chai`

Use Mocha's `describe()` and `it()` syntax to write some unit tests

We organized our tests using the Mocha `describe()` and it() syntax. `describe()` is used to define a collection of tests. The `describe()` method takes **_two parameters_**.

- The first is a name for the test, which should be as clear and `representative` of the test case as possible.
- The second parameter is a `callback` function, which can contain test cases or nested `describe()` blocks.

The `it()` syntax is to create a test case; it stands for `Individual` Test. The `it()` method also accepts **_two parameters_**.

- The first is the test name and
- The second is a `callback` function that `contains the test logic`.

Mocha provides a feature called `test hooks`. It provides the following four `test hooks`:

- `before()`: runs **once** `before` the `first test` in the `describe()` block
- `after()`: runs **once** `after` the `last test` in the `describe()` block
- `beforeEach()`: runs `before`` each` test in the `describe()` block
- `afterEach()`: runs `after` `each` test in the `describe()` block

Each of the functions accepts a `function as a parameter`. The `before()` and `beforeEach()` functions are expected to contain either a `setup` or `precondition` for the `test cases`, whereas the `after()` and `afterEach()` functions are generally used for `test cleanup`.
