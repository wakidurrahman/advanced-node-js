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

## #️⃣ Testing with [Mocha](https://mochajs.org/#getting-started)

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
- `beforeEach()`: runs ` before`` each ` test in the `describe()` block
- `afterEach()`: runs `after` `each` test in the `describe()` block

Each of the functions accepts a `function as a parameter`. The `before()` and `beforeEach()` functions are expected to contain either a `setup` or `precondition` for the `test cases`, whereas the `after()` and `afterEach()` functions are generally used for `test cleanup`.

## #️⃣ Testing with [Jest](https://jestjs.io/)

Jest is a delightful JavaScript Testing Framework with a focus on simplicity.

It works with projects using: Babel, TypeScript, Node, React, Angular, Vue and more!

Generate code coverage by adding the flag `--coverage`. No additional setup needed. Running this will show us which lines of our program have been covered by the test case.

```js
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
```

The assertion uses Jest's bundled assertion library, `Expect` We used the `toBe()` assertion from the Expect library to equate the two values.

`Expect` `exposes` many `assertion` methods, including `toBe()`, `toContain()`, `toThrow()`, and others. The full list of assertions is defined in the Expect section of Jest's API documentation https://jestjs.io/docs/expect#methods

```js
    "scripts": {
        "test": "jest --coverage"
    }
```

### 📝 `jest` test runner

To run our test cases, we call the `jest` test runner, which is located within our node_modules directory.

The Jest executable runs the tests, automatically looking for a directory named `test`. The `runner` executes our tests and then generates an output summary of the results.

### 📝 Code coverage `--coverage`

Code coverage is a measure of how many `lines of our program` `code` are `touched` when executing our tests. `100%` code coverage means that every line of your program is covered by the test suite. This helps you easily detect bugs introduced by code changes. Some `developers` and `organizations` set acceptable `thresholds` for code coverage and put restrictions in place so that the code coverage `percentage` `%` cannot be regressed.

### 📝 Setup and `teardown`

Jest provides setup and `teardown` functionality for tests. Setup steps can be run before each or all tests using the `beforeEach()` and `beforeAll()` functions respectively.

Similarly, `teardown` steps can be run after each or all tests with the `afterEach()` and `afterAll()` functions respectively.

```js
describe("test", () => {
  beforeAll(() => {
    // Runs once before all tests
  });
  beforeEach(() => {
    // Runs before each test
  });
  afterEach(() => {
    // Runs after each test
  });
  afterAll(() => {
    // Runs after all tests
  });
});
```

### 📝 Mocking with Jest

`Mocks` enable you to test the interaction of your code or functions without having to execute the code.

> [!TIP] > `Mocks` are often used in cases where your tests rely on `third-party` services or APIs, and you do not want to send `real requests` to these `services` when running your `test suite`.

> [!TIP]
> There are benefits to mocking, including faster execution of test suites and ensuring your tests are not going to be impacted by `network` conditions.

## #️⃣ Stubbing HTTP requests

When unit testing, you do not typically want your test to send a request to an external service.

Requests to the external service you're consuming can be metered or rate-limited, and you do not want your test cases to consume any allowance.

It's also possible that your tests would require access to service credentials. This means every developer on the project would need access to those credentials before they could run the test suite.

To be able to unit test your code without sending a request to an external service, you can fake a `request` and `response`. This concept is known as `stubbing`.

`Stubbing` can be used to mimic the API calls, without actually sending the request. `Stubbing` comes with the additional benefit of reducing any request latency, potentially making the tests run faster than if they were to send real requests.

### 📝 [Stubs - Sinon.JS](https://sinonjs.org/releases/v17/stubs/)

> [!NOTE]
> 👁️ What are stubs?

Test stubs are functions (spies) with pre-programmed behavior.

They support the full test `spy` API in addition to methods which can be used to alter the stub’s behavior.

As `spies`, stubs can be either `anonymous`, or wrap existing functions. When wrapping an existing function with a `stub`, the `original function` is not called.

> [!TIP]
> 👁️ When to use stubs?

Use a stub when you want to:

1. Control a method’s behavior from a test to force the code down a specific path.

2. When you want to prevent a specific method from being called directly (possibly because it triggers undesired behavior, such as a `XMLHttpRequest` or similar).

we call the following line to override our getGitHubUser() function:

```js
sinon.stub(github, "getGitHubUser").returns(octokitUserData);
```

## #️⃣ Using Puppeteer

UI(User Interface) testing is a technique used to identify issues with Graphical User Interfaces(GUIs). This technique is commonly used to test web application interfaces. 

Puppeteer is an open source library that can be used to automate UI tests.
